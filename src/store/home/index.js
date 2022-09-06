// home模块存储仓库
import {reqCategoryList} from "@/api"
const actions={
        // 通过API里面的接口函数调用,向服务器发送请求,从而获取服务器的数据
        // async  await 表示直接拿到promise成功的结果
        async  categoryList({commit}){
            let  result = await  reqCategoryList();
            if(result.code===200){
                commit("CATEGORYLIST",result.data);
            }
        }
};
const  mutations={
    CATEGORYLIST(state,value){
            state.categoryList=value
    }  

};
const state={
    categoryList:[],
};
// 类似计算属性，只是计算属性只能单组件使用，这个getter内所有属性值所有组件都可以通过store来读取
const getters={
     
};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}