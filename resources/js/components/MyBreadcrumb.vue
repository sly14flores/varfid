<template>
    <div>
        <Breadcrumb :home="pHome" :model="pItems" />
    </div>
</template>

<script>
import Breadcrumb from 'primevue/breadcrumb/sfc';

export default {
    components: {
        Breadcrumb
    },
    props: ['home','items'],
    data() {
        return {
            pHome: this.home,
            pItems: this.items,
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>