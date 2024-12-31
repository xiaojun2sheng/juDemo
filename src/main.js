import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles.css'; 

const app = createApp(App)
// vue实例上注册路由
app.use(router)
app.use(ElementPlus)
app.mount('#app')

