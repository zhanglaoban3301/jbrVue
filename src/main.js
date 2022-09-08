import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter  from 'vue-router';
import router from "@/router";
import {postRequest,putRequest,getRequest,deleteRequest} from "./utils/api";
import store from './store'
import {initMenu} from './utils/menu';
import global from '@/global/global';
Vue.prototype.global = global
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to,from,next) => {
  if(to.path == '/'){
    next();
}else{
  if(window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store);
    if(!window.sessionStorage.getItem('user')){
      return getRequest('/login/getInfo').then(resp=>{
        if(resp){
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  }
}
  
    
  
  
 
})

new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')


