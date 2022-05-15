import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/js/bootstrap.bundle'
import VueApexCharts from 'vue3-apexcharts'

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .mount('#app')
