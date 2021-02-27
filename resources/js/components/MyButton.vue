<template>
    <Button :class="classes" :type="type">
        <i class="pi pi-spin pi-spinner" v-show="show"></i>
        <p><slot></slot></p>
    </Button>
</template>

<script>
import Button from 'primevue/button/sfc';

export default {
    name : 'MyButton',
    components: {
        Button
    },
    props: ['show','classes','type'],
    computed: {

    }
}
</script>

<style scoped>

button p {
    /* display: inline-block; */
    margin: auto;
}

</style>