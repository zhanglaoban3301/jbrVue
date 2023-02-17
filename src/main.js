import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter  from 'vue-router';
import router from "@/router";
import {postRequest,putRequest,getRequest,deleteRequest} from "./utils/api";
import store from './store'
import {initMenu,initGlobal,initBatch} from './utils/menu';
import global from '@/global/global';
import dataV from '@jiaminghi/data-view'
import axios from 'axios';
axios.defaults.withCredentials = true

Vue.use(dataV)
Vue.prototype.global = global
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.config.silent = true;


router.beforeEach((to,from,next) => {
  if(to.path == '/'){
    next();
  }else{
    
    if(window.sessionStorage.getItem('tokenStr')){
      
      initMenu(router,store);
      initGlobal(store);
      initBatch(store);
      console.log("即将获取用户信息")
      if(!window.sessionStorage.getItem('user')){
        console.log("获取用户信息")
         getRequest('/login/getInfo').then(resp=>{
          console.log("getInfo",resp)
          if(resp){
            window.sessionStorage.setItem('user',JSON.stringify(resp));
            console.log("进入home...")
            next();
          }
        })
      }
      
      next();
    }
  }
})

async function getuser(){
  console.log("getRequest 之前")
  return await getRequest('/login/getInfo').then(resp=>{
    if(resp){
      console.log("resp",resp)
      window.sessionStorage.setItem('user',JSON.stringify(resp));
    }
  })
  console.log("getRequest 之后")
}

async function f(){
  console.log("调用之前")
  await getuser();
  console.log("调用结束")
}





new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')


