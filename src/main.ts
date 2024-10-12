import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router';
import "./style.css"
import * as echarts from 'echarts';
import ECharts from 'vue-echarts';


const app = createApp(App);

// 导入echarts
app.component('v-chart', ECharts);
app.config.globalProperties.$echarts = echarts;


// 导入ElementUI图标
for(const [key,component] of 
    Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}

app.use(ElementPlus)
    .use(router)
    .mount('#app')
