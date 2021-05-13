<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
            <div class="card p-fluid">
                <h5>Vehicles</h5>
                <hr />
                <BlockUI :blocked="blockedPanel">
                    <DataTable :value="vehicles" dataKey="id">
                        <template #header>
                            <form autocomplete="off">
                                <div class="p-d-flex p-p-2">
                                    <Button icon="pi pi-plus" class="p-button-info" @click="newForm" />
                                </div>
                                <div class="p-d-flex p-mt-2 p-p-2 card">
                                    <div class="p-formgroup-inline">
                                        <div class="p-field">
                                            <label for="type" class="p-sr-only">Type</label>
                                            <Dropdown id="type" v-model="filters.type" :options="types" optionValue="id" optionLabel="name" placeholder="Select Type" class="p-inputtext-sm" />
                                        </div>
                                        <div class="p-field">
                                            <label for="brand" class="p-sr-only">Brand</label>
                                            <Dropdown id="brand" v-model="filters.brand" :options="brands" optionValue="id" optionLabel="name" placeholder="Select Brand" class="p-inputtext-sm" />
                                        </div>
                                        <div class="p-field">
                                            <label for="model" class="p-sr-only">Model</label>
                                            <Dropdown id="model" v-model="filters.model" :options="models" optionValue="id" optionLabel="name" placeholder="Select model" class="p-inputtext-sm" />
                                        </div>
                                        <div class="p-field">
                                            <label for="plate_no" class="p-sr-only">Plate No</label>
                                            <InputText id="plate_no" type="text" v-model="filters.plate_no" placeholder="Plate No" class="p-inputtext-sm" />                                        
                                        </div>
                                        <!-- <div class="p-field">
                                            <label for="rfid" class="p-sr-only">RFID</label>
                                            <InputText id="rfid" type="text" v-model="filters.rfid" placeholder="RFID" class="p-inputtext-sm" />                                        
                                        </div> -->
                                        <div class="p-field">
                                            <label for="name" class="p-sr-only">Name</label>
                                            <InputText id="name" type="text" v-model="filters.name" placeholder="Firstname Lastname" class="p-inputtext-sm" />                                        
                                        </div>                                                                       
                                        <div class="p-field">
                                            <Button type="button" class="p-button-sm p-button-danger" label="Filter" @click="filterList" />
                                        </div>
                                    </div>                        
                                </div>
                            </form>
                        </template>
                        <Column field="date_created" header="Date Registered"></Column>                                          
                        <Column field="plate_no" header="Plate No"></Column>                        
                        <Column field="type_name" header="Type"></Column>
                        <Column field="brand_name" header="Brand"></Column>
                        <Column field="model" header="Model"></Column>
                        <!-- <Column field="rfid" header="RFID"></Column> -->
                        <Column field="firstname" header="First Name"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <router-link :to="`/vehicles/show/${slotProps.data.id}`"><Button icon="pi pi-fw pi-pencil" class="p-button-rounded p-button-success p-mr-2" /></router-link>                            
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteVehicle(slotProps.data.id)" />
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchVehicles($event)"></Paginator>
                </BlockUI>
            </div>
        <ConfirmDialog group="confirmDelete"></ConfirmDialog>                
    </div>
</template>

<script>

import MyBreadcrumb from '../../components/MyBreadcrumb.vue';
import DataTable from 'primevue/datatable/sfc';
import Column from 'primevue/column/sfc';
import Button from 'primevue/button/sfc';
import ConfirmDialog from 'primevue/confirmdialog/sfc';
import Paginator from 'primevue/paginator/sfc';
import InputText from 'primevue/inputtext/sfc';
import BlockUI from 'primevue/blockui/sfc';
import Dropdown from 'primevue/dropdown/sfc';

export default {
    setup() {

    },
    components: {
        MyBreadcrumb,
        DataTable,
        Paginator,
        Column,
        Button,
        ConfirmDialog,
        InputText,
        BlockUI,
        Dropdown
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Vehicles', to: '/vehicles'}
            ],
            filters: {
                type: 0,
                brand: 0,
                model: 0,
                plate_no: '',
                rfid: '',
                name: ''
            },
            // search: "",
            page: 0,
        }
    },
    computed: {
        types() {
            const types = [
                {id: 0, name: 'All Types'},
                ...this.$store.state.selections.types
            ]
            return types
        },
        brands() {
            const brands = [
                {id: 0, name: 'All Brands'},
                ...this.$store.state.selections.brands
            ]
            return brands
        },
        models() {
            const models = [
                {id: 0, name: 'All Models'},
                ...this.$store.state.selections.models
            ]
            return models
        },        
        vehicles() {

            return this.$store.state.vehicles.vehicles
            
            // return this.$store.state.vehicles.vehicles.filter(vehicle => {
            
            //     return vehicle.type_name.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.brand_name.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.model.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.plate_no.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.rfid.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.lastname.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.sex.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.contact_no.toLowerCase().includes(this.search.toLowerCase()) ||
            //             vehicle.address.toLowerCase().includes(this.search.toLowerCase())
            
            // })

        },
        pagination() {
            return this.$store.state.vehicles.pagination
        },
        blockedPanel() {
            return this.$store.state.vehicles.fetchingList
        }
    },
    methods: {
        newForm() {
            this.$router.push('/vehicles/add')
        },
        filterList() {
            this.fetchVehicles({page: this.page})
        },
        fetchVehicles(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.page = page
            this.$store.dispatch('vehicles/GET_VEHICLES', { page, filters: this.filters })
        },
        deleteVehicle(id) {
            this.$confirm.require({
                key: 'confirmDelete',
                message: 'Are you sure you want to delete this vehicle?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch('vehicles/DELETE_VEHICLE', {id})
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        }
    },
    created() {

        this.$store.dispatch('selections/GET_VEHICLE_ALL')
        // this.$store.dispatch('selections/GET_TYPES')
        // this.$store.dispatch('selections/GET_BRANDS')
        // this.$store.dispatch('selections/GET_MODELS')

    },
    mounted() {
        this.fetchVehicles({ page: 0 })
    }    
}

</script>