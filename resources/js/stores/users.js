import route from '../library/route'
import { apiUrl } from '../url.js'

/**
 * APIs
 */
const CREATE_USER = `${apiUrl}/api/user`
const createUser = (payload) => {
    return axios.post(CREATE_USER, payload)
}

const UPDATE_USER = `${apiUrl}/api/user/:id`
const updateUser = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_USER, { id })
    return axios.put(url, payload)
}

const GET_USER = `${apiUrl}/api/user/:id`
const getUser = (payload) => {
    const { id } = payload
    const url =  route(GET_USER, { id })
    return axios.get(url)
}

const GET_USERS = `${apiUrl}/api/users`
const getUsers = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_USERS, {params: { page: pageNo } })
}

const DELETE_USER = `${apiUrl}/api/user/:id`
const deleteUser = (payload) => {
    const { id } = payload
    const url =  route(DELETE_USER, { id })
    return axios.delete(url)
}

const user = {
    id: 0,
    firstname: null,
    middlename: null,
    lastname: null,
    email: null,
    username: null,
    password: null
}
const saving = false
const users = []
const pagination = {}

const state = () => {
    return {
        saving,
        writeOn: false,
        user,
        users,
        pagination
    }
}

const mutations = {
    INIT(state) {
        state.user = user
        state.users = users
    },
    USER(state, payload) {
        state.user = payload
    },
    USERS(state, payload) {
        state.users = payload
    },
    PAGINATION(state, payload) {
        state.pagination = {...payload}
    },
    SAVING(state, payload) {
        state.saving = payload
    },
    TOGGLE_WRITE(state,payload) {
        state.writeOn = payload
    }
}

const actions = {
    INIT({commit}) {
        commit('INIT')
    },
    TOGGLE_WRITE({commit}, payload) {
        commit('TOGGLE_WRITE', payload)
    },
    async CREATE_USER({commit, dispatch}, payload) {
        commit('SAVING',true)        
        try {
            const { data: { data } } = await createUser(payload)
            dispatch('CREATE_USER_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error
            dispatch('CREATE_USER_ERROR', response)
            return false
        }
    },
    CREATE_USER_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        console.log(payload)
    },
    CREATE_USER_ERROR({commit}, payload) {
        commit('SAVING',false) 
        console.log(payload)
    },
    async UPDATE_USER({commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        try {
            const { data: { data } } = await updateUser(payload)
            dispatch('UPDATE_USER_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_USER_ERROR', response)
            return false
        }
    },
    UPDATE_USER_SUCCESS({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
    },
    UPDATE_USER_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE', false)
        console.log(payload)
    },
    async DELETE_USER({dispatch}, payload) {
        const { id } = payload
        try {
            const { data: { data } } = await deleteUser({id})
            dispatch('DELETE_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_USER_ERROR', response)
        }
    },
    DELETE_USER_SUCCESS({commit, dispatch}, payload) {
        console.log(payload)
        dispatch('GET_USERS', { page: 0 })
    },
    DELETE_USER_ERROR({commit}, payload) {
        console.log(payload)
    },
    async GET_USER({dispatch}, payload) {
        const { id } = payload
        try {
            const { data: { data } } = await getUser({id})
            dispatch('GET_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_USER_ERROR', response)
        }
    },
    GET_USER_SUCCESS({commit}, payload) {
        commit('USER', payload)
    },
    GET_USER_ERROR({commit}, payload) {
        console.log(payload)
    },
    async GET_USERS({dispatch}, payload) {
        try {
            const { page } = payload
            const { data: { data: { data, pagination } } } = await getUsers({ page })
            dispatch('GET_USERS_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error
            dispatch('GET_USERS_ERROR', response)
        }
    },
    GET_USERS_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('USERS',data)
        commit('PAGINATION',pagination)
    },
    GET_USERS_ERROR({commit}, payload) {
        console.log(payload)
    }
}

const getters = {

}

const usersStore = {
	namespaced: true,    
    state,
    mutations,
    actions,
    getters
}

export { user, usersStore };