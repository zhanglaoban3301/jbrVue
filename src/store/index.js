import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes:[],
    global:[],
    batchs:[]
  },
  getters: {
  },
  //同步执行
  mutations: {
    initRoutes(state,data){
      state.routes = data;
    },
    initGlobalList(state,data){
      state.global = data;
    },
    initBatchList(state,data){
      state.batchs = data;
    }
  },
  //异步执行
  actions: {
  },
  modules: {
  }
})
