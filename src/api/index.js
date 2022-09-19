// 对项目所有的api接口进行统一管理

// 1.将对axios二次封装的request引入，此时request就是axios实例
import requests from "./request";
// 引入mockRequest.js
import mockRequest from  "./mockRequest"
// 导航栏三级列表接口
export const reqCategoryList=()=>requests({
    "url":"/product/getBaseCategoryList",
    "method":"get"
})
// 轮播图请求接口---->mock出来的数据
export const  reqBannerList=()=>mockRequest({
    "url":"/banner",
    "method":"get"
})
// 家用电器请求接口--->mock出来的数据
export const  reqFloorList=()=>mockRequest({
    "url":"/floor",
    "method":"get"
})
// 获取搜索模块数据  地址:/api/list  请求方式:POST  需要带参数
export const  reqGetSearchInfo=(params)=>requests({
    "url":"/list",
     method:"post",
     data:params
})

