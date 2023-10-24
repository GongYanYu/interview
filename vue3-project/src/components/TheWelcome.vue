<template>
  <div class="list" @scroll="scrollHandle" ref="list">
    <div class="item" v-for="(item,index) in renderList" :key="index"  :style="`height:${itemHeight}px;line-height:${itemHeight}px;transform:translateY(${top}px)`">
      {{item}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      list:[],//完整列表
      itemHeight:60,//每一项的高度
      renderList:[],//需要渲染的列表
      startIndex:0,//开始渲染的位置
      volume:0,//页面的容积:能装下多少个节点
      top:0,
      scroll,//用于初始化节流函数
    }
  },
  mounted() {
    this.initList();
    console.log(this.$refs.list)
    // 获取列表视口高度
    const cHeight= this.$refs.list.offsetHeight
    //  Math.ceil 向上取整 计算视口容纳的下节点个数并且设置缓存节点
    this.volume=Math.ceil(cHeight/this.itemHeight)+2;
    console.log(document.documentElement.clientHeight, cHeight,this.volume)
    //设置要渲染的列表 设置成能够容纳下的最大元素个数
    this.renderList=this.list.slice(0,this.volume);
    //初始化节流函数 最短50毫秒触发一次
    this.scroll=this.throttle(this.onScroll,50);
  },
  methods: {

    //初始化列表 ，循环渲染 500条
    initList(){
      for(let i=0;i<500;i++){
        this.list.push(i);
      }
    },

    scrollHandle(){
      this.scroll();
    },

    onScroll(){
      // scrollTop常量记录当前滚动的高度
      const scrollTop= this.$refs.list.scrollTop;
      // console.log(this.$refs.list.scrollTop)
      // 获取向上滚动的列表个数，计算开始渲染的节点
      const start=this.getCurStart(scrollTop);
      // 对比上一次的开始节点 比较是否发生变化，发生变化后便重新渲染列表
      if(this.startIndex!=start){
        // 计算列表向上移动的偏移量  被itemHeight整除的数来作为item的偏移量
        const startOffset = scrollTop - (scrollTop % this.itemHeight);
        // 使用slice拿到需要渲染的那一部分
        this.renderList=this.list.slice(start,this.startIndex+this.volume);
        // 利用css的translateY 实现列表的向上滚动及滚动条的变化
        //这里的 top 设置 translateY  transform:translateY(${top}px)
        this.top = startOffset;
      }
      this.startIndex=start;
    },
    getCurStart(scrollTop){
      // Math.floor 向下取整，获取滚动条向上滚动的列表个数
      return Math.floor(scrollTop/(this.itemHeight));
    },


    // 定时器 + 时间戳  首尾都执行
    throttle(fn, delay) {
      let timer, context, args;
      let lastTime = 0;
      return function () {
        context = this;
        args = arguments;

        let currentTime = new Date().getTime();
        // 清空定时器
        clearTimeout(timer);

        // 时间差 大于 delay 时
        if (currentTime - lastTime > delay) {
          // 防止时间戳和定时器重复

          // 清空定时器后直接 执行 fn
          fn.apply(context, args);
          lastTime = currentTime;
        } else {
          timer = setTimeout(() => {
            // 设置定时器 更新执行时间, 防止重复执行
            lastTime = new Date().getTime();
            // 执行后 清空定时器
            fn.apply(context, args);

          }, delay);
        }
      };
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.list{
  height: 100vh;
  overflow: scroll;
}
.item{
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
}
</style>
