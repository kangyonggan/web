<template>
  <div class="content">
    <div
      v-loading="loading"
      class="video"
      v-html="video.content"
    >
      <div class="loading">
        加载中...
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                video: []
            };
        },
        mounted() {
            this.loading = true;
            this.axios.get('video/' + this.$route.params.id).then(data => {
                this.util.title(data.video.title);
                this.video = data.video;
            }).catch(res => {
                this.error(res.respMsg);
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style lang="scss">
  .video {
    background: #fff;
    width: 1024px;
    height: 576px;
    position: relative;
    border: 1px solid #d5d5d5;
    margin: 0 auto;

    iframe, embed {
      width: 1024px;
      height: 576px;
      margin: 0 auto;
    }

    .loading {
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      text-align: center;
      top: 260px;
      color: #999;
      z-index: 0;
    }
  }
</style>
