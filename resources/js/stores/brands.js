import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_BRAND = `${apiUrl}/api/maintenance/brand`
const createBrand = (payload) => {
    return axios.post(CREATE_BRAND, payload)
}

const UPDATE_BRAND = `${apiUrl}/api/maintenance/brand/:id`
const updateBrand = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_BRAND, { id })
    return axios.put(url, payload)
}

const GET_BRAND = `${apiUrl}/api/maintenance/brand/:id`
const getBrand = (payload) => {
    const { id } = payload
    const url =  route(GET_BRAND, { id })
    return axios.get(url)
}

const GET_BRANDS = `${apiUrl}/api/maintenance/brands`
const getBrands = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_BRANDS, {params: { page: pageNo } })
}

const DELETE_BRAND = `${apiUrl}/api/maintenance/brand/:id`
const deleteBrand = (payload) => {
    const { id } = payload
    const url =  route(DELETE_BRAND, { id })
    return axios.delete(url)
}

/**
 * State
 */
const brand = {
    id: 0,
    name: null,
    description: null,
}
const saving = false
const brands = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const state = () => {
    return {
        saving,
        writeOn: false,
        brand,
        brands,
        pagination,
        fetchingList,
        fetchingData
    }
}

/**
 * Mutations
 */
const mutations = {
    INIT(state) {
        state.brand = brand
        state.brands = brands
    },
    BRAND(state, payload) {
        state.brand = payload
    },
    BRANDS(state, payload) {
        state.brands = payload
    },
    PAGINATION(state, payload) {
        state.pagination = {...payload}
    },
    SAVING(state, payload) {
        state.saving = payload
    },
    TOGGLE_WRITE(state,payload) {
        state.writeOn = payload
    },
    FETCHING_LIST(state,payload) {
        state.fetchingList = payload
    },
    FETCHING_DATA(state,payload) {
        state.fetchingData = payload
    }
}

/**
 * Actions
 */
const actions = {
    INIT({commit}) {
        commit('INIT')
    },
    TOGGLE_WRITE({commit}, payload) {
        commit('TOGGLE_WRITE', payload)
    },
    async CREATE_BRAND({commit, dispatch}, payload) {
        commit('SAVING',true)        
        try {
            const { data } = await createBrand(payload)
            dispatch('CREATE_BRAND_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error
            dispatch('CREATE_BRAND_ERROR', response)
            return false
        }
    },
    CREATE_BRAND_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })  
    },
    CREATE_BRAND_ERROR({commit}, payload) {
        commit('SAVING',false) 
        console.log(payload)
    },
    async UPDATE_BRAND({commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        try {
            const { data } = await updateBrand(payload)
            dispatch('UPDATE_BRAND_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_BRAND_ERROR', response)
            return false
        }
    },
    UPDATE_BRAND_SUCCESS({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })        
    },
    UPDATE_BRAND_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        console.log(payload)
    },
    async DELETE_BRAND({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteBrand({id})
            dispatch('DELETE_BRAND_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_BRAND_ERROR', response)
        }
    },
    DELETE_BRAND_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_BRANDS', { page: 0 })
    },
    DELETE_BRAND_ERROR({commit}, payload) {
        console.log(payload)
    },
    async GET_BRAND({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
        const { id } = payload
        try {
            const { data: { data } } = await getBrand({id})
            dispatch('GET_BRAND_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_BRAND_ERROR', response)
        }
    },
    GET_BRAND_SUCCESS({commit}, payload) {
        commit('BRAND', payload)
        commit('FETCHING_DATA', false)
    },
    GET_BRAND_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        console.log(payload)
    },
    async GET_BRANDS({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
        try {
            const { page } = payload
            const { data: { data: { data, pagination } } } = await getBrands({ page })
            dispatch('GET_BRANDS_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error
            dispatch('GET_BRANDS_ERROR', response)
        }
    },
    GET_BRANDS_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('BRANDS',data)
        commit('PAGINATION',pagination)
        commit('FETCHING_LIST',false)
    },
    GET_BRANDS_ERROR({commit}, payload) {
        console.log(payload)
        commit('FETCHING_LIST',false)
    }
}

/**
 * Getters
 */
const getters = {

}

export default {
    namespaced: true,    
    state,
    mutations,
    actions,
    getters
}