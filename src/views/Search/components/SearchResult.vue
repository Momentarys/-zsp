<template>
  <div class="result">
    <!-- load滚动条为底的时候触发 -->
    <!-- model 调用为true  -->
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 引入搜索结果接口
import { getResultsAPI } from '@/api'
export default {
  props: {
    // 父组件传代表输入框内容
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 初始false加载 调为true 执行完改为false继续加载
      loading: false,
      // 页数
      page: 1,
      // 每页数据的数量
      perPage: 10,
      // 接收接口返回的查询结果
      results: [],
      // 加载到没有更多.
      finished: false,
      // 请求失败，点击重新加载
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 测试失败或成功
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        // 1.发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        // 如果页面数组的长度不等于 默认值为：10  数组可能只有两个
        // 不在加载 发送请求
        if (results.length !== this.perPage) {
          this.finished = true
        }
        // 2.保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        // 请求失败等于true
        this.error = true
      } finally {
        // 3.关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  // overlay和auto用法基本一致的
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
