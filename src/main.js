import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from  "@/store";
// 引入mockServer.js------->拿到想要数据
import "@/mock/mockServer"
//引入swiper样式
import "swiper/css/swiper.css"
Vue.config.productionTip = false
// 将TypeNav组价注册为全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  // 定义全局事件总线
  beforeCreate(){
      Vue.prototype.$bus=this;
  },
  router,
  store
}).$mount('#app')
