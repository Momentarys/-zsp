<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <!-- @search 回车触发 -->
      <!-- @focus 聚焦的时候不显示结果  有值显示建议 没值显示历史 -->
      <!-- @cancel 点击触发取消 -->
      <van-search
        class="search"
        v-model="keywords"
        background="#3696ed"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// 历史组件
import SearchHistory from './components/SearchHistory.vue'
// 建议组件
import SearchSuggestion from './components/SearchSuggestion.vue'
// 结果组件
import SearchResult from './components/SearchResult.vue'
// 引入vuex函数
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      // 输入框内容
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索厉史：搜索框的值空
      // 搜索建议：搜索框有值，并且不這染搜索结果
      // 搜索结果：触发搜索时显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // 到这里 this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 数据到这里  即不渲染搜索结果也不渲染搜索历史
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISRORIES']),
    // 子传父 suggestions[index] 索引 给函数的形参
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车2.点击了搜索建议
      // 存储搜索历史
      // 新的在前 旧的在后

      // 去重：1.获取没有去重的数组 2.放在new Set(arr) 3.[...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISRORIES(distinctHistories)
      // keywords 关键词 赋值给历史搜索框内容
      this.keywords = keywords
      // 展示搜索结果
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
// cLass 和 styLe属性的特殊
// vue自动帮你把class和style合并到组件的根节点上
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
>
