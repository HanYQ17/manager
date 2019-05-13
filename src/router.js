import Vue from 'vue' //导入vue
import VueRouter from 'vue-router'  //导入vue-router
Vue.use(VueRouter)  //use一下

// // 导入组件
// import login from './components/login.vue'
// import index from './components/index.vue'
// // 导入嵌套组件
// import users from './components/users.vue'
// import roles from './components/roles.vue'
// import rights from './components/rights.vue'
// import goods from './components/goods.vue'  //商品列表
// import params from './components/params.vue' //分类参数
// import categories from './components/categories.vue'  //商品分类
// import orders from './components/orders.vue'  //订单列表
// import reports from './components/reports.vue'  //数据报表
// import error from './components/error.vue'  //404页面
// // 再嵌套
// import goodsAdd from './components/goodsAdd.vue' 
// import goodsList from './components/goodsList.vue'


// 路由懒加载
// 导入组件
const login = () => import('./components/login.vue')
const index = () => import('./components/index.vue')
// 导入嵌套组件
const users = () => import('./components/users.vue')
const roles = () => import('./components/roles.vue')
const rights = () => import('./components/rights.vue')
const goods = () => import('./components/goods.vue')
const params = () => import('./components/params.vue')
const categories = () => import('./components/categories.vue')
const orders = () => import('./components/orders.vue')
const reports = () => import('./components/reports.vue')
const error = () => import('./components/error.vue')
// 再嵌套
const goodsAdd = () => import('./components/goodsAdd.vue')
const goodsList = () => import('./components/goodsList.vue')


// 路由规则
const routes = [
    // { path: '/', redirect: '/index' },
    { path: '/login', component: login },
    {
        path: '/', component: index, children: [
            { path: '', redirect: 'users' },  //重定向
            { path: 'users', component: users },  //嵌套路由不需要写 '/'
            { path: 'roles', component: roles },
            { path: 'rights', component: rights },
            {
                path: 'goods', component: goods, children: [
                    // {path:'',redirect:'goodsList'},  //重定向
                    { path: '', component: goodsList },
                    { path: 'goodsAdd', component: goodsAdd },
                ]
            },
            { path: 'params', component: params },
            { path: 'categories', component: categories },
            { path: 'orders', component: orders },
            { path: 'reports', component: reports },
            { path: 'error', component: error },

        ]
    },

]

// 实例化路由对象
const router = new VueRouter({
    mode: 'history',  //history模式: url优化,去掉#
    routes
})

// 注册导航守卫
router.beforeEach((to, from, next) => {
    /*  to 去哪的路由
        from 要离开的路由
        next()   //必须执行,不执行不会往后走了
    */
    //    console.log(to);
    if (to.matched.length == 0) {  //代表没有该页面
        next('/error')   //去到error错误页
        //  /error是绝对路径: 无论现在是什么路径,直接变为/error
        //  error是相对路径: 在现有路径下+error

    } else {
        next();
    }
})


//暴露出去
export default router  