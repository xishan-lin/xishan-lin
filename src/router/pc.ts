const pc = [
  {
    path: '/p',
    name: 'p',
		component: () => import('@/views/index.vue')
  },
  {
    path: '/p/login',
    name: 'pc-login',
    component: () => import('@/views/auth/LoginView/index.vue')
  },
  {
    path: '/p/register',
    name: 'pc-register',
    component: () => import('@/views/auth/RegisterView/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
		component: () => import('@/views/demo/index.vue')
  },
  {
    path: '/demo-vueuse',
    name: 'demo-vueuse',
		component: () => import('@/views/demo/vueuse-demo.vue')
  },
  {
    path: '/pdf-once-view',
    name: 'pdf-once-view',
		component: () => import('@/views/pdf/PDFOnceView/index.vue')
  },
  {
    path: '/pdf-all-view',
    name: 'pdf-all-view',
		component: () => import('@/views/pdf/PDFAllView/index.vue')
  }
]

export default pc;