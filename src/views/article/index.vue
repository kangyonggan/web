<template>
  <div class="content">
    <base-search />

    <el-col class="search-article">
      <el-card class="box-card">
        <div slot="header">
          <span class="title">全部文章</span>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
    export default {};
</script>

<style lang="scss">
  .search-article {
    .title {
      color: #000;
      font-size: 22px;
    }

    .el-card__header {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }
</style>
