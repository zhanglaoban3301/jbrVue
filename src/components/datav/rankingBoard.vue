<template>
  <div id="ranking-board">
    <div class="ranking-board-title">每月售出数量</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
import { getRequest } from '@/utils/api'  
export default {
  name: 'RankingBoard',
  data () {
    return {
      config: {
        
      }
    }
  },
  mounted () {
    getRequest('/getSellByMonth').then(data =>{
    if(data){
       this.config = {
          "data":data,
          "rowNum":data.length
       }
    }
})
  }
}
</script>

<style lang="less">
#ranking-board {
  width: 20%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 30px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
