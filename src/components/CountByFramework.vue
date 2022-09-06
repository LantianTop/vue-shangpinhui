<template>
    <div>
        <h1>当前求和值为:{{count}}</h1>
        <h3>我在:{{school}}</h3>
        <span>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increase(n)">+</button>
        <button @click="decrease(n)">-</button>
        <button @click="increateOdd(n)">当前求和为奇数再加</button>
        <button @click="increateWait(n)">等等再加</button>
        <button @click="remove">清除等等再加效果</button>
        </span>    
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from "vuex";
    export default {
        name:"CountByFramework",
        data(){
            return{
                n:1
            }
        },
        methods:{
          ...mapMutations("count",{increase:"INCREASE",decrease:"DECREASE"}),
          ...mapActions("count",{increateOdd:"increateOdd",increateWait:"wait"}),
          remove(){
             clearInterval(this.$store.state.count.timer)
          }
        },
        computed:{
          ...mapState("count",["count","school"]),
        }
    }
</script>

<style  scoped>
div{
    position: relative;
}
h1{
    position: absolute;
    left: 90vmin;
    top:20vmin;
}
span{
      position: absolute;
      left: 70vmin;
      top:40vmin;
}
button{
    margin-left: 2vmin;
    padding-left: 10px;
    text-align: center;
}

</style>