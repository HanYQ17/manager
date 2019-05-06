<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <img src="../assets/player.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "reports",
  data() {
    return {

    };
  }
};
</script>

<style lang="scss">
.my_breadcrumb{
    height: 45px;
    line-height: 45px;
    background-color: #d3dce6;
    padding-left: 10px;
}
</style>
