<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="card p-fluid p-mt-4">
            <BlockUI :blocked="blockedPanel">
                <DataTable :value="logs" dataKey="id">
                    <template #header>
                        <div class="p-d-flex p-p-2 card">
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
                                <div class="p-field">
                                    <label for="rfid" class="p-sr-only">RFID</label>
                                    <InputText id="rfid" type="text" v-model="filters.rfid" placeholder="RFID" class="p-inputtext-sm" />                                        
                                </div>
                                <div class="p-field">
                                    <label for="name" class="p-sr-only">Name</label>
                                    <InputText id="name" type="text" v-model="filters.name" placeholder="Firstname Lastname" class="p-inputtext-sm" />                                        
                                </div>                                
                                <div class="p-field">
                                    <Button type="button" class="p-button-sm p-button-danger" label="Filter" @click="filterList" />
                                </div>
                                <div class="p-field">
                                    <Button class="p-button-sm p-button-warning" icon="pi pi-print" @click="printLogs" />
                                </div>
                            </div>                         
                        </div>
                    </template>                        
                    <Column field="no" header="No"></Column>
                    <Column field="rfid" header="RFID"></Column>
                    <Column field="plateNo" header="Plate No"></Column>
                    <Column field="type" header="Vehicle Type"></Column>
                    <Column field="brand" header="Brand"></Column>
                    <Column field="model" header="Model"></Column>
                    <Column field="owner" header="Owner's Name"></Column>
                    <Column field="dateTime" header="Date/Time"></Column>
                </DataTable>
                <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchLogs($event)"></Paginator>
            </BlockUI>
        </div>
        <form id="printLogs" action="/print/logs" method="post" target="_blank">
            <input type="hidden" name="_token" :value="csrf">
            <input type="hidden" name="filters" :value="strFilters" />
        </form>
    </div>
</template>

<script>

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import DataTable from 'primevue/datatable/sfc';
import Column from 'primevue/column/sfc';
import Paginator from 'primevue/paginator/sfc';
import InputText from 'primevue/inputtext/sfc';
import BlockUI from 'primevue/blockui/sfc';
import Dropdown from 'primevue/dropdown/sfc';
import Button from 'primevue/button/sfc';

export default {
    components: {
        MyBreadcrumb,
        InputText,
        DataTable,
        Column,
        Paginator,
        BlockUI,
        Dropdown,
        Button
    },
    setup() {

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Logs', to: `${this.$route.fullPath}`}               
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
            page: 0
        }
    },
    computed: {
        csrf() {
            return  document.querySelector('meta[name=csrf-token]').content
        },
        strFilters() {
            return JSON.stringify(this.filters)
        },
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
        logs() {

            return this.$store.state.logs.logs

            // return this.$store.state.logs.logs.filter(log => {
            
            //     return log.rfid.toLowerCase().includes(this.search.toLowerCase()) ||
            //         log.plateNo.toLowerCase().includes(this.search.toLowerCase()) ||
            //         log.type.toLowerCase().includes(this.search.toLowerCase()) ||
            //         log.brand.toLowerCase().includes(this.search.toLowerCase()) ||
            //         log.model.toLowerCase().includes(this.search.toLowerCase()) ||
            //         log.owner.toLowerCase().includes(this.search.toLowerCase())
            
            // })

        },
        pagination() {
            return this.$store.state.logs.pagination
        },
        blockedPanel() {
            return this.$store.state.logs.fetchingList
        }
    },
    methods: {
        filterList() {
            this.fetchLogs({page: this.page})
        },
        fetchLogs(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.page = page
            this.$store.dispatch('logs/GET_LOGS', { page, filters: this.filters })
        },
        printLogs() {

            const e = document.querySelector('#printLogs')
            e.submit()

        }
    },
    created() {

        this.$store.dispatch('selections/GET_VEHICLE_ALL')
        // this.$store.dispatch('selections/GET_TYPES')
        // this.$store.dispatch('selections/GET_BRANDS')
        // this.$store.dispatch('selections/GET_MODELS')

    },    
    mounted() {
        this.fetchLogs({ page: 0 })
    }     
}
</script>

<style scoped>

</style>