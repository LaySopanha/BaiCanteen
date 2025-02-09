import './assets/main.css';
import 'primeicons/primeicons.css'
import router from '@/router';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue);
app.use(ToastService); 
app.use(router);
app.mount('#app');
