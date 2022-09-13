<template>
  <!-- 偶性 -->
  <!-- @Load:触底的时候触发Load事件 -->
  <!-- offset:滚动条和底部距离多少的时候触发Load事件，默认值是300px -->
  <!-- immediate-check:初宣染的时候是否执行礼oad事件，默认值是true -->
  <!-- -v-modeL="Loading" -->
  <!--Loading为true,Load事件不会被触发-->
  <!--Loading为时alse的时候load事件会被触发-->
  <!--Loading会Load事件执行后，被van-List组件自动设置为ture,需要手动的改为false -->
  <!-- finished:BooLean.false:Load事件会被触发true:Load事件不会被出发了，并且显示finished-text的文本 -->
  <div class="article">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <!-- list列表 -->
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多文章了~~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 子组件使用-->
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 发送请求拿到当前文章的详情数据
import { getArticles } from '@/api'
// 子组件引入
import ArticleItem from './ArticleItem'
export default {
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      // 接口数据 赋值
      articles: [],
      // 时间戳 赋值
      preTimestamp: '',
      // 调用时为true 结束时改为false

      // 是否处于加载状态，加载过程中不触发load事件
      // 下拉列表 初始值为false
      loading: false,
      // 是否已加载完成，加载完成后不再触发load事件
      // 默认值为 false
      finished: false,
      // 是否加载失败，加载失败后点击错误提示可以重新触发load事件，必须使用sync修饰符
      // 初始值为：false
      error: false,
      // 下拉刷新
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 三种时间戳的方法
    // new Date().valueof()
    // Date.now()
    // +new Date()
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
        console.log(this.articles)
        // 保存下一页的时间戳，用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        //   js的错误，上抛.507原封不动上抛·400上抛中文，
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    // 滑动更新数据
    async getNextPageArticle() {
      try {
        // 测试 百分之五十报错 在进行加载
        if (Math.random() < 0.5) {
          throw new Error()
        }
        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        console.log(data)
        // 如果是下滑加载, 将数据放在最后
        // 如果是下拉刷新，将数据放在最前
        // 2.添加到articles 将新获取的数据push到原数组里
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 定义变量为false 错之后为除
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4.更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: deeppink;
    border-radius: 10px;
  }
}
</style>
