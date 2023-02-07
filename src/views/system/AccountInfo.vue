<template>
  <el-descriptions class="margin-top" title="账户信息" :column="3" :size="size" border>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{this.username}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{this.phone}}
    </el-descriptions-item>
   
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        邮箱
      </template>
      {{this.email}}
    </el-descriptions-item>
    
  </el-descriptions>
</template>

<script>
import {getRequest} from '../../utils/api';
export default {
    name:"AccountInfo",
    data(){
      return{
        username:'',
        phone:'',
        email:''
      }
    },
    mounted(){
      getRequest('/login/getInfo',).then(data =>{
            if(data){
              this.username=data.username;
              this.phone=data.phone;
              this.email=data.email;
            }
        })
    }
}
</script>

<style>

</style>