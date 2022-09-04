export function createRouterGuards (router) {
    //全局前置路由守卫,在初始化的时候调用或者在每一次路由跳转之前调用
    router.beforeEach((to, from, next) => {
        if(to.meta.title)
        document.title = to.meta.title
        else
        document.title="主页"
      console.log(to,from)
      next()
    })
    //全局后置路由守卫,在初始化的时候调用或者每次路由切换后调用
    router.afterEach((to, from) => {
        console.log(to,from)
    })
    router.onError((error) => {
      console.log(error, '路由错误');
    })
  }