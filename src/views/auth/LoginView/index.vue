<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'PcLoginView'
})

const router = useRouter()

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 表单验证状态
const usernameError = ref('')
const passwordError = ref('')
const loginError = ref('')

// 表单提交
const handleLogin = () => {
  // 重置错误信息
  usernameError.value = ''
  passwordError.value = ''
  loginError.value = ''

  // 简单验证
  if (!loginForm.username.trim()) {
    usernameError.value = '请输入用户名/手机号'
    return
  }
  if (!loginForm.password.trim()) {
    passwordError.value = '请输入密码'
    return
  }

  // TODO: 这里调用实际的登录接口
  console.log('====> 登录信息：', loginForm)

  // 模拟登录成功
  localStorage.setItem('token', 'demo-token')
  router.push('/p') // 登录成功后跳转到首页
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/p/register')
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">用户登录</h1>

      <div class="form-group">
        <label for="username">用户名/手机号</label>
        <input
          type="text"
          id="username"
          v-model="loginForm.username"
          placeholder="请输入用户名或手机号"
          @focus="usernameError = ''"
        />
        <div class="error-message" v-if="usernameError">{{ usernameError }}</div>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          @focus="passwordError = ''"
        />
        <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
      </div>

      <div class="form-options">
        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="loginForm.rememberMe" />
          <label for="remember">记住我</label>
        </div>
        <a class="forgot-password">忘记密码？</a>
      </div>

      <div class="error-message" v-if="loginError">{{ loginError }}</div>

      <button class="login-button" @click="handleLogin">登录</button>

      <div class="register-link">还没有账号？<a @click="goToRegister">立即注册</a></div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-box {
  width: 420px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 6px;
}

.forgot-password {
  color: #409eff;
  cursor: pointer;
}

.login-button {
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

.login-button:hover {
  background-color: #66b1ff;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.register-link a {
  color: #409eff;
  cursor: pointer;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}
</style>
