<template>
  <div class="family-tree-view">
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
    </div>

    <div class="moreFilter">
      <el-button class="more-btn" @click="showMoreFilter = !showMoreFilter" text>
        更多筛选
        <span :class="['arrow', showMoreFilter ? 'up' : 'down']"></span>
      </el-button>
      <div v-show="showMoreFilter" class="moreFilter-content">
        <el-select v-model="generationType" placeholder="显示代数" class="generation-select">
          <el-option
            v-for="item in generationTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- <div class="generation-checkbox-group"> -->
        <el-checkbox-group
          v-model="checkList_generationType"
          style="display: flex; align-items: center; gap: 30px"
        >
          <div
            v-for="item in generationTypeOptions"
            :key="item.value"
            style="display: flex; align-items: center; gap: 8px"
          >
            <el-checkbox :label="item.value">{{ item.label }}</el-checkbox>
            <el-color-picker v-model="item.color" size="small" />
          </div>
        </el-checkbox-group>
        <!-- </div> -->

        <el-button size="small" @click="expandAll">全部展开</el-button>
        <el-button size="small" @click="collapseAll">全部折叠</el-button>
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
      node-key="id"
    >
      <template #default="{ data }">
        <div class="tree-item-div">
          <div @click="showDetail(data)">
            <span>{{ data.name }}</span>
            <span v-if="data.rankingChar"> - {{ data.rankingChar }}</span>
          </div>

          <div class="generation-info">
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
              v-if="data.generationInXiShan && checkList_generationType.includes('xiShan')"
              :style="{ color: getGenerationColor('xiShan') }"
              >[西山:{{ data.generationInXiShan }}]</span
            >
          </div>
        </div>
      </template>
    </el-tree-v2>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElTreeV2, ElInput, ElButton } from 'element-plus'
import { useFamilyTree } from './hooks/useFamilyTree'

const {
  filterNameText,
  filterRankText,
  filteredTreeData,
  treeHeight,
  generationType,
  generationTypeOptions,
  getGenerationColor,
  treeRef,
  expandAll,
  collapseAll
} = useFamilyTree()

onMounted(() => {
  expandAll()
})

const router = useRouter()

// 更多筛选
const showMoreFilter = ref(true)

const checkList_generationType = ref(['all', 'fuJian', 'puTian', 'queXia', 'xiShan'])

const defaultProps = {}

const showDetail = (data: any) => {
  router.push({ name: 'family-tree-detail', params: { id: data.id } })
}

</script>

<style lang="scss" scoped>
.family-tree-view {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--v3-body-bg-color, #f2f3f5);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .search-div {
    display: flex;
    align-items: center;
    gap: 16px;

    .filter-input {
      width: 300px;
      flex-shrink: 0;
    }
  }

  .moreFilter {
    position: relative;

    .more-btn {
      font-size: 14px;
      color: #409eff;
      cursor: pointer;
      padding: 0 8px;
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
      // display: flex;
      // align-items: center;
      // gap: 16px;

      .generation-select {
        width: 100px;
      }

      // .generation-checkbox-group {
      //   display: flex;
      //   // justify-content: space-between;
      //   // flex-wrap: wrap;
      //   align-items: center;
      //   gap: 16px;
      // }
    }
  }

  .tree-item-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
  }
}
</style>
