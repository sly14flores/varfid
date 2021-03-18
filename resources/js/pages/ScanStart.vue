<template>
    <div class="wrapper p-jc-center p-p-0">
        <div class="p-grid p-jc-center">
            <div class="p-col-6 p-text-center">
                <img alt="logo" src="img/varfid-login-logo.png" class="varfid-logo">
            </div>
        </div>        
        <p class="p-text-center p-text-bold">Scanning Point</p>
        <div class="vehicle-info">
            <div class="p-d-flex p-p-2">
                <!-- <Button type="Button" icon="pi pi-check" class="p-mr-2" @click="getInfoTest" /> -->
                <Button type="Button" icon="pi pi-refresh" class="p-ml-auto p-button-danger" @click="restart" />
            </div>            
            <div class="card p-fluid">
                <div class="p-grid">
                    <div class="p-col-4">
                        <img :src="info.picture" alt="" v-if="!fetching" />
                        <Skeleton width="100%" height="14rem" v-if="fetching" />
                    </div>
                    <div class="p-col-6">
                        <div class="p-grid">
                            <div class="p-col-12" v-if="fetching">
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                                <p><Skeleton width="30rem" height="1.5rem" /></p>
                            </div>
                            <div class="p-col-4" v-if="!fetching">
                                <p>Type: </p>
                                <p>Brand: </p>
                                <p>Model: </p>
                                <p>Plate No: </p>
                                <p>Driver: </p>
                                <p>Date/Time: </p>                                    
                            </div>
                            <div class="p-col-8" v-if="!fetching">
                                <p class="p-text-bold">{{ info.type_name }}</p>
                                <p class="p-text-bold">{{ info.brand_name }}</p>
                                <p class="p-text-bold">{{ info.model }}</p>
                                <p class="p-text-bold">{{ info.plate_no }}</p>
                                <p class="p-text-bold">{{ info.driver }}</p>
                                <p class="p-text-bold">{{ info.datetime }}</p>
                            </div>
                        </div>
                    </div>
                </div>                                          
            </div>
            <div class="p-text-center">
                <Button label="Login" class="p-button-info p-button-outlined" @click="login" />
            </div>
        </div>
        <LoginFooter />
    </div>    
</template>

<script>

import LoginFooter from '../components/LoginFooter'
import Button from 'primevue/button/sfc';
import Skeleton from 'primevue/skeleton/sfc';

import axios from 'axios'
import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'

const SCAN_RFID = `${apiUrl}/api/vehicle/scan/:id`
const scanRfid = (payload) => {
    const { id } = payload
    const url =  route(SCAN_RFID, { id })
    return axios.get(url)
}

export default {
    components: {
        LoginFooter,
        Button,
        Skeleton
    },
    setup() {

        const store = useStore()
        const route = useRoute()
        
        const fetching = ref(false)

        const vehicle = {
            type_name: null,
            brand_name: null,
            model: null,
            plate_no: null,
            driver: null,
            picture: '/img/avatar.png',
            datetime: null,
        }

        const restart = () => {
            info.type_name = null
            info.brand_name = null
            info.model = null
            info.plate_no = null
            info.driver = null
            info.picture = '/img/avatar.png'
            info.datetime = null
        }

        const info = reactive({
            ...vehicle
        })

        const getInfo = (rfid) => {

            if (route.path!="/") return

            restart()
            fetching.value = true
            scanRfid({id: rfid}).then(response => {
                fetching.value = false
                const { data: { vehicle, datetime } } = response
                info.type_name = vehicle.type_name
                info.brand_name = vehicle.brand_name
                info.model = vehicle.model
                info.plate_no = vehicle.plate_no
                info.driver = vehicle.driver
                info.picture = vehicle.picture
                info.datetime = datetime
                Swal.fire({
                    // text: `No vehicle record exists for RFID: ${rfid}`,
                    html: '<p style="padding-left: 5px; color:#3e8e51">Authorized Personnel</p>',             
                    icon: 'success',
                    toast: 'true',
                    // position: 'top-right',
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    background: '#b6d8c6',
                    iconColor: '#3e8e51',
                    padding: '1.5rem',                    
                    timer: 2000,
                })                
            }).catch(e => {
                console.log(e)
                fetching.value = false
                Swal.fire({
                    // text: `No vehicle record exists for RFID: ${rfid}`,
                    html: '<p style="padding-left: 5px; color:#d10926">Unauthorized Personnel</p>',                    
                    icon: 'error',
                    toast: 'true',
                    // position: 'top-right',
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    background: '#e8c2cf',
                    padding: '1.5rem',
                    timer: 2000,
                })                
            })
        }

        // Register event listener
        document.addEventListener('scan', function(sScancode, iQuantity) {
            const rfid = sScancode.detail.scanCode
            getInfo(rfid)
        });

        const getInfoTest = () => {
            getInfo('2303285070')
        }

        return {
            info,
            restart,
            getInfoTest,
            fetching
        }

    },
    computed: {
        today() {
            const date = new Date()
            return date.toDateString()
        }
    },
    methods: {
        login() {
            this.$router.push('/login')
        }
    }    
}
</script>

<style scoped>

    .wrapper {
        margin-top: 1rem;
        margin-left: 4rem;
        margin-right: 4rem;
    }

    .vehicle-info {
        margin-left: 20%;
        margin-right: 20%;
    }

    .varfid-logo {
        width: 200px;
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

</style>