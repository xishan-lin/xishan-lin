<template>
  <div v-if="isVerified" class="family-tree-view">
    <div class="stats-panel" v-show="showStatsPanel">
      <div class="stats-header">
        <span>家谱统计（含配偶）</span>
      </div>
      <div class="stats-content">
        <div>总人数：{{ stats.total }}</div>
        <div>男性：{{ stats.male }}</div>
        <div>女性：{{ stats.female }}</div>
        <div>在世：{{ stats.alive }}</div>
        <div>不在世：{{ stats.dead }}</div>
      </div>
    </div>

    <!-- 显示/隐藏家谱统计 -->
    <el-button class="show-btn" @click="showStatsPanel = !showStatsPanel">
      <el-icon v-if="showStatsPanel" size="20px"><DArrowLeft /></el-icon>
      <el-icon v-else size="20px"><DArrowRight /></el-icon>
    </el-button>

    <div class="tree-main-panel">
      <div class="search-div">
        <el-input
          v-model="filterNameText"
          placeholder="输入姓名筛选"
          clearable
          class="filter-input"
        />
        <el-input
          v-model="filterRankText"
          placeholder="输入排行筛选"
          clearable
          class="filter-input"
        />

        <el-button type="primary" @click="expandAll">全部展开</el-button>
        <el-button type="primary" @click="collapseAll">全部折叠</el-button>
      </div>

      <div class="moreFilter">
        <el-button class="more-btn" @click="showMoreFilter = !showMoreFilter" text>
          更多筛选
          <span :class="['arrow', showMoreFilter ? 'up' : 'down']"></span>
        </el-button>
        <div v-show="showMoreFilter" class="moreFilter-content">
          <!-- 代数 -->
          <el-checkbox-group
            v-model="checkList_generationType"
            style="display: flex; align-items: center; gap: 30px"
          >
            <div
              v-for="item in generationTypeOptions"
              :key="item.value"
              style="display: flex; align-items: center; gap: 8px"
            >
              <el-checkbox :value="item.value">{{ item.label }}</el-checkbox>
              <el-color-picker v-model="item.color" size="small" />
            </div>
          </el-checkbox-group>

          <!-- 配偶 -->
          <el-checkbox v-model="checked_spouse" label="配偶" size="large" />

          <!-- 子 -->
          <el-checkbox v-model="checked_son" label="子" size="large" />

          <!-- 女 -->
          <el-checkbox v-model="checked_daughter" label="女" size="large" />
        </div>
      </div>

      <el-tree-v2
        ref="treeRef"
        :data="filteredTreeData"
        :props="defaultProps"
        :height="treeHeight"
        :expand-on-click-node="true"
        :highlight-current="true"
        :indent="40"
      >
        <template #default="{ data }">
          <div class="tree-item-div">
            <div @click="showDetail(data)">
              <span>{{ data.name }}</span>
              <span v-if="data.rankingChar"> - {{ data.rankingChar }}</span>
            </div>

            <!-- 代数 -->
            <div class="generation-info" v-if="checkList_generationType.length > 0">
              <span
                v-if="data.generationInAll && checkList_generationType.includes('all')"
                :style="{ color: getGenerationColor('all') }"
                >[总:{{ data.generationInAll }}]</span
              >
              <span
                v-if="data.generationInFuJian && checkList_generationType.includes('fuJian')"
                :style="{ color: getGenerationColor('fuJian') }"
                >[入闽:{{ data.generationInFuJian }}]</span
              >
              <span
                v-if="data.generationInPuTian && checkList_generationType.includes('puTian')"
                :style="{ color: getGenerationColor('puTian') }"
                >[莆田:{{ data.generationInPuTian }}]</span
              >
              <span
                v-if="data.generationInQueXia && checkList_generationType.includes('queXia')"
                :style="{ color: getGenerationColor('queXia') }"
                >[阙下:{{ data.generationInQueXia }}]</span
              >
              <span
                v-if="data.generationInHanJiang && checkList_generationType.includes('hanJiang')"
                :style="{ color: getGenerationColor('hanJiang') }"
                >[涵江:{{ data.generationInHanJiang }}]</span
              >
              <span
                v-if="data.generationInXiShan && checkList_generationType.includes('xiShan')"
                :style="{ color: getGenerationColor('xiShan') }"
                >[西山:{{ data.generationInXiShan }}]</span
              >
            </div>

            <!-- 配偶 -->
            <div class="spouse-info" v-if="data.spouse && data.spouse.length > 0 && checked_spouse" style="display: flex; align-items: center;">
              <img
                src="@/assets/images/common/icon-spouse.svg"
                style="width: 24px; height: 17px; margin-right: 4px; display: inline-block; vertical-align: middle;"
              />
              <span v-for="spouse in data.spouse" :key="spouse.id" @click="showDetail(spouse)" style="cursor: pointer; color: #409eff;">
                [{{ spouse.name }}]
              </span>
            </div>

            <!-- 子 -->
            <div class="son-daughter-info" v-if="data.son && data.son > 0 && checked_son" style="display: flex; align-items: center;">
              <img
                src="@/assets/images/common/icon-son.svg"
                style="width: 24px; height: 17px; margin-right: 4px; display: inline-block; vertical-align: middle;"
              />
              <span>{{ data.son }}</span>
            </div>

            <!-- 女 -->
            <div class="son-daughter-info" v-if="data.daughter && data.daughter > 0 && checked_daughter" style="display: flex; align-items: center;">
              <img
                src="@/assets/images/common/icon-daughter.svg"
                style="width: 24px; height: 17px; margin-right: 4px; display: inline-block; vertical-align: middle;"
              />
              <span>{{ data.daughter }}</span>
            </div>
          </div>
        </template>
      </el-tree-v2>
    </div>
  </div>
  <div v-else class="not-verified">未通过验证，无法查看内容</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElTreeV2, ElInput, ElButton } from 'element-plus'
