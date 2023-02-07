<template>
    <div class="manage_page fillcontain" >
    <el-container>
    <el-header class="HomeHeader">
        <div class="title">金博尔</div>
        <el-dropdown class="userInfo" style="float:right">
            <span class="el-dropdown-link" >
                {{user.username}}<i><img src="../assets/8.jpg"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    
    
   
  
     <el-container >
        <el-row >
	  		<el-col :span="5" >
                <el-aside >
                    <el-menu :default-active="defaultActive"    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"  router>
                        <el-submenu :index="item.path"  v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
                                <template slot="title"><i class="el-icon-location"></i>
                                    <span>{{item.name}}</span>
                                </template>
                        
                                <el-menu-item :index="childrenxj.path"  v-for="(childrenxj,indexxxj) in item.children" :key="indexxxj" @click="activeFun(item,childrenxj.path)">
                                    <span :class="{'activeCss':activeVar==childrenxj.path}">{{childrenxj.name}}</span>
                                </el-menu-item>
                            
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </el-col>
        </el-row>
        <el-main class="mainview">
            <router-view></router-view>
        </el-main>
    </el-container> 
   
    </el-container>
</div>
</template>

<script>
import {getRequest} from '../utils/api';
export default {
    name:"Home",
    data(){
        return{
            path:'',
            user:JSON.parse(window.sessionStorage.getItem('user')) ,
            activeVar:0
        }
    },
    methods:{
        activeFun(item,index){
        // item 为被选中的元素体
        console.log("选中了"+index)
        this.activeVar=index
   }
    },
    computed:{
        routes(){
            return this.$store.state.routes;
        },
        defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
    },
  
   
}
</script>

<style  lang="less" scoped>
    
	.HomeHeader{
        background: hsl(220, 59%, 62%);
        display: flex;
        align-items: center;
    }
   .HomeHeader .title{
    font-size: 30px;
    font-family: 华文楷体;
    color:white;
   }
   .HomeHeader .userInfo{
        margin-left:auto;
        cursor: pointer;
   }
   /deep/.el-dropdown-link.el-dropdown-selfdefine{
        font-size: 16px;
   }
   
    .activeCss{
            color: #ffd04b;
    }
   /deep/.el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
   }
   /deep/.el-row{
    width: 200px ;
    height: 100vh;
    background-color: #545c64 !important;
   }
   /deep/.el-menu{
    position: fixed;
    width: 200px ;
    // min-width: 200px;
    height: 100vh;
   
    
   }
   .mainview {
    margin-top: 5px;
    margin-left: 25px;
    height: 100vh;
    
   }
   /deep/.manage_page{
    overflow-y: scroll;
   }

   /deep/.el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto;
}
//Tabled单元格对齐
/deep/ .gutter {
  width: 22px !important;
  display: inline-block !important;
}
</style>