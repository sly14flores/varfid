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
			<div style="position: absolute;">
				<TieredMenu id="overlay_menu" ref="menu" :model="menu" :popup="true" />
			</div>
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
					label: "Change Password",
					icon: "pi pi-key",
					command: () => {

						this.password()

					}
				},
				{
					label: "Logout",
					icon: "pi pi-power-off",
					command: () => {
						
						this.logout()

					}
				},				
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
	position: absolute!important;
	top: 0!important;
	left: -10vw!important;
}

@media only screen and (max-width: 1200px) {
	.p-tieredmenu-overlay {
		position: absolute!important;
		top: 0!important;
		left: -10vw!important;
	}
}

@media only screen and (max-width: 922px) {
	.p-tieredmenu-overlay {
		position: absolute!important;
		top: 0!important;
		left: -15vw!important;
	}
}

@media only screen and (max-width: 768px) {
	.p-tieredmenu-overlay {
		position: absolute!important;
		top: 0!important;
		left: -20vw!important;
	}
}

@media only screen and (max-width: 576px) {
	.p-tieredmenu-overlay {
		position: absolute!important;
		top: 0!important;
		left: -25vw!important;
	}
}

</style>