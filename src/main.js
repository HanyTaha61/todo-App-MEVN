// import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css';

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.use(router)
app.mount('#app')


