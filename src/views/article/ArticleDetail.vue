<template>
  <div class="article-detail">
    <h1 class="title">{{ article.title }}</h1>
    <div class="meta">
      <span class="author">作者：{{ article.author }}</span>
      <span class="date">发布时间：{{ formatDate(article.createdAt) }}</span>
      <span class="date">更新时间：{{ formatDate(article.updatedAt) }}</span>
    </div>
    <div class="content" v-html="article.content"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'

// 通过路由参数获取 id
const route = useRoute()
const id = computed(() => Number(route.params.id))

interface Article {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  content: string; // HTML字符串，包含图片、视频等
}

const article = ref<Article>({
  title: '示例文章标题',
  author: '张三',
  createdAt: '2024-06-01T10:00:00Z',
  updatedAt: '2024-06-02T12:00:00Z',
  content: `
    <video controls style="max-width:100%;margin:16px 0;">
      <source src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" type="video/mp4">      
      您的浏览器不支持 video 标签。
    </video>
    
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" style="max-width:100%;margin:16px 0;" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    
    `,
  // content: `
  //   <p>这是文章的主体内容，可以包含图片和视频。</p>
  //   <img src="https://via.placeholder.com/600x300" alt="示例图片" style="max-width:100%;margin:16px 0;" />

  //   <video controls style="max-width:100%;margin:16px 0;">
  //     <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  //     您的浏览器不支持 video 标签。
  //   </video>

  //   <img src="https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/001.jpg" alt="示例图片" style="max-width:100%;margin:16px 0;" />

  //   <video controls style="max-width:100%;margin:16px 0;">
  //     <source src="https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/video-demos/001.mp4" type="video/mp4">      
  //     您的浏览器不支持 video 标签。
  //   </video>

  //   <video controls style="max-width:100%;margin:16px 0;">
  //     <source src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" type="video/mp4">      
  //     您的浏览器不支持 video 标签。
  //   </video>

  //   <iframe src="//player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

  //   <p>更多内容……</p>
  // `,
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString();
}

onMounted(() => {
  // 这里可以添加获取文章详情的逻辑
  console.log('id.value =====> ', id.value)
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
