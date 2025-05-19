<template>
  <div class="article-detail">
    <h1 class="title">{{ article.title }}</h1>
    <div class="meta">
      <span class="author">作者：{{ article.author }}</span>
      <span class="date">发布时间：{{ formatDate(article.createdAt) }}</span>
      <span class="date">更新时间：{{ formatDate(article.updatedAt) }}</span>
    </div>
    <div class="content" v-html="article.content"></div>
    <div class="article-nav" style="display: flex; justify-content: space-between; margin-top: 40px;">
      <button :disabled="id <= 1" @click="goToArticle(id - 1)">上一篇</button>
      <button :disabled="id >= 10" @click="goToArticle(id + 1)">下一篇</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter();
const id = computed(() => Number(route.params.id))
const article = ref<any>(null);

async function loadArticle(id: number) {
  try {
    const module = await import(`./inform-list-data/demo${id}.ts`);
    article.value = module.article;
  } catch (e) {
    article.value = { title: '未找到', author: '', createdAt: '', updatedAt: '', content: '未找到对应文章' };
  }
}

watch(id, (newId) => {
  loadArticle(newId);
}, { immediate: true });

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString();
}

function goToArticle(newId: number) {
  if (newId < 1 || newId > 10) return;
  router.push({ name: route.name as string, params: { id: newId } });
}

onMounted(() => {
  loadArticle(id.value);
});
</script>

<style lang="scss" scoped>
.article-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  .title {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #222;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    font-size: 1rem;
    color: #888;
    margin-bottom: 32px;
    .author {
      font-weight: 500;
    }
    .date {
      font-style: italic;
    }
  }
  .content {
    font-size: 1.2rem;
    line-height: 2;
    color: #333;
    img, video {
      display: block;
      margin: 24px auto;
      border-radius: 8px;
      box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    }
    p {
      margin: 16px 0;
    }
  }
}
</style>
