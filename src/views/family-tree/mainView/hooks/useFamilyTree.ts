import { ref, computed, onMounted, nextTick } from 'vue'
import { familyXishanData } from '../data/family-xishan-data'

export interface FamilyMember {
  id: number
  name: string
  formerName: string
  generationInAll: string
  generationInFuJian: string
  generationInPuTian: string
  generationInQueXia: string
  generationInXiShan: string
  rankingChar: string
  children?: FamilyMember[]
}

export function useFamilyTree() {
  // 姓名筛选
  const filterNameText = ref('')
  // 排行筛选
  const filterRankText = ref('')
  // 树数据
  const treeData = ref<FamilyMember[]>(familyXishanData)

  // 筛选树数据
  function filterTree_combined(
    data: FamilyMember[],
    nameFilter: string,
    rankFilter: string
  ): FamilyMember[] {
    return data
      .map((node) => {
        const nameMatch = !nameFilter || node.name.includes(nameFilter)
        const rankMatch =
          !rankFilter ||
          (typeof node.rankingChar === 'string' && node.rankingChar.includes(rankFilter))
        let children: FamilyMember[] | undefined
        if (node.children) {
          children = filterTree_combined(node.children as FamilyMember[], nameFilter, rankFilter)
        }
        if ((nameMatch && rankMatch) || (children && children.length)) {
          return { ...node, children: children || [] }
        }
        return null
      })
      .filter(Boolean) as FamilyMember[]
  }

  // 计算筛选后的树数据
  const filteredTreeData = computed(() =>
    filterTree_combined(treeData.value, filterNameText.value, filterRankText.value)
  )

  // 计算树高度
  const treeHeight = ref(600)
  onMounted(() => {
    nextTick(() => {
      const total = window.innerHeight
      const filterInput = document.querySelector('.filter-input') as HTMLElement
      const filterHeight = filterInput?.offsetHeight || 0
      const style = window.getComputedStyle(filterInput)
      const marginBottom = parseFloat(style.marginBottom) || 0
      treeHeight.value = total - filterHeight - marginBottom - 48
    })
  })

  const generationTypeOptions = ref([
    { value: 'all', label: '总', color: '#409eff' },
    { value: 'fuJian', label: '入闽', color: '#67c23a' },
    { value: 'puTian', label: '莆田', color: '#e6a23c' },
    { value: 'queXia', label: '阙下', color: '#f56c6c' },
    { value: 'xiShan', label: '西山', color: '#409EFF' }
  ])

  function getGenerationColor(type: string) {
    const item = generationTypeOptions.value.find((i) => i.value === type)
    return item ? item.color : '#409eff'
  }
  

  // el-tree-v2 展开/折叠逻辑
  const treeRef = ref()

  const expandAll = () => {
    nextTick(() => {
      if (treeRef.value && filteredTreeData.value) {
        // 递归收集所有节点id
        const getAllIds = (nodes: any[]): any[] => {
          return nodes.reduce((ids, node) => {
            ids.push(node.id)
            if (node.children && node.children.length) {
              ids = ids.concat(getAllIds(node.children))
            }
            return ids
          }, [] as any[])
        }
        const allIds = getAllIds(filteredTreeData.value)
        treeRef.value.setExpandedKeys(allIds)
      }
    })
  }

  const collapseAll = () => {
    nextTick(() => {
      if (treeRef.value) {
        treeRef.value.setExpandedKeys([])
      }
    })
  }

  return {
    filterNameText,
    filterRankText,
    treeData,
    filteredTreeData,
    treeHeight,
    generationTypeOptions,
    getGenerationColor,
    treeRef,
    expandAll,
    collapseAll
  }
}
