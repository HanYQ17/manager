<template>
  <div class="login">
    <div class="content_box">
      <h3 class="title">用户登录</h3>
      <el-form label-position="top" label-width="80px" :model="loginFrom" :rules="loginRules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFrom.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" class="my_btn">登录</el-button> -->
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginFrom: {
        username: "",
        password: ""
      },
      // 表单验证提示
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发请求
          this.$request.login(this.loginFrom).then(res=>{
            console.log(res);
            if(res.data.meta.status==400){
              this.$message.warning(res.data.meta.msg)
            }else if(res.data.meta.status==200){
              this.$message.success(res.data.meta.msg)
              this.$router.push('/')  //跳转  编程式导航
              sessionStorage.setItem('token',res.data.data.token) //存储token
            }
          })
        } else {
          this.$message.error('格式不对')
          return false;
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.content_box {
  width: 480px;
  height: 360px;
  background-color: #fff;
  border-radius: 8px;
  padding: 50px 30px;
  box-sizing: border-box; //向里扩展
  .title {
    padding: 0;
    margin: 0;
  }
  .my_btn {
    width: 100%;
  }
}
</style>
