import Vue from "vue";
import VueRouter from "vue-router";
import {createRouterGuards} from "./router-guards"
Vue.use(VueRouter);

const routes=[
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        name:"Home",
        component:()=>import("@/pages/Home"),
        meta:{
            title:"主页",
            show:true
        }
    },
    {
        path:"/login",
        name:"Login",
        component:()=>import("@/pages/Login"),
        meta:{
            title:"登录",
            show:false
        }
    },
    {
        path:"/register",
        name:"Register",
        component:()=>import("@/pages/Register"),
        meta:{
            title:"注册",
            show:false
        }
    },
    {
        path:"/search/:keyword",
        name:"Search",
        component:()=>import("@/pages/Search/"),
        meta:{
            title:"查找",
            show:true
        }
    }

]
const router = new VueRouter({
    routes
})
createRouterGuards(router)
export default router