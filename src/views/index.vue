<template>
  <div class="items">
    index
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: {}
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
  .items {
    text-align: center;

    a {
      cursor: pointer;
      display: inline-block;
      height: 160px;
      width: 160px;
      margin: 10px;
      border: 1px solid var(--app-border-color);
      line-height: 160px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: var(--app-text-color-light);
    }
  }
</style>

