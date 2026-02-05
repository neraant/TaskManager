import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from './components/ui'
import { createPinia } from 'pinia'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

components.forEach((component) => {
  if (component.name) app.component(component.name, component)
})

app.use(pinia)
app.use(router)

app.mount('#app')
