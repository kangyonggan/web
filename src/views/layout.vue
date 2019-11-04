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
    import Navbar from './layout/navbar';
    import Footer from './layout/footer';
    import BackTop from './layout/back-top';

    export default {
        components: {Navbar, Footer, BackTop}
    };
</script>

<style lang="scss">
  .layout {
    height: 100%;
    background: #f5f6f8;
  }

  .container {
    background: #f5f6f8;
    min-height: 100%;
    min-width: 1240px;
    margin-bottom: -88px;
  }

  .empty {
    height: 88px;
  }

  .main {
    padding: 20px 0;
  }

  /*common*/
  .content {
    width: 1240px;
    margin: 0 auto;
  }

  a {
    outline: none;
  }
</style>
