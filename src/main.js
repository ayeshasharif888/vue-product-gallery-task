// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'; // Import the router
import './index.css'

const app = createApp(App);

app.use(router); // Add the router to the app
app.mount('#app');