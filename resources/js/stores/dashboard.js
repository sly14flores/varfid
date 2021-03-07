import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

const GET_DATA = `${apiUrl}/api/dashboard/data`
const getData = () => {
    return axios.get(GET_DATA)
}

const data = {}
const fetchingData = false

const state = () => {
    return {
        data,
        fetchingData
    }
}

const mutations = {
    DATA(state,payload) {
        state.data = payload
    },
    FETCHING_DATA(state,payload) {
        state.fetchingData = payload
    }    
}

const actions = {
    async GET_DATA({commit,dispatch}) {
        commit('FETCHING_DATA', true)
        try {
            const { data: { data } } = await getData()
            dispatch('GET_DATA_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_DATA_ERROR', response)
        }
    },
    GET_DATA_SUCCESS({commit}, payload) {
        commit('DATA', payload)
        commit('FETCHING_DATA', false)
    },
    GET_DATA_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        // Swal.fire({
        //     text: 'Something went wrong',
        //     icon: 'error',
        //     confirmButtonText: 'Ok'
        // })
    },    
}

const getters = {}

export default {
    namespaced: true,    
    state,
    mutations,
    actions,
    getters
}