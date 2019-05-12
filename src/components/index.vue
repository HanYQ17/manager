<template>
  <div class="index">
    <el-container class="index_box">
      <el-header class="header">
        <el-row>
          <el-col :span="4">
            <img class="logo_img" src="../assets/logo.jpg" alt>
          </el-col>
          <el-col :span="19">
            <h2 class="title">后台系统管理</h2>
          </el-col>
          <el-col :span="1" class="out_login">
            <el-button type="danger" size="small" round @click="login">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="200px" class="aside">
          <el-menu router default-active="2" class="el-menu-vertical-demo">
            <!-- 用户管理 -->
            <el-submenu v-for="(item, index) in $store.state.menuList" :key="index" :index="item.order+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="(it, i) in item.children" :key="i" :index="it.path">
                <i class="el-icon-menu"></i>{{it.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main class="main">
          <!-- router-view -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menuList: [] //导航数据
    };
  },
  beforeCreate() {
    if (!sessionStorage.getItem("token")) {
      //验证是否有token
      this.$message.warning("请先登录");
      this.$router.push("login");
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    // 退出登录
    login() {
      sessionStorage.removeItem("token");
      this.$message.success("退出成功");
      this.$router.push("login");
    },
    // 获取菜单数据
    getMenus() {
      this.$request.getMenus().then(res => {
        // console.log(res);
        // this.menuList = res.data.data
        this.$store.commit('changeMenuList',res.data.data)
      });
    }
  }
};
</script>

<style lang="scss">
.index {
  height: 100%;
  .index_box {
    height: 100%;
  }
  .header {
    background-color: #ccc;
    .logo_img {
      height: 60px;
    }
    .title {
      text-align: center;
      margin: 0;
      line-height: 60px;
    }
    .out_login {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .aside {
    background-color: pink;
  }
  .main {
    background-color: #e9eef3;
  }
}
</style>
