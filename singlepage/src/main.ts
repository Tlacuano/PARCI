import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


import VueSweetalert2 from "vue-sweetalert2";

const options = {
  confirmButtonColor: "#009574",
  cancelButtonColor: "#002E60",
};

Vue.use(VueSweetalert2);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
