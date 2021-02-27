<template>
    <Button :class="classes" :type="type">
        <i class="pi pi-spin pi-spinner" v-show="show"></i>
        <p><slot></slot></p>
    </Button>
</template>

<script>
import Button from 'primevue/button/sfc';

export default {
    name : 'ActionButton',
    setup(props) {

        const { raised, serverity } = props

        const classes = {
            'p-button-raised': (eval(raised))?true:false,
            'p-button-primary': (serverity=='primary')?true:false,
            'p-button-success': (serverity=='success')?true:false,
            'p-button-info': (serverity=='info')?true:false,
            'p-button-warning': (serverity=='warning')?true:false,
            'p-button-help': (serverity=='help')?true:false,
            'p-button-danger': (serverity=='danger')?true:false,
        }

        return {
            classes
        }

    },
    components: {
        Button
    },
    props: ['show','type','raised','serverity'],
}
</script>

<style scoped>

button p {
    margin: auto;
}

</style>