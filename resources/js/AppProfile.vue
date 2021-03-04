<template>
	<div class="layout-profile">
		<div>
			<img :src="profile" alt="" />
		</div>
		<div class="p-link layout-profile-link profile">
			<span class="fullname">{{ name }}</span><br><span>{{ groupName }}</span>
		</div>
	</div>
</template>

<script>

	export default {
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
		},
		computed: {
			name() {
				return `${this.$store.state.profile.firstname} ${this.$store.state.profile.lastname}`
			},
			groupName() {
				return this.$store.state.profile.groupName;
			},
			profile() {
				return (this.$store.state.profile.picture==null)?"/img/avatar.png":this.$store.state.profile.picture
			}
		}
	}
</script>

<style scoped>

.profile {
	text-align: center;
	line-height: 24px;
}

.fullname {
	letter-spacing: 2px;
}

</style>