import { createRouter, createWebHistory } from 'vue-router'
//
import auth from './auth'
import demo from './demo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/family-tree',
      name: 'family-tree',
      component: () => import('@/views/family-tree/mainView/FamilyTreeView.vue')
    },
    {
      path: '/family-tree-detail/:id',
      name: 'family-tree-detail',
      component: () => import('@/views/family-tree/personalDetailView/PersonalDetailView.vue')
    },
    ...auth,
    ...demo
  ]
})

/**
 * 全局路由守卫，路由跳转前的拦截
 */
router.beforeEach((to, from, next) => {
  // 登录相关页面不需要验证
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  // 需要登录且未登录时重定向到登录页
  if (authRequired && !localStorage.getItem('token')) {
    // 暂不用注册页面
    // next({ path: '/login' })
    next()
  } else {
    next()
  }
})

// 路由切换时
router.afterEach((to, from) => {
  console.log('router from: ', from)
  console.log('router to: ', to)
})

export default router
