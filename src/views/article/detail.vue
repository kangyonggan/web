<template>
  <div class="content">
    <base-search />

    <el-row
      class="article-detail"
    >
      <svg
        v-if="!article.id"
        width="100%"
        height="110px"
        style="background: #fff;border-bottom: 1px dashed #ddd;"
      >
        <rect
          x="20%"
          y="28"
          rx="3"
          ry="3"
          width="60%"
          height="35"
          fill="#f5f6f8"
        />
        <rect
          x="40%"
          y="72"
          rx="3"
          ry="3"
          width="20%"
          height="22"
          fill="#f5f6f8"
        />
        <rect
          x="84%"
          y="72"
          rx="3"
          ry="3"
          width="15%"
          height="22"
          fill="#f5f6f8"
        />
      </svg>
      <h1
        class="title"
        v-if="article.id"
      >
        {{ article.title }}
      </h1>
      <div
        class="info"
        v-if="article.id"
      >
        <span style="margin-right: 15px;">
          <i class="el-icon-view" />
          {{ article.viewNum }}
        </span>
        <em>
          <i class="el-icon-time" />
          {{ util.formatTimestamp(article.createdTime) }}
        </em>
      </div>

      <svg
        v-if="!article.id"
        width="100%"
        height="70px"
        style="background: #fff;border-bottom: 1px solid #eaecef"
      >
        <rect
          x="0"
          y="30"
          rx="3"
          ry="3"
          width="100px"
          height="30px"
          fill="#f5f6f8"
        />
      </svg>
      <svg
        v-if="!article.id"
        width="100%"
        height="210px"
        style="background: #fff"
      >
        <rect
          x="3%"
          y="10"
          rx="3"
          ry="3"
          width="97%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="0"
          y="40"
          rx="3"
          ry="3"
          width="100%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="0"
          y="70"
          rx="3"
          ry="3"
          width="40%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="3%"
          y="100"
          rx="3"
          ry="3"
          width="97%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="0"
          y="130"
          rx="3"
          ry="3"
          width="100%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="0"
          y="160"
          rx="3"
          ry="3"
          width="100%"
          height="20"
          fill="#f5f6f8"
        />
        <rect
          x="0"
          y="190"
          rx="3"
          ry="3"
          width="20%"
          height="20"
          fill="#f5f6f8"
        />
      </svg>

      <div
        style="position: relative;"
        v-else
      >
        <mavon-editor
          ref="md"
          :class="{preview: preview}"
          :toolbars="{'navigation': true, help: true, htmlcode: true, readmodel: true, preview: true}"
          :value="article.content"
          @previewToggle="previewToggle"
        />
      </div>
    </el-row>

    <base-reward v-if="article.id" />
  </div>
</template>

<script>
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';

    export default {
        data() {
            return {
                article: {},
                preview: true
            };
        },
        methods: {
            previewToggle(status) {
                this.preview = status;
            },
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
            loadData(id) {
                window.hljs = hljs;
                require('highlightjs-line-numbers.js');

                this.axios.get('article/' + id).then(data => {
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
                });
            }
        },
        mounted() {
            if (this.isPC()) {
                this.loadData(this.$route.params.id);
            } else {
                this.$router.push({
                    path: '/wap/article/' + this.$route.params.id
                });
            }
        },
        beforeRouteUpdate(to, from, next) {
            if (this.isPC()) {
                this.loadData(to.params.id);
                next();
            } else {
                this.$router.push({
                    path: '/wap/article/' + to.params.id
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
  /deep/ .article-detail {
    padding: 10px 20px 20px 20px;
    background: #fff;

    .title {
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

    /deep/ .preview {
      .v-note-edit {
        display: none;
      }

      .v-note-show {
        display: block !important;
        flex: 0 0 100% !important;
        width: 100% !important;
      }
    }

    /deep/ .markdown-body {
      border: 0 !important;
      box-shadow: none !important;
      padding-top: 10px;
    }

    /deep/ .v-note-edit {
      flex: 0 0 100% !important;
      width: 100% !important;
    }

    /deep/ .v-note-show {
      display: none;
    }

    /deep/ .v-note-op {
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

    /deep/ .v-show-content {
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

          min-width: 55px;
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
