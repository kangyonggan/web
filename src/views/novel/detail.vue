<template>
  <div class="content">
    <el-col v-loading="loading">
      <toolbar
        :section="section"
        :prev-section="prevSection"
        :next-section="nextSection"
      />

      <el-card>
        <h1>{{ section.title }}</h1>
        <div v-html="section.content" />
      </el-card>

      <toolbar
        :section="section"
        :prev-section="prevSection"
        :next-section="nextSection"
      />
    </el-col>
  </div>
</template>

<script>
    import toolbar from './toolbar';

    export default {
        components: {toolbar},
        data() {
            return {
                loading: false,
                prevSection: {},
                section: {},
                nextSection: {}
            };
        },
        methods: {
            loadSection(novelId, sectionId) {
                this.loading = true;
                this.axios.get('novel/' + novelId + '/' + sectionId).then(data => {
                    this.prevSection = data.prevSection;
                    this.nextSection = data.nextSection;
                    this.section = data.section;
                    this.util.title(this.section.title);
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.loadSection(this.$route.params.novelId, this.$route.params.id);
        },
        beforeRouteUpdate(to, from, next) {
            this.loadSection(to.params.novelId, to.params.id);
            next();
        }
    };
</script>

<style scoped lang="scss">
  .el-card {
    margin: 10px 0;

    h1 {
      text-align: center;
      margin-top: 0;
    }
  }
</style>