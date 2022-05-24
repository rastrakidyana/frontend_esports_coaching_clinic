import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import popup from '@/plugins/iziToast'
import router from './router'
import axios from 'axios'
import VueStarRating from 'vue-star-rating'
import '@/assets/css/main.css'
import '@/assets/css/colors.css'


Vue.config.productionTip = false

Vue.component('star-rating', VueStarRating);


Vue.prototype.$popup = popup;
Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';
Vue.prototype.$baseUrl = 'http://127.0.0.1:8000';


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
