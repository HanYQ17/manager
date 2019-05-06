<template>
  <div class="login">
    <div class="content_box">
        <h3 class="title">用户登录</h3>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my_btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
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
  box-sizing: border-box;  //向里扩展
  .title{
      padding: 0;
      margin: 0;
  }
  .my_btn{
      width: 100%;
  }
}
</style>
