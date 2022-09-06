import Vue  from "vue";
import Vuex from "vuex";
// 引入子模块
import count from "@/store/count"

// 使用插件
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        count,
    }
})
