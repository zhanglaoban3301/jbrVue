<template>
  <div class="sellList">
    <el-tabs type="border-card" @tab-click="clicktab" >
    <el-tab-pane label="在售列表">
      <Ws-SellInfo ref="WsRef" ></Ws-SellInfo>
    </el-tab-pane>
    <el-tab-pane label="已售列表">
      <Ys-SellInfo ref="YsRef"></Ys-SellInfo>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import WsSellInfo from './WsSellInfo.vue';
import YsSellInfo from './YsSellInfo.vue';
export default {
    name:"SellInfo",
    data(){
      return{
          state:'0'
      }
    },
    components:{
      "Ws-SellInfo": WsSellInfo,
      "Ys-SellInfo":YsSellInfo
    },
    methods:{
      clicktab(e){
        if(e.label == "已售列表"){
            this.$refs.YsRef.getCarpet();
        }else{
          this.$refs.WsRef.getCarpet();
        }
      }
    }
}
</script>

<style>

</style>