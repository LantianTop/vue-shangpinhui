// home模块存储仓库
import {reqCategoryList,reqBannerList} from "@/api"
const actions={
        // 通过API里面的接口函数调用,向服务器发送请求,从而获取服务器的数据
        // async  await 表示直接拿到promise成功的结果
        async  categoryList({commit}){
            let  result = await  reqCategoryList();
            if(result.code===200){
                commit("CATEGORYLIST",result.data);
            }
        },
        async getBannerList({commit}){
            let  result= await reqBannerList();
            if(result.RespondCode===200){
                commit("GETBANNERLIST",result.data)
            }
        }
};
const  mutations={
    CATEGORYLIST(state,categoryList){
            state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
          state.bannerList=bannerList;
    }  

};
const state={
    categoryList:[],
    bannerList:[],
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