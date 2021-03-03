<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
         <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <BlockUI :blocked="blockedPanel">
                    <form @submit="onSubmit">
                        <div class="card p-fluid">
                            <h5><i class="pi pi-user"></i> User Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-col-1 p-offset-11">
                                    <ToggleButton v-if="editMode" v-model="writeOn" onIcon="pi pi-ban" offIcon="pi pi-pencil" change="toggleWrite" />
                                </div>
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <img :src="picture" alt="" />
                                    <FileUpload v-if="profileUpload" mode="basic" name="profile" :customUpload="true" :auto="true" @uploader="updateProfile" :multiple="false" accept="image/*" />
                                </div>
                            </div>
                            <div class="p-grid p-mt-4">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="firstname">First Name</label>
                                    <InputText id="firstname" type="text" placeholder="Enter First Name" v-model="firstname" :class="{'p-invalid': firstnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ firstnameError }}</small>                       
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="middlename">Middle Name</label>
                                    <InputText id="middlename" type="text" placeholder="Enter Middle Name" v-model="middlename" :disabled="editMode && !writeOn" />
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="lastname">Last Name</label>
                                    <InputText id="lastname" type="text" placeholder="Enter Last Name" v-model="lastname" :class="{'p-invalid': lastnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ lastnameError }}</small>                        
                                </div>
                            </div>
                            <h5><i class="pi pi-lock"></i> Login Credentials</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="group">Group</label>
                                    <Dropdown v-model="group" :options="groups" optionValue="id" optionLabel="name" placeholder="Select a group" :class="{'p-invalid': groupError}" />
                                    <small class="p-error">{{ groupError }}</small>
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="username">Username</label>
                                    <InputText id="username" type="text" placeholder="Enter Username" v-model="username" :class="{'p-invalid': usernameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ usernameError }}</small>                     
                                </div>
                                <div class="p-field p-lg-4 p-md-12" v-if="!editMode">
                                    <label for="password">Password</label>
                                    <InputText id="password" type="password" placeholder="Enter Password" v-model="password" :class="{'p-invalid': passwordError}" :disabled="editMode" />
                                    <small class="p-error">{{ passwordError }}</small>                        
                                </div>
                            </div>
                        </div>
                        <div class="p-d-flex">
                            <ActionButton :show="saving" raised="false" serverity="primary" type="submit" :disabled="!writeOn && editMode">
                                &nbsp;{{(editMode)?'Update':'Save'}}
                            </ActionButton>
                            <Button type="button" :label="(editMode)?'Close':'Cancel'" class="p-button-danger p-ml-2" @click="close" />
                        </div>
                    </form>
                </BlockUI>
            </div>
        </div>
    </div>
</template>

<script>

import MyBreadcrumb from '../../../components/MyBreadcrumb.vue';
import ActionButton from '../../../components/ActionButton'
import InputText from 'primevue/inputtext/sfc';
import Dropdown from 'primevue/dropdown/sfc';
import Button from 'primevue/button/sfc';
import Divider from 'primevue/divider/sfc';
import ToggleButton from 'primevue/togglebutton/sfc';
import BlockUI from 'primevue/blockui/sfc';
import FileUpload from 'primevue/fileupload';

import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { useConfirm } from "primevue/useconfirm"

export default {
    props: ['editOn'],
    components: {
        MyBreadcrumb,
        InputText,
        Dropdown,
        Button,
        Divider,
        ToggleButton,
        ActionButton,
        BlockUI,
        FileUpload
    },    
    setup(props) {

        const { editOn } = props
        const editMode = eval(editOn)
        const route = useRoute()
        const { params } = route
        const userId = params.id || null
        const store = useStore()
        const { state, dispatch } = store
        const confirm = useConfirm()

        const init = {
            initialValues: {
                user: {...state.users.user}
            }
        }

        const { setValues, handleSubmit, resetForm } = useForm(init);

        watch(
            () => state.users.user,
            (data, prevData) => {
                setValues({
                    user: {...data}
                })
            }
        )       

        if (editMode) { // Edit
            dispatch('users/GET_USER', { id: userId })
        } else { // New
            resetForm();
        }

        const onSubmit = handleSubmit((values, actions) => {

            const { resetForm } = actions
            const { user } = values

            confirm.require({
                message: (editMode)?"Are you sure you want to add update this user's info?":'Are you sure you want to add this new user?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (editMode) {
                        dispatch('users/UPDATE_USER', user)
                    } else {
                        dispatch('users/CREATE_USER', user)
                        resetForm();
                    }
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });

        });

        function validateField(value) {
            if (!value) {
                return "This field is required";
            }
            return true;
        }

        function validatePassword(value) {
            if (!value) {
                return "Password is required";
            }

            if (value.length < 8) {
                return "Password must contain at least 8 characters";
            }

            return true;            
        }

        function validField(value) {
            return true;
        }


        // No need to define rules for fields
        const { value: id } = useField('user.id',validField);
        const { value: firstname, errorMessage: firstnameError } = useField('user.firstname',validateField);
        const { value: middlename, errorMessage: middlenameError } = useField('user.middlename',validField);
        const { value: lastname, errorMessage: lastnameError } = useField('user.lastname',validateField);
        const { value: username, errorMessage: usernameError } = useField('user.username',validateField);
        const { value: password, errorMessage: passwordError } = useField('user.password',(editMode)?validField:validatePassword);
        const { value: group, errorMessage: groupError } = useField('user.group',validateField);
        const { value: picture} = useField('user.picture',validField);

        return {
            id,
            firstname,
            middlename,
            lastname,
            username,
            password,
            group,
            firstnameError,
            middlenameError,
            lastnameError,
            usernameError,
            passwordError,
            groupError,
            onSubmit,
            editMode,
            picture,
        }
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/users'},
            items: [
                {label: (this.editMode)?'Edit User':'New User', to: `${this.$route.fullPath}`}
            ],
            profileUpload: true
        }
    },
    computed: {
        saving() {
            return this.$store.state.users.saving
        },
        writeOn: {
            set(value) {
                this.$store.dispatch('users/TOGGLE_WRITE', value)
            },
            get() {
                return this.$store.state.users.writeOn
            }
        },
        blockedPanel() {
            return this.$store.state.users.fetchingData
        },
        groups() {
            return this.$store.state.selections.groups
        }
    },
    methods: {
        close() {
            this.$store.dispatch('users/INIT')
            this.$router.push('/maintenance/users')
        },
        toggleWrite() {
            this.writeOn = !this.writeOn
        },
        getBase64(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // console.log(reader.result)
                this.picture = reader.result
                this.$nextTick(() => {
                    this.profileUpload = true;
                });                         
            };
            reader.onerror = error => {
                console.log('Error: ', error);
            };
        },
        updateProfile(event) {
            // console.log(event)
            const picture = event.files[0]
            this.getBase64(picture)
            this.profileUpload = false
        }
    },
    created() {

        this.$store.dispatch('selections/GET_GROUPS')

    }
}
</script>