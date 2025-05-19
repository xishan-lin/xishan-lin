import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 国际化
import myI18n from './language'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @element-plus/icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入数据
import { data } from '@/assets/data-ts/test-ts-json'
import pdfData from '@/assets/data-ts/pdf-ts-json'
// import testData from '@/assets/data-json/test-json.json'

// import { loadEnv } from 'vite';

const app = createApp(App)

// @element-plus/icons-vue - 注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 打印数据
console.log('示例数据:', data)
console.log('PDF数据:', pdfData)
// console.log('测试数据:', testData)
// 打印环境变量
console.log('import.meta.env =', import.meta.env);
console.log('import.meta.env.BASE_URL =', import.meta.env.BASE_URL);
console.log('VITE_BASE_API_URL =', import.meta.env.VITE_BASE_API_URL);
console.log('process.env.NODE_ENV =', import.meta.env.MODE);

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.use(myI18n)

app.mount('#app')
