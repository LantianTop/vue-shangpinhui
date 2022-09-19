<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" >
      <h2 class="all" @mouseleave="leave"  @mouseenter="enter" >全部商品分类</h2>
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
      <div class="sort"  v-show="show"  @mouseleave="leave"  @mouseenter="enter" >
        <!-- 利用事件委派+编程式导航实现路由的跳转和传递参数 -->
        <div class="all-sort-list2" @click="goSearch" >
          <div
            class="item"
            v-for="(c1, index) in categoryListReal"
            :key="c1.categoryId"
            :class="{ cur: currentIndex === index }"
          >
            <h3 @mouseenter="changeIndex(index)">
              <a
                :data-categoryName="c1.categoryName"
                :data-categoryId1="c1.categoryId"
                >{{ c1.categoryName }}</a
              >
            </h3>
            <div
              class="item-list clearfix"
              :style="{ display: currentIndex == index ? 'block' : 'none' }"
            >
              <div
                class="subitem"
                v-for="(c2, index) in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a
                      :data-categoryName="c2.categoryName"
                      :data-categoryId2="c2.categoryId"
                      >{{ c2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em
                      v-for="(c3, index) in c2.categoryChild"
                      :key="c3.categoryId"
                    >
                      <a
                        :data-categoryName="c3.categoryName"
                        :data-categoryId3="c3.categoryId"
                        >{{ c3.categoryName }}</a
                      >
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
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 接收state传过来的数据,方便进行按需修改
      categoryListR: [],
      // 默认索引值
      currentIndex: -1,
      // 当前组件三级联动界面是否展示
      show:true,
    };
  },
  computed: {
    // 数组表示，中括号里面categoryList表示ES6模块kv一致省略v,
    //下面一行代码的意思就是本组件计算属性为categoryList,这个计算属性
    //的返回值来自于store中home模块中的state里面的categoryList。前提需要在home模块中声明namespaced:true.不然无法找到子模块从而报错。
    // ...mapState("home", ["categoryList"]),
    categoryList(){
      return this.$store.state.home.categoryList;
    },
    categoryListReal() {
      this.categoryListR = this.categoryList;
      return this.categoryListR.slice(0, 15);
    },
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
    enter(){
      this.show=true;
    },
    leave(){
      this.currentIndex=-1;
      if(this.$route.path!="/home"){
        this.show=false;
      }
    },
    goSearch(event) {
      // 导航栏三级联动进行路由跳转
      // Q1:给三级联动最近的父节点添加点击事件,里面有很多标签（a,div,h3等）,如何确定点击的是什么标签
      // Q2:确定点击a标签后,如何区别是一级a标签还是二级a标签还是三级a标签
      // A1:浏览器默认会传入一个形参event,通过event.target可以获取点击的整个标签属性，
      // 通过event.target可以获取到a标签内容，但是其中还有被h3包住的a标签，如何查找定位a标签
      let element = event.target;
      //方法一.element.getAttribute("date-categoryName")可以获取到标签中date-categoryName属性的值
      //方法二:利用标签的nodeName找到最外层标签名,从而确定点击的是a还是h3,如果是被h3包住的a，不会
      // 显示a,而是显示h3.但是无法区别是哪一级列表
      // 方法三: 节点通过datasetAPI可以获取到自定义属性和属性值
      let { categoryname, categoryid2, categoryid1, categoryid3 } =element.dataset;
      console.log(element.dataset)
      if (categoryname) {
        // 此时已经确定点击的是a标签,不是的话categoryname为undefine,无法进入if循环
        // 整理下路由跳转的参数
        var location01 = { name: "Search" };
        var query = { categoryName: categoryname };
        if (categoryid1) {
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          query.category2Id = categoryid2;
        } else {
          query.category3Id = categoryid3;
        }
        location01.query = query;
      }
      if(this.$route.params){
        location01.params= this.$route.params;
      }
      // 编程式导航跳转路由
      this.$router.push(location01);
    },

  },
  // 组件挂载完毕，发送ajax请求获取服务器端数据
  mounted() {
    this.$store.dispatch("home/categoryList");
    if(this.$route.path!="/home"){
        this.show=false;
    }
  },
};
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
        .cur {
          background: skyblue;
          cursor: pointer;
        }
      }
    }
  }
}
</style>