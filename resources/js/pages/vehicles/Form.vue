<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
         <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <BlockUI :blocked="blockedPanel">
                    <form @submit="onSubmit">
                        <div class="card p-fluid">
                            <h5><i class="pi pi-user"></i> Vehicle Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-col-1 p-offset-11">
                                    <ToggleButton v-if="editMode" v-model="writeOn" onIcon="pi pi-ban" offIcon="pi pi-pencil" change="toggleWrite" />
                                </div>
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <img :src="picture" alt="" />
                                    <FileUpload v-if="profileUpload" mode="basic" name="profile" :customUpload="true" :auto="true" @uploader="updateProfile" :multiple="false" accept="image/*" :disabled="editMode && !writeOn" />
                                </div>
                            </div>
                            <div class="p-grid p-mt-4">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="type_id,">Vehicle Type</label>
                                    <Dropdown id="type_id" v-model="type_id" :options="types" optionValue="id" optionLabel="name" placeholder="Select vehicle type" :class="{'p-invalid': typeIdError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ typeIdError }}</small>                       
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="brand_id,,">Brand</label>
                                    <Dropdown id="brand_id" v-model="brand_id" :options="brands" optionValue="id" optionLabel="name" placeholder="Select brand" :class="{'p-invalid': brandIdError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ brandIdError }}</small>                       
                                </div>                                
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="model,">Model</label>
                                    <InputText id="model," type="text" placeholder="Enter model" v-model="model" :class="{'p-invalid': modelError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ modelError }}</small>                        
                                </div>
                            </div>
                            <div class="p-grid p-mt-4">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="rfid">RFID</label>
                                    <InputText id="rfid" type="text" placeholder="Enter rfid" v-model="rfid" :class="{'p-invalid': rfidError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ rfidError }}</small>                     
                                </div>                                 
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="plate_no">Plate No</label>
                                    <InputText id="plate_no" type="text" placeholder="Enter plate no" v-model="plate_no" :class="{'p-invalid': plateNoError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ plateNoError }}</small>
                                </div>                          
                            </div>
                            <h5><i class="pi pi-lock"></i> Driver Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="firstname">First Name</label>
                                    <InputText id="firstname" type="text" placeholder="Enter First Name" v-model="firstname" :class="{'p-invalid': firstnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ firstnameError }}</small>                       
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="lastname">Last Name</label>
                                    <InputText id="lastname" type="text" placeholder="Enter Last Name" v-model="lastname" :class="{'p-invalid': lastnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ lastnameError }}</small>                        
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="sex">Sex</label>
                                    <Dropdown id="sex" v-model="sex" :options="sexs" optionValue="id" optionLabel="name" placeholder="Select sex" :class="{'p-invalid': sexError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ sexError }}</small>
                                </div>                               
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="contact_no">Contact No</label>
                                    <InputText id="contact_no" type="text" placeholder="Enter contact number" v-model="contact_no" :class="{'p-invalid': contactNoError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ lastnameError }}</small>                        
                                </div>                                
                                <div class="p-field p-lg-8 p-md-12">
                                    <label for="address">Address</label>
                                    <InputText id="address" type="text" placeholder="Enter address" v-model="address" :class="{'p-invalid': addressError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ addressError }}</small>                       
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

import MyBreadcrumb from '../../components/MyBreadcrumb.vue';
import ActionButton from '../../components/ActionButton'
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
        const vehicleId = params.id || null
        const store = useStore()
        const { state, dispatch } = store
        const confirm = useConfirm()

        const init = {
            initialValues: {
                user: {...state.vehicles.values}
            }
        }

        const { setValues, handleSubmit, resetForm } = useForm(init);

        watch(
            () => state.vehicles.vehicle,
            (data, prevData) => {
                setValues({
                    vehicle: {...data}
                })
            }
        )

        dispatch('vehicles/INIT_PICTURE')
        dispatch('vehicles/TOGGLE_WRITE',false)
        if (editMode) { // Edit
            dispatch('vehicles/GET_VEHICLE', { id: vehicleId })
        } else { // New
            resetForm();
        }

        const onSubmit = handleSubmit((values, actions) => {

            const { resetForm } = actions
            const { vehicle } = values

            confirm.require({
                message: (editMode)?"Are you sure you want to add update this vehicle's info?":'Are you sure you want to add this new vehicle?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (editMode) {
                        dispatch('vehicles/UPDATE_VEHICLE', vehicle)
                    } else {
                        dispatch('vehicles/CREATE_VEHICLE', vehicle)
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

        function validField(value) {
            return true;
        }


        // No need to define rules for fields
        const { value: id } = useField('vehicle.id',validField);
        const { value: type_id, errorMessage: typeIdError } = useField('vehicle.type_id',validateField);
        const { value: brand_id, errorMessage: brandIdError } = useField('vehicle.brand_id',validateField);
        const { value: model, errorMessage: modelError } = useField('vehicle.model',validateField);
        const { value: plate_no, errorMessage: plateNoError } = useField('vehicle.plate_no',validateField);
        const { value: rfid, errorMessage: rfidError } = useField('vehicle.rfid',validateField);
        const { value: firstname, errorMessage: firstnameError } = useField('vehicle.firstname',validateField);
        const { value: lastname, errorMessage: lastnameError } = useField('vehicle.lastname',validateField);
        const { value: sex, errorMessage: sexError } = useField('vehicle.sex',validateField);
        const { value: contact_no, errorMessage: contactNoError } = useField('vehicle.contact_no',validateField);
        const { value: address, errorMessage: addressError } = useField('vehicle.address',validateField);
        const { value: image} = useField('vehicle.image',validField);

        return {
            id,
            type_id,
            brand_id,
            model,
            plate_no,
            rfid,
            firstname,
            lastname,
            sex,
            contact_no,
            address,
            image,
            typeIdError,
            brandIdError,
            modelError,
            plateNoError,
            rfidError,
            firstnameError,
            lastnameError,
            sexError,
            contactNoError,
            addressError,
            onSubmit,
            editMode,
        }
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/vehicles'},
            items: [
                {label: (this.editMode)?'Edit Vehicle':'New Vehicle', to: `${this.$route.fullPath}`}
            ],
            profileUpload: true,
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
        sexs() {
            return this.$store.state.selections.sexs
        },
        types() {
            return this.$store.state.selections.types
        },
        brands() {
            return this.$store.state.selections.brands
        },               
        picture: {
            get() {
                return this.$store.state.vehicles.picture
            },
            set(value) {
                this.$store.dispatch('vehicles/SET_PICTURE',value)
            }
        },
        pictureReplace: {
            get() {
                return this.$store.state.vehicles.pictureReplace
            },
            set(value) {
                this.$store.dispatch('vehicles/PICTURE_REPLACE',value)
            }
        }
    },
    methods: {
        close() {
            this.$store.dispatch('vehicles/INIT')
            this.$router.push('/vehicles')
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
                    this.pictureReplace = true;
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
            this.image = picture
            console.log(this.image)
            this.profileUpload = false
        }
    },
    created() {

        this.$store.dispatch('selections/GET_TYPES')
        this.$store.dispatch('selections/GET_BRANDS')

    }
}
</script>