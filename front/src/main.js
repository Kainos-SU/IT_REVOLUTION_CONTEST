import { createApp } from 'vue';
import './style.css';
import "leaflet/dist/leaflet.css";
import App from './App.vue';
import store from "./store/index";
import router from "./router/index";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const vueApp = createApp(App);
vueApp.use(store);
vueApp.use(router);
vueApp.use(Toast, {});
vueApp.mount('#app');
