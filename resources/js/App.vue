<template>
  <BlockUI :blocked="blockedPanel">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </BlockUI>
</template>

<script>

import BlockUI from 'primevue/blockui/sfc';

export default {
  components: {
    BlockUI
  },
  computed: {
    blockedPanel() {
      // return this.$store.state.transitioning
      return false
    }
  },
}

</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>