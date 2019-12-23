<template>
  <div class="footer">
    <div class="content">
      <div class="author-info">
        ©2015-{{ year }}
        <router-link to="/about">
          康永敢
        </router-link>
        版权所有 皖ICP备18009089号.
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                year: new Date().getFullYear()
            };
        }
    };
</script>

<style scoped lang="scss">
  .footer {
    height: 47px;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    clear: both;

    .author-info {
      color: #8c8c8c;
      font-size: 13px;
      line-height: 47px;
      text-align: center;

      a {
        color: #8c8c8c;
        font-size: 13px;
      }
    }
  }
</style>