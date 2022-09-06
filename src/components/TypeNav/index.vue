<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2">
          <div class="item"  
              v-for="(c1,index) in categoryListReal " 
              :key="c1.categoryId" 
              :class="{cur:currentIndex===index}"
            >
            <h3 @mouseenter="changeIndex(index)" @mouseleave="resetIndex" >
              <a href="">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix"  :style="{display:currentIndex==index?'block':'none'}"  >
              <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a href="">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                      <a href="">{{c3.categoryName}}</a>
                    </em>
  
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"; 
export default {
    name:"TypeNav",
    data(){
      return{
       // 接收state传过来的数据,方便进行按需修改
      categoryListR:[],
       // 默认索引值
      currentIndex:-1
    }
    },
    computed:{
      // 数组表示，中括号里面categoryList表示ES6模块kv一致省略v,
      //下面一行代码的意思就是本组件计算属性为categoryList,这个计算属性
      //的返回值来自于store中home模块中的state里面的categoryList。前提需要在home模块中声明namespaced:true.不然无法找到子模块从而报错。
      ...mapState("home",["categoryList"]),
      categoryListReal(){
         this.categoryListR=this.categoryList
         return this.categoryListR.slice(0,15) 
      }
    },
    methods:{
      changeIndex(index){
            this.currentIndex=index;
            console.log("鼠标进入"+index);
      },
      resetIndex(){
        this.currentIndex=-1
      }
    },
    // 组件挂载完毕，发送ajax请求获取服务器端数据
     mounted(){
        this.$store.dispatch("home/categoryList");
    }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 通过设置css实现二三级显示
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background: skyblue;
        }
      }
    }
  }
}
</style>