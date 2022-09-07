<template>
  <div>
    <router-view></router-view>
    <h1>{{ count }}</h1>
    <h1>十倍：{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击+10</button>
  </div>
</template>

<script>
// 下载vant
// yarn add vant@latest-v2 -S

// rem适配
// 1.让作m动起来
// yarn add amfe-flexible
// 2.盒子使用rem
// 自动识别css中的px，并将其转成rem

// post-css css的预处理器
// postcss 自己能干的事很少，下载插件

// 1.下载 yarn add postcss-pxtorem
// 2.告诉postcss,我要使用这个插件，.postcssrc.js

// mapState-->将vuex里面state映射到computed
// 使用
// -引入mapState:函数，返回一个对象
// 参数：['映射的属性门']

// mapGetters-->将vuex里面gettersl映射到computed

// mapMutations-->将vuex的mutations方法映射到nethods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  created() {
    console.log(this)
  },
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // },
    // ...展开内容
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 700px;
  height: 150px;
  background-color: deeppink;
}
</style>
