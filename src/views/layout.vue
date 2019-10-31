<template>
  <div class="layout">
    <div class="container">
      <Navbar />
      <keep-alive>
        <div class="content">
          <router-view />
        </div>
      </keep-alive>
      <div class="empty" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Navbar from './layout/navbar';
  import Footer from './layout/footer';

  export default {
    components: {Navbar, Footer}
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
    margin-bottom: -360px;
  }

  .empty {
    height: 360px;
  }

  .content {
    width: 1240px;
    margin: 0 auto;
    padding: 30px 0;
  }
</style>
