<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="p-grid p-mt-2">
            <div class="p-col-12 p-md-6">
                <div class="card p-fluid">
                    <div class="p-field">
                        <label>Current password</label>
                        <InputText type="password" v-model="info.currentPassword" :class="{'p-invalid': validations.currentPassword && validations.currentPassword[0]}" />
                        <small class="p-error">{{ validations.currentPassword && validations.currentPassword[0] }}</small>
                    </div>
                    <div class="p-field">
                        <label>New password</label>
                        <InputText type="password" v-model="info.newPassword" :class="{'p-invalid': validations.newPassword && validations.newPassword[0]}" />
                        <small class="p-error">{{ validations.newPassword && validations.newPassword[0] }}</small>
                    </div> 
                    <div class="p-field">
                        <label>Confirm password</label>
                        <InputText type="password" v-model="info.confirmNewPassword" :class="{'p-invalid': validations.confirmNewPassword && validations.confirmNewPassword[0]}" />
                        <small class="p-error">{{ validations.confirmNewPassword && validations.confirmNewPassword[0] }}</small>
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
import { reactive } from 'vue'

const passwordInfo = {
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,    
}

export default {
    components: {
        MyBreadcrumb,
        InputText,
        ActionButton
    },
    setup() {

        const info = reactive({
            ...passwordInfo     
        })

        return {
            info
        }

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Change Password', to: `${this.$route.fullPath}`}               
            ]
        }
    },
    computed: {
        updating() {
            return this.$store.state.password.updating
        },
        validations() {
            return this.$store.state.password.validations
        },        
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