<template>
  <div class="addcarpet"> 
    <div class="content">
      <el-form ref="form" size="mini" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="form.type" size="medium" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="form.region" placeholder="请选择尺寸" size="medium">
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  import {postRequest,} from '../../utils/api'
  export default {
    name:"AddCarpet",
    data() {
      return {
        batchList:this.$store.state.batchs,
        form: {
          name: '',
          type: '',
          date:'',
          price:0,
          pici:'',
          address:'',
          region:''
        },
        url:this.global.apiUrl,
        uploadUrl:"/upload"
      }
    },
    methods: {
      onSubmit() {
        
        const LengthAndWidth = this.form.region.split("*");
        const length = LengthAndWidth[0];
        const width = LengthAndWidth[1];
        let param = {
          "name":this.form.name,
          "type":this.form.type,
          "price":this.form.price,
          "length":length,
          "width":width,
          "img":this.form.address,
          "batch":this.form.pici,
          "entrytime":this.form.date
        }
         //param = JSON.stringify(param)
         postRequest('/addcarpet',param).then(data =>{
            if(data){

              if(data.code=="200"){
                 this.form.name=''
                 this.form.type=''
                 this.form.price=0
                 this.form.date=''
                 this.form.region=''
                 this.form.address=''
                 this.form.pici=''
              }

            
               this.$refs.upload.clearFiles();

            }
        })
      
      },
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
      }
    }
  }
</script>

<style lang="less" scoped>
.addcarpet{
 
}
.content{
  display: flex;
  justify-content: center;
}
/deep/.el-form{
  border:1px solid #000;
  box-shadow: 0px -5px 10px 0px #2279ee, 
			-6px 0px 6px 0px #2279ee, 
			6px 0px 6px 0px #2279ee, 
			0px 5px 19px 0px #2279ee;
  padding-top: 25px;
  padding-right: 10px;
}
/deep/.el-upload-dragger{
  padding-top: 10px;
  height: 150px !important ;
}
</style>