// 时间 + 日期 处理公共方法

export const useDate = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString()
  }

  return {
    formatDate
  }
}

