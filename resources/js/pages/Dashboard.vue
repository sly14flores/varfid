<template>
    <div class="p-grid p-fluid dashboard">
        <div class="p-col-12 p-lg-4">
            <div class="card summary">
                <span class="title">Users</span>
                <span class="detail">Number of users</span>
                <span class="count visitors">{{ data.users }}</span>
            </div>
        </div>
        <div class="p-col-12 p-lg-4">
            <div class="card summary">
                <span class="title">Vehicles</span>
                <span class="detail">Total registered vehicles</span>
                <span class="count purchases">{{ data.vehicles }}</span>
            </div>
        </div>
        <div class="p-col-12 p-lg-4">
            <div class="card summary">
                <span class="title">Logs</span>
                <span class="detail">Total vehicle logs</span>
                <span class="count revenue">{{ data.logs }}</span>
            </div>
        </div>   
    </div>
</template>

<script>

import { useStore } from 'vuex'

export default {
    setup() {

        const store = useStore()
        const { dispatch } = store

        dispatch('dashboard/GET_DATA')

    },
    computed: {
        data() {
            return this.$store.state.dashboard.data
        }
    }
}
</script>