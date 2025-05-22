<template>
  <div class="article-detail" v-if="!is404">
    <h1 class="title">{{ curArticleInfo?.title }}</h1>
    <div class="meta">
      <span class="author">作者：{{ curArticleInfo?.author }}</span>
      <span class="date">发布时间：{{ curArticleInfo?.createdAt }}</span>
      <span class="date">更新时间：{{ curArticleInfo?.updatedAt }}</span>
    </div>
    <div class="content">
      <MarkdownComp
        v-if="curArticleInfo?.fileSuffix === ArticleFileSuffix.MD"
        :markdownFilePath="curArticleInfo?.fileSrc"
      />
      <div v-else v-html="htmlContent"></div>
    </div>
    <div
      class="article-nav"
      style="display: flex; justify-content: space-between; margin-top: 40px"
    >
      <button :disabled="id <= 1" @click="goToArticle(id - 1)">上一篇</button>
      <button :disabled="id >= 10" @click="goToArticle(id + 1)">下一篇</button>
    </div>
  </div>
  <div v-else class="not-found">
    <img src="@/assets/images/common/404.svg" alt="404" />
    <p>很抱歉，未找到对应的文章。</p>
    <button @click="goHome">返回首页</button>
    <button @click="goBack" style="margin-left:12px;">返回上一页</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownComp from '@/components/MarkdownComp/MarkdownComp.vue'
// 文章类型
import type { ArticleListItemType } from '@/assets/articles-list-data/ArticleListItemType'
import { ArticleFileSuffix } from '@/assets/articles-list-data/ArticleListItemType'
// 文章列表数据
import { articlesListData } from '@/assets/articles-list-data/articles-list-data'
// 获取当前文章信息
const curArticleInfo = ref<ArticleListItemType | null>(null)

const htmlContent = ref<any>(null)

// 获取路由参数query
const route = useRoute()
const router = useRouter()
const id = computed(() => Number(route.params.id))

const is404 = ref(false)

watch(id, (newId) => {
  curArticleInfo.value = articlesListData.filter((item) => item.id === newId)[0]
  // 如果当前文章信息为空，则设置404
  if (!curArticleInfo.value) {
    is404.value = true
    return
  } else {
    is404.value = false
  }
  if (curArticleInfo.value?.fileSuffix === ArticleFileSuffix.HTML) {
    loadArticle_Html()
  } else {
    htmlContent.value = null
  }
}, { immediate: true })

function goToArticle(newId: number) {
  if (newId < 1 || newId > 10) return
  router.push({
    path: `/article/${newId}`
  })
}

// 获取html类型的文章内容
async function loadArticle_Html() {
  if (!curArticleInfo.value?.fileSrc) return
  try {
    const response = await fetch(curArticleInfo.value.fileSrc)
    if (!response.ok) {
      throw new Error('Failed to fetch article')
    }
    const text = await response.text();
    htmlContent.value = text;
  } catch (e) {
    htmlContent.value = '未找到对应文章'
  }
}

function goHome() {
  router.push({ path: '/' })
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.article-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
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

    :deep(.header) {
      background-color: #f0f0f0;
    }

    :deep(img),
    :deep(video),
    :deep(iframe) {
      display: block;
      margin: 24px auto;
      border-radius: 8px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
    }
    :deep(h1) {
      font-size: 2.4rem;
      font-weight: bold;
      color: red;
      margin-bottom: 16px;
    }
    :deep(h2) {
      font-size: 2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 14px;
    }
    :deep(h3) {
      font-size: 1.8rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 12px;
    }
    :deep(p) {
      margin: 16px 0;
      // 首行缩进
      text-indent: 2em;
    }

  }
}

.not-found {
  text-align: center;
  padding: 80px 0;
  color: #888;
  img {
    display: block;
    margin: 0 auto 24px;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }
  button {
    background: #409eff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 8px 24px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #3076c9;
    }
  }
}
</style>
