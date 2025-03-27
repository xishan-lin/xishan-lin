<script lang="ts">
export default {
  name: 'FooterView'
}
</script>

<script setup lang="ts">
// 定义页脚数据
const companyInfo = {
  name: '西山木木',
  copyright: `© ${new Date().getFullYear()} 西山木木 版权所有`,
  icp: '粤ICP备XXXXXXXX号',
  address: '江苏省仪征市陈集镇',
  phone: '400-123-4567',
  email: 'contact@example.com'
}
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <!-- 左侧内容 -->
      <div class="footer-left">
        <div class="footer-logo">
          <img src="@/assets/images/common/logo.svg" alt="公司logo" />
          <div class="company-name">{{ companyInfo.name }}</div>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="footer-right">
        <div class="info-section">
          <h4>联系我们</h4>
          <p><i class="icon-phone"></i> {{ companyInfo.phone }}</p>
          <p><i class="icon-email"></i> {{ companyInfo.email }}</p>
        </div>

        <div class="info-section">
          <h4>地址</h4>
          <p><i class="icon-location"></i> {{ companyInfo.address }}</p>
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
    padding: 0 20px;

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
      gap: 50px; // 减少间距（原为60px）
      align-self: center;

      .info-section {
        min-width: 180px;

        h4 {
          font-size: 16px;
          margin-bottom: 8px;
          position: relative;
          display: inline-block; // 添加内联块显示，使下划线宽度与文本匹配
          padding-bottom: 6px;

          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background-color: #42b983;
            transition: width 0.3s ease; // 添加过渡效果
            transition: height 0.3s ease; // 添加过渡效果
          }

          &:hover:after {
            height: 4px;
          }
        }

        p {
          margin: 6px 0; // 减小间距（原为8px）
          font-size: 14px;
          color: #e0e0e0;
          display: flex;
          align-items: center;

          i {
            margin-right: 8px;
            font-size: 16px;
          }
        }
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
