<template>
  <div>
    <article-item v-for="item in articles" :key="item.art_id" :article="item">
    </article-item>
  </div>
</template>

<script>
// 发送请求拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
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
    }
  }
}
</script>

<style></style>
