<template>
  <div class="download-page">
    <h1>《即墨縣志_林溥》下载</h1>
    <div class="main-container">

      <div v-for="(item, idx) in downloadLinks" :key="idx" class="download-item">
        <span class="title">{{ item.title }}：</span>
        <a :href="item.link" target="_blank" rel="noopener" class="download-link">{{ item.link }}</a>
        <span class="password-label">提取码：</span>
        <span class="password" @click="copyPassword(item.password)">{{ item.password }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

const downloadLinks = [
  {
    title: '即墨縣志_林溥_同治十二年_1873.pdf',
    link: 'https://pan.baidu.com/s/1ElX_rP-CsyDn0F8Yrnm1cA',
    password: 'ge3r',
  }
];

function copyPassword(password: string) {
  navigator.clipboard.writeText(password).then(() => {
    ElMessage.success('提取码已复制！');
  });
}
</script>

<style lang="scss" scoped>
.download-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  h1 {
    background-color: transparent;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
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
    @keyframes fadeInOut {
      0% { opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
    .tips {
      display: flex;
      align-items: center;
      background: #f6f8fa;
      border-left: 4px solid #3a7afe;
      color: #444;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 15px;
      box-shadow: 0 1px 4px rgba(58,122,254,0.06);
      .tips-icon {
        font-size: 20px;
        margin-right: 8px;
      }
    }
  }
}
</style>


