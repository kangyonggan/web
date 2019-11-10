<template>
  <div class="content">
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="关于站长">
          <h2>关于站长</h2>
          <div>
            康永敢，男，出生于1992年，毕业于淮北师范大学数学系。
          </div>
          <p>
            本站是个人博客 + 书籍 + 其他小玩意，时间和精力有限，文章产量不是太高，但是会持续更新。
          </p>
          <p>
            另外，我手上有一个随手开发的简易看书的微信小程序，喜欢看书的可以联系我分享给你。
          </p>
          <h3 style="margin-top: 40px;">
            联系方式
          </h3>
          <div>
            电子邮箱：java@kangyonggan.com
          </div>
          <div style="margin-top: 20px;">
            <div style="float: left;">
              公共号：
            </div>
            <img
              src="https://tva1.sinaimg.cn/large/006y8mN6gy1g8t2se9gwoj31oc0m8djz.jpg"
              style="width: 400px;float: left"
            >
          </div>
          <div style="height: 1px;clear: both;"></div>
          <base-reward />
        </el-tab-pane>
        <el-tab-pane label="友链合作">
          <h2>友链合作</h2>
          <p>
            本站欢迎各路英雄豪杰与本站进行相互链接，有意者请通过站长的联系方式进一步沟通。
          </p>
        </el-tab-pane>
        <el-tab-pane label="免责申明">
          <h2>免责申明</h2>
          <p>
            1. 本站所有书籍全部收集于互联网，分享目的仅供大家学习与参考，如有侵权，请联系java@kangyonggan.com及时删除！
          </p>
          <p>
            2. 本站文章、相册和视频均为站长原创，未经站长允许，请勿擅自转载！
          </p>
          <p>
            3. 本站所有资源问题，本站不负任何责任，更没义务提供任何性质的技术支持，全部资源使用前请自行验证！
          </p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
  h2 {
    display: inline-block;
    border-bottom: 2px solid #f68136;
  }

  .el-tab-pane {
    margin: 0 20px;
  }
</style>