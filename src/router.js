import Vue from 'vue' //导入vue
import VueRouter from 'vue-router'  //导入vue-router
Vue.use(VueRouter)  //use一下

// 导入组件
import login from './components/login.vue'
import index from './components/index.vue'
// 导入嵌套组件
import users from './components/users.vue'

// 路由规则
const routes = [
    // { path: '/', redirect: '/index' },
    {path:'/login',component:login},
    {path:'/',component:index,children:[
        {path:'users',component:users}  //嵌套路由不需要写 '/'
    ]},

]

// 实例化路由对象
const router = new VueRouter({
    routes
})

//暴露出去
export default router  