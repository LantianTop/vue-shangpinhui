// search模块存储仓库
import {reqGetSearchInfo} from "@/api"
const actions={
        // 通过API里面的接口函数调用,向服务器发送请求,从而获取服务器的数据
        // async  await 表示直接拿到promise成功的结果
        async  getSearchList({commit},params){
            let  result = await  reqGetSearchInfo(params);
            if(result.code===200){
                commit("GETSEARCHLIST",result.data);
            }
        },
};
const  mutations={
    GETSEARCHLIST(state,searchList){
            state.searchList=searchList;
    }

};
const state={
    searchList:{},
};
// 类似计算属性，只是计算属性只能单组件使用，这个getter内所有属性值所有组件都可以通过store来读取
// 作用主要是简化组件拉取仓库中数据的操作，可以把将来在组件中要使用的数据进行处理简化。
const getters={
    attrsList(){
        return state.searchList.attrsList||[];
    },
    goodsList(){
        return state.searchList.goodsList||[];
    },
    trademarkList(){
        return state.searchList.trademarkList||[];
    }
};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}