import Vue from "vue";
import VueRouter from "vue-router";
import {createRouterGuards} from "./router-guards"
Vue.use(VueRouter);

const routes=[
    {
        path:"/home",
        name:"Home",
        component:()=>import("@/pages/Home"),
        meta:{
            title:"主页",
        }
    },
    {
        path:"/login",
        name:"Login",
        component:()=>import("@/pages/Login"),
        meta:{
            title:"登录",
        }
    },
    {
        path:"/register",
        name:"Register",
        component:()=>import("@/pages/Register"),
        meta:{
            title:"注册",
        }
    },
    {
        path:"/search",
        name:"Search",
        component:()=>import("@/pages/Search"),
        meta:{
            title:"查找",
        }
    }

]
const router = new VueRouter({
    routes
})
createRouterGuards(router)
export default router