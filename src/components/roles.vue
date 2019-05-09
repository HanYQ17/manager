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
        <el-button plain @click="addVisible=true">添加角色</el-button>
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
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="handleDelete(scope.row)"
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

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editRoles" :rules="addRules" ref="editRoles">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="editRoles.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editRoles.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoles')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [], //角色数据
      addVisible: false, //是否显示添加弹窗
      // 新增数据验证
      addRules: {
        roleName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "密码也不能为空", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ]
      },
      // 新增数据
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      editVisible: false, //是否显示编辑的弹窗
      // 编辑数据
      editRoles: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 获取数据
    getRoles() {
      this.$request.getRoles().then(res => {
        // console.log(res);
        // 报错'rowKey is required',不能有children,所以要改掉children
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children; //把值存在另一个名字上
          delete v.children; //然后删除children
        });
        this.tableData = data;
      });
    },
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addForm") {
            // 添加角色
            this.$request.addRoles(this.addForm).then(res => {
              // console.log(res);
              this.addVisible = false; //关闭弹窗
              this.$message.success("添加成功"); //提示
              this.getRoles(); //重新渲染
              this.$refs[formName].resetFields(); //重置表单
            });
          } else if (formName == "editRoles") {
            this.$request.editRoles(this.editRoles).then(res => {
              // console.log(res);
              if (res.data.meta.status == 200) {
                this.editVisible = false;
                this.getRoles();
                this.$message.success(res.data.meta.msg);
              }
            });
          }
        } else {
          this.$message.error("格式不对");
          return false;
        }
      });
    },
    // 根据id获取数据
    handleEdit(row) {
      this.editVisible = true;
      this.$request.getRoleById(row.id).then(res => {
        // console.log(res);
        this.editRoles = res.data.data;
        this.editRoles.id = res.data.data.roleId;
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteRoles(row.id).then(res => {
            // console.log(res)
            if (res.data.meta.status == 200) {
              this.$message({ type: "success", message: "删除成功!" });
              this.getRoles(); //重新渲染
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleRole() {}
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
