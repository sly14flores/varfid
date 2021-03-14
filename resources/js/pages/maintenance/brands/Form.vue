<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <BlockUI :blocked="blockedPanel">
                    <form @submit="onSubmit">
                        <div class="card p-fluid">
                            <h5><i class="pi pi-circle-off"></i> Brand Information</h5>
                            <hr />
                            <div class="p-grid">
                                <div class="p-col-1 p-offset-11">
                                    <ToggleButton v-if="editMode" v-model="writeOn" onIcon="pi pi-ban" offIcon="pi pi-pencil" change="toggleWrite" />
                                </div>
                            </div>
                            <div class="p-grid">
                                <div class="p-field p-lg-4 p-md-12">
                                    <label for="name">Name</label>
                                    <InputText id="name" type="text" placeholder="Enter Name" v-model="name" :class="{'p-invalid': nameError}" :disabled="editMode && !writeOn" />
                                    <small class="p-error">{{ nameError }}</small>                       
                                </div>
                                <div class="p-field p-lg-8 p-md-12">
                                    <label for="description">Description</label>
                                    <InputText id="description" type="text" placeholder="Enter Description" v-model="description" :disabled="editMode && !writeOn" />
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
        const brandId = params.id || null
        const store = useStore()
        const { state, dispatch } = store
        const confirm = useConfirm()

        const init = {
            initialValues: {
                brand: {...state.brands.values}
            }
        }

        const { setValues, handleSubmit, resetForm } = useForm(init);

        watch(
            () => state.brands.brand,
            (data, prevData) => {
                setValues({
                    brand: {...data}
                })
            }
        )       

        dispatch('brands/TOGGLE_WRITE',false)
        if (editMode) { // Edit
            dispatch('brands/GET_BRAND', { id: brandId })
        } else { // New
            resetForm();
        }

        const onSubmit = handleSubmit((values, actions) => {

            const { resetForm } = actions
            const { brand } = values

            confirm.require({
                message: (editMode)?"Are you sure you want to add update this brand's info?":'Are you sure you want to add this new brand?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (editMode) {
                        dispatch('brands/UPDATE_BRAND', brand)
                    } else {
                        dispatch('brands/CREATE_BRAND', brand)
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

        const { value: id } = useField('brand.id',validField);
        const { value: name, errorMessage: nameError } = useField('brand.name',validateField);        
        const { value: description } = useField('brand.description',validField);        

        return {
            onSubmit,
            editMode,
            id,
            name,
            description,
            nameError,
        }

    },  
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/maintenance'},
            items: [
                {label: 'Brands', to: '/maintenance/brands'},
                {label: (this.editMode)?'Edit Brand':'New Brand', to: `${this.$route.fullPath}`}
            ]            
        }
    },
    computed: {
        saving() {
            return this.$store.state.brands.saving
        },
        writeOn: {
            set(value) {
                this.$store.dispatch('brands/TOGGLE_WRITE', value)
            },
            get() {
                return this.$store.state.brands.writeOn
            }
        },
        blockedPanel() {
            return this.$store.state.brands.fetchingData
        },
    },
    methods: {
        close() {
            this.$store.dispatch('brands/INIT')
            this.$router.push('/maintenance/brands')
        },
        toggleWrite() {
            this.writeOn = !this.writeOn
        }
    },
}
</script>