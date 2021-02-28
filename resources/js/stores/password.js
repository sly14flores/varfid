import axios from 'axios'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * API
 */
const CHANGE_PASSWORD_ROUTE = `${apiUrl}/api/change/password`
const changePassword = (payload) => {
    return axios.post(CHANGE_PASSWORD_ROUTE, payload)
}

const updating = false
const validations = {}

const state = () => {
    return {
        updating,
        validations
    }
}

const mutations = {
    UPDATING(state, payload) {
        state.updating = payload
    },
    VALIDATIONS(state, payload) {
        state.validations = payload
    },    
}

const actions = {
    async CHANGE_PASSWORD({commit,dispatch},payload) {
        commit('UPDATING',true)
        commit('VALIDATIONS', {})
        try {
            const { data } = await changePassword(payload)
            dispatch('CHANGE_PASSWORD_SUCCESS', data)
        } catch (error) {
            console.log(Object.keys(error));
            const { response } = error
            dispatch('CHANGE_PASSWORD_ERROR', response)
        }        
    },
    CHANGE_PASSWORD_SUCCESS({commit},payload) {
        commit('UPDATING',false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            window.open('#/login','_self')
        });
    },
    CHANGE_PASSWORD_ERROR({commit},payload) {
        commit('UPDATING',false)
        const { status, data: { data } } = payload
        if (status === 422) {
            commit('VALIDATIONS', data)
        }        
    }
}

const getters = {

}

export default {
	namespaced: true,    
    state,
    mutations,
    actions,
    getters    
}