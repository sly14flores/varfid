<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="card p-fluid p-mt-4">
            <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col-12 p-md-3">
                    <label>Report Type</label>
                    <Dropdown v-model="page" :options="pages" optionValue="id" optionLabel="name" placeholder="Select Type" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label>Coverage</label>
                    <Dropdown v-model="coverage" :options="coverages" optionValue="id" optionLabel="name" placeholder="Select Type" class="p-inputtext-sm" />
                </div>                
            </div>
            <div class="p-fluid p-formgrid p-grid">            
                <div class="p-field p-col-12 p-md-6">
                    <label>Lastname</label>
                    <InputText id="city" type="text" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <label for="city">City</label>
                    <InputText id="city" type="text" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label for="state">State</label>
                    <Dropdown inputId="state" v-model="selectedState" :options="states" optionLabel="name" placeholder="Select" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label for="zip">Zip</label>
                    <InputText id="zip" type="text" />
                </div>
            </div>
            <div class="p-d-flex p-p-3">
                <Button type="Button" icon="pi pi-print" class="p-ml-auto p-button-primary"/>                    
            </div>            
        </div>
        <form id="printLogs" action="/print/logs" method="post" target="_blank">
            <input type="hidden" name="_token" :value="csrf">
            <input type="hidden" name="filters" :value="strFilters" />
        </form>
    </div>
</template>

<script>

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import Column from 'primevue/column/sfc';
import InputText from 'primevue/inputtext/sfc';
import Dropdown from 'primevue/dropdown/sfc';
import Button from 'primevue/button/sfc';
import Panel from 'primevue/panel/sfc';

export default {
    components: {
        MyBreadcrumb,
        InputText,
        Column,
        Dropdown,
        Button
    },
    setup() {

        const pages = [
            {id: 1, name: 'Vehicles'},
            {id: 2, name: 'Logs'},
        ]

        const coverages = [
            {id: 1, name: 'Daily'},
            {id: 2, name: 'Date Range'},
            {id: 3, name: 'Monthly'},
            {id: 4, name: 'Yearly'},
        ]        

        return {
            pages,
            coverages
        }

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Reports', to: `${this.$route.fullPath}`}               
            ],
            filters: {
                type: 0,
                brand: 0,
                model: 0,
                plate_no: '',
                rfid: '',
                name: ''                
            },            
            page: 1,
            coverage: 1,
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

        },
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

    },    
    mounted() {

    }     
}
</script>

<style scoped>

</style>