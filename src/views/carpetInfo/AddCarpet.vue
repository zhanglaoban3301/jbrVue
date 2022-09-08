<template>
  <div class="addcarpet"> 
      <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="form.type" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="form.region" placeholder="请选择尺寸">
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
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="批次">
        <el-select v-model="form.pici" placeholder="请选择批次">
          <el-option label="第一批次" value="第一批次"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          drag
          :action="url+uploadUrl"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        
         
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getRequest} from '../../utils/api'
  export default {
    name:"AddCarpet",
    data() {
      return {
        form: {
          name: '',
          type: '',
          date:'',
          price:0,
          pici:'',
          address:''
        },
        url:this.global.apiUrl,
        uploadUrl:"/upload"
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form)
      },
      handleRemove(file, fileList) {
        console.log("移除",file)
       if(file.response.code=="200"){
          const path = file.response.obj.source;
         
          getRequest('/deleteImg',path).then(data =>{
            if(data){
              console.log(data)
            }
        })
       } 
    },
   
      handleSuccess(file) {
        console.log("成功");  
        this.files = file.raw;
        console.log(file);
      }
    }
  }
</script>

<style lang="less">
.addcarpet{
  padding-top: 35px;
}
</style>