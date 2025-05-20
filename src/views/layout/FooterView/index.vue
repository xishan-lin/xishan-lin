<script lang="ts">
export default {
  name: 'FooterView'
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useErrorCount, isLocked, setLock, setVerifySuccess, isVerifyValid, validChars, MESSAGE_VERIFY_SUCCESS, MESSAGE_VERIFY_ERROR, MESSAGE_VERIFY_LOCKED } from '@/hooks/useFamilyTreeVerify'
import qrcodeForLinx from '@/assets/images/common/qrcode_for_linx.jpg'
import qrcodeForLinxBlur from '@/assets/images/common/qrcode_for_linx_blur.jpg'

// 定义页脚数据
const companyInfo = {
  name: '林氏扬州西山本支',
  copyright: `© ${new Date().getFullYear()} 林氏扬州西山本支 版权所有`,
  icp: '暂未备案', //'苏ICP备2025000000号',
  address: '江苏省仪征市陈集镇',
  phone: '',
  email: 'lionsom.linx@gmail.com'
}

const showQrcodeDialog = ref(false)
const qrcodeCode = ref('')
const personalQrcodeVisible = ref(isVerifyValid())
const errorCount = useErrorCount()

const checkQrcodeCode = () => {
  if (isLocked()) {
    ElMessage.error(MESSAGE_VERIFY_LOCKED)
    return
  }
  // 只允许输入一个字且在家谱字辈中
  if (qrcodeCode.value.length !== 1 || !validChars.includes(qrcodeCode.value)) {
    errorCount.value++
    if (errorCount.value >= 3) setLock()
    ElMessage.error(MESSAGE_VERIFY_ERROR)
    return
  }
  setVerifySuccess()
  personalQrcodeVisible.value = true
  showQrcodeDialog.value = false
  qrcodeCode.value = ''
  errorCount.value = 0
  ElMessage.success(MESSAGE_VERIFY_SUCCESS)
}

const personalQrcodeImg = computed(() => personalQrcodeVisible.value ? qrcodeForLinx : qrcodeForLinxBlur)
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <!-- 左侧内容 -->
      <div class="footer-left">
        <div class="footer-logo">
          <img src="@/assets/images/common/icon.jpg" alt="公司logo" />
          <div class="company-name">{{ companyInfo.name }}</div>
        </div>
      </div>

      <!-- 右侧内容（包含二维码和联系方式） -->
      <div class="footer-right">
        <!-- 二维码部分 -->
        <div class="qrcode-section-wrapper">
          <!-- 个人二维码 -->
          <div class="qrcode-section personal-qrcode" @click="!personalQrcodeVisible && (showQrcodeDialog = true)" style="cursor:pointer;">
            <div class="qrcode-img-wrapper">
              <img :src="personalQrcodeImg" alt="个人二维码" />
              <div v-if="!personalQrcodeVisible" class="qrcode-tip-center">点击联系</div>
            </div>
            <div class="qrcode-desc">维护人员二维码</div>
          </div>
          <!-- 公众号二维码 -->
          <div class="qrcode-section">
            <img src="@/assets/images/common/qrcode_for_wechat.jpg" alt="公众号二维码" />
            <div class="qrcode-desc">关注公众号</div>
          </div>
        </div>
        <!-- 联系方式和地址部分 -->
        <div class="info-wrapper">
          <div class="info-section">
            <p v-if="companyInfo.phone"><i class="icon-phone"></i>联系方式：{{ companyInfo.phone }}</p>
            <p v-if="companyInfo.email"><i class="icon-email"></i>邮箱：{{ companyInfo.email }}</p>
            <p v-if="companyInfo.address"><i class="icon-location"></i> {{ companyInfo.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    title="请输入您的排行"
    v-model="showQrcodeDialog"
    width="300px"
    :close-on-click-modal="false"
  >
    <el-input
      v-model="qrcodeCode"
      maxlength="1"
      show-word-limit
      placeholder="只能输入一个字"
      @keyup.enter="checkQrcodeCode"
    />
    <template #footer>
      <el-button @click="showQrcodeDialog = false">取消</el-button>
      <el-button type="primary" @click="checkQrcodeCode">确定</el-button>
    </template>
  </el-dialog>

  <div class="copyright">
    <div class="copyright-content">
      <p>{{ companyInfo.copyright }}</p>
      <p>
        <a href="https://beian.miit.gov.cn/" target="_blank">{{ companyInfo.icp }}</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  background-color: #2c3e50;
  width: 100%;
  height: 150px;
  color: #fff;
  display: flex;
  align-items: center;

  .footer-content {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;

    // 左侧样式
    .footer-left {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      max-width: 380px;

      .footer-logo {
        display: flex;
        align-items: center;

        img {
          width: 50px; // 减小logo尺寸（原为60px）
          height: 50px; // 减小logo尺寸（原为60px）
          margin-right: 15px;
        }

        .company-name {
          font-size: 18px; // 略微减小字体大小（原为20px）
          font-weight: bold;
        }
      }

      // 社交媒体图标样式
      .social-media {
        display: flex;
        gap: 15px;
        margin: 15px 0;

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;

          img {
            width: 24px;
            height: 24px;
          }

          &:hover {
            background-color: #42b983;
            transform: translateY(-2px);
          }
        }
      }

      .copyright {
        p {
          font-size: 12px;
          color: #a8a8a8;
          margin: 3px 0; // 减小段落间距（原为5px）
        }
      }
    }

    // 右侧样式
    .footer-right {
      display: flex;
      gap: 40px;
      align-items: center;
      .qrcode-section-wrapper {
        display: flex;
        align-items: center;
      }
      .personal-qrcode {
        margin-right: 10px;
      }
      .qrcode-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 120px;
        margin-right: 10px;
        img {
          width: 90px;
          height: 90px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          background: #fff;
        }
        .qrcode-desc {
          margin-top: 8px;
          font-size: 13px;
          color: #e0e0e0;
          text-align: center;
        }
      }
      .info-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
}

// 版权信息样式
.copyright {
  background-color: #2c3e50;
  width: 100%;
  padding: 10px 0;
  color: #a8a8a8;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .copyright-content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    column-gap: 40px;
    align-items: center;
    justify-content: center;

    p {
      font-size: 13px;
      margin: 4px 0;
      transition: color 0.3s ease;

      a {
        color: #a8a8a8;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #42b983;
        }
      }

      &:hover {
        color: #e0e0e0;
      }
    }
  }
}

.qrcode-img-wrapper {
  position: relative;
  display: inline-block;
}
.qrcode-tip-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(44, 62, 80, 0.7);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 2;
}
</style>
