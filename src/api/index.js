// 对项目所有的api接口进行统一管理

// 1.将对axios二次封装的request引入，此时request就是axios实例
import requests from "./request";

// 三级联动接口
export const reqCategoryList=()=>requests({
    "url":"/product/getBaseCategoryList",
    "method":"get"
})
