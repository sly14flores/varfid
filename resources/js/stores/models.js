import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_MODEL = `${apiUrl}/api/maintenance/model`
const createModel = (payload) => {
    return axios.post(CREATE_MODEL, payload)
}

const UPDATE_MODEL = `${apiUrl}/api/maintenance/model/:id`
const updateModel = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_MODEL, { id })
    return axios.put(url, payload)
}

const GET_MODEL = `${apiUrl}/api/maintenance/model/:id`
const getModel = (payload) => {
    const { id } = payload
    const url =  route(GET_MODEL, { id })
    return axios.get(url)
}

const GET_MODELS = `${apiUrl}/api/maintenance/models`
const getModels = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_MODELS, {params: { page: pageNo } })
}

const DELETE_MODEL = `${apiUrl}/api/maintenance/model/:id`
const deleteModel = (payload) => {
    const { id } = payload
    const url =  route(DELETE_MODEL, { id })
    return axios.delete(url)
}

/**
 * State
 */
const model = {
    id: 0,
    name: null,
    description: null,
}
const saving = false
const models = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const state = () => {
    return {
        saving,
        writeOn: false,
        values: model,
        model,
        models,
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
        state.model = model
        state.models = models
    },
    TYPE(state, payload) {
        state.model = payload
    },
    TYPES(state, payload) {
        state.models = payload
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
    async CREATE_MODEL({commit, dispatch}, payload) {
        commit('SAVING',true)        
        try {
            const { data } = await createModel(payload)
            dispatch('CREATE_MODEL_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error
            dispatch('CREATE_MODEL_ERROR', response)
            return false
        }
    },
    CREATE_MODEL_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })  
    },
    CREATE_MODEL_ERROR({commit}, payload) {
        commit('SAVING',false) 
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async UPDATE_MODEL({commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        try {
            const { data } = await updateModel(payload)
            dispatch('UPDATE_MODEL_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_MODEL_ERROR', response)
            return false
        }
    },
    UPDATE_MODEL_SUCCESS({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })        
    },
    UPDATE_MODEL_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async DELETE_MODEL({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteModel({id})
            dispatch('DELETE_MODEL_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_MODEL_ERROR', response)
        }
    },
    DELETE_MODEL_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_MODELS', { page: 0 })
    },
    DELETE_MODEL_ERROR({commit}, payload) {
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_MODEL({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
        const { id } = payload
        try {
            const { data: { data } } = await getModel({id})
            dispatch('GET_MODEL_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_MODEL_ERROR', response)
        }
    },
    GET_MODEL_SUCCESS({commit}, payload) {
        commit('TYPE', payload)
        commit('FETCHING_DATA', false)
    },
    GET_MODEL_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_MODELS({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
        try {
            const { page } = payload
            const { data: { data: { data, pagination } } } = await getModels({ page })
            dispatch('GET_MODELS_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error
            dispatch('GET_MODELS_ERROR', response)
        }
    },
    GET_MODELS_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('TYPES',data)
        commit('PAGINATION',pagination)
        commit('FETCHING_LIST',false)
    },
    GET_MODELS_ERROR({commit}, payload) {
        commit('FETCHING_LIST',false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })        
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