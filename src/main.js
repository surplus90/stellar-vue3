import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import axios from 'axios';

const app = createApp(App).use(Quasar, quasarUserOptions)

axios.defaults.baseURL = 'http://158.247.198.238:9090'
app.config.globalProperties.$http = axios

app.use(router)
app.mount('#app')