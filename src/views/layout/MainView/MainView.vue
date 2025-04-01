<script lang="ts">
export default {
  name: 'MainView'
}
</script>

<script setup lang="ts">
import LeftView from './LeftView.vue'
import RightView from './RightView.vue'
import carouselData from '@/assets/data-ts/carousel-ts-json'
const handleCarouselClick = (item: any) => {
  console.log('AAAAAAAA = ', item)
}
</script>

<template>
  <div style="width: 100%; padding: 0 20px; margin-top: 20px">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="item in carouselData.dataList"
        :key="item"
        @click="handleCarouselClick(item)"
      >
        <div class="carousel-item-div">
          <img :src="item.imgsrc" alt="" />
          <div class="title-div">
            <div class="title">{{ item.title }}</div>
            <div class="date">{{ item.date }}</div>
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
