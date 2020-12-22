<template>
  <el-card>
    <div slot="header">
      <span>生成Markdown目录（适应Gitlab）</span>
    </div>
    <el-col :span="12">
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入markdown内容"
        v-model="content"
        @input="getMarkdownToc"
      />
    </el-col>
    <el-col
      :span="12"
      style="padding-left: 10px;"
    >
      <el-input
        type="textarea"
        :rows="20"
        readonly
        placeholder="生成的目录"
        :value="toc"
      />
    </el-col>
    <div style="clear: both;height: 10px;" />
  </el-card>
</template>

<script>
import TocMarkdown from 'toc-markdown';

export default {
  data() {
    return {
      content: '## 第一项\n' +
          ' - 第一项嵌套的第一个元素\n' +
          ' - 第一项嵌套的第二个元素\n' +
          '\n' +
          '### 小标题\n' +
          '风骚小标题\n' +
          '\n' +
          '```java\n' +
          '## 代码块中的标题不算\n' +
          '```\n' +
          '\n' +
          '## 第二项\n' +
          ' - 第二项嵌套的第一个元素\n' +
          ' - 第二项嵌套的第二个元素',
      toc: ''
    };
  },
  methods: {
    /**
     * 获取markdown目录
     *
     * @param md
     */
    getMarkdownToc(md) {
      this.toc = TocMarkdown.generateToc(md);
    }
  },
  mounted() {
    this.getMarkdownToc(this.content);
  }
};
</script>