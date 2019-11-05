<template>
  <div class="content">
    <base-search />

    <el-row
      class="article-detail"
      v-loading="loading"
    >
      <h1>{{ article.title }}</h1>
      <div class="info">
        <span style="margin-right: 15px;">
          <i class="el-icon-view" />
          {{ article.viewNum }}
        </span>
        <em>
          <i class="el-icon-time" />
          {{ util.formatTimestamp(article.createdTime) }}
        </em>
      </div>

      <div style="position: relative;">
        <mavon-editor
          :toolbars="{'navigation': true, help: true, htmlcode: true, readmodel: true}"
          :value="article.content"
        />
      </div>
    </el-row>

    <base-reward />
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                article: {}
            };
        },
        mounted() {
            this.loading = true;
            this.axios.get('article/' + this.$route.params.id).then(data => {
                this.article = data.article;
                this.util.title(this.article.title);
            }).catch(res => {
                this.error(res.respMsg);
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style lang="scss">
  .article-detail {
    padding: 10px 20px 20px 20px;
    background: #fff;

    h1 {
      text-align: center;
      margin-bottom: 10px;
    }

    .info {
      text-align: center;
      color: #595959;
      font-size: 13px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ddd;
    }

    .markdown-body {
      border: 0 !important;
      box-shadow: none !important;
      padding-top: 10px;
    }

    .v-note-edit {
      display: none;
    }

    .v-note-show {
      flex: 0 0 100% !important;
      width: 100% !important;
    }

    .v-note-op {
      position: absolute;
      right: -10px;
      width: 400px !important;
      top: -54px;
      border: 0 !important;
      text-align: right !important;

      .v-left-item {
        display: none;
      }

      .v-right-item {
        max-width: 100% !important;
      }
    }

    .v-show-content {
      background: #fff !important;
      padding: 0 !important;
    }
  }
</style>
