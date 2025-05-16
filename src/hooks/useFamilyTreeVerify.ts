// 家谱排行验证与锁定逻辑，便于全局复用
import { ref } from 'vue'

export const validChars = '甲第壮三山祥开石竺清芬承百世秀衍金华'
export const ERROR_LIMIT = 3
export const LOCK_KEY = 'familyTreeVerifyLock'
export const LOCK_DURATION = 60 * 60 * 1000 // 1小时

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