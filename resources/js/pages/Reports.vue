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
                <div class="p-field p-col-12 p-md-3" v-if="coverage==1 || coverage==2">
                    <label>{{(coverage==2)?'Start Date':'Date'}}</label>
                    <InputText type="date" v-model="filters.startDate" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="coverage==2">
                    <label>End Date</label>
                    <InputText type="date" v-model="filters.endDate" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="coverage==3">
                    <label>Month</label>
                    <Dropdown v-model="filters.month" :options="months" optionValue="id" optionLabel="name" placeholder="Select Month" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="coverage==3 || coverage==4">
                    <label>Year</label>
                    <InputText type="text" v-model="filters.year" class="p-inputtext-sm" />
                </div>                                                                 
            </div>
            <div class="p-fluid p-formgrid p-grid">            
                <div class="p-field p-col-12 p-md-3">
                    <label>Type</label>
                    <Dropdown v-model="filters.type" :options="types" optionValue="id" optionLabel="name" placeholder="Select Type" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label>Brand</label>
                    <Dropdown v-model="filters.brand" :options="brands" optionValue="id" optionLabel="name" placeholder="Select Brand" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label>Model</label>
                    <Dropdown v-model="filters.model" :options="models" optionValue="id" optionLabel="name" placeholder="Select model" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label>Plate No</label>
                    <InputText type="text" v-model="filters.plate_no" placeholder="Plate No" class="p-inputtext-sm" />                                        
                </div>                
            </div>
            <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col-12 p-md-3">
                    <label>RFID</label>
                    <InputText type="text" v-model="filters.rfid" placeholder="RFID" class="p-inputtext-sm" />                                        
                </div>
                <div class="p-field p-col-12 p-md-3">
                    <label>Name</label>
                    <InputText type="text" v-model="filters.name" placeholder="Firstname Lastname" class="p-inputtext-sm" />                                        
                </div>                 
            </div>
            <div class="p-d-flex p-p-3">
                <Button type="Button" icon="pi pi-print" class="p-ml-auto p-button-primary" @click="print" />                    
            </div>            
        </div>
        <form id="printVehicles" action="/print/report/vehicles" method="post" target="_blank">
            <input type="hidden" name="_token" :value="csrf">
            <input type="hidden" name="filters" :value="strFilters" />
        </form>
        <form id="printLogs" action="/print/report/logs" method="post" target="_blank">
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

        const months = [
            {id: "01", name: "January"},
            {id: "02", name: "February"},
            {id: "03", name: "March"},
            {id: "04", name: "April"},
            {id: "05", name: "May"},
            {id: "06", name: "June"},
            {id: "07", name: "July"},
            {id: "08", name: "August"},
            {id: "09", name: "September"},
            {id: "10", name: "October"},
            {id: "11", name: "November"},
            {id: "12", name: "December"},
        ]

        return {
            pages,
            coverages,
            months
        }

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Reports', to: `${this.$route.fullPath}`}               
            ],         
            page: 1,
            coverage: 1,
        }
    },
    computed: {
        filters() {

            const sDate = new Date()
            const eDate = new Date()

            let startDate = this.formatDate(sDate.toGMTString())
            let endDate = this.formatDate(eDate.toGMTString())
            if (this.coverage==3) {
                sDate.setDate(1)
                eDate.setDate(31)
                startDate = this.formatDate(sDate.toGMTString())
                endDate = this.formatDate(eDate.toGMTString())                
            }

            return {
                type: 0,
                brand: 0,
                model: 0,
                plate_no: '',
                rfid: '',
                name: '',
                startDate,
                endDate,
                month: "00",
                year: null
            }                            
        },        
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
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        },    
        print() {

            const reportType = (this.page == 1)?'#printVehicles':'#printLogs'

            const e = document.querySelector(reportType)
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