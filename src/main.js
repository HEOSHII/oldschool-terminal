import { createApp } from 'vue';
import App from './App.vue';
import VueWriter from "vue-writer";

import './assets/main.css';

createApp(App).use(VueWriter).mount('#app');
