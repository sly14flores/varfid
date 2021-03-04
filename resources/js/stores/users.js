import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_USER = `${apiUrl}/api/maintenance/user`
const createUser = (payload) => {
    return axios.post(CREATE_USER, payload)
}

const UPDATE_USER = `${apiUrl}/api/maintenance/user/:id`
const updateUser = ({ data, id }) => {
    const url =  route(UPDATE_USER, { id })
    return axios.post(url, data)
}

const GET_USER = `${apiUrl}/api/maintenance/user/:id`
const getUser = (payload) => {
    const { id } = payload
    const url =  route(GET_USER, { id })
    return axios.get(url)
}

const GET_USERS = `${apiUrl}/api/maintenance/users`
const getUsers = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_USERS, {params: { page: pageNo } })
}

const DELETE_USER = `${apiUrl}/api/maintenance/user/:id`
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
    username: null,
    password: null,
    group: null,
    image: "/img/avatar.png"
}
const saving = false
const writeOn = false
const users = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const picture = "/img/avatar.png"
const pictureReplace = false

const state = () => {
    return {
        saving,
        writeOn,
        values: user,
        user,
        users,
        pagination,
        fetchingList,
        fetchingData,
        picture,
        pictureReplace
    }
}

const mutations = {
    INIT(state) {
        state.user = user
        state.users = users,
        state.picture = picture
        state.pictureReplace = pictureReplace
    },
    INIT_PICTURE(state) {
        state.picture = picture
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
    },
    FETCHING_LIST(state,payload) {
        state.fetchingList = payload
    },
    FETCHING_DATA(state,payload) {
        state.fetchingData = payload
    },
    PICTURE(state,payload) {
        state.picture = payload
    },
    PICTURE_REPLACE(state,payload) {
        state.pictureReplace = payload
    }
}

const actions = {
    INIT({commit}) {
        commit('INIT')
    },
    INIT_PICTURE({commit}) {
        commit('INIT_PICTURE')
    },
    TOGGLE_WRITE({commit}, payload) {
        commit('TOGGLE_WRITE', payload)
    },
    async CREATE_USER({commit, dispatch}, payload) {
        commit('SAVING',true)
        const {
            id,
            firstname,
            middlename,
            lastname,
            username,
            password,
            group,
            image,
        } = payload
        const fd = new FormData();        
        if (id) fd.append('id',id);
        if (firstname) fd.append('firstname',firstname);
        if (middlename) fd.append('middlename',middlename);
        if (lastname) fd.append('lastname',lastname);
        if (username) fd.append('username',username);
        if (password) fd.append('password',password);
        if (group) fd.append('group',group);
        if (image) fd.append('image',image);
        try {
            const { data } = await createUser(fd)
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
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        commit('PICTURE',picture)
    },
    CREATE_USER_ERROR({commit}, payload) {
        commit('SAVING',false) 
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async UPDATE_USER({state, commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        const {
            id,
            firstname,
            middlename,
            lastname,
            username,
            password,
            group,
            image,
        } = payload
        const fd = new FormData();
        fd.append('_method','PUT')
        if (id) fd.append('id',id);
        if (firstname) fd.append('firstname',firstname);
        if (middlename) fd.append('middlename',middlename);
        if (lastname) fd.append('lastname',lastname);
        if (username) fd.append('username',username);
        if (password) fd.append('password',password);
        if (group) fd.append('group',group);
        if (image && state.pictureReplace) fd.append('image',image);
        try {
            const { data } = await updateUser({ data: fd, id })
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
        commit('PICTURE_REPLACE',false)
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })        
    },
    UPDATE_USER_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE',false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async DELETE_USER({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteUser({id})
            dispatch('DELETE_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_USER_ERROR', response)
        }
    },
    DELETE_USER_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_USERS', { page: 0 })
    },
    DELETE_USER_ERROR({commit}, payload) {
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_USER({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
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
        const { picture } = payload
        commit('USER', payload)
        if (picture!=null) {
            commit('PICTURE', picture)
        }
        commit('FETCHING_DATA', false)
    },
    GET_USER_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_USERS({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
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
        commit('FETCHING_LIST',false)
    },
    GET_USERS_ERROR({commit}, payload) {
        commit('FETCHING_LIST',false)        
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    SET_PICTURE({commit},payload) {
        commit('PICTURE',payload)
    },
    PICTURE_REPLACE({commit},payload) {
        commit('PICTURE_REPLACE',payload)
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