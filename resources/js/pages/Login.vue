<template>
    <div class="wrapper p-p-0 p-m-0">
        <div class="p-grid p-jc-center p-p-0 p-mt-4 p-mr-0 p-mb-0 p-ml-0">
            <div class="p-lg-4 p-md-12 p-sm-12 p-xs-12">
                <form @submit.prevent="login">
                    <div class="card p-fluid">
                        <div class="p-grid p-jc-center">
                            <div class="p-col-6">
                                <img alt="logo" src="img/varfid-login-logo.png" class="varfid-logo">
                            </div>
                        </div>
                        <h5 class="center">Sign in to start your session</h5> <hr />
                        <div class="p-field">
                            <label for="username">Username</label>
                            <span class="p-input-icon-right">
                                <i class="pi pi-user" />
                                <InputText type="text" :class="{'p-invalid': validations.username && validations.username[0]}" v-model="user.username" />
                            </span>
                            <small class="p-error">{{ validations.username && validations.username[0] }}</small>
                        </div>
                        <div class="p-field">
                            <label for="password">Password</label>
                            <span class="p-input-icon-right">
                                <i class="pi pi-lock" />
                                <InputText type="password" :class="{'p-invalid': validations.password && validations.password[0]}" v-model="user.password" />
                            </span>
                            <small class="p-error">{{ validations.password && validations.password[0] }}</small>
                        </div>
                        <div class="p-field">
                            <small class="p-error" v-show="unauthenticated">Your username or password is incorrect</small>
                        </div>                        
                        <div class="p-grid p-jc-center">
                            <div class="p-lg-4 p-sm-12 p-xs-12">
                                <ActionButton :show="loading" raised="true" serverity="primary" type="submit">
                                    Sign In
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="footer">
            <span class="footer-text">&copy; 2021 Vehicle Authentication RFID</span>
        </div>
    </div>
</template>

<script>

import Button from 'primevue/button/sfc';
import InputText from 'primevue/inputtext/sfc';
import ActionButton from '../components/ActionButton'

export default {
    components: {
        Button,
        InputText,
        ActionButton
    },
    data() {
        return {
            user: {
                username: null,
                password: null
            }
        }
    },
    computed: {
        validations() {
            return this.$store.state.validations
        },
        unauthenticated() {
            return this.$store.state.unauthenticated === true
        },
        loading() {
            return this.$store.state.loading
        }
    },
    methods: {
        login() {
            this.$store.dispatch('LOGIN',this.user)
        }
    },      
}
</script>

<style scoped>

.varfid-logo {
    width: 200px;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.card {
    border-top: 4px solid #215266;
}

.wrapper {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  line-height: 30px;
  text-align: center;
}

.center {
    text-align: center;
}

</style>