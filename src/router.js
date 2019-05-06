import Vue from 'vue' //导入vue
import VueRouter from 'vue-router'  //导入vue-router
Vue.use(VueRouter)  //use一下

// 导入组件
import login from './components/login.vue'

// 路由规则
const routes = [
    { path: '/', redirect: '/login' },
    {path:'/login',component:login},

]

// 实例化路由对象
const router = new VueRouter({
    routes
})

//暴露出去
export default router  