<script lang="ts">
export default {
  name: 'LeftView'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟新闻数据
const newsList = ref([
  { id: 1, title: '系统重要更新公告', link: '/news/1', date: '2023-08-15' },
  { id: 2, title: '新功能发布: 数据可视化模块上线', link: '/news/2', date: '2023-08-10' },
  { id: 3, title: '关于系统维护的通知', link: '/news/3', date: '2023-08-05' },
  { id: 4, title: '用户操作手册已更新', link: '/news/4', date: '2023-07-30' },
  { id: 5, title: '年度用户大会预告', link: '/news/5', date: '2023-07-25' }
])

// 模拟文档数据
const docsList = ref([
  { id: 1, title: '用户操作手册', link: '/docs/user-manual', icon: 'Document' },
  { id: 2, title: 'API文档', link: '/docs/api', icon: 'Connection' },
  { id: 3, title: '常见问题', link: '/docs/faq', icon: 'QuestionFilled' },
  { id: 4, title: '最佳实践指南', link: '/docs/best-practices', icon: 'Star' },
  { id: 5, title: '更新日志', link: '/docs/changelog', icon: 'List' }
])

const handleNewsClick = (item: any) => {
  console.log('点击了新闻项：', item)
  // 这里可以添加路由跳转逻辑
}

const handleDocsClick = (item: any) => {
  console.log('点击了文档项：', item)
  // 这里可以添加路由跳转逻辑
}
</script>

<template>
  <div class="left-view">
    <!-- 新闻模块 -->
    <div class="news-section">
      <div class="section-header">
        <h3>最新动态</h3>
        <el-link type="primary" href="/news">更多</el-link>
      </div>
      <el-divider />
      <ul class="news-list">
        <li v-for="item in newsList" :key="item.id" @click="handleNewsClick(item)">
          <el-link :underline="false">{{ item.title }}</el-link>
          <span class="news-date">{{ item.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 文档模块 -->
    <div class="docs-section">
      <div class="section-header">
        <h3>文档中心</h3>
        <el-link type="primary" href="/docs">更多</el-link>
      </div>
      <el-divider />
      <ul class="docs-list">
        <li v-for="item in docsList" :key="item.id" @click="handleDocsClick(item)">
          <el-link :underline="false">
            <el-icon class="doc-icon">
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
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

.news-list,
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

.news-date {
  font-size: 12px;
  color: #909399;
}

.doc-icon {
  margin-right: 8px;
  vertical-align: middle;
}

.docs-section {
  margin-top: 20px;
}
</style> 