<script lang="ts">
export default {
  name: 'LeftView'
}
</script>

<script setup lang="ts">
import LinksData from './data/links-data'
import docsData from './data/docs-data';

const handleDocsClick = (item: any) => {
  console.log('点击了文档项：', item)
  // 这里可以添加路由跳转逻辑
}

const handleNewsLinkClick = (item: any) => {
  console.log('点击了新闻链接：', item)
  window.open(item.link, '_blank')
}
</script>

<template>
  <div class="left-view">
    <!-- 文档中心 -->
    <div class="module-card docs-section">
      <div class="section-header">
        <h3>文档中心</h3>
        <el-link type="primary" href="/docs">更多</el-link>
      </div>
      <el-divider />
      <ul class="docs-list">
        <li v-for="item in docsData.dataList" :key="item.id" @click="handleDocsClick(item)">
          <el-link :underline="false">
            <el-icon class="doc-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </el-link>
        </li>
      </ul>
    </div>

    <!-- 新闻链接 -->
    <div class="module-card news-links-section">
      <div class="section-header">
        <h3>新闻链接</h3>
        <el-link type="primary" href="/news-links">更多</el-link>
      </div>
      <el-divider />
      <ul class="news-links-list">
        <li v-for="item in LinksData.dataList" :key="item.id" @click="handleNewsLinkClick(item)">
          <el-link :underline="false">
            <el-icon class="link-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </el-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-view {
  padding: 0px;
}

.module-card {
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    font-size: 18px;
    margin: 0;
    color: #303133;
  }
}

.docs-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.doc-icon {
  margin-right: 8px;
  vertical-align: middle;
}

.link-icon {
  margin-right: 8px;
  vertical-align: middle;
  color: #409EFF;
}

.news-links-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.docs-section {
  // 移除margin-top，因为已经通过module-card的margin-bottom提供了间距
}
</style> 