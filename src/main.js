import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  //Element Plus icons

import router from './router/index'
import App from './App.vue'
import SocketIO from './plugins/socket/index'

const app = createApp(App)

//use icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(SocketIO, {
    connection: 'http://localhost:8248'
})

app.mount('#app')
