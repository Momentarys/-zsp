import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// /SPA
// 首屏加载速度很慢
// 1路由懒加载
// ·使用到了路由页面，再去请求他

/* webpackChunkName: "base" */
const routes = [
  // 一级路由
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      // 二级路由
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */'@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */'@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
