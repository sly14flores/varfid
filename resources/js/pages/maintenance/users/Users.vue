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

        const { state } = store

        const group = state.profile.group
        const isAdmin = group == 1

        return {
          isAdmin
        }

    },     
    components: {

    },
    data() {
        return {

        }
    },  
}
</script>