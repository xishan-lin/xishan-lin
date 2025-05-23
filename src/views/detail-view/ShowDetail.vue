<template>
  <div v-if="loading" class="loading-mask">
    <div class="loading-spinner"></div>
    <span>加载中...</span>
  </div>
  <div class="article-detail" v-if="!is404">
    <!-- <h1 class="title">{{ curArticleInfo?.title }}</h1>
    <div class="meta">
      <span class="author">作者：{{ curArticleInfo?.author }}</span>
      <span class="date">发布时间：{{ curArticleInfo?.createdAt }}</span>
      <span class="date">更新时间：{{ curArticleInfo?.updatedAt }}</span>
    </div> -->
    <div class="content">
      <MarkdownComp
        v-if="curArticleInfo?.fileSuffix === ArticleFileSuffix.MD"
        :markdownFilePath="curArticleInfo?.fileSrc"
        @loaded="loading = false"
      />
      <div v-else v-html="htmlContent"></div>
    </div>
    <div class="article-nav">
      <el-button :disabled="id <= 1" @click="goToArticle(id - 1)">上一篇</el-button>
      <el-button :disabled="id >= maxId" @click="goToArticle(id + 1)">下一篇</el-button>
    </div>
  </div>
  <div v-else-if="is404" class="not-found">
    <img src="@/assets/images/common/404.svg" alt="404" />
    <p>很抱歉，未找到对应的文章。</p>
    <button @click="goHome">返回首页</button>
    <button @click="goBack" style="margin-left: 12px">返回上一页</button>
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
const loading = ref(false)

// 获取路由参数query
const route = useRoute()
const router = useRouter()
const id = computed(() => Number(route.params.id))

const is404 = ref(false)

const maxId = computed(() => Math.max(...articlesListData.map(item => item.id)))

watch(
  id,
  (newId) => {
    curArticleInfo.value = articlesListData.filter((item) => item.id === newId)[0]
    // 如果当前文章信息为空，则设置404
    if (!curArticleInfo.value) {
      is404.value = true
      loading.value = false
      return
    } else {
      is404.value = false
    }
    if (curArticleInfo.value?.fileSuffix === ArticleFileSuffix.HTML) {
      loading.value = true
      loadArticle_Html()
    } else if (curArticleInfo.value?.fileSuffix === ArticleFileSuffix.MD) {
      loading.value = true
      htmlContent.value = null
    } else {
      htmlContent.value = null
      loading.value = false
    }
  },
  { immediate: true }
)

function goToArticle(newId: number) {
  if (newId < 1 || newId > 10) return
  router.push({
    path: `/article/${newId}`
  })
}

// 获取html类型的文章内容
async function loadArticle_Html() {
  if (!curArticleInfo.value?.fileSrc) return
  loading.value = true
  try {
    const response = await fetch(curArticleInfo.value.fileSrc)
    if (!response.ok) {
      throw new Error('Failed to fetch article')
    }
    const text = await response.text()
    htmlContent.value = text
  } catch (e) {
    htmlContent.value = '未找到对应文章'
  } finally {
    loading.value = false
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
  max-width: 1200px;
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
      color: black;
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

  .article-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
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

.loading-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #409eff;
  border-top: 5px solid transparent; // #fff;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
