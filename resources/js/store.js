import { createStore } from 'vuex'
import { state, mutations, actions, getters } from './stores/root'
import password from './stores/password.js'
import selections from './stores/selections.js'
import users from './stores/users.js'
import brands from './stores/brands.js'
import types from './stores/vehicletypes.js'

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'varfid',
    reducer: (state) => ({
        profile: state.profile
    })
})

export default createStore({
    modules: {
        password,
        selections,
        users,
        brands,
        types
    },
    state,
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin]    
})