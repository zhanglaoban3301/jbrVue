<template>
  <div class="sellList">
    <el-tabs type="border-card">
    <el-tab-pane label="在售列表">
      <WsSellInfo></WsSellInfo>
    </el-tab-pane>
    <el-tab-pane label="已售列表">已售列表</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import WsSellInfo from './WsSellInfo.vue';

export default {
    name:"SellInfo",
    components:{
    "Ws-SellInfo": WsSellInfo,
    WsSellInfo
}
}
</script>

<style>

</style>