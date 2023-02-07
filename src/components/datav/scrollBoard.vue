<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
import { getRequest } from '@/utils/api'  ;
export default {
  
  name: 'ScrollBoard',
  data () {
    return {
      config: {
        
      }
    }
  },
  mounted(){
    getRequest('/getOrderList').then(data =>{
      
      if(data){
      
        this.config={
          header: ['时间','批次', '名称', '型号', '售出价格'],
          data: data,
          index: true,
          columnWidth: [50,120, 120,120],
          align: ['center'],
          rowNum: 7,
          headerBGC: '#1981f6',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
        }
      }
    })
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 50%;
  box-sizing: border-box;
  margin-left: 20px;
  height: 100%;
  overflow: hidden;
}
</style>
