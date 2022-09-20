<template>
    <div class="manage_page fillcontain">
    <el-container>
    <el-header class="HomeHeader">
        <div class="title">金博尔</div>
        <el-dropdown class="userInfo" style="float:right">
            <span class="el-dropdown-link" >
                {{user.username}}<i><img :src="imgurl"></i>
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
                    <el-menu :default-active="defaultActive"   background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"   router>
                        <el-submenu :index="item.path"  v-for="(item,index) in routes" :key="index" v-if="!item.hidden">
                                <template slot="title"><i class="el-icon-location"></i>
                                    <span>{{item.name}}</span>
                                </template>
                        
                                <el-menu-item :index="childrenxj.path"  v-for="(childrenxj,indexxxj) in item.children" :key="indexxxj">
                                    <span>{{childrenxj.name}}</span>
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

export default {
    name:"Home",
    data(){
        return{
            imgurl:'/retimg?path=D://img/1.jpg',
            user:JSON.parse(window.sessionStorage.getItem('user')) 
        }
    },
    computed:{
        routes(){
            return this.$store.state.routes;
        },
        defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
    }
   
}
</script>

<style  lang="less" scoped>
    @import '../style/mixin';
	.HomeHeader{
        background: #409eff;
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
   .el-dropdown-link.el-dropdown-selfdefine{
        font-size: 16px;
   }
   .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
   }
   .el-row{
    width: 200px ;
    height: 100%;
   }
   .el-menu{
    position: fixed;
    width: 200px ;
    // min-width: 200px;
    height: 100%;
    //background-color:#ffd04b;
    
   }
   .mainview {
    margin-top: 5px;
    margin-left: 25px;
   }
   
</style>