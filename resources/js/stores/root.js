import axios from 'axios'
import { apiUrl } from '../url.js'

/**
 * APIs
 */
const LOGIN_ROUTE = `${apiUrl}/api/login`
const login = (payload) => {
    const {username, password} = payload
    return axios.post(LOGIN_ROUTE, {username, password})
}

const LOGOUT_ROUTE = `${apiUrl}/api/logout`
const logout = () => {
    return axios.post(LOGOUT_ROUTE)
}

const AUTHENTICATE_ROUTE = `${apiUrl}/api/authenticate`
const authenticate = () => {
    return axios.post(AUTHENTICATE_ROUTE)
}

/**
 * For Login
 */
const profile = {
    id: 0,
    firstname: null,
    lastname: null,
    token: null,
    groupName: null,
    picture: null,
}

const loading = false
const transitioning = false

const state = () => {
    return {
        profile,
        unauthenticated: null,
        validations: {},
        loading,
        transitioning
    }
}

const mutations = {
    PROFILE(state, payload) {
        state.profile = {...payload}
    },
    UNAUTHENTICATED(state, payload) {
        state.unauthenticated = payload
    },
    VALIDATIONS(state, payload) {
        state.validations = payload
    },
    LOADING(state, payload) {
        state.loading = payload
    },
    TRANSITIONING(state, payload) {
        state.transitioning = payload
    }
}

const actions = {
    async LOGIN({commit, dispatch}, payload) {
        commit('UNAUTHENTICATED', false)
        commit('VALIDATIONS', {})
        commit('LOADING',true)
        try {
            const { data } = await login(payload)
            dispatch('LOGIN_SUCCESS', data)
        } catch (error) {
            console.log(Object.keys(error));
            const { response } = error
            dispatch('LOGIN_ERROR', response)
        }
    },
    LOGIN_SUCCESS({commit}, payload) {
        commit('LOADING',false)
        const { data } = payload
        commit('PROFILE',data)
        window.open('#/','_self')
    },
    LOGIN_ERROR({commit}, payload) {
        commit('LOADING',false)
        /**
         * 422 Invalidated
         * 401 Unauthenticated
         */
        const { status, data: { data } } = payload
        if (status === 422) {
            commit('VALIDATIONS', data)
        }
        if (status === 401) {
            commit('UNAUTHENTICATED', true)
        }
    },
    async LOGOUT({dispatch}) {
        try {
            const response = await logout()
            dispatch('LOGOUT_SUCCESS')
        } catch(error) {
            dispatch('LOGOUT_ERROR')
        }
    },
    LOGOUT_SUCCESS() {
        window.open('#/login','_self')
    },
    LOGOUT_ERROR() {

    },
    async AUTHENTICATE() {
        try {
            const response = await authenticate()
        } catch (error) {
            console.log(error)
        }
    },
    TRANSITIONING({commit}, payload) {
        commit('TRANSITIONING', payload)
    }    
}

const getters = {

}

export {
    profile,
    state,
    mutations,
    actions,
    getters
}