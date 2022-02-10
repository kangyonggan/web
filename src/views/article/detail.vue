<template>
  <div v-loading="loading">
    <h1 style="text-align: center">
      {{ article.title }}
    </h1>
    <div style="text-align: center;">
      {{ DateTimeUtil.format(article.createdTime) }}
    </div>
    <Markdown
      class="md-content"
      :source="article.content"
    />
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  components: {Markdown},
  data() {
    return {
      loading: false,
      article: {}
    };
  },
  methods: {
    loadData(id) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.axios.get('/article/' + id).then(data => {
        this.article = data.article;
        document.title = data.article.title + ' - 文章 - 康永敢'
      }).catch(res => {
        this.$error(res.msg);
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.loadData(this.$route.params.id);
  }
};
</script>

<style scoped lang="scss">
::v-deep(.md-content blockquote) {
  border-left: 4px solid var(--el-color-primary);
  padding-left: 10px;
  margin-left: 0;
}
</style>
