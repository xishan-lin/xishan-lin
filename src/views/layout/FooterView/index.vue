<script lang="ts">
export default {
  name: 'FooterView'
}
</script>

<script setup lang="ts">
// 定义页脚数据
const companyInfo = {
  name: '林氏扬州西山本支',
  copyright: `© ${new Date().getFullYear()} 林氏扬州西山本支 版权所有`,
  icp: '暂未备案', //'苏ICP备2025000000号',
  address: '江苏省仪征市陈集镇',
  phone: '',
  email: 'lionsom.linx@gmail.com'
}
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
        <div class="qrcode-section">
          <img src="@/assets/images/common/qrcode_for_wechat.jpg" alt="公众号二维码" />
          <div class="qrcode-desc">关注公众号</div>
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
      gap: 40px; // 调整间距
      align-items: center;

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
</style>
