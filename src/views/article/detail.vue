<template>
  <div class="content">
    <base-search />

    <el-row class="article-detail">
      <h1>{{ article.title }}</h1>
      <div class="info">
        <span style="margin-right: 15px;">
          <i class="el-icon-view" />
          12
        </span>
        <el-tag
          size="mini"
          type="danger"
          v-for="tag in article.tags.split(',')"
          :key="tag"
        >
          {{ tag }}
        </el-tag>
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
    import content from './data';

    export default {
        data() {
            return {
                article: {
                    title: '使用ElementUI实现多级菜单遇到的问题及解决方案',
                    tags: 'Java,SpringBoot',
                    createdTime: 1572617564577,
                    content: content
                }
            };
        },
        methods: {}
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

      .el-tag {
        margin-right: 15px;
      }
    }

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
