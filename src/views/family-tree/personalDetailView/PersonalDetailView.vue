<template>
  <div v-if="isVerified">
    <div class="personal-detail" v-if="person">
      <div class="left">
        <div class="avatar">
          <img
            :src="person.avatar && person.avatar !== '' ? person.avatar : defaultAvatar"
            alt="头像"
          />
        </div>
        <div class="basic-info">
          <h2>{{ person.name }}</h2>
          <p><span>性别：</span>{{ person.gender }}</p>
          <p v-if="person.isAlive && age"><span>年龄：</span>{{ age }}</p>
          <p v-if="!person.isAlive"><span>享年：</span>{{ dieAge }}</p>
          <p><span>出生日期：</span>{{ person.bornDate }}</p>
          <p><span>籍贯：</span>{{ person.nativePlace }}</p>
          <p><span>出生地：</span>{{ person.birthplace }}</p>
          <p><span>排行：</span>{{ person.rankingChar }}</p>
          <p><span>学历：</span>{{ person.degree }}</p>
        </div>
      </div>
      <div class="right">
        <h3>详细信息</h3>
        <p><span>总代数：</span>第{{ person.generationInAll }}代</p>
        <p><span>入闽代数：</span>第{{ person.generationInFuJian }}代</p>
        <p><span>莆田代数：</span>第{{ person.generationInPuTian }}代</p>
        <p><span>阙下代数：</span>第{{ person.generationInQueXia }}代</p>
        <p><span>西山代数：</span>第{{ person.generationInXiShan }}代</p>
        <p v-if="person.phone">
          <span>手机号：</span>
          {{ Array.isArray(person.phone) ? person.phone.join('、') : person.phone }}
        </p>
        <p v-if="person.address"><span>住址：</span>{{ person.address }}</p>
        <p>
          <span>婚姻状况</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="根据是否有配偶自动判断：有配偶为已婚，无配偶为未婚"
            placement="top"
          >
            <span class="tip-icon">?</span>
          </el-tooltip>
          <span>:</span>
          {{ person.spouseName || (person.spouse && person.spouse.length > 0) ? '已婚' : '未婚' }}
        </p>
        <p v-if="person.spouseName"><span>配偶：</span>{{ person.spouseName }}</p>
        <p v-if="person.children">
          <span>子女：</span
          >{{
            Array.isArray(person.children)
              ? person.children.map((child: any) => child.name).join('，')
              : ''
          }}
        </p>
        <p v-if="person.position"><span>职位：</span>{{ person.position }}</p>
        <p v-if="person.achievements"><span>主要成就：</span>{{ person.achievements.join('、') }}</p>
        <p><span>个人简介：</span>{{ person.desc }}</p>
      </div>
    </div>
    <div v-else class="not-found">未找到该成员信息</div>
  </div>
  <div v-else class="not-verified">未通过验证，无法查看内容</div>
</template>

<script lang="ts" setup>
import { familyXishanData } from '../mainView/data/family-xishan-data-test'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import defaultAvatar from '@/assets/images/common/portrait.svg'
import { isVerifyValid } from '@/hooks/useFamilyTreeVerify'

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

// 计算年龄（仅在世时显示）
const age = computed(() => {
  if (!person.value || !person.value.isAlive) return null
  // 假设 bornDate 格式为 'YYYY-MM-DD' 或 'YYYY/MM/DD' 或 'YYYY'
  if (!person.value.bornDate) return null
  const yearMatch = person.value.bornDate.match(/\d{4}/)
  if (!yearMatch) return null
  const birthYear = parseInt(yearMatch[0], 10)
  if (isNaN(birthYear)) return null
  const nowYear = new Date().getFullYear()
  return nowYear - birthYear + 1
})

// 计算享年（仅不在世时显示）
const dieAge = computed(() => {
  if (!person.value || person.value.isAlive) return null
  if (!person.value.bornDate || !person.value.deathDate) return null
  const birthYearMatch = person.value.bornDate.match(/\d{4}/)
  const dieYearMatch = person.value.deathDate.match(/\d{4}/)
  if (!birthYearMatch || !dieYearMatch) return null
  const birthYear = parseInt(birthYearMatch[0], 10)
  const dieYear = parseInt(dieYearMatch[0], 10)
  if (isNaN(birthYear) || isNaN(dieYear)) return null
  return dieYear - birthYear + 1
})

console.log('Detail ====> ', person.value)

onMounted(() => {
  // isVerified.value = checkVerification()
})

// 新增 computed 形式的 isVerified
const isVerified = computed(() => isVerifyValid())
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
.tip-icon {
  display: inline-block;
  color: #999;
  background: #f3f4f6;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  transition:
    color 0.2s,
    background 0.2s;
}
.tip-icon:hover {
  color: #2563eb;
  background: #e0e7ef;
}
.not-verified {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #888;
  background: #f8fafc;
}
</style>
