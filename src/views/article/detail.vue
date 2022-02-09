<template>
  <el-card v-loading="loading">
    <h3>{{ article.title }}</h3>
    <div>
      {{ DateTimeUtil.format(article.createdTime) }}
    </div>
    <vue-markdown>
      {{ article.content }}
    </vue-markdown>
  </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {VueMarkdown},
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
