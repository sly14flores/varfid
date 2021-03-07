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
                        <img :src="info.picture" alt="" />
                    </div>
                    <div class="p-col-6">
                        <div class="p-grid">
                            <div class="p-col-4">
                                <p>Type: </p>
                                <p>Brand: </p>
                                <p>Model: </p>
                                <p>Plate No: </p>
                                <p>Driver: </p>
                                <p>Date/Time: </p>                                    
                            </div>
                            <div class="p-col-8">
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

import axios from 'axios'
import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

import { useStore } from 'vuex'
import { reactive } from 'vue'

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
    },
    setup() {

        const store = useStore  
        
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
            restart()
            scanRfid({id: rfid}).then(response => {
                const { data: { vehicle, datetime } } = response
                info.type_name = vehicle.type_name
                info.brand_name = vehicle.brand_name
                info.model = vehicle.model
                info.plate_no = vehicle.plate_no
                info.driver = vehicle.driver
                info.picture = vehicle.picture
                info.datetime = datetime
            }).catch(e => {
                console.log(e)
                Swal.fire({
                    text: `No vehicle record exists for RFID: ${rfid}`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
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
            getInfoTest
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