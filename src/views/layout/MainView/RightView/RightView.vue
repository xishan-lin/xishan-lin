<script lang="ts">
export default {
  name: 'RightView'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import mainListData from './data/main-list-data'

const router = useRouter()

// 处理item点击事件，跳转到对应路由
const handleItemClick = (route: string) => {
  console.log('跳转到路由：', route)
  router.push(route)
}

// 模拟页面入口数据
const pageEntries = ref(mainListData.dataList)
</script>

<template>
  <div class="right-view">
    <div class="section-header">
      <h2>最新动态</h2>
    </div>

    <el-divider />

    <div class="page-entries">
      <el-card
        v-for="item in pageEntries"
        :key="item.id"
        class="entry-card"
        shadow="hover"
        @click="handleItemClick(item.link)"
      >
        <div class="card-content">
          <div class="id-div">
            <span class="id-text">{{ item.id }}</span>
          </div>
          <div class="card-image">
            <el-image :src="item.imgSrc" fit="cover"></el-image>
          </div>
          <div class="card-info">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-meta">
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                {{ item.date }}
              </span>
              <span class="meta-item">
                <el-icon><User /></el-icon>
                {{ item.author }}
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-view {
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.section-header {
  h2 {
    font-size: 20px;
    color: #303133;
    margin: 0 0 0 0;
  }
}

.page-entries {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.entry-card {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.card-image {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;

  .el-image {
    width: 100%;
    height: 100%;
  }
}

.card-info {
  flex: 1;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #303133;
}

.card-desc {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;

  .el-icon {
    margin-right: 4px;
  }
}

.id-div {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 8px;
  width: fit-content;

  .id-text {
    font-size: 12px;
    color: #409eff;
    font-weight: 600;
  }
}
</style>
@/views/layout/MainView/MainView/data/main-list-ts-json
