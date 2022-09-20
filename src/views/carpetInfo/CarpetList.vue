<template>
  <div class="carpetinfo">
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
    
   <el-select class="inputValue" v-model="batch" placeholder="请选择批次" size="medium" @change="change">
          <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
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

    <el-dialog title="地毯信息" :visible.sync="dialogFormVisible" center="true" width="30%">
      <div class="forminfo">
      <el-form :model="form">
        <el-form-item label="名称">
        <el-input v-model="form.name" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="form.type" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="form.region" placeholder="请选择尺寸" size="medium" @change="change">
          <el-option label="1600*2300" value="1600*2300"></el-option>
          <el-option label="2000*2900" value="2000*2900"></el-option>
          <el-option label="2400*3400" value="2400*3400"></el-option>
          <el-option label="3000*4000" value="3000*4000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" size="medium" type="number" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          @input="$forceUpdate()" 
          size="medium"
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="批次">
        <el-select v-model="form.pici" placeholder="请选择批次" size="medium" @change="change">
          <el-option v-for="(item,index) in batchList" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogput">确 定</el-button>
      </div>
    </div>
    </el-dialog>
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
     
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
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
  import {getRequest,postRequest} from '../../utils/api';
  import { formatDate } from "../../utils/utils.js"; //转换日期格式
  export default {
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
        batchList:this.$store.state.batchs,
        dialogFormVisible:false,
        page:1,
        name: '',
        type:'',
        batch:'',
        date:'',
        total:0,
        tableData: [],
        formLabelWidth:"10px",
        form: {
          id:'',
          name: '',
          type: '',
          date:'',
          price:0,
          pici:'',
          region:''
        },
      }
    },
    methods: {
      change(){
	        this.$forceUpdate()   //其作用就是强制性刷新了一次
      },
      dialogput(){
        const LengthAndWidth = this.form.region.split("*");
        const length = LengthAndWidth[0];
        const width = LengthAndWidth[1];
        let param = {
          "name":this.form.name,
          "type":this.form.type,
          "price":this.form.price,
          "length":length,
          "width":width,
          "batch":this.form.pici,
          "entrytime":this.form.date,
          "id":this.form.id
        }
        postRequest('/updatecarpet',param).then(data =>{
      
            if(data){
               var page = {"page":this.page}
               getRequest('/getcarpet',page).then(data =>{
              if(data && data.code =="200"){
                this.total = data.obj.total
                this.tableData = data.obj.data
              }
              })
            }
        })
        this.dialogFormVisible = false
        
      },
      handleEdit(index, row) {
      
        //填充表单属性
        this.form = this.tableData[index]
        this.form.pici = this.tableData[index].batch
        this.form.date = this.tableData[index].entrytime
        this.form.region = this.tableData[index].width+"*"+this.tableData[index].length
        this.dialogFormVisible = true
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
         let param = {
            name:this.name==''?null:this.name,
            type:this.type==''?null:this.type,
            batch:this.batch==''?null:this.batch,
            entrytime:this.date==''?null:this.date
         }
         
         postRequest('/searchcarpet',param).then(data =>{
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
        var page = {"page":this.page}
        getRequest('/getcarpet',page).then(data =>{
            if(data && data.code =="200"){
               this.total = data.obj.total
               this.tableData = data.obj.data
            }
        })
      },
      getPage(page){
        this.page = page;
        var page = {"page":this.page}
        getRequest('/getcarpet',page).then(data =>{
            if(data && data.code =="200"){
               this.total = data.obj.total
               this.tableData = data.obj.data
            }
        })
      },
  
    },
     mounted(){
      
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
.forminfo{
  margin-left: 60px;
}
</style>