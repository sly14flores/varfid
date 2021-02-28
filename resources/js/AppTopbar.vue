<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="layout-topbar-icons" aria-haspopup="true" aria-controls="overlay_menu">
			<Button class="p-link" type="button" label="Toggle" @click="toggle">
				<span class="layout-topbar-item-text">User</span>
				<span class="layout-topbar-icon pi pi-user"></span>
			</Button>
			<TieredMenu id="overlay_menu" ref="menu" :model="menu" :popup="true" />
		</div>
		<ConfirmDialog></ConfirmDialog>
	</div>
</template>

<script>

import InputText from 'primevue/inputtext/sfc'
import Button from 'primevue/button/sfc'
import TieredMenu from 'primevue/tieredmenu/sfc';
import ConfirmDialog from 'primevue/confirmdialog/sfc';

export default {
	components: {
		InputText,
		Button,
		TieredMenu,
		ConfirmDialog
	},
	data() {
		return {
			menu: [
				{
					label: "Logout",
					icon: "pi pi-power-off",
					command: () => {
						
						this.logout()

					}
				},
				{
					label: "Change Password",
					icon: "pi pi-key",
					command: () => {

						this.password()

					}
				}
			],
		}
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
		logout() {
			this.$confirm.require({
				message: 'Are you sure you want to logout?',
				header: 'Confirmation',
				icon: 'pi pi-exclamation-triangle',
				accept: () => {
					this.$store.dispatch('LOGOUT')
				},
				reject: () => {
					//callback to execute when user rejects the action
				}
			});
		},
		password() {
			
			this.$router.push('/change/password')

		}		
    }
}
</script>

<style scoped>

.p-tieredmenu-overlay {
	left: 65vw!important;
}

@media only screen and (max-width: 1200px) {
	.p-tieredmenu-overlay {
		left: 60vw!important;
	}
}

@media only screen and (max-width: 922px) {
	.p-tieredmenu-overlay {
		left: 75vw!important;
	}
}

@media only screen and (max-width: 768px) {

}

@media only screen and (max-width: 576px) {

}

</style>