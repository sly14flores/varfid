<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <BlockUI :blocked="blockedPanel">
                    <form @submit="onSubmit" autocomplete="off">
                        <div class="card p-fluid">
                            <h5><i class="pi pi-circle-off"></i> Vehicle Model Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-col-1 p-offset-11">
                                    <ToggleButton v-if="editMode" v-model="writeOn" onIcon="pi pi-ban" offIcon="pi pi-pencil" change="toggleWrite" />
                                </div>
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-3 p-md-12">
                                    <label for="vehicle_type_id">Vehicle Type</label>
                                    <Dropdown id="vehicle_type_id" v-model="vehicle_type_id" :options="types" optionValue="id" optionLabel="name" placeholder="Select vehicle type" :class="{'p-invalid': vehicle_type_idError}" :disabled="editMode && !writeOn" />                                    
                                    <small class="p-error">{{ vehicle_type_idError }}</small>                                    
                                </div>
                                <div class="p-field p-lg-3 p-md-12">
                                    <label for="brand_id">Brand</label>
                                    <Dropdown id="brand_id" v-model="brand_id" :options="brands" optionValue="id" optionLabel="name" placeholder="Select brand" :class="{'p-invalid': brand_idError}" :disabled="editMode && !writeOn" />                                    
                                    <small class="p-error">{{ brand_idError }}</small>                                    
                                </div>
                                <div class="p-field p-lg-3 p-md-12">
                                    <label for="name">Name</label>
                                    <InputText id="name" model="text" placeholder="Enter Name" v-model="name" :class="{'p-invalid': nameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ nameError }}</small>                       
                                </div>
                                <div class="p-field p-lg-3 p-md-12">
                                    <label for="description">Description</label>
                                    <InputText id="description" model="text" placeholder="Enter Description" v-model="description" :disabled="editMode && !writeOn" />
                                </div>                                                  
                            </div>                                                            
                        </div>
                        <div class="p-d-flex">
                            <ActionButton :show="saving" raised="false" serverity="primary" model="submit" :disabled="!writeOn && editMode">
                                &nbsp;{{(editMode)?'Update':'Save'}}
                            </ActionButton>
                            <Button model="button" :label="(editMode)?'Close':'Cancel'" class="p-button-danger p-ml-2" @click="close" />
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

import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useConfirm } from "primevue/useconfirm"

export default {
    props: ['editOn'],
    components: {
        MyBreadcrumb,
        ActionButton,        
        InputText,
        Dropdown,
        Button,
        Divider,
        ToggleButton,
        BlockUI
    },        
    setup(props) {
        
        const { editOn } = props
        const editMode = eval(editOn)
        const route = useRoute()
        const { params } = route
        const modelId = params.id || null
        const store = useStore()
        const { state, dispatch } = store
        const confirm = useConfirm()

        const init = {
            initialValues: {
                model: {...state.models.values}
            }
        }

        const { setValues, handleSubmit, resetForm } = useForm(init);

        watch(
            () => state.models.model,
            (data, prevData) => {
                setValues({
                    model: {...data}
                })
            }
        )       

        dispatch('models/TOGGLE_WRITE',false)
        if (editMode) { // Edit
            dispatch('models/GET_MODEL', { id: modelId })
        } else { // New
            resetForm();
        }

        const onSubmit = handleSubmit((values, actions) => {

            const { resetForm } = actions
            const { model } = values

            confirm.require({
                message: (editMode)?"Are you sure you want to add update this model's info?":'Are you sure you want to add this new model?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (editMode) {
                        dispatch('models/UPDATE_MODEL', model)
                    } else {
                        dispatch('models/CREATE_MODEL', model)
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

        const { value: id } = useField('model.id',validField);
        const { value: vehicle_type_id, errorMessage: vehicle_type_idError } = useField('model.vehicle_type_id',validateField);        
        const { value: brand_id, errorMessage: brand_idError } = useField('model.brand_id',validateField);        
        const { value: name, errorMessage: nameError } = useField('model.name',validateField);        
        const { value: description } = useField('model.description',validField);        

        return {
            onSubmit,
            editMode,
            id,
            vehicle_type_id,
            brand_id,
            name,
            description,
            vehicle_type_idError,
            brand_idError,
            nameError,
        }

    },  
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/maintenance'},
            items: [
                {label: 'Vehicle Models', to: '/maintenance/models'},
                {label: (this.editMode)?'Edit Model':'New Model', to: `${this.$route.fullPath}`}
            ]            
        }
    },
    computed: {
        saving() {
            return this.$store.state.models.saving
        },
        writeOn: {
            set(value) {
                this.$store.dispatch('models/TOGGLE_WRITE', value)
            },
            get() {
                return this.$store.state.models.writeOn
            }
        },
        blockedPanel() {
            return this.$store.state.models.fetchingData
        },
        types() {
            return this.$store.state.selections.types
        },
        brands() {
            return this.$store.state.selections.brands.filter(brand => {
                return brand.vehicle_type_id == this.vehicle_type_id
            })
        }                
    },
    methods: {
        close() {
            this.$store.dispatch('models/INIT')
            this.$router.push('/maintenance/models')
        },
        toggleWrite() {
            this.writeOn = !this.writeOn
        },
        fetchTypes() {
            this.$store.dispatch('selections/GET_TYPES')
        },        
        fetchBrands() {
            this.$store.dispatch('selections/GET_BRANDS')
        }
    },
    created() {
        this.fetchTypes()
        this.fetchBrands()
    }
}
</script>