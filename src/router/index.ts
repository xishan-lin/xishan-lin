import { createRouter, createWebHistory } from 'vue-router'

// 
import pc from './pc'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/p'
    },
    ...pc,
  ]
})

/**
 * 全局路由守卫，路由跳转前的拦截
 */
router.beforeEach((to, from, next) => {
  // 登录相关页面不需要验证
  const publicPages = ['/p/login', '/p/register'];
  const authRequired = !publicPages.includes(to.path);
  
  // 需要登录且未登录时重定向到登录页
  if (authRequired && !localStorage.getItem('token')) {
    next({ path: '/p/login' });
  } else {
    next();
  }
})

// 路由切换时
router.afterEach((to, from) => {
  console.log('router from: ', from);
  console.log('router to: ', to);
})

export default router
