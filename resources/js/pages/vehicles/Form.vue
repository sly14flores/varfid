<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
         <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <BlockUI :blocked="blockedPanel">
                    <form @submit="onSubmit" autocomplete="off">
                        <div class="card p-fluid">
                            <h5><i class="pi pi-user"></i> Vehicle</h5>
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
                            <h5><i class="fa fa-car" aria-hidden="true"></i> Vehicle Information</h5>
                            <hr />                                               
                            <div class="p-formgroup-inline p-mt-4">
                                <div class="p-field">
                                    <label for="rfid" class="p-sr-only">RFID</label>
                                    <InputText id="rfid" type="text" placeholder="Enter rfid" v-model="rfid" :class="{'p-inputtext-sm': true, 'p-invalid': rfidError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ rfidError }}</small>                     
                                </div>
                                <div class="p-field">
                                    <label for="type_id" class="p-sr-only">Vehicle Type</label>
                                    <Dropdown id="type_id" v-model="type_id" :options="types" optionValue="id" optionLabel="name" placeholder="Select vehicle type" :class="{'p-inputtext-sm': true, 'p-invalid': typeIdError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ typeIdError }}</small>                       
                                </div>
                                <div class="p-field">
                                    <label for="brand_id" class="p-sr-only">Brand</label>
                                    <Dropdown id="brand_id" v-model="brand_id" :options="brands" optionValue="id" optionLabel="name" placeholder="Select brand" :class="{'p-inputtext-sm': true, 'p-invalid': brandIdError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ brandIdError }}</small>                       
                                </div>                                
                                <div class="p-field">
                                    <label for="model" class="p-sr-only">Model</label>
                                    <Dropdown id="model" v-model="model" :options="models" optionValue="id" optionLabel="name" placeholder="Select model" :class="{'p-inputtext-sm': true, 'p-invalid': modelError}" :disabled="editMode && !writeOn" />                                    
                                    <small class="p-error">{{ modelError }}</small>                        
                                </div>
                                <div class="p-field">
                                    <label for="plate_no" class="p-sr-only">Plate No</label>
                                    <InputText id="plate_no" type="text" placeholder="Enter plate no" v-model="plate_no" :class="{'p-inputtext-sm':true, 'p-invalid': plateNoError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ plateNoError }}</small>
                                </div>                                 
                            </div>
                            <h5><i class="fa fa-user-circle" aria-hidden="true"></i> Driver Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="firstname" class="p-sr-only">First Name</label>
                                    <InputText id="firstname" type="text" placeholder="Enter First Name" v-model="firstname" :class="{'p-inputtext-sm': true, 'p-invalid': firstnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ firstnameError }}</small>                       
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="lastname" class="p-sr-only">Last Name</label>
                                    <InputText id="lastname" type="text" placeholder="Enter Last Name" v-model="lastname" :class="{'p-inputtext-sm': true, 'p-invalid': lastnameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ lastnameError }}</small>                        
                                </div>
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="sex" class="p-sr-only">Sex</label>
                                    <Dropdown id="sex" v-model="sex" :options="sexs" optionValue="id" optionLabel="name" placeholder="Select sex" :class="{'p-inputtext-sm': true, 'p-invalid': sexError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ sexError }}</small>
                                </div>                               
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="contact_no" class="p-sr-only">Contact No</label>
                                    <InputText id="contact_no" type="text" placeholder="Enter contact number" v-model="contact_no" :class="{'p-inputtext-sm': true, 'p-invalid': contactNoError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ lastnameError }}</small>                        
                                </div>                                
                                <div class="p-field p-lg-8 p-md-12">
                                    <label for="address" class="p-sr-only">Address</label>
                                    <InputText id="address" type="text" placeholder="Enter address" v-model="address" :class="{'p-inputtext-sm': true, 'p-invalid': addressError}" :disabled="editMode && !writeOn" />
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

import { apiUrl } from '../../url.js'

const CHECK_RFID = `${apiUrl}/api/check/rfid`
function checkRfid(payload) {
    return axios.post(CHECK_RFID, {...payload})
}

const CHECK_PLATE_NO = `${apiUrl}/api/check/plateno`
function checkPlateNo(payload) {
    return axios.post(CHECK_PLATE_NO, {...payload})
}

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

        async function validateRfid(value) {
            if (!value) {
                return "This field is required";
            }
            const { data } = await checkRfid({id: vehicleId, rfid:value})
            const { data: { available } } = data
            if (!available) {
                return 'Rfid already exists'
            }            
            return true;
        }
        
        async function validatePlateNo(value) {
            if (!value) {
                return "This field is required";
            }
            const { data } = await checkPlateNo({id: vehicleId, plate_no:value})
            const { data: { available } } = data
            if (!available) {
                return 'Plate no already exists'
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
        const { value: plate_no, errorMessage: plateNoError } = useField('vehicle.plate_no',validatePlateNo);
        const { value: rfid, errorMessage: rfidError } = useField('vehicle.rfid',validateRfid);
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
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Vehicles', to: '/vehicles'},
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
            return this.$store.state.selections.brands.filter(brand => {
                return brand.vehicle_type_id == this.type_id
            })
        },
        models() {
            return this.$store.state.selections.models.filter(model => {
                return model.brand_id == this.brand_id
            })
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
        this.$store.dispatch('selections/GET_MODELS')

    }
}
</script>