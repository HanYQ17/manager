<template>
  <div>
    <!-- 栅格 输入框 按钮 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="warning" plain @click="$router.push('goods/goodsAdd')">添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
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
    name:'goodsList',
    data(){
        return {
            tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
        }
    }
};
</script>

<style>
</style>
