<script lang="ts">
export default {
  name: 'HeaderView'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
// router
import { useRoute, useRouter } from 'vue-router'
// hooks
import useHooks from './hooks/useHooks'
// language
import useLanguage from '@/language/hooks/useLanguage'
//
const { handleDropdownCommand } = useHooks()
const { currentLocale } = useLanguage()

// router
const router = useRouter()
const route = useRoute()

const currentLanguageName = ref('中文')
watch(currentLocale, (newValue: any) => {
  newValue === 'zh' ? (currentLanguageName.value = '中文') : (currentLanguageName.value = 'English')
})

onMounted(() => {
  //
  console.log('currentIndex', currentLocale.value)
})

const openPDFViewr = (command: string) => {
  console.log(command)
  console.log(route, router)
  if (command === '五') {
    router.push('/pdf-all-view')
  } else if (command === '六') {
    // 打开本地PDF样本
    window.open(import.meta.env.BASE_URL + 'pdfjs-4.8.69-dist/web/viewer.html')
  } else if (command === '七') {
    // 打开远程PDF样本
    window.open(
      import.meta.env.VITE_BASE_API_URL +
        'pdfjs-4.8.69-dist/web/viewer.html?file=https://raw.githubusercontent.com/xishan-lin/resourcesRepo/main/genealogy/莆田林氏西山本支族谱(卷一).pdf'
    )
  } else {
    router.push('/pdf-once-view')
  }
}
</script>

<template>
  <div class="main-view">
    <div class="left-view">
      <img src="@/assets/images/common/logo.svg" alt="" />
      <div class="title">
        {{ $t('title') }}
      </div>
    </div>
    <div class="right-view">

      <el-button type="primary" @click="router.push('/family-tree')"> 家谱 </el-button>

      <el-dropdown class="el-dropdown-cls" @command="openPDFViewr">
        <span class="el-dropdown-link">
          {{ $t('navi.books') }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="一">《第一卷》</el-dropdown-item>
            <el-dropdown-item command="二">《第二卷》</el-dropdown-item>
            <el-dropdown-item command="三">《第三卷》</el-dropdown-item>
            <el-dropdown-item command="四">《第四卷》</el-dropdown-item>
            <el-dropdown-item command="五">《全卷》</el-dropdown-item>
            <el-dropdown-item command="六">《全卷》本地</el-dropdown-item>
            <el-dropdown-item command="七">《全卷》远程</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- language 方式二 -->
      <el-dropdown class="el-dropdown-cls" @command="handleDropdownCommand">
        <span class="el-dropdown-link">
          <!-- {{ $t('common.changeLanguage') }} -->
          {{ currentLanguageName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/element-plus-styles/el-button-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-dropdown-scoped.scss';
@use '@/assets/styles/element-plus-styles/el-switch-scoped.scss';
</style>

<style scoped lang="scss">
:deep(.el-button) {
  margin-left: 0px;
}

.main-view {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 0 50px;
  background-color: #f5f5f5;

  .left-view {
    display: flex;
    margin-left: 10px;

    img {
      height: 80%;
      aspect-ratio: 1 / 1;
      /* 宽高比为 1:1 */
      background-color: rebeccapurple;
      border-radius: 50%;
      margin-top: calc(var(--header-height) * 0.1);
    }

    .title {
      line-height: var(--header-height);
      margin-left: 15px;
      background-color: transparent;
      width: 100px;
    }
  }

  .right-view {
    display: flex;
    justify-content: right;
    align-items: center; // 垂直居中
    gap: 15px;

    .el-dropdown-cls {
      :hover {
        cursor: pointer;
      }

      height: 100%;

      .el-dropdown-link {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 600;

        .el-icon--right {
          margin-left: 5px;
        }

        .el-icon {
          height: 16px;
          width: 16px;
          line-height: 100%;

          svg {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
