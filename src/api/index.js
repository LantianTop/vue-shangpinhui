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