<template>
  <div>
    <Particles/>
    <el-form :rules="rules" 
              :model="loginForm" 
              ref = "loginForm" 
              class="logincContainer"
              :v-loading="loading"
              element-loading-text="正在登陆中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0,0,0,0.8)"
    >
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item label="" prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input type="text" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width:250px;margin-right: 5px;"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" >
      </el-form-item>
      <el-checkbox label="" v-model="checked" style="color:#fff" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width:100%;margin-top:5px;" @click="submitLogin" >登陆</el-button>
      
    </el-form>
  </div>
</template>

<script>
import Particles from '../components/particles/index';

export default {
    name:"Login",
    components:{Particles},
    data(){
      return {
        captchaUrl:this.global.apiUrl+'/captcha?time='+new Date(),
        loginForm:{
          username:'',
          password:'',
          code:''
        },
        loading:false,
        checked:true,
        rules:{
          username:[{required: true, message:'请输入用户名', trigger: 'blur'}],
          password:[{required: true, message:'请输入密码', trigger: 'blur'}],
        
        }
      }
    },
    methods:{
      submitLogin(){
        
        this.$refs.loginForm.validate((valid)=>{
          if(valid){
            this.loading = true
            this.postRequest('/login',this.loginForm).then(resp=>{
              if(resp){
                this.loading = false
                //存储token
                const tokenStr = resp.obj.tokenHead+resp.obj.token;
                window.sessionStorage.setItem('tokenStr',tokenStr);
                //跳转
               
                this.$router.replace({path:'/home'}).catch(err => { console.log(err) })
              }
            })
          }else{
            this.$message.error('请输入必填项');
            return false;
          }
        })
      },
      updateCaptcha(){
        this.captchaUrl = this.global.apiUrl+'/captcha?time='+new Date()
      }
    },
   
}
</script>

<style>
.logincContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin:180px auto;
  width:350px;
  padding: 15px 35px 15px 35px;
  border:1px solid #1e8130;
  box-shadow: 0 0 25px #c8cac6;
}
.loginTitle{
  margin: 0px auto 15px auto;
  text-align: center;
  color:rgb(255, 255, 255);
}
.loginRemember{
  text-align: left;
  margin:0px 0px 15px 0px;
}
.el-form-item__content{
  display: flex;
  align-items: center;
}
</style>