<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 栅格 输入框 按钮 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="userData.query"
          @keyup.native.enter="getUsers"
        >
          <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="addVisible=true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="stateChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="userData.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!-- 添加用户框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑框 -->
    <el-dialog title="编辑用户" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      // 表格数据
      tableData: [],
      // 获取用户列表需要的参数
      userData: {
        query: "", //查询的参数
        pagenum: 1, //页码
        pagesize: 5 //页容量
      },
      total: 0, //总数
      addVisible: false, // 是否显示新增框
      // 新增数据
      addForm: {
        username: "", //用户名
        password: "", //邮箱
        email: "", //密码
        mobile: "" //电话
      },
      // 新增数据验证
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码也不能为空", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        email: [],
        mobile: []
      },
      editVisible: false, // 是否显示修改框
      editForm: {
        // 编辑的数据
        username: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    // 获取用户列表数据
    getUsers() {
      this.$request.getUsers(this.userData).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    // 修改用户状态  使用change 值改变事件
    stateChange(row) {
      this.$request
        .updateUserStatus({ id: row.id, type: row.mg_state })
        .then(res => {
          console.log(res);
        });
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.$request.getUserById(row.id).then(res => {
        // console.log(res);
        this.editForm = res.data.data;
        this.editVisible = true;
      });
    },
    // 删除
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteUserById(row.id).then(res => {
            // console.log(res);
            if (res.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getUsers();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // this.$request.deleteUserById(row.id)
      // this.getUsers();
    },
    // 新增数据验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "editForm") {
            // 编辑用户
            this.$request.updataUser(this.editForm).then(res=>{
              // console.log(res);
              if(res.data.meta.status==200){
                this.editVisible = false  //关闭弹窗
                this.getUsers()  //重新渲染
              }
            })
          } else {
            // 添加用户
            this.$request.addUser(this.addForm).then(res => {
              console.log(res);
              this.addVisible = false; //关闭弹窗
              this.$message.success("添加成功"); //提示
              this.getUsers(); //重新渲染
              this.$refs[formName].resetFields(); //重置表单
            });
          }
        } else {
          this.$message.error("格式不对");
          return false;
        }
      });
    },
    // 页容量改变
    handleSizeChange(size) {
      // console.log(size);
      this.userData.pagesize = size;
      this.getUsers();
    },
    // 页码改变
    handleCurrentChange(current) {
      // console.log(current);
      this.userData.pagenum = current;
      this.getUsers();
    }
    // 根据ID查询用户信息
  },
  created() {
    this.getUsers();
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
