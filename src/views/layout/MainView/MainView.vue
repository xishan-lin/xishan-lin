<script lang="ts">
export default {
  name: 'MainView'
}
</script>

<script setup lang="ts">
import LeftView from './LeftView.vue'
import RightView from './RightView.vue'

const carouselList = [
  {
    title: '系统重要更新公告',
    imgsrc: 'https://img.yzcdn.cn/vant/apple-3.jpeg',
    date: '2023-08-15',
    link: '/news/1'
  },
  {
    title: '新功能发布: 数据可视化模块上线',
    imgsrc: 'https://img.yzcdn.cn/vant/apple-2.jpeg',
    date: '2023-08-10',
    link: '/news/2'
  },
  {
    title: '关于系统维护的通知',
    imgsrc: 'https://img.yzcdn.cn/vant/apple-1.jpeg',
    date: '2023-08-05',
    link: '/news/3'
  }
]

const handleCarouselClick = (item: any) => {
  console.log('AAAAAAAA = ', item)
}
</script>

<template>
  <div style="width: 100%; padding: 0 20px; margin-top: 20px">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in carouselList" :key="item" @click="handleCarouselClick(item)">
        <h3 text="2xl" justify="center">{{ item }}</h3>
        <p class="title">AAA</p>
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
