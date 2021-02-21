<template>
    <div>
        <router-view />
    </div>
</template>

<script>

import { useStore } from 'vuex'

export default {
    setup() {

        const store = useStore()

        const { dispatch } = store

        // dispatch('AUTHENTICATE')

    },     
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        init() {
            // this.$store.dispatch('users/INIT')
        },
    },
    mounted() {
        // this.init()
    }    
}
</script>