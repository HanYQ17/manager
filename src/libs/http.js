import axios from 'axios'  //导入axios

// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'


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
    return response;
  }, function (error) {
    return Promise.reject(error);
  });




//抽取网络请求的对象
const request = {  
    // 封装  方便后期维护
    login(params){
        return axios.post('login',params)
    },
    // 获取用户列表
    getUsers(params){
        return axios.get('users',{
            params,
            // headers:{Authorization:window.sessionStorage.getItem('token')}  //请求头,带token数据    使用了拦截器就不需要了
        })
    },
    // 修改用户状态 
    updateUserStatus(params){
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    // 添加用户
    addUser(params){
        return axios.post(`users`,params)
    },
    // 删除用户
    deleteUserById(id){
        return axios.delete(`users/${id}`)
    }
}

// 暴露一个包含install方法的对象,让外部可以Vue.use
export default {
    install(Vue){
        Vue.prototype.$request = request   //添加到Vue的原型上
    }
}