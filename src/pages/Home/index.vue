<template>
  <div>
    <TypeNav/>
    <List/>
    <TodayRecommend/>
    <GoodsRank/>
    <GuessYouLike/>
    <FamilyDevice/>
    <FamilyDevice/>
    <Brand/>
  </div>
</template>

<script>
import List from "@/pages/Home/List"
import TodayRecommend from "@/pages/Home/TodayRecommend"
import GoodsRank from "@/pages/Home/GoodsRank"
import GuessYouLike from "@/pages/Home/GuessYouLike"
import FamilyDevice from "@/pages/Home/FamilyDevice"
import Brand  from "@/pages/Home/Brand"
export default {
    name:"Home",
    components:{
      List,
      TodayRecommend,
      GoodsRank,
      GuessYouLike,
      FamilyDevice,
      Brand
    }
}
</script>

<style>

</style>