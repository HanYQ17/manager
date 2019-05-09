<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 栅格 输入框 按钮 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <el-button plain>添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="handleRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [],  //角色数据
    };
  },
  created() {
    this.$request.getRoles().then(res => {
      // console.log(res);
      // 报错'rowKey is required',不能有children,所以要改掉children
      let data = res.data.data
      data.forEach(v => {
        v._children = v.children  //把值存在另一个名字上
        delete v.children  //然后删除children
      });
      this.tableData = data
    });
  },
  methods: {
    handleEdit(){

    },
    handleDelete(){

    },
    handleRole(){

    }
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
