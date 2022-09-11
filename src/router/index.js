import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    //  SPA
    //  首屏加载速度很慢
    //  路由懒加载
    //  - 使用到了页面，再去请求他
    // /* webpankChunkName:新名字 */    减少发请求的次数
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:'base' */ '@/views/video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:'base' */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/my')
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
