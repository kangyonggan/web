<template>
  <div>
    <el-menu
      :default-active="quotationCoin"
      :collapse="isCollapse"
      router
    >
      <el-menu-item
        index="/market/BTC"
      >
        BTCUSDT
      </el-menu-item>
      <el-menu-item
        index="/market/ETH"
      >
        ETHUSDT
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      quotationCoin: 'BTC'
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu {
  float: left;
  width: 300px;

  .el-menu-item {
    padding-left: 8px !important;
    height: 28px;
    line-height: 28px;
  }
}
</style>