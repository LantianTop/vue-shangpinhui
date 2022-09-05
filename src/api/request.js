// 对于axios进行二次封装,使用axios对象请求拦截器和响应拦截器
import axios from "axios";
// 引入进度条
import nprogress from  "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// 1.利用axios对象的方法create，创建一个axios实例

const  requests=axios.create({
    // 配置基础路径，每次请求都会带上/api
    baseURL:"/api",
    // ajax请求过了4s没有响应就关闭ajax请求
    timeout:4000,
});

// 配置请求拦截器,在发送请求之前，进行一些处理
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要,headers请求头
    // 进度条开始
    nprogress.start();
    return config;
})
// 配置响应拦截器
requests.interceptors.response.use((response)=>{
    // 成功的回调函数,服务器相应数据回来之后,响应拦截器可以检测到,并且进行一些处理
        // 进度条结束
        nprogress.done();
        return response.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error(error))
}
)

// 默认对外暴露
export default requests;