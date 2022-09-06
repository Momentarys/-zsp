<template>
  <div>
    <span class="toutiao toutiao-gengduo"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div>
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
export default {}
</script>

<style scoped>
.box {
  width: 700px;
  height: 150px;
  background-color: deeppink;
}
</style>
