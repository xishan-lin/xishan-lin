const router = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView/index.vue')
  },
]

export default router;