import { useFamilyTree } from './hooks/useFamilyTree'
import { isVerifyValid } from '@/hooks/useFamilyTreeVerify'

const {
  treeData,
  filterNameText,
  filterRankText,
  filteredTreeData,
  treeHeight,
  generationTypeOptions,
  getGenerationColor,
  treeRef,
  expandAll,
  collapseAll
} = useFamilyTree()

const router = useRouter()

const showStatsPanel = ref(true)

// 递归统计
function countStats(data: any[]) {
  let total = 0,
    male = 0,
    female = 0,
    alive = 0,
    dead = 0
  function walk(nodes: any[]) {
    for (const node of nodes) {
      total++
      if (node.gender === '男') male++
      if (node.gender === '女') female++
      node.isAlive ? alive++ : dead++
      if (node.children && node.children.length) walk(node.children)
      if (node.spouse && node.spouse.length) walk(node.spouse)
    }
  }
  walk(data)
  return { total, male, female, alive, dead }
}

const stats = computed(() => countStats(treeData.value))

const showMoreFilter = ref(true)

const checkList_generationType = ref(['xiShan'])

const checked_spouse = ref(true)
const checked_son = ref(false)
const checked_daughter = ref(false)

const defaultProps = {
  value: 'id',
  label: 'name',
  children: 'children'
}

const showDetail = (data: any) => {
  router.push({ name: 'family-tree-detail', params: { id: data.id } })
}

onMounted(() => {
  // 这里可以替换为实际的验证逻辑
  if (isVerifyValid()) {
    expandAll()
  }
})

const isVerified = computed(() => isVerifyValid())
</script>

<style lang="scss" scoped>
:deep(.el-button--primary) {
  margin-left: 0px;
}
</style>

<style lang="scss" scoped>
.family-tree-view {
  display: flex;
  flex-direction: row;
  padding: 24px;
  background: var(--v3-body-bg-color, #f2f3f5);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .stats-panel {
    width: 200px;
    min-width: 180px;
    background: #fff;
    border-radius: 8px 0 0 8px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
    padding: 16px 12px 16px 20px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    z-index: 2;
    .stats-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 12px;
    }
    .stats-content {
      font-size: 1rem;
      line-height: 2;
      color: #333;
    }
  }
  .show-btn {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    height: 60px;
    width: 32px;
    border-radius: 0 16px 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
    padding: 0;
    transition: background 0.2s;
  }
  .show-btn:hover {
    background: #f5f7fa;
  }
  .show-btn .el-icon {
    font-size: 20px;
  }
  .tree-main-panel {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .search-div {
    display: flex;
    align-items: center;
    gap: 16px;

    .filter-input {
      width: 180px;
      flex-shrink: 0;
    }
  }

  .moreFilter {
    position: relative;

    .more-btn {
      font-size: 14px;
      color: #409eff;
      cursor: pointer;
      padding: 0 0px;
      background: none;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      .arrow {
        display: inline-block;
        margin-left: 4px;
        border: solid #409eff;
        border-width: 0 2px 2px 0;
        padding: 3px;
        transform: rotate(45deg);
        transition: transform 0.2s;
      }
      .down {
        transform: rotate(45deg);
      }
      .up {
        transform: rotate(-135deg);
      }
    }
    .moreFilter-content {
      margin-bottom: 8px;

      .generation-select {
        width: 100px;
      }
    }
  }

  .tree-item-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
  }
}

.not-verified {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #888;
  background: #f8fafc;
}
</style>
