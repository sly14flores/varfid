// import route from '../library/route'
import { apiUrl } from '../url.js'

/**
 * APIs
 */
const GET_GROUPS = `${apiUrl}/api/selections/user/groups`
const getGroups = () => {
    return axios.get(GET_GROUPS)
}

const GET_TYPES = `${apiUrl}/api/selections/vehicle/types`
const getTypes = () => {
    return axios.get(GET_TYPES)
}

const GET_BRANDS = `${apiUrl}/api/selections/vehicle/brands`
const getBrands = () => {
    return axios.get(GET_BRANDS)
}

const groups = []
const sexs = [
    {id: "Male", name: "Male"},
    {id: "Female", name: "Female"},
]
const types = []
const brands = []

const state = () => {
    return {
        groups,
        sexs,
        types,
        brands,
    }
}

const mutations = {
    GROUPS(state,payload) {
        state.groups = payload
    },
    TYPES(state,payload) {
        state.types = payload
    },
    BRANDS(state,payload) {
        state.brands = payload
    }        
}

const actions = {
    async GET_GROUPS({dispatch}) {
        try {
            const { data } = await getGroups()
            dispatch('GET_GROUPS_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_GROUPS_ERROR', response)
        }
    },
    GET_GROUPS_SUCCESS({commit}, payload) {
        commit('GROUPS', payload)
    },
    GET_GROUPS_ERROR(payload) {
        console.log(payload)
    },
    async GET_TYPES({dispatch}) {
        try {
            const { data } = await getTypes()
            dispatch('GET_TYPES_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_TYPES_ERROR', response)
        }
    },
    GET_TYPES_SUCCESS({commit}, payload) {
        commit('TYPES', payload)
    },
    GET_TYPES_ERROR(payload) {
        console.log(payload)
    },
    async GET_BRANDS({dispatch}) {
        try {
            const { data } = await getBrands()
            dispatch('GET_BRANDS_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_BRANDS_ERROR', response)
        }
    },
    GET_BRANDS_SUCCESS({commit}, payload) {
        commit('BRANDS', payload)
    },
    GET_BRANDS_ERROR(payload) {
        console.log(payload)
    },    
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