<template>
  <div>
    <!-- 父传子 点击高亮和建议索引相同就进行跳转 -->
    <van-cell
      v-for="(item, index) in highLightsuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符：决定渲染SearchSuggestion
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串/变量,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionsAPI } from '@/api'
// lodash 防抖
import { debounce } from 'lodash'
export default {
  // 父传子 keywords代表输入框的内容
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 接收建议接口返回内容
      suggestions: []
    }
  },
  watch: {
    // 监听keywords 调用建议内容
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    // 计算属性 函数遍历
    highLightsuggestions() {
      // new RegExp 正则表达式  i代表不分大小写  g代表所有的输入内容返回多个 高亮
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,

          //   return str.replace(reg, (match) => `<span style="color:red">${match}</span>`
          //   替换正则输入内容 并返回新字符串
          // 前面传正则 后面传函数
          //   match匹配是大写就返回大写
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    // lpdash 节流方法
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        //   布尔值第一种写法
        //   this.suggestions = data.data.options.filter((item) => Boolean(item))
        //   布尔值第二种简写法
        // 建议接口内容赋值给suggestions
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
