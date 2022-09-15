import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// /SPA
// 首屏加载速度很慢
// 路由懒加载
// ·使用到了路由页面，再去请求他

// 懒加载的chunk默认的名字是模块的路径
// /*webpackChunkName:"新名字"*/
// webpack魔法注释：/*webpackChunkName:"新名字" */
const routes = [
  // 一级路由
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      // 二级路由 页面四大模块
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
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  // 搜索路由
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
