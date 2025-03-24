<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PcRegisterView'
});

const router = useRouter();

// 注册类型 
// account: 账号密码注册
// phone: 手机号短信验证注册
const registerType = ref<'account' | 'phone'>('account');

// 账号密码注册表单
const accountForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agree: false
});

// 手机号注册表单
const phoneForm = reactive({
  phone: '',
  verificationCode: '',
  agree: false
});

// 表单验证状态
const accountErrors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  agree: ''
});

const phoneErrors = reactive({
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
  if (!phoneForm.phone.trim()) {
    phoneErrors.phone = '请输入手机号';
    return;
  }
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phoneForm.phone)) {
    phoneErrors.phone = '请输入正确的手机号';
    return;
  }
  
  // 开始发送验证码
  isSending.value = true;
  countdown.value = 60;
  sendBtnText.value = `${countdown.value}秒后重新获取`;
  
  // 模拟发送验证码
  console.log('向手机号发送验证码：', phoneForm.phone);
  
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

// 账号密码注册
const handleAccountRegister = () => {
  // 重置错误信息
  Object.keys(accountErrors).forEach(key => {
    accountErrors[key as keyof typeof accountErrors] = '';
  });
  
  // 验证用户名
  if (!accountForm.username.trim()) {
    accountErrors.username = '请输入用户名';
    return;
  }
  
  // 验证密码
  if (!accountForm.password.trim()) {
    accountErrors.password = '请输入密码';
    return;
  }
  
  if (accountForm.password.length < 6) {
    accountErrors.password = '密码长度不能少于6位';
    return;
  }
  
  // 验证确认密码
  if (accountForm.password !== accountForm.confirmPassword) {
    accountErrors.confirmPassword = '两次输入的密码不一致';
    return;
  }
  
  // 验证同意协议
  if (!accountForm.agree) {
    accountErrors.agree = '请同意服务条款和隐私政策';
    return;
  }
  
  // 模拟账号密码注册
  console.log('账号密码注册：', accountForm);
  
  // 模拟注册成功
  router.push('/p/login');
};

// 手机号注册
const handlePhoneRegister = () => {
  // 重置错误信息
  Object.keys(phoneErrors).forEach(key => {
    phoneErrors[key as keyof typeof phoneErrors] = '';
  });
  
  // 验证手机号
  if (!phoneForm.phone.trim()) {
    phoneErrors.phone = '请输入手机号';
    return;
  }
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phoneForm.phone)) {
    phoneErrors.phone = '请输入正确的手机号';
    return;
  }
  
  // 验证验证码
  if (!phoneForm.verificationCode.trim()) {
    phoneErrors.verificationCode = '请输入验证码';
    return;
  }
  
  // 验证同意协议
  if (!phoneForm.agree) {
    phoneErrors.agree = '请同意服务条款和隐私政策';
    return;
  }
  
  // 模拟手机号注册
  console.log('手机号注册：', phoneForm);
  
  // 模拟注册成功
  router.push('/p/login');
};

// 切换注册类型
const switchRegisterType = (type: 'account' | 'phone') => {
  registerType.value = type;
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
      
      <div class="register-tabs">
        <div 
          class="tab-item" 
          :class="{ active: registerType === 'account' }"
          @click="switchRegisterType('account')"
        >
          账号密码注册
        </div>
        <div 
          class="tab-item" 
          :class="{ active: registerType === 'phone' }"
          @click="switchRegisterType('phone')"
        >
          手机号注册
        </div>
      </div>
      
      <!-- 账号密码注册表单 -->
      <div v-if="registerType === 'account'" class="form-container">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="accountForm.username"
            placeholder="请输入用户名"
            @focus="accountErrors.username = ''"
          />
          <div class="error-message" v-if="accountErrors.username">{{ accountErrors.username }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="accountForm.password"
            placeholder="请输入密码"
            @focus="accountErrors.password = ''"
          />
          <div class="error-message" v-if="accountErrors.password">{{ accountErrors.password }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="accountForm.confirmPassword"
            placeholder="请再次输入密码"
            @focus="accountErrors.confirmPassword = ''"
          />
          <div class="error-message" v-if="accountErrors.confirmPassword">{{ accountErrors.confirmPassword }}</div>
        </div>
        
        <div class="form-agreement">
          <input 
            type="checkbox" 
            id="agree-account" 
            v-model="accountForm.agree"
            @change="accountErrors.agree = ''"
          >
          <label for="agree-account">我已阅读并同意<a href="javascript:void(0)">服务条款</a>和<a href="javascript:void(0)">隐私政策</a></label>
          <div class="error-message" v-if="accountErrors.agree">{{ accountErrors.agree }}</div>
        </div>
        
        <button class="register-button" @click="handleAccountRegister">注册</button>
      </div>
      
      <!-- 手机号注册表单 -->
      <div v-if="registerType === 'phone'" class="form-container">
        <div class="form-group">
          <label for="phone">手机号</label>
          <input 
            type="text" 
            id="phone" 
            v-model="phoneForm.phone"
            placeholder="请输入手机号"
            @focus="phoneErrors.phone = ''"
          />
          <div class="error-message" v-if="phoneErrors.phone">{{ phoneErrors.phone }}</div>
        </div>
        
        <div class="form-group">
          <label for="verification-code">验证码</label>
          <div class="verification-code-container">
            <input 
              type="text" 
              id="verification-code" 
              v-model="phoneForm.verificationCode"
              placeholder="请输入验证码"
              @focus="phoneErrors.verificationCode = ''"
            />
            <button 
              class="verification-code-button" 
              :disabled="isSending" 
              @click="sendVerificationCode"
            >
              {{ sendBtnText }}
            </button>
          </div>
          <div class="error-message" v-if="phoneErrors.verificationCode">{{ phoneErrors.verificationCode }}</div>
        </div>
        
        <div class="form-agreement">
          <input 
            type="checkbox" 
            id="agree-phone" 
            v-model="phoneForm.agree"
            @change="phoneErrors.agree = ''"
          >
          <label for="agree-phone">我已阅读并同意<a href="javascript:void(0)">服务条款</a>和<a href="javascript:void(0)">隐私政策</a></label>
          <div class="error-message" v-if="phoneErrors.agree">{{ phoneErrors.agree }}</div>
        </div>
        
        <button class="register-button" @click="handlePhoneRegister">注册</button>
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

.register-tabs {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: all 0.3s;
}

.tab-item.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
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