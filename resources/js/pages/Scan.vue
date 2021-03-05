<template>
    <div>
        <MyBreadcrumb :home="home" :items="items" />
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
                                    <p class="p-text-bold">{{ }}</p>                                     
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

import MyBreadcrumb from '../components/MyBreadcrumb.vue';
import { useStore } from 'vuex'
import { reactive } from 'vue'

window.onScan = require('onscan.js')

const SCAN_RFID = `${apiUrl}/api/vehicle/scan/:id`
const scanRfid = (payload) => {
    const { id } = payload
    const url =  route(SCAN_RFID, { id })
    return axios.get(url)
}

export default {
    components: {
        MyBreadcrumb,
    },
    setup() {

        const store = useStore  
        
        let info = reactive({
            type_name: null,
            brand_name: null,
            model: null,
            plate_no: null,
            driver: null,
            picture: '/img/avatar.png'
        })

        const getInfo = (rfid) => {
            scanRfid({id: rfid}).then(response => {
                const { data: { data } } = response
                info.type_name = data.type_name
                info.brand_name = data.brand_name
                info.model = data.model
                info.plate_no = data.plate_no
                info.driver = data.driver
                info.picture = data.picture
            })
        }

        // Enable scan events for the entire document
        onScan.attachTo(document);
        // Register event listener
        document.addEventListener('scan', function(sScancode, iQuantity) {
            const rfid = sScancode.detail.scanCode
            getInfo(rfid)
        });

        return {
            info
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
}
</script>

<style scoped>

</style>