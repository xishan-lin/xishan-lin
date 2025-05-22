<script lang="ts">
export default {
  name: 'RightView'
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

// 文章列表数据
import { articlesListData } from '@/assets/articles-list-data/articles-list-data'
import type { ArticleListItemType } from '@/assets/articles-list-data/ArticleListItemType'
import { ArticleType } from '@/assets/articles-list-data/ArticleListItemType'

const showFilter = ref(true)
const isReverse = ref(false)
const sortField = ref('id')

// 路由
const router = useRouter()

// 处理item点击事件，跳转到对应路由
const handleItemClick = (item: ArticleListItemType) => {
  router.push({
    path: `/article/${item.id}`
  })
}


// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return sortedArticles.value.slice(start, start + pageSize.value)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

// 筛选相关
const filterOptions = [
  { label: '通知', value: ArticleType.INFORM },
  { label: '文章', value: ArticleType.ARTICLE }
]
const selectedTypes = ref([ArticleType.INFORM, ArticleType.ARTICLE])

const isAllChecked = computed(() => selectedTypes.value.length === filterOptions.length)
const isIndeterminate = computed(() => selectedTypes.value.length > 0 && selectedTypes.value.length < filterOptions.length)

function handleCheckAllChange(val: boolean) {
  selectedTypes.value = val ? filterOptions.map(opt => opt.value) : []
}

function handleTypeChange(val: string[]) {
  // 这里可以根据需要处理筛选逻辑
  console.log('handleTypeChange ====>', val);
}


// 数据筛选 + 过滤
const selectedTags = ref<string[]>([])
const allTags = computed(() => {
  // 合并所有 tags 数组并去重
  return Array.from(new Set(articlesListData.flatMap((item) => item.tags)))
})

const filteredArticles = computed(() => {
  // 类型过滤
  let filtered = articlesListData.filter((item) => selectedTypes.value.includes(item.articleType))
  // 标签过滤
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(item => item.tags.some(tag => selectedTags.value.includes(tag)))
  }
  console.log('filteredArticles =====>', filtered);
  return filtered
})

const sortedArticles = computed(() => {
  // 排序字段和顺序
  const field = sortField.value as 'id' | 'createdAt' | 'updatedAt'
  const reverse = isReverse.value
  // 拷贝一份，避免直接排序原数组
  const arr = [...filteredArticles.value]
  arr.sort((a, b) => {
    let result = 0
    if (field === 'id') {
      result = a.id - b.id
    } else if (field === 'createdAt' || field === 'updatedAt') {
      result = a[field].localeCompare(b[field])
    }
    return reverse ? -result : result
  })
  console.log('sortedArticles =====>', arr, currentPage.value);
  return arr
})

</script>

<template>
  <div class="right-view">
    <div class="section-header">
      <div class="header-row">
        <h2>最新动态</h2>
        <el-button type="primary" @click="showFilter = !showFilter">
          <el-icon><Filter /></el-icon>
          筛选
        </el-button>
      </div>

      <div class="filter-section-1" v-if="showFilter">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="isAllChecked"
          @change="handleCheckAllChange"
        >全部</el-checkbox>
        <el-checkbox-group v-model="selectedTypes" @change="handleTypeChange">
          <el-checkbox
            v-for="opt in filterOptions"
            :key="opt.value"
            :value="opt.value"
          >{{ opt.label }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="filter-section-2" v-if="showFilter">
        <el-select
          v-model="selectedTags"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          placeholder="选择标签筛选"
          style="width: 200px"
        >
          <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag" />
        </el-select>

        <div class="sort-section">
          <el-switch
            v-model="isReverse"
            active-text="逆序"
            inactive-text="倒序"
            style="margin-left: 16px"
          />

          <el-select
            v-model="sortField"
            placeholder="选择排序字段"
            style="width: 200px; margin-left: 16px"
          >
            <el-option label="文章ID" value="id" />
            <el-option label="创建时间" value="createdAt" />
            <el-option label="更新时间" value="updatedAt" />
          </el-select>
        </div>
      </div>

    </div>

    <el-divider />

    <div class="page-entries">
      <el-card
        v-for="item in pagedArticles"
        :key="item.id"
        class="entry-card"
        shadow="hover"
        @click="handleItemClick(item)"
      >
        <div class="card-content">
          <div class="id-div">
            <span class="id-text">{{ item.id }}</span>
          </div>
          <div class="card-image">
            <div
              class="ribbon"
              :class="item.articleType === ArticleType.INFORM ? 'inform' : 'article'"
            >
              {{ item.articleType === ArticleType.INFORM ? '通知' : '文章' }}
            </div>
            <el-image :src="item.avatar" fit="cover"></el-image>
          </div>
          <div class="card-info">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-meta">
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                {{ item.createdAt }}
              </span>
              <span class="meta-item">
                <el-icon><User /></el-icon>
                {{ item.author }}
              </span>
              <span class="meta-item">
                <el-icon><Folder /></el-icon>
                {{ item.category }}
              </span>
              <span class="meta-item">
                <el-icon><CollectionTag /></el-icon>
                <template v-for="tag in item.tags" :key="tag">
                  <el-tag size="small" style="margin-right: 4px">{{ tag }}</el-tag>
                </template>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 分页组件 -->
    <div class="pagination-section">
      <el-select
        v-model="pageSize"
        placeholder="每页条数"
        style="width: 100px"
        @change="currentPage = 1"
      >
        <el-option v-for="size in [2,5,10,15,20]" :key="size" :label="size + ' 条/页'" :value="size" />
      </el-select>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="sortedArticles.length"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
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
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 20px;
      color: #303133;
      margin: 0 0 0 0;
    }
  }

  .filter-section-1 {
    display: flex; 
    align-items: center; 
    gap: 0px; 
    margin-top: 10px;

    :deep(.el-checkbox) {
      margin-right: 8px;
    }
  }

  .filter-section-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: 10px;
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
  position: relative;
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;

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
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

    &.inform {
      background: #e67e22;
    }
    &.article {
      background: #409eff;
    }
  }

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
  gap: 20px;
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

.pagination-section {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 16px;
  margin-top: 24px;
}

</style>
