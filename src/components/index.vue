<template>
  <div class="index">
    <el-container class="index_box">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img class="logo_img" src="../assets/logo.jpg" alt>
          </el-col>
          <el-col :span="19">
            <h2 class="title">后台系统管理</h2>
          </el-col>
          <el-col :span="1" class="out_login">
            <el-button type="danger" size="small" round>退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="200px" class="aside">
          <el-menu router default-active="2" class="el-menu-vertical-demo">
          <!-- 用户管理 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
                <el-menu-item index="users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
            </el-submenu>
            <!-- 权限管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
                <el-menu-item index="roles"><i class="el-icon-menu"></i>角色列表</el-menu-item>
                <el-menu-item index="rights"><i class="el-icon-menu"></i>权限列表</el-menu-item>
            </el-submenu>
            <!-- 商品管理 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
                <el-menu-item index="goods"><i class="el-icon-menu"></i>商品列表</el-menu-item>
                <el-menu-item index="params"><i class="el-icon-menu"></i>分类参数</el-menu-item>
                <el-menu-item index="categories"><i class="el-icon-menu"></i>商品分类</el-menu-item>
            </el-submenu>
            <!-- 订单管理 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
                <el-menu-item index="orders"><i class="el-icon-menu"></i>订单列表</el-menu-item>
            </el-submenu>
            <!-- 数据统计 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
                <el-menu-item index="reports"><i class="el-icon-menu"></i>数据报表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>


        <el-main class="main">
            <!-- router-view -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss">
.index {
  height: 100%;
  .index_box {
    height: 100%;
  }
  .header {
    background-color: #ccc;
    .logo_img {
      height: 60px;
    }
    .title {
      text-align: center;
      margin: 0;
      line-height: 60px;
    }
    .out_login {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .aside {
    background-color: pink;
  }
  .main {
    background-color: #e9eef3;
  }
}
</style>
