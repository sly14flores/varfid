import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import store from './store.js';

window.onScan = require('onscan.js')

// Enable scan events for the entire document
onScan.attachTo(document);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

import '../css/layout/layout.scss';
import '../css/layout/flags/flags.css';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.productionTip = false
app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
app.config.globalProperties.$primevue = reactive({ ripple: true });

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.mount('#app');