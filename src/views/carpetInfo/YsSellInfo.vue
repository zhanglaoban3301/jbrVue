<template>
    <div class="carpetinfo">
      <el-input
        placeholder="请输入名称"
        v-model="param.name"
        class="inputValue"
        clearable>
      </el-input>
       
      <el-input
        placeholder="请输入型号"
        v-model="param.type"
        class="inputValue"
        clearable>
      </el-input>
      
     <el-select class="inputValue" v-model="param.batch" placeholder="请选择批次" size="medium" @change="change">
            <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.name"></el-option>
          </el-select>
      <el-date-picker
        v-model="param.entrytime"
        align="right"
        type="date"
        class="dateValue"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="getCarpet">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clearParam">重置</el-button>
  
      
      <el-table
        :data="tableData"
        class="tablestyle">
        <el-table-column
          label="批次"
          width="130">
          <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.batch }}</span>
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
          width="160">
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
          label="日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.entrytime|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="90">
          <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.state=='0'?'在售':'已售' }}</span>
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
      data() {
        return {
            name:"YsSellInfo",
            ImgUrl:this.global.apiUrl+'/retimg?path=',
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
          batchList:this.$store.state.batchs,
          dialogFormVisible:false,
          page:1,
          argsid:null,
          argsbatch:null,
         
          param:{
            id:null,
            name: null,
            type: null,
            entrytime:null,
            price:0,
            batch:null,
            region:null,
            page:1,
            state:'1'
          },
          total:0,
          tableData: [],
          formLabelWidth:"10px",
          form: {
            money:0
          },
        }
      },
    
      methods: {
        //获取数据
        getCarpet(){
          this.param.page = this.page;
          if(this.param.name == ""){
          this.param.name = null;
        }
        if(this.param.type == ""){
          this.param.type = null;
        }
        if(this.param.batch == ""){
          this.param.batch = null;
        }
        if(this.param.entrytime == ""){
          this.param.entrytime = null;
        }
          var param = this.param
          console.log("param",this.param)
          postRequest('/getcarpet',param).then(data =>{
          if(data && data.code =="200"){
            console.log(data)
              this.total = data.obj.total
              this.tableData = data.obj.data
            }
          })
        },
  
  
        change(){
              this.$forceUpdate()   //其作用就是强制性刷新了一次
        },
        dialogput(){
          let param = {"id":this.argsid,"batch":this.argsbatch,"money":this.form.money}
          getRequest('/sellcarpet',param).then(data =>{
              if(data && data.code =="200"){
                this.getCarpet();
              }
          })
          this.dialogFormVisible = false
          
        },
  
        handleSc(index, row) {
       
           this.dialogFormVisible=true
           this.argsid = row.id
           this.argsbatch = row.batch
        },
  
        handleDelete(index, row) {
          let id =  {"id":row.id};
          getRequest('/deletecarpet',id).then(data =>{
              if(data && data.code =="200"){
                this.getCarpet();
              }
          })
        },
  
        
        clearParam(){
          this.param.name = null;
          this.param.type = null;
          this.param.batch = null;
          this.param.entrytime = null
         
          this.getCarpet();
        },
        getPage(page){
          console.log(page)
          this.page = page;
          this.param.page=page;
          this.getCarpet()
        },
    
      },
       mounted(){
          this.getCarpet()
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
  .forminfo{
    margin-left: 6px;
  }
  </style>