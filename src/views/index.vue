<script lang="ts">
export default {
  name: 'PCIndex'
}
</script>

<script setup lang="ts">
//
import HeaderView from './layout/HeaderView/index.vue'
import FooterView from './layout/FooterView/index.vue'
import MainView from './layout/MainView/MainView/MainView.vue'
//
// import { useRoute, useRouter } from 'vue-router'
// const route = useRoute()
// const router = useRouter()
// console.log('index : ', route, router)
</script>

<template>
  <el-watermark :content="['忠孝有声天地壮，古今无数子孙贤。','莆田世纪千秋业，寒水家乡万年基。']" :zIndex="-1" :gap="[0, 0]" :width="300" :height="80" :font="{ fontSize: 16, color: 'rgba(0, 0, 0, 0.4)' }">
    <el-container>
      <!-- header -->
      <el-header>
        <header-view class="header-cls" />
      </el-header>

      <!-- main -->
      <el-scrollbar max-height="calc(100vh - var(--header-height))">
        <!-- 回到顶部 -->
        <el-backtop target=".el-scrollbar__wrap" :right="50" :bottom="50" />

        <!-- main-center -->
        <el-container class="main-center-cls">
          <el-main>
            <!-- 主内容 -->
            <MainView />
          </el-main>
        </el-container>

        <!-- footer -->
        <el-footer>
          <footer-view />
        </el-footer>
      </el-scrollbar>
    </el-container>
  </el-watermark>
</template>

<style scoped lang="scss">
@use '@/assets/styles/element-plus-styles/element-plus-scoped-reset.scss';
@use '@/assets/styles/element-plus-styles/el-backtop-scoped.scss';
</style>

<style scoped lang="scss">
.header-cls {
  position: fixed;
  height: var(--header-height);
}

// 版心
.main-center-cls {
  width: 1200px;
  margin: 0 auto;
  background-color: aliceblue;
}
</style>
