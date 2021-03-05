<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
        <div class="card p-mt-2">
            <h5>Today is {{ today }}</h5>
        </div>        
        <div class="p-d-flex p-p-2">
            <!-- <Button type="Button" icon="pi pi-check" class="p-mr-2" @click="getInfoTest" /> -->
            <Button type="Button" icon="pi pi-refresh" class="p-ml-auto p-button-help" @click="restart" />
        </div>          
        <div class="p-grid p-mt-2">          
            <div class="p-col-12">
                <div class="card p-fluid">
                    <div class="p-grid">
                        <div class="p-col-4">
                            <img :src="info.picture" alt="" />
                        </div>
                        <div class="p-col-6">
                            <div class="p-grid">
                                <div class="p-col-2">
                                    <p>Type: </p>
                                    <p>Brand: </p>
                                    <p>Model: </p>
                                    <p>Plate No: </p>
                                    <p>Driver: </p>
                                    <p>Date/Time: </p>                                    
                                </div>
                                <div class="p-col-10">
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
            </div>
        </div>
    </div>
</template>

<script>

import route from '../library/route'
import { apiUrl } from '../url.js'

import Swal from 'sweetalert2'

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import Button from 'primevue/button/sfc';
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
        MyBreadcrumb,
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
    data() {
        return {
            home: {icon: 'pi pi-home', to: '/'},
            items: [
                {label: 'Scan Vehicle', to: `${this.$route.fullPath}`}               
            ]
        }
    },
    computed: {
        today() {
            const date = new Date()
            return date.toDateString()
        }
    }
}
</script>

<style scoped>

</style>