<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
            <div class="card p-fluid">
                <h5>Vehicle Models</h5>
                <hr />
                <BlockUI :blocked="blockedPanel">
                    <DataTable :value="models" dataKey="id">
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
                        <Column field="brand_name" header="Brand"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <router-link :to="`/maintenance/models/show/${slotProps.data.id}`"><Button icon="pi pi-fw pi-pencil" class="p-button-rounded p-button-success p-mr-2" /></router-link>                            
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteModel(slotProps.data.id)" />
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchModels($event)"></Paginator>
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
                {label: 'Vehicle Models', to: '/maintenance/models'}
            ],
            search: ""
        }
    },
    computed: {
        models() {
            
            return this.$store.state.models.models.filter(model => {
            
                return model.brand_name.toLowerCase().includes(this.search.toLowerCase()) ||
                        model.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        model.description.toLowerCase().includes(this.search.toLowerCase())
            
            })

        },
        pagination() {
            return this.$store.state.models.pagination
        },
        blockedPanel() {
            return this.$store.state.models.fetchingList
        }
    },
    methods: {
        newForm() {
            this.$router.push('/maintenance/models/add')
        },
        fetchModels(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('models/GET_MODELS', { page })
        },
        deleteModel(id) {
            this.$confirm.require({
                key: 'confirmDelete',
                message: 'Are you sure you want to delete this vehicle model?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch('models/DELETE_MODEL', {id})
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        }
    },
    mounted() {
        this.fetchModels({ page: 0 })
    }    
}

</script>