<template>
  <div class="index">
    <el-container class="index_box">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img class="logo_img" src="../assets/logo.jpg" alt="">
          </el-col>
          <el-col :span="19">
            <h2 class="title">后台系统管理</h2>
          </el-col>
          <el-col :span="1" class="out_login" >
            <el-button type="danger" round>退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-main class="main">Main</el-main>
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
    .logo_img{
        height: 60px;
    }
    .title{
        text-align: center;
        margin: 0;
        line-height: 60px;
    }
    .out_login{
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
    background-color: skyblue;
  }
}
</style>
