import axios from 'axios'  //导入axios

//抽取网络请求的对象
const request = {  
    sayHi(){
        console.log('safd');
    }
}

// 暴露一个包含install方法的对象,让外部可以Vue.use
export default {
    install(Vue){
        Vue.prototype.$request = request   //添加到Vue的原型上
    }
}