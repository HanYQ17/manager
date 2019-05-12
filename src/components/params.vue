<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- alert提示 -->
    <el-alert class="my_alert" title="注意: 只允许为第三级分类设置相关参数!" type="warning" show-icon></el-alert>

    <!-- 级联选择器 -->
    <div>
      <span>请选择商品分类:&nbsp;&nbsp;&nbsp;</span>
      <el-cascader :props="props" @change="change" expand-trigger="hover" :options="options"></el-cascader>
    </div>

    <!-- tabs切换 -->
    <el-tabs v-model="activeName" class="my_tabs">
      <!-- 动态参数 -->
      <el-tab-pane label="动态参数" name="first">
        <!-- 按钮 -->
        <el-row>
          <el-col :span="24">
            <el-button class="my_btn" size="small" type="primary" disabled>添加动态参数</el-button>
          </el-col>
        </el-row>
        <!-- table表格 -->
        <el-table :data="dynamicTable" style="width: 100%" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template>
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 静态参数 -->
      <el-tab-pane label="静态参数" name="second">
        <!-- 按钮 -->
        <el-row>
          <el-col :span="24">
            <el-button class="my_btn" size="small" type="primary" disabled>添加静态参数</el-button>
          </el-col>
        </el-row>
        <!-- table表格 -->
        <el-table :data="staticTable" style="width: 100%" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="180"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    return {
      // table表格数据
      tableData: [],
      // 级联数据
      options: [],
      // tabs切换  默认选中项
      activeName: "first",
      // 级联选择器的对应关系
      props: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      staticTable: [], //静态数据
      dynamicTable: [] //动态数据
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    // 获取数据
    getCategories() {
      this.$request.getCategories().then(res => {
        // console.log(res);
        this.options = res.data.data;
      });
    },
    // 级联选择器值改变时
    change(value) {
      // console.log(value);
      // 只允许为第三级分类设置相关参数,所以要判断
      if (value.length == 3) { //组数长度为3时
        const id = value[2]; //取第三个参数
        this.$request.getStatic(id).then(res => {//获取静态参数
          this.staticTable = res.data.data;
        });
        this.$request.getDynamic(id).then(res => {//获取动态参数
          this.dynamicTable = res.data.data;
        });
      }
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
.my_alert {
  margin: 20px 0;
}
.my_tabs {
  margin: 10px 0;
  .my_btn {
    margin-bottom: 20px;
  }
}
</style>
