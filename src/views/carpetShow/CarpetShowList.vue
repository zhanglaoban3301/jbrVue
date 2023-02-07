<template>
  <div>
    <!-- <el-dialog title="上传图片" :visible.sync="dialogFormVisible" center="true" width="40%">
      <div class="forminfo">
      <el-form :model="form">
        <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          drag
          :action="url+uploadUrl"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          ref="upload"
         
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="removeimg">取 消</el-button>
        <el-button type="primary" @click="putimg">确 定</el-button>
      </div>
    </div>
    </el-dialog>

    <el-button type="primary" @click="uploadimg">上传图片</el-button>
    <el-popconfirm
      title="确定删除吗？"
      :confirm="click"
    >
    <el-button class="deletebutton" slot="reference"  type="danger">删除全部图片</el-button>
   </el-popconfirm>
     -->
     <h3>此功能将在小程序上开发，敬请期待</h3>
  </div>
</template>

<script>
import {getRequest,postRequest} from '../../utils/api';
export default {
    name:"CarpetShowList",
    data(){
      return{
        dialogFormVisible:false,
        url:this.global.apiUrl,
        uploadUrl:"/upload",
        form:{
          address:null
        }
      }
    },
    methods:{
      handleRemove(file, fileList) {
       if(file.response.code=="200"){
          const path = {"path":file.response.obj.source}
          getRequest('/deleteImg',path).then(data =>{
            if(data){
              this.form.address = '';
            }
        })
       } 
    },
      handleSuccess(file) {
      
        this.files = file.raw;
        if(file.code=="200"){
          this.form.address = file.obj.source
        }
      },
      uploadimg(){
        this.dialogFormVisible = true
      },
      putimg(){
        this.dialogFormVisible = false
        var src = {"src":this.form.address}
        getRequest('/insertimgs',src).then(data =>{
            if(data){
              this.form.address = '';
            }
        })
      },
      removeimg(){
        dialogFormVisible = false;
        if(this.form.address != ''||this.form.address != null){
          var path = {"path":this.form.address};
          getRequest('/deleteImg',path).then(data =>{
            if(data){
              this.form.address = '';
            }
        })}
       
        
      }
    }
}
</script>

<style>
.deletebutton{
  margin-left:20px
}
</style>