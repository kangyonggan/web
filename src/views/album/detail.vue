<template>
  <div class="content">
    <el-card v-loading="loading">
      <ul class="list">
        <li
          v-for="(item, index) in content"
          :key="index"
        >
          <img
            :src="baseUrl + item.thumbUrl"
            :data-origin="baseUrl + item.originUrl"
            style="cursor: zoom-in;"
          >
        </li>
      </ul>
      <div style="clear: both" />
    </el-card>
  </div>
</template>

<script>
    import $ from 'jquery';

    window.jQuery = $;
    require('../../libs/zoomer.min.js');

    export default {
        data() {
            return {
                baseUrl: this.axios.defaults.baseURL,
                loading: false,
                content: []
            };
        },
        mounted() {
            this.loading = true;
            this.axios.get('album/' + this.$route.params.id).then(data => {
                this.util.title(data.album.name);
                this.content = JSON.parse(data.album.content);

                this.$nextTick(() => {
                    $('.list').zoomer();
                });
            }).catch(res => {
                this.error(res.respMsg);
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 10px;
    min-height: 150px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      float: left;
      width: 195px;
      text-align: center;
      margin: 10px 4px 0 4px;

      img {
        width: 195px;
        height: 133px;
        border-style: none;
      }
    }
  }
</style>
