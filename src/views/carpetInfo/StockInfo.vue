<template>
  <div>
    <el-dialog title="地毯信息" :visible.sync="dialogFormVisible" center="true" width="100%">
      <div class="forminfo">
      <el-table
      :data="tableData1"
      class="tablestyle">
      <el-table-column
        label="日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.entrytime|formatDate}}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="图片"
        width="130">
        <template slot-scope="scope">
          <div class="demo-image__preview" v-if="scope.row.img">
          <el-image
            style="width: 60px; height: 60px"
            :src="ImgUrl + scope.row.img"
            :preview-src-list="[ImgUrl + scope.row.img]"
            fit="fill">
          </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="130">
        <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="型号"
        width="130">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        width="100">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="尺寸"
        width="130">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.width + "*"+scope.row.length }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="批次"
        width="130">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.batch }}</span>
        </template>
      </el-table-column>
     
    </el-table>
    <el-pagination
      class="pagestyle"
      background
      layout="prev, pager, next"
      :total="tabletotal"
      @current-change="getTablePage">
    </el-pagination>
    </div>
    </el-dialog>

    <el-table
      :data="tableData"
      class="tablestyle">
      <el-table-column
        label="批次"
        width="160">
        <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.batch }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="进货日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.purchasetime|formatDate}}</span>
        </template>
      </el-table-column>
    
      <el-table-column
        label="总价格"
        width="120">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        width="130">
        <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.count  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">查看货物</el-button>
          
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
import {getRequest} from '../../utils/api';
import { formatDate } from "../../utils/utils.js"; //转换日期格式
export default {
    name:"StockInfo",
    data(){
      return{
        ImgUrl:'/retimg?path=',
        page:1,
        pagetable:1,
        total:0,
        tableData: [],
        tabletotal:0,
        tableData1:[],
        dialogFormVisible:false,
        batch:""
      }
    },
    methods:{
      handleEdit(index,row){
        this.dialogFormVisible = true;
        let batch = this.tableData[index].batch;
        this.batch = batch;
        let param = {
          "page":this.page,
          "batch":batch
        }
        getRequest('/getcarpetbatch',param).then(data =>{
            if(data && data.code =="200"){
               this.tableData1 = data.obj.data
               this.tabletotal = data.obj.total
            }
        })
      },
      getPage(page){
        this.page = page;
        var page = {"page":this.page}
        getRequest('/getpurchase',page).then(data =>{
            if(data && data.code =="200"){
               this.total = data.obj.total
               this.tableData = data.obj.data
            }
        })
      },
      getTablePage(page){
        console.log("table",page)
        this.pagetable = page;
        let param = {
          "page":page,
          "batch":this.batch
        }
        getRequest('/getcarpetbatch',param).then(data =>{
            if(data && data.code =="200"){
               this.tabletotal = data.obj.total
               this.tableData1 = data.obj.data
            }
        })
      },
    },
     mounted(){
      var page = {"page":this.page}
      getRequest('/getpurchase',page).then(data =>{
            if(data && data.code =="200"){
               this.tableData = data.obj.data
               this.total = data.obj.total
            }
        })
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
.tablestyle{
  width: 100%;
  height: 100%;
  margin-top: 25px;
}
.pagestyle{
  margin-top: 15px ;
}
</style>