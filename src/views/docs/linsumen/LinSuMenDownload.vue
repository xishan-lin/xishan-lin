<template>
  <div class="download-page">
    <h1>《邗江三百吟_林苏门》下载</h1>
    <div class="main-container">
      <div v-for="(item, idx) in downloadLinks" :key="idx" class="download-item">
        <span class="title">{{ item.title }}：</span>
        <a :href="item.link" target="_blank" rel="noopener" class="download-link">{{ item.link }}</a>
        <span class="password-label">提取码：</span>
        <span class="password" @click="copyPassword(item.password)">{{ item.password }}</span>
      </div>
      <div v-if="copyTip" class="copy-tip">{{ copyTip }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const copyTip = ref('');
const downloadLinks = [
  {
    title: '邗江三百吟_林苏门_第1冊.pdf',
    link: 'https://pan.baidu.com/s/1HjraTPJG3hTPLDZRMOc48Q',
    password: 'es33',
  },
  {
    title: '邗江三百吟_林苏门_第2冊.pdf',
    link: 'https://pan.baidu.com/s/15ufoh9CqENnvwg93ZfAHUg',
    password: 'r8fg',
  },
  {
    title: '邗江三百吟_林苏门_第3冊.pdf',
    link: 'https://pan.baidu.com/s/1q95zWgQLCdD60KTa7KqTgw',
    password: 'unfq',
  },
  {
    title: '邗江三百吟_林苏门_第4冊.pdf',
    link: 'https://pan.baidu.com/s/1NEEP45Um-9zCHmLkIX4HNQ',
    password: 'kpvw',
  },
];

function copyPassword(password: string) {
  navigator.clipboard.writeText(password).then(() => {
    copyTip.value = '提取码已复制！';
    setTimeout(() => {
      copyTip.value = '';
    }, 1200);
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
    .copy-tip {
      color: #27ae60;
      font-size: 14px;
      margin-top: 8px;
      text-align: left;
      animation: fadeInOut 1.2s;
    }
    @keyframes fadeInOut {
      0% { opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
  }
}
</style>
