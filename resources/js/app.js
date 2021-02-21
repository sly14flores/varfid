import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import store from './store.js';

import '../css/layout/layout.scss';
import '../css/layout/flags/flags.css';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';

require('./http.js');

const app = createApp(App);

app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
app.config.globalProperties.$primevue = reactive({ ripple: true });

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.use(store);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.mount('#app');