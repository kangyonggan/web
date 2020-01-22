<template>
  <div class="layout">
    <keep-alive>
      <router-view />
    </keep-alive>

    <back-top />
  </div>
</template>

<script>
    import BackTop from '../layout/back-top';

    export default {
        components: {BackTop}
    };
</script>

<style scoped lang="scss">
  .layout {
    width: 100%;
  }
</style>
