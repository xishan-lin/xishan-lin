const router = [
  {
    path: '/docs/download/genealogy',
    name: 'docs-download-genealogy',
    component: () => import('@/views/docs/genealogy/GenealogyDownload.vue')
  },
  {
    path: '/docs/download/linsumen',
    name: 'docs-download-linsumen',
    component: () => import('@/views/docs/linsumen/LinSuMenDownload.vue')
  },
  {
    path: '/docs/download/linpu',
    name: 'docs-download-linpu',
    component: () => import('@/views/docs/linpu/LinPuDownload.vue')
  },
  {
    path: '/docs/download/linpu/jimoxianzhi',
    name: 'docs-download-linpu-jimoxianzhi',
    component: () => import('@/views/docs/linpu/LinPuDownLoad_JiMo.vue')
  }
]

export default router;