<template>
  <div class="contact-view">
    <h2>问题反馈</h2>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="subject">主题：</label>
        <input v-model="form.subject" id="subject" type="text" required placeholder="请输入主题" />
      </div>
      <div class="form-group">
        <label for="message">反馈内容：</label>
        <textarea v-model="form.message" id="message" required placeholder="请输入您的问题或建议"></textarea>
      </div>
      <button type="submit" :disabled="loading">{{ loading ? '发送中...' : '发送反馈' }}</button>
    </form>
    <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

declare global {
  interface Window {
    Email: any;
  }
}

const form = ref({
  subject: '',
  message: ''
});
const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

// 动态加载 smtp.js
onMounted(() => {
  if (!window.Email) {
    console.log('加载smtp.js');
    const script = document.createElement('script');
    script.src = '/smtp.js';
    script.onload = () => {
      // smtp.js 加载完成
    };
    document.body.appendChild(script);
  }
});

function sendEmail() {
  successMsg.value = '';
  errorMsg.value = '';
  loading.value = true;
  // 请替换下面 SecureToken 为你自己的 smtpjs.com SecureToken
  if (window.Email) {
    window.Email.send({
      // Host: 'smtp.163.com',
      // Username: '15151963160@163.com',
      // Password: 'BWRfhtq3LXpvdBxP', // 替换为你的SecureToken
      
      SecureToken: '512ab385-1139-429d-a92f-0ee6efbef4d7',
      // To: '15151963160@163.com', // 'lionsom.linx@gmail.com', // 你的接收邮箱

      To: '15151963160@163.com',
      // To: '597207909@qq.com',
      From: '15151963160@163.com',
      Subject: form.value.subject,
      Body: `内容：${form.value.message}`
    }).then((message: string) => {
      loading.value = false;
      if (message === 'OK') {
        successMsg.value = '反馈已成功发送，感谢您的支持！';
        form.value.subject = '';
        form.value.message = '';
      } else {
        errorMsg.value = '发送失败，请稍后重试。';
      }
    }).catch(() => {
      loading.value = false;
      errorMsg.value = '发送失败，请检查网络或稍后重试。';
    });
  } else {
    loading.value = false;
    errorMsg.value = '邮件服务未加载，请刷新页面重试。';
  }
}
</script>

<style lang="scss" scoped>
.contact-view {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  h2 {
    text-align: center;
    margin-bottom: 24px;
    color: #333;
  }
  .form-group {
    margin-bottom: 18px;
    label {
      display: block;
      margin-bottom: 6px;
      color: #666;
    }
    input, textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 15px;
      &:focus {
        border-color: #409eff;
        outline: none;
      }
    }
    textarea {
      min-height: 300px;
      resize: vertical;
    }
  }
  button {
    width: 100%;
    padding: 10px 0;
    background: #409eff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover:not(:disabled) {
      background: #307fd6;
    }
    &:disabled {
      background: #bcdcff;
      cursor: not-allowed;
    }
  }
  .success-msg {
    margin-top: 18px;
    color: #52c41a;
    text-align: center;
  }
  .error-msg {
    margin-top: 18px;
    color: #f5222d;
    text-align: center;
  }
}
</style>
