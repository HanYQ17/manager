import Vue from 'vue' //导入vue
import VueRouter from 'vue-router'  //导入vue-router
Vue.use(VueRouter)  //use一下

// 导入组件
import login from './components/login.vue'
import index from './components/index.vue'
// 导入嵌套组件
import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'  //商品列表
import params from './components/params.vue' //分类参数
import categories from './components/categories.vue'  //商品分类
import orders from './components/orders.vue'  //订单列表
import reports from './components/reports.vue'  //数据报表

// 路由规则
const routes = [
    // { path: '/', redirect: '/index' },
    {path:'/login',component:login},
    {path:'/',component:index,children:[
        {path:'users',component:users},  //嵌套路由不需要写 '/'
        {path:'roles',component:roles}, 
        {path:'rights',component:rights},  
        {path:'goods',component:goods},  
        {path:'params',component:params},  
        {path:'categories',component:categories},  
        {path:'orders',component:orders},  
        {path:'reports',component:reports},  
    ]},

]

// 实例化路由对象
const router = new VueRouter({
    routes
})

//暴露出去
export default router  