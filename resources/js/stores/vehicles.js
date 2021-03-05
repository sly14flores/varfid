import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

/**
 * APIs
 */
const CREATE_VEHICLE = `${apiUrl}/api/vehicle`
const createVehicle = (payload) => {
    return axios.post(CREATE_VEHICLE, payload)
}

const UPDATE_VEHICLE = `${apiUrl}/api/vehicle/:id`
const updateVehicle = ({ data, id }) => {
    const url =  route(UPDATE_VEHICLE, { id })
    return axios.post(url, data)
}

const GET_VEHICLE = `${apiUrl}/api/vehicle/:id`
const getVehicle = (payload) => {
    const { id } = payload
    const url =  route(GET_VEHICLE, { id })
    return axios.get(url)
}

const GET_VEHICLES = `${apiUrl}/api/vehicles`
const getVehicles = (payload) => {
    const { page } = payload
    const pageNo = page + 1
    return axios.get(GET_VEHICLES, {params: { page: pageNo } })
}

const DELETE_VEHICLE = `${apiUrl}/api/vehicle/:id`
const deleteVehicle = (payload) => {
    const { id } = payload
    const url =  route(DELETE_VEHICLE, { id })
    return axios.delete(url)
}

const SCAN_RFID = `${apiUrl}/api/vehicle/scan/:id`
const scanRfid = (payload) => {
    const { id } = payload
    const url =  route(SCAN_RFID, { id })
    return axios.get(url)
}

const vehicle = {
    id: 0,
    type_id: null,
    brand_id: null,
    model: null,
    plate_no: null,
    rfid: null,
    firstname: null,
    lastname: null,
    sex: null,
    contact_no: null,
    address: null,
    image: "/img/avatar.png"
}
const saving = false
const writeOn = false
const vehicles = []
const pagination = {}
const fetchingList = false
const fetchingData = false

const picture = "/img/avatar.png"
const pictureReplace = false

const state = () => {
    return {
        saving,
        writeOn,
        values: vehicle,
        info: vehicle,
        vehicle,
        vehicles,
        pagination,
        fetchingList,
        fetchingData,
        picture,
        pictureReplace
    }
}

