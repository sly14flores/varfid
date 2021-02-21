<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />        
    </div>
</template>

<script>

import MyBreadcrumb from '../../../components/MyBreadcrumb.vue';

export default {
    setup(props) {
        
        const { editOn } = props
        const editMode = eval(editOn)
        
        return {
            editMode
        }

    },
    components: {
        MyBreadcrumb
    },   
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/maintenance'},
            items: [
                {label: 'Vehicles', to: '/maintenance/vehicles'},
                {label: (this.editMode)?'Edit Vehicle':'New Vehicle', to: `${this.$route.fullPath}`}
            ]            
        }
    }
}
</script>