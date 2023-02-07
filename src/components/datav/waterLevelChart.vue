<template>
  <div id="water-level-chart">
    <div class="water-level-chart-title">每月收入情况</div>

    <div class="water-level-chart-details">
      本月累计收入<span>{{this.total}}</span>元
    </div>

    <div class="chart-container">
      <dv-water-level-pond :config="config" />
    </div>
  </div>
</template>

<script>
  import { getRequest } from '@/utils/api'
export default {
  name: 'WaterLevelChart',
  data () {
    return {
      total:0,
      zb:0,
      data: [],
      config: {
       
      },
     
    }
  },
  mounted(){
    getRequest('/getSellBlByMonth').then(data =>{
     
    if(data){
       this.total = data[1].value;
       this.config = {
        data: [data[0].value],
        shape: 'round',
        waveHeight: 25,
        waveNum: 2
       }
    }
})
  }
}
</script>

<style lang="less">
#water-level-chart {
  width: 20%;
  box-sizing: border-box;
  margin-left: 20px;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;

  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }

  .water-level-chart-details {
    height: 15%;
    display: flex;
    justify-content: center;
    font-size: 17px;
    align-items: flex-end;

    span {
      font-size: 35px;
      font-weight: bold;
      color: #58a1ff;
      margin: 0 5px;
      margin-bottom: -5px;
    }
  }

  .chart-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dv-water-pond-level {
    max-width: 90%;
    width: 200px;
    height: 200px;
    border: 10px solid #19c3eb;
    border-radius: 50%;

    ellipse {
      stroke: transparent !important;
    }

    text {
      font-size: 40px;
    }
  }
}
</style>
