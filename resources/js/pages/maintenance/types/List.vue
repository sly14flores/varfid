<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
            <div class="card p-fluid">
                <h5>Vehicle Types</h5>
                <hr />
                <BlockUI :blocked="blockedPanel">
                    <DataTable :value="types" dataKey="id">
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
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <router-link :to="`/maintenance/types/show/${slotProps.data.id}`"><Button icon="pi pi-fw pi-pencil" class="p-button-rounded p-button-success p-mr-2" /></router-link>                            
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteType(slotProps.data.id)" />
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchTypes($event)"></Paginator>
                </BlockUI>
            </div>
        <ConfirmDialog group="confirmDelete"></ConfirmDialog>                
    </div>
</template>

<script>

import MyBreadcrumb from '../../../components/MyBreadcrumb.vue';
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
                {label: 'Vehicle Types', to: '/maintenance/types'}
            ],
            search: ""
        }
    },
    computed: {
        types() {
            
            return this.$store.state.types.types.filter(type => {
            
                return type.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        type.description.toLowerCase().includes(this.search.toLowerCase())
            
            })

        },
        pagination() {
            return this.$store.state.types.pagination
        },
        blockedPanel() {
            return this.$store.state.types.fetchingList
        }
    },
    methods: {
        newForm() {
            this.$router.push('/maintenance/types/add')
        },
        fetchTypes(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('types/GET_TYPES', { page })
        },
        deleteType(id) {
            this.$confirm.require({
                key: 'confirmDelete',
                message: 'Are you sure you want to delete this vehicle type?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch('types/DELETE_TYPE', {id})
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        }
    },
    mounted() {
        this.fetchTypes({ page: 0 })
    }    
}

</script>