import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home.vue';
import AddCarpet from '../views/carpetInfo/AddCarpet.vue';
import SellInfo from '../views/carpetInfo/SellInfo.vue';
import WsSellInfo from '../views/carpetInfo/WsSellInfo.vue';
import YsSellInfo from '../views/carpetInfo/YsSellInfo.vue';
import Dp from '../views/Dp'




Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};



const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/Dp',
    name: 'Dp',
    component: Dp
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/home/addCarpet',
        name: 'AddCarpet',
        component: AddCarpet,
      },
      {
        path: '/home/sellInfo',
        name: 'SellInfo',
        component: SellInfo,
      }
    ]
  }
 
  
]

const router = new VueRouter({
  routes
})

export default router
