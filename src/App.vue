<template>
  <div>
    <Header></Header>
    <router-view/>
    <!-- 如何实现在登录界面和注册界面不显示Footer，在主界面和search界面显示Footer -->
    <!-- 1.选用v-show,因为v-show只是隐藏节点,相当于dispalay:none,而v-if直接把节点删除了,vue
    的设计本就是少直接操作DOM,转而通过diff虚拟DOM最后再统一生成真实DOM,极大的提高了性能 
    <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>,
    这种方式如果有几百个路由组件就很难写了，不推荐
    -->
    <!-- 2.通过路由元信息meta来配置 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: 'App',
  components:{Footer,Header}
}
</script>

<style>

</style>
