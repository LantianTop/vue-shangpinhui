// count路由组件的module store

const actions={
    increateOdd(context,value){
            if(context.state.count%2)
            context.commit("INCREASE",value);
    },
    wait(context,value){
         context.state.timer=setInterval(()=>{
            context.commit("INCREASE",value);
         },1000)
    }
};
const  mutations={
    INCREASE(context,value){
        state.count+=value;
    },
    DECREASE(context,value){
        state.count-=value;
    }

};
const state={
    count:0,
    timer:"",
    school:"湖科",
    subject:"cs",
};
// 类似计算属性，只是计算属性只能单组件使用，这个getter内所有属性值所有组件都可以通过store来读取
const getters={
     
};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}