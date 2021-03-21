import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_LOG = `${apiUrl}/api/log`
const createLog = (payload) => {
    return axios.post(CREATE_LOG, payload)
}

const UPDATE_LOG = `${apiUrl}/api/log/:id`
const updateLog = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_LOG, { id })
    return axios.put(url, payload)
}

const GET_LOG = `${apiUrl}/api/log/:id`
const getLog = (payload) => {
    const { id } = payload
    const url =  route(GET_LOG, { id })
    return axios.get(url)
}

const GET_LOGS = `${apiUrl}/api/logs`
const getLogs = (payload) => {
    const { page, filters } = payload
    const pageNo = page + 1
    return axios.get(GET_LOGS, {params: { page: pageNo, filters } })
}

const DELETE_LOG = `${apiUrl}/api/log/:id`
const deleteLog = (payload) => {
    const { id } = payload
    const url =  route(DELETE_LOG, { id })
    return axios.delete(url)
}

/**
 * State
 */
const log = {
    id: 0,
    name: null,
    description: null,
}
const saving = false
const logs = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const state = () => {
    return {
        saving,
        writeOn: false,
        values: log,
        log,
        logs,
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
        state.log = log
        state.logs = logs
    },
    LOG(state, payload) {
        state.log = payload
    },
    LOGS(state, payload) {
        state.logs = payload
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
    async CREATE_LOG({commit, dispatch}, payload) {
        commit('SAVING',true)        
        try {
            const { data } = await createLog(payload)
            dispatch('CREATE_LOG_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error || {}
            dispatch('CREATE_LOG_ERROR', response)
            return false
        }
    },
    CREATE_LOG_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })  
    },
    CREATE_LOG_ERROR({commit}, payload) {
        commit('SAVING',false) 
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async UPDATE_LOG({commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        try {
            const { data } = await updateLog(payload)
            dispatch('UPDATE_LOG_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error || {}
            dispatch('UPDATE_LOG_ERROR', response)
            return false
        }
    },
    UPDATE_LOG_SUCCESS({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })        
    },
    UPDATE_LOG_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async DELETE_LOG({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteLog({id})
            dispatch('DELETE_LOG_SUCCESS', data)
        } catch (error) {
            const { response } = error || {}
            dispatch('DELETE_LOG_ERROR', response)
        }
    },
    DELETE_LOG_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_LOGS', { page: 0 })
    },
    DELETE_LOG_ERROR({commit}, payload) {
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_LOG({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
        const { id } = payload
        try {
            const { data: { data } } = await getLog({id})
            dispatch('GET_LOG_SUCCESS', data)
        } catch (error) {
            const { response } = error || {}
            dispatch('GET_LOG_ERROR', response)
        }
    },
    GET_LOG_SUCCESS({commit}, payload) {
        commit('LOG', payload)
        commit('FETCHING_DATA', false)
    },
    GET_LOG_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_LOGS({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
        try {
            const { page, filters } = payload
            const { data: { data: { data, pagination } } } = await getLogs({ page, filters })
            dispatch('GET_LOGS_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error || {}
            dispatch('GET_LOGS_ERROR', response)
        }
    },
    GET_LOGS_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('LOGS',data)
        commit('PAGINATION',pagination)
        commit('FETCHING_LIST',false)
    },
    GET_LOGS_ERROR({commit}, payload) {
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