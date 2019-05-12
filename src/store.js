import Vue from 'vue'  //导入vue
import Vuex from 'vuex' //导入vuex,需先安装
Vue.use(Vuex)  //use一下
// 实例化仓库
const store = new Vuex.Store({
    state:{
        menuList:[]  //菜单列表
    },
    mutations:{
        changeMenuList(state,newMenuList){
            state.menuList = newMenuList
        }
    }
})

// 暴露出去
export default store