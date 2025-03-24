<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PcRegisterView'
});

const router = useRouter();

// 合并注册表单
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  verificationCode: '',
  agree: false
});

// 表单验证状态
const formErrors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  verificationCode: '',
  agree: ''
});

// 是否正在发送验证码
const isSending = ref(false);
// 倒计时
const countdown = ref(60);
// 验证码按钮文本
const sendBtnText = ref('获取验证码');

// 发送验证码
const sendVerificationCode = () => {
  // 验证手机号
  if (!registerForm.phone.trim()) {
    formErrors.phone = '请输入手机号';
    return;
  }
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(registerForm.phone)) {
    formErrors.phone = '请输入正确的手机号';
    return;
  }
  
  // 开始发送验证码
  isSending.value = true;
  countdown.value = 60;
  sendBtnText.value = `${countdown.value}秒后重新获取`;
  
  // 模拟发送验证码
  console.log('向手机号发送验证码：', registerForm.phone);
  
  // 倒计时
  const timer = setInterval(() => {
    countdown.value--;
    sendBtnText.value = `${countdown.value}秒后重新获取`;
    
    if (countdown.value <= 0) {
      clearInterval(timer);
      isSending.value = false;
      sendBtnText.value = '获取验证码';
    }
  }, 1000);
};

// 合并注册处理
const handleRegister = () => {
  // 重置错误信息
  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = '';
  });
  
  // 验证用户名
  if (!registerForm.username.trim()) {
    formErrors.username = '请输入用户名';
    return;
  }
  
  // 验证密码
  if (!registerForm.password.trim()) {
    formErrors.password = '请输入密码';
    return;
  }
  
  if (registerForm.password.length < 6) {
    formErrors.password = '密码长度不能少于6位';
    return;
  }
  
  // 验证确认密码
  if (registerForm.password !== registerForm.confirmPassword) {
    formErrors.confirmPassword = '两次输入的密码不一致';
    return;
  }
  
  // 验证手机号
  if (!registerForm.phone.trim()) {
    formErrors.phone = '请输入手机号';
    return;
  }
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(registerForm.phone)) {
    formErrors.phone = '请输入正确的手机号';
    return;
  }
  
  // 验证验证码
  if (!registerForm.verificationCode.trim()) {
    formErrors.verificationCode = '请输入验证码';
    return;
  }
  
  // 验证同意协议
  if (!registerForm.agree) {
    formErrors.agree = '请同意服务条款和隐私政策';
    return;
  }
  
  // 模拟注册
  console.log('用户注册信息：', registerForm);
  
  // 模拟注册成功
  router.push('/p/login');
};

// 跳转到登录页面
const goToLogin = () => {
  router.push('/p/login');
};
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="register-title">用户注册</h1>
      
      <div class="form-container">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="registerForm.username"
            placeholder="请输入用户名"
            @focus="formErrors.username = ''"
          />
          <div class="error-message" v-if="formErrors.username">{{ formErrors.username }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="registerForm.password"
            placeholder="请输入密码"
            @focus="formErrors.password = ''"
          />
          <div class="error-message" v-if="formErrors.password">{{ formErrors.password }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码"
            @focus="formErrors.confirmPassword = ''"
          />
          <div class="error-message" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</div>
        </div>
        
        <div class="form-group">
          <label for="phone">手机号</label>
          <input 
            type="text" 
            id="phone" 
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            @focus="formErrors.phone = ''"
          />
          <div class="error-message" v-if="formErrors.phone">{{ formErrors.phone }}</div>
        </div>
        
        <div class="form-group">
          <label for="verification-code">验证码</label>
          <div class="verification-code-container">
            <input 
              type="text" 
              id="verification-code" 
              v-model="registerForm.verificationCode"
              placeholder="请输入验证码"
              @focus="formErrors.verificationCode = ''"
            />
            <button 
              class="verification-code-button" 
              :disabled="isSending" 
              @click="sendVerificationCode"
            >
              {{ sendBtnText }}
            </button>
          </div>
          <div class="error-message" v-if="formErrors.verificationCode">{{ formErrors.verificationCode }}</div>
        </div>
        
        <div class="form-agreement">
          <input 
            type="checkbox" 
            id="agree" 
            v-model="registerForm.agree"
            @change="formErrors.agree = ''"
          >
          <label for="agree">我已阅读并同意<a href="javascript:void(0)">服务条款</a>和<a href="javascript:void(0)">隐私政策</a></label>
          <div class="error-message" v-if="formErrors.agree">{{ formErrors.agree }}</div>
        </div>
        
        <button class="register-button" @click="handleRegister">注册</button>
      </div>
      
      <div class="login-link">
        已有账号？<a @click="goToLogin">立即登录</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-box {
  width: 420px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #409eff;
}

.verification-code-container {
  display: flex;
}

.verification-code-container input {
  flex: 1;
  margin-right: 10px;
}

.verification-code-button {
  width: 120px;
  padding: 0 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.verification-code-button:hover:not(:disabled) {
  background-color: #66b1ff;
}

.verification-code-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.form-agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 14px;
}

.form-agreement input {
  margin-right: 6px;
  margin-top: 3px;
}

.form-agreement a {
  color: #409eff;
}

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #66b1ff;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.login-link a {
  color: #409eff;
  cursor: pointer;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}
</style> 