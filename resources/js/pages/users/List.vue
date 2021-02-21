<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />        
        <div class="p-grid">
            <div class="p-col-12 p-mt-2">
                <div class="card p-fluid">
                    <h5>List</h5>
                    <hr />
                    <DataTable :value="users" dataKey="id">
                        <Column field="firstname" header="First Name"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <router-link :to="`/users/user/${slotProps.data.id}`"><Button icon="pi pi-fw pi-pencil" class="p-button-rounded p-button-success p-mr-2" /></router-link>                            
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteUser(slotProps.data.id)" />
                            </template>
                        </Column>
                    </DataTable>
                    <Paginator :rows="pagination.per_page" :totalRecords="pagination.total" @page="fetchUsers($event)"></Paginator>
                </div>
            </div>
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

export default {
    setup() {

    },
    components: {
        MyBreadcrumb,
        DataTable,
        Paginator,
        Column,
        Button,
        ConfirmDialog
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/users'},
            items: []
        }
    },
    computed: {
        users() {
            return this.$store.state.users.users
        },
        pagination() {
            return this.$store.state.users.pagination
        }
    },
    methods: {
        fetchUsers(event) {
            // event.page: New page number
            // event.first: Index of first record
            // event.rows: Number of rows to display in new page
            // event.pageCount: Total number of pages
            const { page } = event
            this.$store.dispatch('users/GET_USERS', { page })
        },
        deleteUser(id) {
            this.$confirm.require({
                key: 'confirmDelete',
                message: 'Are you sure you want to delete this user?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch('users/DELETE_USER', {id})
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });
        }
    },
    mounted() {
        this.fetchUsers({ page: 0 })
    }
}
</script>