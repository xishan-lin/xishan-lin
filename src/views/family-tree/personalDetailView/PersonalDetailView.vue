<template>
  <div class="personal-detail" v-if="person">
    <div class="avatar">
      <img :src="person.avatar" alt="头像" />
    </div>
    <div class="info">
      <h2>{{ person.name }}</h2>
      <p><span>性别：</span>{{ person.gender }}</p>
      <p><span>出生日期：</span>{{ person.bornDate }}</p>
      <p><span>籍贯：</span>{{ person.nativePlace }}</p>
      <p><span>学历：</span>{{ person.degree }}</p>
      <p><span>职位：</span>{{ person.position }}</p>
      <p><span>描述：</span>{{ person.desc }}</p>
      <p><span>是否健在：</span>{{ person.isAlive ? '是' : '否' }}</p>
      <p v-if="!person.isAlive"><span>享年：</span>{{ person.dieAge }}</p>
    </div>
  </div>
  <div v-else class="not-found">
    未找到该成员信息
  </div>
</template>

<script lang="ts" setup>
import { familyXishanData } from '../mainView/data/family-xishan-data'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 通过路由参数获取 id
const route = useRoute()
const id = computed(() => Number(route.params.id))

// 递归查找节点
function findPersonById(data: any[], id: number): any | null {
  for (const item of data) {
    if (item.id === id) return item
    if (item.children && item.children.length) {
      const found = findPersonById(item.children, id)
      if (found) return found
    }
    if (item.spouse && item.spouse.length) {
      const foundSpouse = findPersonById(item.spouse, id)
      if (foundSpouse) return foundSpouse
    }
  }
  return null
}

const person = computed(() => findPersonById(familyXishanData, id.value))

console.log('Detail ====> ', person.value)

</script>

<style lang="scss" scoped>
.personal-detail {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 600px;
  margin: 40px auto;

  .avatar {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 32px;
    border: 2px solid #eee;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .info {
    flex: 1;
    h2 {
      margin: 0 0 16px 0;
      font-size: 2rem;
      font-weight: bold;
    }
    p {
      margin: 8px 0;
      font-size: 1.1rem;
      span {
        color: #888;
        margin-right: 8px;
      }
    }
  }
}
.not-found {
  text-align: center;
  color: #888;
  margin-top: 80px;
  font-size: 1.2rem;
}
</style>
