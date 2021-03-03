<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
            <div class="card p-fluid">
                <h5>Brands</h5>
                <hr />
                <BlockUI :blocked="blockedPanel">
                    <DataTable :value="brands" dataKey="id">
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
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <router-link :to="`/maintenance/brands/show/${slotProps.data.id}`"><Button icon="pi pi-fw pi-pencil" class="p-button-rounded p-button-success p-mr-2" /></router-link>                            
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteBrand(slotProps.data.id)" />
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchBrands($event)"></Paginator>
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
            home: {icon: 'pi pi-home', to: '/maintenance'},
            items: [
                {label: 'Brands', to: '/maintenance/brands'}
            ],
            search: ""
        }
    },
    computed: {
        brands() {
            
            return this.$store.state.brands.brands.filter(brand => {
            
                return brand.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        brand.description.toLowerCase().includes(this.search.toLowerCase())
            
            })

        },
        pagination() {
            return this.$store.state.brands.pagination
        },
        blockedPanel() {
            return this.$store.state.brands.fetchingList
        }
    },
    methods: {
        fetchBrands(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('brands/GET_BRANDS', { page })
        },
        deleteBrand(id) {
            this.$confirm.require({
                key: 'confirmDelete',
                message: 'Are you sure you want to delete this brand?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch('brands/DELETE_BRAND', {id})
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        }
    },
    mounted() {
        this.fetchBrands({ page: 0 })
    }    
}

</script>