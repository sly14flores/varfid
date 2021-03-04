<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
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

    },
    mounted() {

    }    
}
</script>