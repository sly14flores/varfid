import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_TYPE = `${apiUrl}/api/maintenance/type`
const createType = (payload) => {
    return axios.post(CREATE_TYPE, payload)
}

const UPDATE_TYPE = `${apiUrl}/api/maintenance/type/:id`
const updateType = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_TYPE, { id })
    return axios.put(url, payload)
}

const GET_TYPE = `${apiUrl}/api/maintenance/type/:id`
const getType = (payload) => {
    const { id } = payload
    const url =  route(GET_TYPE, { id })
    return axios.get(url)
}

const GET_TYPES = `${apiUrl}/api/maintenance/types`
const getTypes = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_TYPES, {params: { page: pageNo } })
}

const DELETE_TYPE = `${apiUrl}/api/maintenance/type/:id`
const deleteType = (payload) => {
    const { id } = payload
    const url =  route(DELETE_TYPE, { id })
    return axios.delete(url)
}

/**
 * State
 */
const type = {
    id: 0,
    name: null,
    description: null,
}
const saving = false
const types = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const state = () => {
    return {
        saving,
        writeOn: false,
        values: type,
        type,
        types,
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
        state.type = type
        state.types = types
    },
    TYPE(state, payload) {
        state.type = payload
    },
    TYPES(state, payload) {
        state.types = payload
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
    async CREATE_TYPE({commit, dispatch}, payload) {
        commit('SAVING',true)        
        try {
            const { data } = await createType(payload)
            dispatch('CREATE_TYPE_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error
            dispatch('CREATE_TYPE_ERROR', response)
            return false
        }
    },
    CREATE_TYPE_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })  
    },
    CREATE_TYPE_ERROR({commit}, payload) {
        commit('SAVING',false) 
        console.log(payload)
    },
    async UPDATE_TYPE({commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        try {
            const { data } = await updateType(payload)
            dispatch('UPDATE_TYPE_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_TYPE_ERROR', response)
            return false
        }
    },
    UPDATE_TYPE_SUCCESS({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })        
    },
    UPDATE_TYPE_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        console.log(payload)
    },
    async DELETE_TYPE({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteType({id})
            dispatch('DELETE_TYPE_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_TYPE_ERROR', response)
        }
    },
    DELETE_TYPE_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_TYPES', { page: 0 })
    },
    DELETE_TYPE_ERROR({commit}, payload) {
        console.log(payload)
    },
    async GET_TYPE({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
        const { id } = payload
        try {
            const { data: { data } } = await getType({id})
            dispatch('GET_TYPE_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_TYPE_ERROR', response)
        }
    },
    GET_TYPE_SUCCESS({commit}, payload) {
        commit('TYPE', payload)
        commit('FETCHING_DATA', false)
    },
    GET_TYPE_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        console.log(payload)
    },
    async GET_TYPES({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
        try {
            const { page } = payload
            const { data: { data: { data, pagination } } } = await getTypes({ page })
            dispatch('GET_TYPES_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error
            dispatch('GET_TYPES_ERROR', response)
        }
    },
    GET_TYPES_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('TYPES',data)
        commit('PAGINATION',pagination)
        commit('FETCHING_LIST',false)
    },
    GET_TYPES_ERROR({commit}, payload) {
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