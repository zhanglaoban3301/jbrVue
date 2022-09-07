import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'

import CarpetList from '../views/carpetInfo/CarpetList'
import SellInfo from '../views/carpetInfo/SellInfo'
import StockInfo from '../views/carpetInfo/StockInfo'

import CarpetShowList from '../views/carpetShow/CarpetShowList'
import ProfitInfo from '../views/profit/ProfitInfo'
import AccountInfo from '../views/system/AccountInfo'
import Global from '../views/system/Global'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  }
  
]

const router = new VueRouter({
  routes
})

export default router
