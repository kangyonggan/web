<template>
  <div class="layout">
    <div class="navbar">
      <div class="container">
        <img src="../../assets/images/avatar.png">
        <div class="title">
          授权登录
        </div>
      </div>
    </div>
    <keep-alive>
      <div class="container">
        <router-view />
      </div>
    </keep-alive>
  </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
  .container {
    max-width: 688px;
    margin: 0 auto;
  }
  .navbar {
    height: 48px;
    line-height: 48px;
    background: #51b7ec;

    img {
      margin-left: 20px;
      height: 48px;
      float: left;
    }

    .title {
      float: left;
      line-height: 48px;
      color: #fff;
      font-size: 18px;
      margin-left: 10px;
    }
  }
</style>
