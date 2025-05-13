<template>
  <div class="personal-detail" v-if="person">
    <div class="left">
      <div class="avatar">
        <img :src="(person.avatar && person.avatar !== '') ? person.avatar : defaultAvatar" alt="头像" />
      </div>
      <div class="basic-info">
        <h2>{{ person.name }}</h2>
        <p><span>性别：</span>{{ person.gender }}</p>
        <p><span>出生日期：</span>{{ person.bornDate }}</p>
        <p><span>籍贯：</span>{{ person.nativePlace }}</p>
        <p><span>学历：</span>{{ person.degree }}</p>
        <p><span>职位：</span>{{ person.position }}</p>
        <p><span>是否健在：</span>{{ person.isAlive ? '是' : '否' }}</p>
        <p v-if="!person.isAlive"><span>享年：</span>{{ person.dieAge }}</p>
      </div>
    </div>
    <div class="right">
      <h3>详细信息</h3>
      <p v-if="person.phone"><span>手机号：</span>{{ person.phone }}</p>
      <p v-if="person.email"><span>邮箱：</span>{{ person.email }}</p>
      <p v-if="person.maritalStatus"><span>婚姻状况：</span>{{ person.maritalStatus }}</p>
      <p v-if="person.spouseName"><span>配偶：</span>{{ person.spouseName }}</p>
      <p v-if="person.childrenNames">
        <span>子女：</span
        >{{
          Array.isArray(person.childrenNames)
            ? person.childrenNames.join('，')
            : person.childrenNames
        }}
      </p>
      <p v-if="person.company"><span>工作单位：</span>{{ person.company }}</p>
      <p v-if="person.address"><span>住址：</span>{{ person.address }}</p>
      <p v-if="person.hobbies"><span>兴趣爱好：</span>{{ person.hobbies }}</p>
      <p v-if="person.achievements"><span>主要成就：</span>{{ person.achievements }}</p>
      <p><span>描述：</span>{{ person.desc }}</p>
    </div>
  </div>
  <div v-else class="not-found">未找到该成员信息</div>
</template>

<script lang="ts" setup>
import { familyXishanData } from '../mainView/data/family-xishan-data'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import defaultAvatar from '@/assets/images/common/portrait.svg'

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
  flex-direction: row;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 48px 64px;
  max-width: 1000px;
  margin: 60px auto;
  min-height: 500px;

  .left {
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #e5e7eb;
    padding-right: 40px;
    .avatar {
      width: 152px;
      height: 200px;
      overflow: hidden;
      margin-bottom: 32px;
      border: 3px solid #d1d5db;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .basic-info {
      width: 100%;
      h2 {
        text-align: center;
        font-size: 2.2rem;
        font-weight: bold;
        margin-bottom: 24px;
      }
      p {
        margin: 12px 0;
        font-size: 1.15rem;
        span {
          color: #6b7280;
          margin-right: 8px;
        }
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 48px;
    h3 {
      font-size: 1.4rem;
      color: #374151;
      margin-bottom: 18px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 8px;
    }
    p {
      margin: 14px 0;
      font-size: 1.1rem;
      span {
        color: #6b7280;
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
