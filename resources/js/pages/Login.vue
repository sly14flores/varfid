<template>
    <div>
        <div class="navbar">
            <a href=""><img alt="logo" src="img/launion-logo.png" class="lu-logo" /></a>
            <h5 class="p-mt-3 p-label-white">La Union CoViD-19 Vaccination</h5>
        </div>
        <div class="p-grid p-jc-center p-mt-4">
            <div class="p-lg-4 p-md-12 p-sm-12 p-xs-12">
                <form @submit.prevent="login">
                    <div class="card p-fluid">
                        <div class="p-grid p-jc-center">
                            <div class="p-lg-5 p-sm-5 p-xs-5">
                                <img alt="logo" src="img/Rugian.png" class="rugian">
                            </div>
                        </div>
                        <h5 class="p-mt-2"><center>Sign in to start your session</center></h5> <hr />
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
                            <small class="p-error" v-show="unauthenticated">Your email or password is incorrect</small>
                        </div>                        
                        <div class="p-grid p-jc-center">
                            <div class="p-lg-4 p-sm-12 p-xs-12">
                                <Button label="Sign In" class="p-button-raised p-button-primary" type="submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Button from 'primevue/button/sfc';
import InputText from 'primevue/inputtext/sfc';

export default {
    components: {
        Button,
        InputText
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
.navbar {
        overflow: hidden;
        background-color: #215266;
        position: relative;
        top: 0;
        height: 55px;
        width: 100%;
    }
    .navbar a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 1px 4px;
        text-decoration: none;
        font-size: 19px;
    }
    .lu-logo {
        height: 50px;
    }
    .p-label-white {
        color: white;
    }
    .rugian {
        width: 200px;
    }
    .card {
        border-top: 4px solid #215266;
    }
</style>