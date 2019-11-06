<template>
  <el-rate
    class="base-rate"
    v-model="num"
    disabled
    :colors="['#e74e19', '#e74e19', '#e74e19']"
  />
</template>

<script>
    export default {
        props: {
            num: {
                required: true,
                type: Number
            }
        }
    };
</script>

<style lang="scss">
  .base-rate {
    .el-rate__icon {
      margin-right: 0;
    }
  }
</style>