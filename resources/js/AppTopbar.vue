<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
	</div>
</template>

<script>

import InputText from 'primevue/inputtext/sfc'

export default {
	components: {
		InputText
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        }
    }
}
</script>