<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />          
    </div>
</template>

<script>

import MyBreadcrumb from '../../../components/MyBreadcrumb.vue';

export default {
    setup() {

    },
    components: {
        MyBreadcrumb
    },
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/maintenance'},
            items: [
                {label: 'Vehicles', to: '/maintenance/vehicles'}
            ]
        }
    }
}
</script>