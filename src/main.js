import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

// createApp(App).use(store).use(router).mount('#app')
let app = createApp(App);

axios.get("http://localhost:3000/docs").then((res) => {
	app.config.globalProperties.globalFilms = res.data;
	app.use(store).use(router).mount('#app');
});
