import { createStore } from 'vuex'
import { state, mutations, actions, getters } from './stores/root'
import password from './stores/password.js'
import { usersStore } from './stores/users.js'

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
        users: usersStore,
    },
    state,
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin]    
})