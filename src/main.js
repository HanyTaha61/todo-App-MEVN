import './assets/style.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.css';

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiPencil, mdiDelete, mdiCheckCircleOutline, mdiCheckCircle } from '@mdi/js'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      edit: mdiPencil,
      delete: mdiDelete,
      check: mdiCheckCircle
    },
    sets: {
      mdi,
    },
  },
})

app.use(vuetify)
app.use(router)
app.mount('#app')


