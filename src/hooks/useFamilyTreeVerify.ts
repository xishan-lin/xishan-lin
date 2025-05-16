// 家谱排行验证与锁定逻辑，便于全局复用
import { ref } from 'vue'

export const validChars = '甲第壮三山祥开石竺清芬承百世秀衍金华'
export const ERROR_LIMIT = 3
export const LOCK_KEY = 'familyTreeVerifyLock'
export const LOCK_DURATION = 60 * 60 * 1000 // 1小时
export const VERIFY_PASS_KEY = 'familyTreeVerifyPass'
export const VERIFY_PASS_DURATION = 60 * 60 * 1000 // 1小时
// 统一提示
export const MESSAGE_VERIFY_SUCCESS = '验证通过'
export const MESSAGE_VERIFY_ERROR = '验证失败'
export const MESSAGE_VERIFY_LOCKED = '验证已被锁定，请1小时后再试'

export function isLocked() {
  const lock = localStorage.getItem(LOCK_KEY)
  if (!lock) return false
  try {
    const { until } = JSON.parse(lock)
    return Date.now() < until
  } catch {
    return false
  }
}

export function setLock() {
  const until = Date.now() + LOCK_DURATION
  localStorage.setItem(LOCK_KEY, JSON.stringify({ until }))
}

export function checkValidChar(char: string) {
  return char.length === 1 && validChars.includes(char)
}

// 可选：导出错误计数器（如需响应式）
export function useErrorCount() {
  const errorCount = ref(0)
  return errorCount
}

// 验证码通过后，记录通过时间
export function setVerifySuccess() {
  const until = Date.now() + VERIFY_PASS_DURATION
  localStorage.setItem(VERIFY_PASS_KEY, JSON.stringify({ until }))
}

// 判断验证码是否在有效期内
export function isVerifyValid() {
  const pass = localStorage.getItem(VERIFY_PASS_KEY)
  if (!pass) return false
  try {
    const { until } = JSON.parse(pass)
    return Date.now() < until
  } catch {
    return false
  }
} 