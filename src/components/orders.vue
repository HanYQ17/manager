<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <el-button v-if="scope.row.pay_status==0" type="danger" plain size="mini">未付款</el-button>
          <el-button v-else type="success" plain size="mini">已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="editVisible=true"></el-button>
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

    <!-- 编辑框 -->
    <el-dialog title="修改订单地址" :visible.sync="editVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="省市区/县" label-width="120px">
          <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <!-- 方法一 -->
          <el-input v-model="editForm.password" autocomplete="off"></el-input>
          <!-- 方法二 -->
          <v-distpicker @selected="selected"></v-distpicker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible=true">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment"; //导入moment,需先安装 npm install moment --save
import options from "../assets/city_data2017_element.js"; // 导入省市区数据

import VDistpicker from "v-distpicker"; //导入省市联动组件 需安装 npm install v-distpicker --save


export default {
  name: "orders",
  data() {
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
      ],
      // 接口调用数据
      orderData: {
        pagenum: 1,
        pagesize: 10
      },
      editVisible: false, //是否显示编辑框
      options, //省市联动数据
      selectedOptions2: [], // 选中的数据

      editForm: {} //编辑数据
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 获取数据列表
    getOrderList() {
      this.$request.getOrderList(this.orderData).then(res => {
        // console.log(res);
        this.tableData = res.data.data.goods;
      });
    },
    // 省市联动数据绑定
     selected(ssq){
      console.log(ssq);
    },
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          this.$message.error("错误");
          return false;
        }
      });
    }
  },
  // 本地过滤器,如需后面要用到再进行抽取
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss"); //年月日 时分秒
    }
  },
  // 本地组件
  components: {
    VDistpicker   //VDistpicker:VDistpicker的简写
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
