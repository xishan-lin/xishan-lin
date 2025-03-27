const router = [
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

export default router;