const mutations = {
    INIT(state) {
        state.vehicle = vehicle
        state.vehicles = vehicles,
        state.picture = picture
        state.pictureReplace = pictureReplace
    },
    INIT_PICTURE(state) {
        state.picture = picture
    },
    VEHICLE(state, payload) {
        state.vehicle = payload
    },
    VEHICLES(state, payload) {
        state.vehicles = payload
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
    },
    INFO(state, payload) {
        state.info = payload
    },    
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
    async CREATE_VEHICLE({commit, dispatch}, payload) {
        commit('SAVING',true)
        const {
            id,
            type_id,
            brand_id,
            model,
            plate_no,
            rfid,
            firstname,
            lastname,
            sex,
            contact_no,
            address,
            image,
        } = payload
        const fd = new FormData();        
        if (id) fd.append('id',id);
        if (type_id) fd.append('type_id',type_id);
        if (brand_id) fd.append('brand_id',brand_id);
        if (model) fd.append('model',model);
        if (plate_no) fd.append('plate_no',plate_no);
        if (rfid) fd.append('rfid',rfid);
        if (firstname) fd.append('firstname',firstname);
        if (lastname) fd.append('lastname',lastname);
        if (sex) fd.append('sex',sex);
        if (contact_no) fd.append('contact_no',contact_no);
        if (address) fd.append('address',address);
        if (image) fd.append('image',image);
        try {
            const { data } = await createVehicle(fd)
            dispatch('CREATE_VEHICLE_SUCCESS', data)
            return true
        } catch(error) {
            const { response } = error
            dispatch('CREATE_VEHICLE_ERROR', response)
            return false
        }
    },
    CREATE_VEHICLE_SUCCESS({commit}, payload) {
        commit('SAVING',false)        
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        commit('PICTURE',picture)
    },
    CREATE_VEHICLE_ERROR({commit}, payload) {
        commit('SAVING',false) 
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async UPDATE_VEHICLE({state,commit,dispatch}, payload) {
        commit('SAVING',true)
        commit('TOGGLE_WRITE', true)
        const {
            id,
            type_id,
            brand_id,
            model,
            plate_no,
            rfid,
            firstname,
            lastname,
            sex,
            contact_no,
            address,
            image,
        } = payload
        const fd = new FormData();
        fd.append('_method','PUT')
        if (id) fd.append('id',id);
        if (type_id) fd.append('type_id',type_id);
        if (brand_id) fd.append('brand_id',brand_id);
        if (model) fd.append('model',model);
        if (plate_no) fd.append('plate_no',plate_no);
        if (rfid) fd.append('rfid',rfid);
        if (firstname) fd.append('firstname',firstname);
        if (lastname) fd.append('lastname',lastname);
        if (sex) fd.append('sex',sex);
        if (contact_no) fd.append('contact_no',contact_no);
        if (address) fd.append('address',address);
        if (image && state.pictureReplace) fd.append('image',image);
        try {
            const { data } = await updateVehicle({ data: fd, id })
            dispatch('UPDATE_VEHICLE_SUCCESS', data)
            return true
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_VEHICLE_ERROR', response)
            return false
        }
    },
    UPDATE_VEHICLE_SUCCESS({commit}, payload) {
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
    UPDATE_VEHICLE_ERROR({commit}, payload) {
        commit('SAVING',false)
        commit('TOGGLE_WRITE',false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async DELETE_VEHICLE({dispatch}, payload) {
        const { id } = payload
        try {
            const { data } = await deleteVehicle({id})
            dispatch('DELETE_VEHICLE_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_VEHICLE_ERROR', response)
        }
    },
    DELETE_VEHICLE_SUCCESS({dispatch}, payload) {
        const { message } = payload
        Swal.fire({
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        dispatch('GET_VEHICLES', { page: 0 })
    },
    DELETE_VEHICLE_ERROR({commit}, payload) {
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_VEHICLE({commit,dispatch}, payload) {
        commit('FETCHING_DATA', true)
        const { id } = payload
        try {
            const { data: { data } } = await getVehicle({id})
            dispatch('GET_VEHICLE_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_VEHICLE_ERROR', response)
        }
    },
    GET_VEHICLE_SUCCESS({commit}, payload) {
        const { picture } = payload
        commit('VEHICLE', payload)
        if (picture!=null) {
            commit('PICTURE', picture)
        }
        commit('FETCHING_DATA', false)
    },
    GET_VEHICLE_ERROR({commit}, payload) {
        commit('FETCHING_DATA', false)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    },
    async GET_VEHICLES({commit,dispatch}, payload) {
        commit('FETCHING_LIST',true)
        try {
            const { page } = payload
            const { data: { data: { data, pagination } } } = await getVehicles({ page })
            dispatch('GET_VEHICLES_SUCCESS', { data, pagination })
        } catch (error) {
            const { response } = error
            dispatch('GET_VEHICLES_ERROR', response)
        }
    },
    GET_VEHICLES_SUCCESS({commit}, payload) {
        const { data, pagination } = payload
        commit('VEHICLES',data)
        commit('PAGINATION',pagination)
        commit('FETCHING_LIST',false)
    },
    GET_VEHICLES_ERROR({commit}, payload) {
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
    },
    async SCAN_RFID({dispatch}, payload) {
        const { id } = payload
        try {
            const { data: { data } } = await scanRfid({id})
            dispatch('SCAN_RFID_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('SCAN_RFID_ERROR', response)
        }
    },
    SCAN_RFID_SUCCESS({commit}, payload) {
        commit('INFO', payload)
    },
    SCAN_RFID_ERROR(payload) {
        console.log(payload)
        Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
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