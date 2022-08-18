import { createApp } from 'vue'
import pinia from './stores/piniaInstance';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'

import './styles/index.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');