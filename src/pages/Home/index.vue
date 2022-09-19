<template>
  <div>
    <TypeNav />
    <List />
    <TodayRecommend />
    <GoodsRank />
    <GuessYouLike />
    <FamilyDevice v-for="(floor, index) in floorList" :key="index" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import List from "@/pages/Home/List";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import GoodsRank from "@/pages/Home/GoodsRank";
import GuessYouLike from "@/pages/Home/GuessYouLike";
import FamilyDevice from "@/pages/Home/FamilyDevice";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: {
    List,
    TodayRecommend,
    GoodsRank,
    GuessYouLike,
    FamilyDevice,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style>
</style>