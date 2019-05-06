import Vue from 'vue'
import App from './App.vue'


//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入路由
import router from './router'  


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
