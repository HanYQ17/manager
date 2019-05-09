<template>
  <div class="users" v-loading="loading">
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          {{scope.row.level==0?'一级':''}}
          {{scope.row.level==1?'二级':''}}
          {{scope.row.level==2?'三级':''}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  created() {
    this.loading = true; //重新刷新也要loading
    this.$request.getListRights().then(res => {
      // console.log(res);
      this.tableData = res.data.data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }
};
</script>

<style lang="scss">
.my_breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
