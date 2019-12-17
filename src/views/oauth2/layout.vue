<template>
  <div class="layout">
    <div class="container">
      <Navbar />
      <keep-alive>
        <div class="content main">
          <router-view />
          <div style="clear: both;height: 20px;" />
        </div>
      </keep-alive>
      <div class="empty" />
    </div>
    <Footer />
    <back-top />
  </div>
</template>

<script>
    import Navbar from './navbar';
    import Footer from './footer';
    import BackTop from '../layout/back-top';

    export default {
        components: {Navbar, Footer, BackTop}
    };
</script>

<style scoped lang="scss">
  .layout {
    height: 100%;
    background: #f5f6f8;
  }

  .container {
    background: #f5f6f8;
    min-height: 100%;
    margin-bottom: -48px;
  }

  .empty {
    height: 48px;
  }

  .main {
    padding: 10px;
  }

  /deep/ .content {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
