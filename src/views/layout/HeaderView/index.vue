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
import { ElMessage } from 'element-plus'
import {
  isLocked,
  setLock,
  checkValidChar,
  ERROR_LIMIT,
  useErrorCount,
  setVerifySuccess,
  isVerifyValid,
  MESSAGE_VERIFY_SUCCESS,
  MESSAGE_VERIFY_ERROR,
  MESSAGE_VERIFY_LOCKED
} from '@/hooks/useFamilyTreeVerify'
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

const showDialog = ref(false)
const inputValue = ref('')

const errorCount = useErrorCount()

const handleFamilyTreeClick = () => {
  if (isVerifyValid()) {
    // 1小时内已验证通过，直接进入
    router.push('/family-tree')
    return
  }
  if (isLocked()) {
    ElMessage.error(MESSAGE_VERIFY_LOCKED)
    return
  }
  showDialog.value = true
  inputValue.value = ''
  errorCount.value = 0
}

const handleDialogConfirm = () => {
  if (!checkValidChar(inputValue.value)) {
    ElMessage.error(MESSAGE_VERIFY_ERROR)
    errorCount.value++
    if (errorCount.value >= ERROR_LIMIT) {
      setLock()
      showDialog.value = false
    }
    return
  }
  // 验证通过，记录通过时间
  setVerifySuccess()
  showDialog.value = false
  ElMessage.success(MESSAGE_VERIFY_SUCCESS)
  router.push('/family-tree')
}
</script>

<template>
  <el-dialog
    v-model="showDialog"
    title="请输入您的排行"
    width="300px"
    :close-on-click-modal="false"
  >
    <el-input
      v-model="inputValue"
      maxlength="1"
      show-word-limit
      placeholder="只能输入一个字"
      @keyup.enter="handleDialogConfirm"
    />
    <template #footer>
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
    </template>
  </el-dialog>

  <div class="main-view">
    <div class="left-view">
      <img src="@/assets/images/common/icon.jpg" alt="" />
      <div class="title">
        {{ $t('title') }}
      </div>
    </div>
    <div class="right-view">

      <!-- test -->
      <!-- <el-button type="primary" @click="router.push('/article/1')"> Markdown </el-button> -->

      <el-button type="primary" @click="handleFamilyTreeClick"> 家谱 </el-button>

      <!-- <el-dropdown class="el-dropdown-cls" @command="openPDFViewr">
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
      </el-dropdown> -->

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
      font-size: 20px;
      font-weight: 600;
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
