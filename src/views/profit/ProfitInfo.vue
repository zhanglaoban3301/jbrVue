<template>
  <div>
  <el-button type="primary" @click="cimsInputClick">点击查看大屏数据,按F11为全屏</el-button>
  <el-select class="inputValue" v-model="param.batch" placeholder="请选择批次" size="medium" @change="change">
        <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.name"></el-option>
  </el-select>
  <el-button class="search" type="primary" icon="el-icon-search" @click="getOrder">搜索</el-button>
  <el-button type="primary" icon="el-icon-delete" @click="clearParam">重置</el-button>

  <el-table
      :data="tableData"
      class="tablestyle">
      <el-table-column
        label="批次"
        width="160">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.batch }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="价格"
        width="120">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="售出日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.selltime|formatDate}}</span>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      class="pagestyle"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="getPage">
    </el-pagination>
  </div>
</template>

<script>
import {getRequest,postRequest} from '../../utils/api';
import { formatDate } from "../../utils/utils.js"; //转换日期格式
export default {
    name:"ProfitInfo",
    data(){
      return{
        batchList:this.$store.state.batchs,
        param:{
          batch:null,
          page:1
        },
        page:1,
        total:0,
        tableData:[]
      }
    },
    methods:{
      cimsInputClick(){
        this.$router.push("/Dp")
      },
      getOrder(){
        this.param.page = this.page;
       
        if(this.param.batch == ""){
          this.param.batch = null;
        }
       
        var param = this.param
        //console.log("param",this.param)
        postRequest('/getorder',param).then(data =>{
        if(data && data.code =="200"){
          console.log(data)
            this.total = data.obj.total
            this.tableData = data.obj.data
          }
        })
      },
      clearParam(){
        this.param.batch = null;
        this.getOrder();
      },
      getPage(page){
       
        this.page = page;
        this.param.page=page;
        this.getOrder()
      },
    },
    mounted(){
      this.getOrder()
    },
    filters: {
          formatDate(time) {
          var date = new Date(time);
          return formatDate(date, "yyyy-MM-dd");
          }
       }
}
</script>

<style scoped>

  .inputValue{
    width: 150px;
    margin-left: 50px;
  }
  .dateValue{
    width: 120px;
    margin-right: 15px;
  }
  .tablestyle{
    width: 100%;
    height: 100%;
    margin-top: 25px;
  }
  .pagestyle{
    margin-top: 15px ;
  }
  .carpetimg{
      width: 28px;
      height: 28px;
      border-radius: 24px;
     }
  .forminfo{
    margin-left: 60px;
  }
  .search{
    margin-left: 30px;
  }
  </style>