import axios from 'axios'  //导入axios

// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'


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
            // params:params,
            headers:{Authorization:window.sessionStorage.getItem('token')}  //请求头,带token数据
        })
    }
}

// 暴露一个包含install方法的对象,让外部可以Vue.use
export default {
    install(Vue){
        Vue.prototype.$request = request   //添加到Vue的原型上
    }
}