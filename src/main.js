import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from  "@/store";
Vue.config.productionTip = false
// 将TypeNav组价注册为全局组件
Vue.component(TypeNav.name,TypeNav)

new Vue({
  render: h => h(App),
  router,
  store,
  mounted(){
    console.log(this);
  }
}).$mount('#app')
