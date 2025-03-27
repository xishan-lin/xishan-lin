<script lang="ts">
export default {
  name: 'RightView'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 处理item点击事件，跳转到对应路由
const handleItemClick = (route: string) => {
  console.log('跳转到路由：', route)
  router.push(route)
}

// 模拟页面入口数据
const pageEntries = ref([
  {
    id: 1,
    title: '数据分析报表',
    desc: '提供全面的数据可视化分析能力，帮助您快速洞察业务趋势和规律',
    image: 'https://via.placeholder.com/120x80?text=数据分析',
    date: '2023-08-15',
    author: '张三',
    route: '/data-analysis'
  },
  {
    id: 2,
    title: '项目管理工具',
    desc: '高效的项目管理工具，协助团队规划、跟踪和管理各类项目进度',
    image: 'https://via.placeholder.com/120x80?text=项目管理',
    date: '2023-08-10',
    author: '李四',
    route: '/project-management'
  },
  {
    id: 3,
    title: '客户信息管理',
    desc: '全方位管理客户信息，提高客户维护效率和服务质量',
    image: 'https://via.placeholder.com/120x80?text=客户管理',
    date: '2023-08-05',
    author: '王五',
    route: '/customer-management'
  },
  {
    id: 4,
    title: '文档协作平台',
    desc: '实时多人协作的文档编辑平台，提升团队协作效率',
    image: 'https://via.placeholder.com/120x80?text=文档协作',
    date: '2023-07-30',
    author: '赵六',
    route: '/document-collaboration'
  },
  {
    id: 5,
    title: '系统设置中心',
    desc: '集中管理系统各项设置，个性化配置系统功能和外观',
    image: 'https://via.placeholder.com/120x80?text=系统设置',
    date: '2023-07-25',
    author: '钱七',
    route: '/system-settings'
  },
  {
    id: 6,
    title: '系统设置中心',
    desc: '集中管理系统各项设置，个性化配置系统功能和外观',
    image: 'https://via.placeholder.com/120x80?text=系统设置',
    date: '2023-07-25',
    author: '钱七',
    route: '/system-settings'
  },
  {
    id: 7,
    title: '系统设置中心',
    desc: '集中管理系统各项设置，个性化配置系统功能和外观',
    image: 'https://via.placeholder.com/120x80?text=系统设置',
    date: '2023-07-25',
    author: '钱七',
    route: '/system-settings'
  },
  {
    id: 8,
    title: '系统设置中心',
    desc: '集中管理系统各项设置，个性化配置系统功能和外观',
    image: 'https://via.placeholder.com/120x80?text=系统设置',
    date: '2023-07-25',
    author: '钱七',
    route: '/system-settings'
  }
])
</script>

<template>
  <div class="right-view">
    <div class="section-header">
      <h2>功能导航</h2>
    </div>
    <el-divider />

    <div class="page-entries">
      <el-card
        v-for="item in pageEntries"
        :key="item.id"
        class="entry-card"
        shadow="hover"
        @click="handleItemClick(item.route)"
      >
        <div class="card-content">
          <div class="card-image">
            <el-image :src="item.image" fit="cover"></el-image>
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
    margin: 0 0 10px 0;
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
</style>
