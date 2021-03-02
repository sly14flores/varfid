// import route from '../library/route'
import { apiUrl } from '../url.js'

/**
 * APIs
 */
const GET_GROUPS = `${apiUrl}/api/selections/user/groups`
const getGroups = () => {
    return axios.get(GET_GROUPS)
}

const groups = []

const state = () => {
    return {
        groups
    }
}

const mutations = {
    GROUPS(state,payload) {
        state.groups = payload
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