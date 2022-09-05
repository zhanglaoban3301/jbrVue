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

import CarpetInfo from '@/views/carpetInfo/CarpetInfo'
import CarpetShow from '@/views/carpetShow/CarpetShow'
import Profit from '@/views/profit/Profit'
import System from '@/views/system/System'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  
  {
    path: '/home',
    name: '地毯管理',
    component: Home,
    children:[
      {
        path: '/carpetInfo',
        name: '地毯信息',
        component: CarpetInfo,
        children:[
          {
            path: '/carpetList',
            name: '地毯列表',
            component: CarpetList
          },
          {
            path: '/sellInfo',
            name: '售卖记录',
            component: SellInfo
          },
          {
            path: '/stockInfo',
            name: '进货记录',
            component: StockInfo
          },
        ]
      },
      
      {
        path: '/profit',
        name: '利润总结',
        component: Profit,
        children:[
          {
            path: '/profitInfo',
            name: '利润总结',
            component: ProfitInfo
          },
        ]
      },
      {
        path: '/system',
        name: '系统管理',
        component: System,
        children:[
          {
            path: '/accountInfo',
            name: '账户信息',
            component: AccountInfo
          },
          {
            path: '/global',
            name: '全局变量',
            component: Global
          },
        ]
      }
    ]
  },
  {
    path: '/carpetShow',
    name: '地毯展示',
    component: CarpetShow,
    children:[
      {
        path: '/carpetShowList',
        name: '地毯展示列表',
        component: CarpetShowList,
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
