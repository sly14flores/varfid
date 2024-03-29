// import route from '../library/route'
import { apiUrl } from '../url.js'

/**
 * APIs
 */
const GET_VEHICLE_ALL = `${apiUrl}/api/selections/vehicle/all`
const getVehicleAll = () => {
    return axios.get(GET_VEHICLE_ALL)
}

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

const GET_MODELS = `${apiUrl}/api/selections/vehicle/models`
const getModels = () => {
    return axios.get(GET_MODELS)
}

const groups = []
const sexs = [
    {id: "Male", name: "Male"},
    {id: "Female", name: "Female"},
]
const types = []
const brands = []
const models = []

const state = () => {
    return {
        groups,
        sexs,
        types,
        brands,
        models,
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
    },
    MODELS(state,payload) {
        state.models = payload
    }     
}

const actions = {
    async GET_GROUPS({dispatch}) {
        try {
            const { data } = await getGroups()
            dispatch('GET_GROUPS_SUCCESS', data)
        } catch (error) {
            const { response } = error || null
            dispatch('GET_GROUPS_ERROR', response)
        }
    },
    GET_GROUPS_SUCCESS({commit}, payload) {
        commit('GROUPS', payload)
    },
    GET_GROUPS_ERROR(payload) {
        console.log(payload)
    },
    async GET_VEHICLE_ALL({dispatch}) {
        try {
            const { data } = await getVehicleAll()
            dispatch('GET_VEHICLE_ALL_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_VEHICLE_ALL_ERROR', response)
        }
    },
    GET_VEHICLE_ALL_SUCCESS({commit}, payload) {
        const { types, brands, models } = payload
        commit('TYPES', types)
        commit('BRANDS', brands)
        commit('MODELS', models)
    },
    GET_VEHICLE_ALL_ERROR(payload) {
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
    async GET_MODELS({dispatch}) {
        try {
            const { data } = await getModels()
            dispatch('GET_MODELS_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_MODELS_ERROR', response)
        }
    },
    GET_MODELS_SUCCESS({commit}, payload) {
        commit('MODELS', payload)
    },
    GET_MODELS_ERROR(payload) {
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