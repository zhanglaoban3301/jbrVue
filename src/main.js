import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter  from 'vue-router';
import router from "@/router";
import {postRequest,putRequest,getRequest,deleteRequest} from "./utils/api";
import store from './store'
import {initMenu} from './utils/menu';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to,from,next) => {
  initMenu(router,store);
  next();
})

new Vue({
  render: h => h(App),
  router:router,
  stores
}).$mount('#app')


