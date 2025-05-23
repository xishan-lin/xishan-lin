<script lang="ts">
export default {
  name: 'MainView'
}
</script>

<script setup lang="ts">
import LeftView from '../LeftView/LeftView.vue'
import RightView from '../RightView/RightView.vue'
import { useRouter } from 'vue-router'

// 文章列表数据
import { articlesListData } from '@/assets/articles-list-data/articles-list-data'
import type { ArticleListItemType } from '@/assets/articles-list-data/ArticleListItemType'
import { ArticleType } from '@/assets/articles-list-data/ArticleListItemType'
// 轮播图数据id
const carouselData_Ids = [1, 2, 3, 4]
// 从文章列表数据中筛选出轮播图数据
const carouselData = articlesListData.filter((item) => carouselData_Ids.includes(item.id))

// 路由
const router = useRouter()

// 轮播图点击事件
const handleCarouselClick = (item: ArticleListItemType) => {
  router.push({
    path: `/article/${item.id}`
  })
}
</script>

<template>
  <div style="width: 100%; padding: 0 20px; margin-top: 20px">
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="item in carouselData" :key="item" @click="handleCarouselClick(item)">
        <div class="carousel-item-div" style="position: relative;">
          <!-- 斜横幅标记文章类型 -->
          <div
            class="ribbon"
            :class="item.articleType === ArticleType.INFORM ? 'inform' : 'article'"
          >
            {{ item.articleType === ArticleType.INFORM ? '通知' : '文章' }}
          </div>
          <img :src="item.avatar" alt="" />
          <div class="title-div">
            <div class="title">{{ item.title }}</div>
            <div class="date">{{ item.createdAt }}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="main-view">
    <!-- 左右布局容器 -->
    <div class="main-container">
      <!-- 左侧区域：新闻和文档链接 -->
      <div class="left-section">
        <LeftView />
      </div>

      <!-- 右侧区域：页面入口列表 -->
      <div class="right-section">
        <RightView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel-item-div {
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ribbon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    transform: rotate(-45deg) translate(-28px, -20px);
    background: #409eff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    &.inform {
      background: #e67e22;
    }
    &.article {
      background: #409eff;
    }
  }

  .title-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #fff;
    font-weight: bold;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);

    .title {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-left: 20px;
    }

    .date {
      font-size: 12px;
      color: #fff;
      margin-right: 20px;
    }
  }
}

.main-view {
  width: 100%;
  min-height: 600px;
  padding: 20px 0;
}

.main-container {
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
}

.left-section {
  width: 300px;
  flex-shrink: 0;
}

.right-section {
  flex: 1;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .left-section {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
@/views/layout/MainView/MainView/carousel-ts-json
