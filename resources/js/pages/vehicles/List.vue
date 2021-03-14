<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
            <div class="card p-fluid">
                <h5>Vehicles</h5>
                <hr />
                <BlockUI :blocked="blockedPanel">
                    <DataTable :value="vehicles" dataKey="id">
                        <template #header>
                            <div class="p-d-flex p-p-2">
                                <Button icon="pi pi-plus" class="p-button-info" @click="newForm" />
                            </div>
                            <div class="p-d-flex p-mt-2 p-p-2 card">

                                <div class='p-ml-auto'>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search" />
                                        <InputText v-model="search" placeholder="Search" />
                                    </span>
                                </div>                         
                            </div>
                        </template>                        
                        <Column field="type_name" header="Type"></Column>
                        <Column field="brand_name" header="Brand"></Column>
                        <Column field="model" header="Model"></Column>
                        <Column field="plate_no" header="Plate No"></Column>
                        <Column field="rfid" header="RFID"></Column>
                        <Column field="firstname" header="First Name"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="date_created" header="Date Registered"></Column>
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
        BlockUI        
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Vehicles', to: '/vehicles'}
            ],
            search: ""
        }
    },
    computed: {
        types() {
            return this.$store.state.selections.types
        },
        brands() {
            return this.$store.state.selections.brands
        },
        models() {
            return this.$store.state.selections.models
        },        
        vehicles() {
            
            return this.$store.state.vehicles.vehicles.filter(vehicle => {
            
                return vehicle.type_name.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.brand_name.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.model.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.plate_no.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.rfid.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.lastname.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.sex.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.contact_no.toLowerCase().includes(this.search.toLowerCase()) ||
                        vehicle.address.toLowerCase().includes(this.search.toLowerCase())
            
            })

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
        fetchVehicles(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('vehicles/GET_VEHICLES', { page })
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

        this.$store.dispatch('selections/GET_TYPES')
        this.$store.dispatch('selections/GET_BRANDS')
        this.$store.dispatch('selections/GET_MODELS')

    },
    mounted() {
        this.fetchVehicles({ page: 0 })
    }    
}

</script>