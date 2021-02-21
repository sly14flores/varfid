<template>
	<div class="layout-profile">
		<div>
			<img src="/assets/images/profile.png" alt="" />
		</div>
		<button class="p-link layout-profile-link" @click="onClick">
			<span class="username">{{ name }}</span>
			<i class="pi pi-fw pi-cog"></i>
		</button>
        <transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li><button class="p-link" @click="logout"><i class="pi pi-fw pi-power-off"></i><span>Logout</span></button></li>
            </ul>
        </transition>
		<ConfirmDialog></ConfirmDialog>		
	</div>
</template>

<script>

	import ConfirmDialog from 'primevue/confirmdialog/sfc';

	export default {
		components: {
			ConfirmDialog
		},
		data() {
			return {
				expanded: false
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
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
			}
		},
		computed: {
			name() {
				return `${this.$store.state.profile.firstname} ${this.$store.state.profile.lastname}`
			}
		}
	}
</script>

<style scoped>

</style>