import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap CSS and (optionally) JS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Import our custom CSS
import '../scss/styles.scss'


createApp(App).mount('#app')

// // Create an example popover
// document.querySelectorAll('[data-bs-toggle="popover"]')
//   .forEach(popover => {
//     new Popover(popover)
//   })
