<template>
  <div class="family-tree-view">
    <el-input v-model="filterText" placeholder="输入姓名筛选" clearable class="filter-input" />
    <el-tree-v2
      :data="filteredTreeData"
      :props="defaultProps"
      :height="treeHeight"
      :expand-on-click-node="false"
      :highlight-current="true"
      node-key="id"
    >
      <template #default="{ data }">
        <div @click="showDetail(data)">
          <span>{{ data.name }}</span>
          <span v-if="data.specialChar">-{{ data.specialChar }}</span>
        </div>
        
      </template>
    </el-tree-v2>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElTreeV2, ElInput } from 'element-plus'
import { familyData } from './data/family-data'

interface FamilyMember {
  id: number
  name: string
  formerName: string
  avatar: string
  specialChar?: string
  isAlive: boolean
  rank?: string
  place: string
  bornDate: string
  deathDate: string
  desc: string
  spouse?: FamilyMember
  children?: Partial<FamilyMember>[]
}

const filterText = ref('')
// 示例家谱数据
const treeData = ref<FamilyMember[]>(familyData)

const defaultProps = {
  children: 'children',
  name: 'name'
}

// 递归过滤树
function filterTree_name(data: FamilyMember[], filter: string): FamilyMember[] {
  if (!filter) return data
  return data
    .map((node) => {
      if (node.name.includes(filter)) {
        return node
      }
      if (node.children) {
        const filteredChildren = filterTree_name(node.children as FamilyMember[], filter)
        if (filteredChildren.length) {
          return { ...node, children: filteredChildren }
        }
      }
      return null
    })
    .filter(Boolean) as FamilyMember[]
}

const filteredTreeData = computed(() => filterTree_name(treeData.value, filterText.value))

const treeHeight = ref(600)
onMounted(() => {
  nextTick(() => {
    const total = window.innerHeight
    const filterInput = document.querySelector('.filter-input') as HTMLElement
    const filterHeight = filterInput?.offsetHeight || 0
    const style = window.getComputedStyle(filterInput)
    const marginBottom = parseFloat(style.marginBottom) || 0
    // 减去顶部筛选栏高度 48为padding
    treeHeight.value = total - filterHeight - marginBottom - 48
  })
})


const showDetail = (data: FamilyMember) => {
  console.log(data)
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

  .filter-input {
    margin-bottom: 16px;
    width: 300px;
    flex-shrink: 0;
  }

  .el-tree-v2 {
    flex: 1 1 0%;
    min-height: 0;
  }
}
</style>
