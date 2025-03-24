<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.replace('/p')
  }
})

const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
themeMedia.addEventListener('change', (e) => {
  if (e.matches) {
    console.log('light')
  } else {
    console.log('dark')
  }
})

// 监听页面变化缩放
window.addEventListener('prefers-color-scheme', (e) => {
  console.log('prefers-color-scheme', e)
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
