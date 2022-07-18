import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/js/bootstrap.bundle'
import VueApexCharts from 'vue3-apexcharts'
import TheModal from './components/shared/TheModal.vue'
import TheSpinner from './components/shared/TheSpinner.vue'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(VueApexCharts)
  .component('the-modal', TheModal)
  .component('the-spinner', TheSpinner)
  .mount('#app')
