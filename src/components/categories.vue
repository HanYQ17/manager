<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 栅格 输入框 按钮 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <el-button type="primary">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" row-key="cat_id">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_level==0?'一级':''}}
          {{scope.row.cat_level==1?'二级':''}}
          {{scope.row.cat_level==2?'三级':''}}
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted==false?'有效':'无效'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
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
  name: "categories",
  data() {
    return {
      tableData: [] //表格数据
    };
  },
  created() {
    // 获取数据
    this.$request.getCategories().then(res => {
      console.log(res);
      this.tableData = res.data.data;
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
