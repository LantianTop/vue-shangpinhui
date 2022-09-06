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
        <button @click="increase">+</button>
        <button @click="decrease">-</button>
        <button @click="increateOdd">当前求和为奇数再加</button>
        <button @click="increateWait">等等再加</button>
        <button @click="remove">清除等等再加效果</button>
        </span>    
    </div>
</template>

<script>
    export default {
        name:"count",
        data(){
            return{
                n:1
            }
        },
        methods:{
            increase(){
                this.$store.commit("count/INCREASE",this.n);
            },
            decrease(){
                this.$store.commit("count/DECREASE",this.n);
            },
            increateOdd(){
                this.$store.dispatch("count/increateOdd",this.n);
            },
            increateWait(){
                this.$store.dispatch("count/wait",this.n);
            },
            remove(){
                clearInterval(this.$store.state.count.timer);
            }
        },
        computed:{
            count(){
                return this.$store.state.count.count;
            },
            school(){
                return   this.$store.state.count.school;
            }
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