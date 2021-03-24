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
                    <Dropdown v-model="filters.coverage" :options="coverages" optionValue="id" optionLabel="name" placeholder="Select Type" class="p-inputtext-sm" @change="coverageChange" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="filters.coverage==1 || filters.coverage==2">
                    <label>{{(filters.coverage==2)?'Start Date':'Date'}}</label>
                    <InputText type="date" v-model="filters.startDate" class="p-inputtext-sm" @change="startDateChange" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="filters.coverage==2">
                    <label>End Date</label>
                    <InputText type="date" v-model="filters.endDate" class="p-inputtext-sm" />
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="filters.coverage==3">
                    <label>Month</label>
                    <Dropdown v-model="filters.month" :options="months" optionValue="id" optionLabel="name" placeholder="Select Month" :class="{'p-inputtext-sm': true, 'p-invalid': validations.month}" @change="monthSelected" />
                    <small class="p-error">{{(validations.month)?'Please select month':null}}</small>
                </div>
                <div class="p-field p-col-12 p-md-3" v-if="filters.coverage==3 || filters.coverage==4">
                    <label>Year</label>
                    <InputText type="text" v-model="filters.year" :class="{'p-inputtext-sm': true, 'p-invalid': validations.year}" />
                    <small class="p-error">{{(validations.year)?'Please enter year':null}}</small>
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
            {id: 0, name: "January"},
            {id: 1, name: "February"},
            {id: 2, name: "March"},
            {id: 3, name: "April"},
            {id: 4, name: "May"},
            {id: 5, name: "June"},
            {id: 6, name: "July"},
            {id: 7, name: "August"},
            {id: 8, name: "September"},
            {id: 9, name: "October"},
            {id: 10, name: "November"},
            {id: 11, name: "December"},
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
            filters: {
                coverage: 1,
                type: 0,
                brand: 0,
                model: 0,
                plate_no: '',
                rfid: '',
                name: '',
                startDate: null,
                endDate: null,
                month: null,
                year: null        
            },
            validations: {
                month: false,
                year: false
            }       
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
        coverageChange() {
            if (this.filters.coverage==1 || this.filters.coverage==2) {
                const startDate = new Date()
                const endDate = new Date()
                const strStartDate = startDate.toISOString()
                const splitSDate = strStartDate.split('T')
                const endStartDate = endDate.toISOString()
                const splitEDate = endStartDate.split('T')            
                this.filters.startDate = splitSDate[0]
                this.filters.endDate = splitEDate[0]
            }
            if (this.filters.coverage==3) {
                const sDate = new Date()
                sDate.setMonth(this.filters.month)
                sDate.setYear(this.filters.year)
                sDate.setDate(1)

                const eDate = new Date(sDate.getFullYear(), this.filters.month + 1, 0)
                this.filters.startDate = this.formatDate(sDate.toISOString())
                this.filters.endDate = this.formatDate(eDate.toISOString())           
            }
        },
        monthSelected() {

            const sDate = new Date()
            sDate.setMonth(this.filters.month)
            sDate.setYear(this.filters.year)
            sDate.setDate(1)

            const eDate = new Date(sDate.getFullYear(), this.filters.month + 1, 0)
            this.filters.startDate = this.formatDate(sDate.toISOString())
            this.filters.endDate = this.formatDate(eDate.toISOString())

        },
        startDateChange() {
            if (this.filters.coverage==1) {
                this.filters.endDate = this.filters.startDate
            }
        },
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

            /**
             * Validations
             */
            this.validations.month = false            
            this.validations.year = false
            if (this.filters.coverage==3) {
                if (this.filters.month==null) {
                    this.validations.month = true
                }
                if (this.filters.year==null || this.filters.year=='') {
                    this.validations.year = true
                }
                if (this.validations.month || this.validations.year) return
                this.monthSelected()
            }

            if (this.filters.coverage==4) {
                if (this.filters.year==null || this.filters.year=='') {
                    this.validations.year = true
                    return
                }
            }

            this.$nextTick(() => {
                const reportType = (this.page == 1)?'#printVehicles':'#printLogs'

                const e = document.querySelector(reportType)
                e.submit()
            })

        }
    },
    watch: {
        filters: {
            handler(val, oldVal) {
                if (val.year != null || val.year != '') {
                    this.validations.year = false
                } else {
                    this.validations.year = true
                }
                if (val.month != null) {
                    this.validations.month = false
                } else {
                    this.validations.month = true
                }
                if (val.coverage==4) {
                    if (this.filters.year!=null && (this.filters.year.length<4) && (typeof this.filters.year !== 'number')) return
                    const sDate = new Date()
                    sDate.setMonth(0)
                    sDate.setYear(this.filters.year)
                    sDate.setDate(1)
                    const eDate = new Date()
                    eDate.setMonth(11)
                    eDate.setYear(this.filters.year)
                    eDate.setDate(31)
                    this.filters.startDate = this.formatDate(sDate.toISOString())
                    this.filters.endDate = this.formatDate(eDate.toISOString())                    
                }
            },
            deep: true
        },
    },
    created() {

        this.$store.dispatch('selections/GET_VEHICLE_ALL')

    },    
    mounted() {

        this.$nextTick(() => {

            const startDate = new Date()
            const endDate = new Date()
            const strStartDate = startDate.toISOString()
            const splitSDate = strStartDate.split('T')
            const endStartDate = endDate.toISOString()
            const splitEDate = endStartDate.split('T')            
            this.filters.startDate = splitSDate[0]
            this.filters.endDate = splitEDate[0]

        })

    }     
}
</script>

<style scoped>

</style>