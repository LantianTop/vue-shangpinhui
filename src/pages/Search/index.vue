<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 面包屑内容 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeBread">x</i></li>
          </ul>
        </div>

        <SearchSelector @tradeMark="trademark" @attrInfo="attrInfo" />


        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"  v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  {mapState}  from "vuex";
  import SearchSelector from './SearchSelector';
  import { mapGetters } from "vuex";
  export default {
    name: 'Search',
    data(){
      return{
        // 向服务器发送的请求参数对象
        searchParams:{
          category1Id: '', // 一级分类ID
          category2Id: '', // 二级分类ID
          category3Id: '', // 三级分类ID
          categoryName: '', // 分类名称
          keyword: '', // 关键字
          trademark: '', // 品牌  "ID:品牌名称"
          props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          order: '', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
          pageNo: 1, // 当前页码
          pageSize: 5, // 每页数量
        }
      }
    },
    components: {
      SearchSelector
    },
    beforeMount(){
      // 将query和params里面的属性值，赋给searchParams
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
          this.getData();
    },
    computed:{
          // ...mapState({
          //   goodsList:state=>state.search.searchList.goodsList||[]
          // })
          ...mapGetters("search",["goodsList"])
    },
    methods:{
          // 向服务器发送请求获取search模块需要的数据
          //把这个请求封装为一个函数,在需要的时候调用请求.
          getData(){
            return  this.$store.dispatch("search/getSearchList",this.searchParams)
          },
          //把面包屑删除并且重发一次请求返回上一步的搜索结果
          // 这还不是最好的选择方式，因为即使把这四个字段置空，他们还是会被作为参数发送到服务器端,浪费了性能资源。
          // removeBread(){
          //    this.searchParams.categoryName='';
          //    this.searchParams.category1Id='';
          //    this.searchParams.category2Id='';
          //    this.searchParams.category3Id='';
          //    this.getData();
          // } 
          // 对于那些传递到服务端的参数，如果是可有可无的，将属性值置空还是会把相应的字段发送到服务端
          // 但是如果将属性值变为undefined,则不会将该属性值带给服务器。
          removeCategoryName(){
             this.searchParams.categoryName=undefined;
             this.searchParams.category1Id=undefined;
             this.searchParams.category2Id=undefined;
             this.searchParams.category3Id=undefined;
             this.getData();
            //  清除地址栏上的query参数：进行路由跳转
            // 但是需要注意的是，如果搜索路径中有params参数，不应该清除params参数。
            if(this.$route.params){
              this.$router.push({name:"Search",params:this.$route.params})
            }else{
              this.$router.push({name:"Search"})
            }
          },
          removeKeyword(){
                this.searchParams.keyword=undefined;
                this.getData();
                // 通知兄弟组件Header清除关键字
                this.$bus.$emit("clear");
                if(this.$route.query){
                  this.$router.push({name:"Search",query:this.$route.query})
                }else{
                  this.$router.push({name:"Search"})
                }     
          },
          // 自定义事件的触发
          trademark(t){
            this.searchParams.trademark=`${t.tmId}:${t.tmName}`;
            this.getData();
          },
          removeBread(){
            this.searchParams.trademark=undefined;
            this.getData();

          },
          attrInfo(attr,attrValue){
               var props=`${attr.attrId}:${attrValue}:${attr.attrName}`
               this.searchParams.props.push(props)
               this.getData()
          }

    },
    // 通过监听路由变化从而实现重新发送请求
    watch: {
        $route(newValue,oldValue){
          // 在发送请求之前重新整理好带给服务器的参数
          Object.assign(this.searchParams,this.$route.query,this.$route.params);
          console.log(this.searchParams)
          this.getData();
          // 每一次请求完毕，应该把相应的1,2,3级分类的id置空，让他接受下一次的相应1,2,3级分类
          // 分类名和关键字不用清理，因为每一次路由跳转都会赋予新的数据。
          this.searchParams.category1Id="";
          this.searchParams.category2Id="";
          this.searchParams.category3Id="";
        }
    }

  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>