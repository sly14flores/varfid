<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="p-grid p-mt-2">
            <div class="p-col-12 p-md-6">
                <div class="card p-fluid">
                    <div class="p-field">
                        <label>Current password</label>
                        <InputText type="text" />
                    </div>
                    <div class="p-field">
                        <label>New password</label>
                        <InputText type="text" />
                    </div> 
                    <div class="p-field">
                        <label>Confirm password</label>
                        <InputText type="text" />
                    </div>
                    <div class="p-grid">
                        <div class="p-col-3 p-offset-9">
                            <ActionButton :show="updating" raised="true" serverity="primary" type="button" @click="update">
                                Update
                            </ActionButton>
                        </div>
                    </div>                                          
                </div>            
            </div>
        </div>
    </div>
</template>

<script>

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import InputText from 'primevue/inputtext/sfc';
import ActionButton from '../components/ActionButton'

export default {
    components: {
        MyBreadcrumb,
        InputText,
        ActionButton
    },
    setup() {

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Change Password', to: `${this.$route.fullPath}`}               
            ],
            info: {
                currentPassword: null,
                newPassword: null,
                confirmNewPassword: null,
            }
        }
    },
    computed: {
        updating() {
            return this.$store.state.password.updating
        }
    },
    methods: {
        update() {
            this.$store.dispatch('password/CHANGE_PASSWORD',this.info)
        }
    }
}
</script>

<style scoped>

</style>