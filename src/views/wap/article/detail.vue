<template>
  <div>
    <el-row
      class="article-detail"
      v-loading="loading"
    >
      <h2>
        {{ article.title }}
      </h2>

      <div style="position: relative;clear: both">
        <mavon-editor
          ref="md"
          :toolbars="{}"
          :value="article.content"
        />
      </div>
    </el-row>

    <base-reward />

    <div style="height: 20px;" />
  </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';

    export default {
        data() {
            return {
                loading: false,
                article: {}
            };
        },
        methods: {
            /**
             * 判断是不是PC端
             *
             * @return {boolean}
             */
            isPC() {
                let userAgentInfo = navigator.userAgent;
                let Agents = ['Android', 'iPhone',
                    'SymbianOS', 'Windows Phone',
                    'iPad', 'iPod'];
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            loadData() {
                window.hljs = hljs;
                require('highlightjs-line-numbers.js');

                this.loading = true;
                this.axios.get('article/' + this.$route.params.id).then(data => {
                    this.article = data.article;
                    this.util.title(this.article.title);

                    this.$nextTick(function () {
                        let pres = this.$refs.md.$el.querySelectorAll('.v-show-content pre');
                        Object.values(pres).forEach(pre => {
                            hljs.highlightBlock(pre);
                            hljs.lineNumbersBlock(pre.firstChild, {singleLine: true});
                        });
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            if (this.isPC()) {
                this.$router.push({
                    path: '/article/' + this.$route.params.id
                });
            } else {
                this.loadData();
            }
        }
    };
</script>

<style lang="scss" scoped>
  /deep/ .article-detail {
    padding: 5px;

    .markdown-body {
      border: 0 !important;
      box-shadow: none !important;
    }

    .v-note-edit {
      display: none;
    }

    .v-note-show {
      flex: 0 0 100% !important;
      width: 100% !important;
    }

    .v-note-op {
      display: none !important;
    }

    .v-show-content {
      background: #fff !important;
      padding: 0 !important;
    }
  }

  /deep/ .markdown-body {
    pre {
      padding: 0 !important;
      border-radius: 0 !important;
    }

    .hljs {
      padding: 0 !important;
    }

    table.hljs-ln {
      margin-bottom: 0;
      border: 1px solid #e5e5e5;

      tr {
        border-top: 0 !important;
        background: #fff !important;

        td {
          padding: 3px 13px !important;
        }

        .hljs-ln-numbers {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          text-align: right;
          color: rgba(0, 0, 0, 0.3);
          border-bottom: 0;
          border-top: 0;
          border-left: 0;
          border-right: 1px solid #e5e5e5;
          vertical-align: top;
          padding-right: 5px !important;
          background: #f9f9f9;

          min-width: 35px;
        }

        .hljs-ln-code {
          border: 0 !important;
          padding-left: 10px !important;
          background: #f6f8fa;
          width: 100%;
        }
      }
    }
  }
</style>
