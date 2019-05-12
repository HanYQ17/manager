import axios from 'axios'  //导入axios
import Vue from 'vue'  //导入Vue
import router from '../router'  //导入路由对象,才能使用编程式导航(跳转)

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'


// axios拦截器
// 请求拦截器   请求发送前执行
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器  响应回来之后执行
axios.interceptors.response.use(function (response) {
    if(response.data.meta.status==200){
        // Vue.prototype.$message.success(response.data.meta.msg)
    }else if(response.data.meta.status==400&&response.data.meta.msg=='无效token'){
        router.push('login')  //跳转
        new Vue().$message.error('伪造的token')  //提示
        sessionStorage.removeItem('token')  //清除伪造的token 
        response.data.data = []   //如果token无效,data.data是null,浏览器会报错,需要改成数组才不会报错
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});


//抽取网络请求的对象
const request = {
    // 封装  方便后期维护
    login(params) {
        return axios.post('login', params)
    },
    // 获取用户列表
    getUsers(params) {
        return axios.get('users', {
            params,
            // headers:{Authorization:window.sessionStorage.getItem('token')}  //请求头,带token数据    使用了拦截器就不需要了
        })
    },
    // 修改用户状态 
    updateUserStatus(params) {
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    // 添加用户
    addUser(params) {
        return axios.post(`users`, params)
    },
    // 删除用户
    deleteUserById(id) {
        return axios.delete(`users/${id}`)
    },
    // 根据ID查询用户信息
    getUserById(id) {
        return axios.get(`users/${id}`)
    },
    // 编辑用户
    updataUser(params) {
        return axios.put(`users/${params.id}`, { email: params.email, mobile: params.mobile })
    },
    // 获取角色列表
    getRoles() {
        return axios.get(`roles`)
    },
    // 修改分配用户角色
    updateUserRole(params) {
        return axios.put(`users/${params.id}/role`, { rid: params.rid })
    },
    // 添加角色
    addRoles(params) {
        return axios.post(`roles`, params)
    },
    // 删除角色
    deleteRoles(id){
        return axios.delete(`roles/${id}`)
    },
    // 根据ID查询角色
    getRoleById(id){
        return axios.get(`roles/${id}`)
    },
    // 编辑角色
    editRoles(params){
        return axios.put(`roles/${params.id}`,{
            roleName:params.roleName,
            roleDesc:params.roleDesc
        })
    },
    // 获取所有权限列表
    getListRights(){
        return axios.get(`rights/list`)
    },
    // 数据统计  获取数据报表
    getReports(){
        return axios.get(`reports/type/1`)
    },
    // 获取订单列表
    getOrderList(params){
        return axios.get(`orders`,{params})  //要有个对象
        // return axios.get(`orders`,params)  //这个做法是post请求,get请求会直接拼接在url后面
    },
    // 删除角色指定权限
    deleteRight(params){
        return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    },
    // 获取树形权限数据
    getRightsTree(){
        return axios.get(`rights/tree`)
    },
    // 角色授权
    setRoleRights(params){
        return axios.post(`roles/${params.roleId}/rights`,{
            rids:params.rids  //id,id,id....格式
        })
    },
    // 获取菜单
    getMenus(){
        return axios.get(`menus`)
    },
    
    
}

// 暴露一个包含install方法的对象,让外部可以Vue.use
export default {
    install(Vue) {
        Vue.prototype.$request = request   //添加到Vue的原型上
    }
}