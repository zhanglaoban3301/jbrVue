<template>
  <div>
    <el-input
      placeholder="请输入名称"
      v-model="name"
      class="inputValue"
      clearable>
    </el-input>
     
    <el-input
      placeholder="请输入型号"
      v-model="type"
      class="inputValue"
      clearable>
    </el-input>
    
    <el-input
      placeholder="请输入批次"
      v-model="batch"
      class="inputValue"
      clearable>
    </el-input>
    <el-date-picker
      v-model="date"
      align="right"
      type="date"
      class="dateValue"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" icon="el-icon-search" @click="getCarpetList">搜索</el-button>
    <el-button type="primary" icon="el-icon-delete" @click="clearParam">重置</el-button>


    <el-table
      :data="tableData"
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
     
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    name:"CarpetList",
    data() {
      return {
          ImgUrl:'/retimg?path=',
          pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        page:1,
        name: '',
        type:'',
        batch:'',
        date:'',
        total:0,
        tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        let id =  {"id":row.id};
        getRequest('/deletecarpet',id).then(data =>{
            if(data && data.code =="200"){
             
              var page = {"page":this.page}
              
              getRequest('/getcarpet',page).then(data =>{
                console.log(data.obj.data)
                  if(data && data.code =="200"){
                    this.total = data.obj.total
                    this.tableData = data.obj.data
                  }
              })
            }
        })
      },
      getCarpetList(){
         console.log(this.name)
         console.log(this.type)
         console.log(this.batch)
         console.log(this.date)

         let param = {
            name:this.name,
            type:this.type,
            batch:this.batch,
            date:this.date
         }
         getRequest('/searchcarpet',param).then(data =>{
            if(data && data.code =="200"){
                this.total = data.obj.total
                this.tableData = data.obj.data
            }
        })
      },
      clearParam(){
        this.name = '';
        this.type = '';
        this.batch = '';
        this.date = ''
      },
      getPage(page){
        this.page = page;
        var page = {"page":this.page}
        
        getRequest('/getcarpet',page).then(data =>{
          console.log(data.obj.data)
            if(data && data.code =="200"){
               this.total = data.obj.total
               this.tableData = data.obj.data
            }
        })
      },
  
    },
     mounted(){
      console.log("执行查询",this.page)
      var page = {"page":this.page}
   
      getRequest('/getcarpet',page).then(data =>{
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
.inputValue{
  width: 150px;
  margin-right: 10px;
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
</style>