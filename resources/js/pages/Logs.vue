<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="card p-fluid p-mt-4">
            <BlockUI :blocked="blockedPanel">
                <DataTable :value="logs" dataKey="id">
                    <template #header>
                        <div class="p-d-flex p-p-2 card">
                            <div class='p-ml-auto'>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="search" placeholder="Search" />
                                </span>
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
    </div>
</template>

<script>

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import DataTable from 'primevue/datatable/sfc';
import Column from 'primevue/column/sfc';
import Paginator from 'primevue/paginator/sfc';
import InputText from 'primevue/inputtext/sfc';
import BlockUI from 'primevue/blockui/sfc';

export default {
    components: {
        MyBreadcrumb,
        InputText,
        DataTable,
        Column,
        Paginator,
        BlockUI
    },
    setup() {

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Logs', to: `${this.$route.fullPath}`}               
            ],
            search: ''
        }
    },
    computed: {
        logs() {

            return this.$store.state.logs.logs.filter(log => {
            
                return log.rfid.toLowerCase().includes(this.search.toLowerCase()) ||
                    log.plateNo.toLowerCase().includes(this.search.toLowerCase()) ||
                    log.type.toLowerCase().includes(this.search.toLowerCase()) ||
                    log.brand.toLowerCase().includes(this.search.toLowerCase()) ||
                    log.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    log.owner.toLowerCase().includes(this.search.toLowerCase())
            
            })

        },
        pagination() {
            return this.$store.state.logs.pagination
        },
        blockedPanel() {
            return this.$store.state.logs.fetchingList
        }
    },
    methods: {
        fetchLogs(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('logs/GET_LOGS', { page })
        },
    },
    mounted() {
        this.fetchLogs({ page: 0 })
    }     
}
</script>

<style scoped>

</style>