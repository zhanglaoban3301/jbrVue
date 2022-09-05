<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px" >
        <el-menu router>
            <el-submenu :index="item.path" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.hidden">
                     <template slot="title"><i class="el-icon-location"></i>
                        <span>{{item.name}}</span>
                    </template>
                <el-submenu :index="children.path" v-for="(children,indexxj) in item.children" :key="indexxj" v-if="!children.hidden">
                    <template slot="title"><i class="el-icon-location"></i>
                        <span>{{children.name}}</span>
                    </template>
                    <el-menu-item :index="childrenxj.path" v-for="(childrenxj,indexxxj) in children.children" :key="indexxxj" v-if="!children.hidden">
                        <span>{{childrenxj.name}}</span>
                    </el-menu-item>
                 </el-submenu>
            </el-submenu>
        </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    name:"Home"
   
}
</script>

<style>

</style>