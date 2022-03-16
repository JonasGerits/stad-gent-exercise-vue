import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {createPinia} from "pinia";
import VueGoogleMaps from '@fawmi/vue-google-maps'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

const app = createApp(App);

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDa2fYoG3eOYOwbBr6My6Frxc6TpZU8AuE',
        libraries: "places"
    },
})
app.use(createPinia());
app.component('BootstrapIcon', BootstrapIcon);
app.mount('#app');
