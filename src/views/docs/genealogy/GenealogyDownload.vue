<!-- 族谱下载 -->
<template>
  <div class="download-guide">
    <h1>《林氏西山本支宗谱》下载</h1>
    <div v-if="!isAuthorized" class="input-container">
      <label for="rankInput">请输入您的排行：</label>
      <el-input
        id="rankInput"
        v-model="inputValue"
        maxlength="1"
        show-word-limit
        @keyup.enter="checkRank"
        placeholder="只能输入一个字"
        style="width: 180px"
      />
      <button @click="checkRank">确认</button>
    </div>
    <div v-else class="main-container">
      <div v-for="(item, idx) in downloadLinks" :key="idx" class="download-item">
        <span class="title">{{ item.title }}：</span>
        <a :href="item.link" target="_blank" rel="noopener" class="download-link">{{
          item.link
        }}</a>
        <span class="password-label">密码：</span>
        <span class="password" @click="copyPassword(item.password)">{{ item.password }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'
import {
  isLocked,
  setLock,
  checkValidChar,
  ERROR_LIMIT,
  useErrorCount
} from '@/hooks/useFamilyTreeVerify'

const inputValue = ref('')
const isAuthorized = ref(false)
const errorCount = useErrorCount()

const downloadLinks = [
  {
    title: '林氏西山本支宗谱（总）',
    link: 'https://pan.baidu.com/s/1x73EgtX2MWnNSxH8Bo__7Q',
    password: '6nu5'
  },
  {
    title: '林氏西山本支宗谱（卷一）',
    link: 'https://pan.baidu.com/s/1sU37qwIDV_WG_A5sOLOVgw',
    password: '7lt6'
  },
  {
    title: '林氏西山本支宗谱（卷二）',
    link: 'https://pan.baidu.com/s/1-m8OJKE8ijPlBfzzM3z7wg',
    password: 'mbjm'
  },
  {
    title: '林氏西山本支宗谱（卷三）',
    link: 'https://pan.baidu.com/s/1zuo6-noPIodd-_9AR0CE1g',
    password: '9ji2'
  },
  {
    title: '林氏西山本支宗谱（卷四）',
    link: 'https://pan.baidu.com/s/1VTKImcqlIC2N44mHpbbpjQ',
    password: 'hi1h'
  }
]

function checkRank() {
  if (isLocked()) {
    ElMessage.error('验证已被锁定，请1小时后再试')
    return
  }
  if (!checkValidChar(inputValue.value)) {
    if (inputValue.value.length !== 1) {
      ElMessage.error('只能输入一个字')
    } else {
      ElMessage.error('排行不正确，请重新输入')
    }
    errorCount.value++
  } else {
    isAuthorized.value = true
    return
  }
  if (errorCount.value >= ERROR_LIMIT) {
    setLock()
    ElMessage.error('错误次数过多，请1小时后再试')
  }
}

function copyPassword(password: string) {
  navigator.clipboard.writeText(password).then(() => {
    ElMessage.success('密码已复制！')
  })
}
</script>

<style lang="scss" scoped>
.download-guide {
  max-width: 1000px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h1 {
    background-color: transparent;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    label {
      font-size: 16px;
      font-weight: 500;
    }
    input {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      width: 180px;
    }
    button {
      padding: 6px 18px;
      background: #3a7afe;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: #155fd3;
      }
    }
  }
  .main-container {
    margin-top: 24px;
    font-size: 16px;
    line-height: 2;
    word-break: break-all;
    .download-item {
      margin-bottom: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .title {
      font-weight: 500;
    }
    .download-link {
      color: #3a7afe;
      text-decoration: underline;
      word-break: break-all;
      margin-right: 8px;
    }
    .password-label {
      margin-left: 8px;
    }
    .password {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      color: #e67e22;
      font-family: monospace;
      transition: background 0.2s;
      user-select: all;
      &:hover {
        background: #ffe6c7;
      }
    }
  }
}
</style>
