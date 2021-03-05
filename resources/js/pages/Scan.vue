<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="p-grid p-mt-2">
            <div class="p-col-12">
                <div class="card p-fluid">
                                          
                </div>            
            </div>
        </div>
    </div>
</template>

<script>

import MyBreadcrumb from '../components/MyBreadcrumb.vue';

export default {
    components: {
        MyBreadcrumb,
    },
    setup() {

    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Scan Vehicle', to: `${this.$route.fullPath}`}               
            ]
        }
    },
    computed: {
    
    },
    methods: {

    }
}
</script>

<style scoped>

</style>