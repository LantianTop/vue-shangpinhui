
import Mock from "mockjs";

// 引入mock数据
// webpack引入图片和json文件默认都是对外暴露的

import banner from  "./banners.json"
import  floor from  "./floors.json"

// mock数据,第一个参数请求参数,第二个参数要请求数据
Mock.mock("/mock/banner",{RespondCode:200,data:banner})
Mock.mock("/mock/floor",{RespondCode:200,data:floor})