<template>
  <el-card>
    <div slot="header">
      <span>生成Markdown目录</span>
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
      let tocList = [];
      let lines = md.split('\n');
      let isCodeLine = false;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        // 暂不考虑4空格代码块
        if (line.startsWith('```')) {
          isCodeLine = !isCodeLine;
        }
        // 跳过：代码块、空行、不是#开头的行
        if (isCodeLine || !line || !line.startsWith('#')) {
          continue;
        }
        // 获取标题级别 和 标题名称
        let spaceIndex = line.indexOf(' ');
        tocList.push({
          name: line.substring(spaceIndex).trim(),
          level: spaceIndex
        });
      }
      this.toToc(tocList);
    },
    /**
     * 转为markdown语法的doc
     *
     * @param tocList
     */
    toToc(tocList) {
      let res = '';
      if (tocList.length === 0) {
        this.toc = res;
        return;
      }
      let minLevel = this.getMinLevel(tocList);
      for (let i = 0; i < tocList.length; i++) {
        for (let j = 0; j < tocList[i].level - minLevel; j++) {
          res += '  ';
        }
        res += '- [' + tocList[i].name + '](#' + tocList[i].name + ')\n';
      }
      this.toc = res;
    },
    /**
     * 判断最小的是几级标题
     *
     * @param tocList
     * @returns {number}
     */
    getMinLevel(tocList) {
      let minLevel = 999;
      for (let i = 0; i < tocList.length; i++) {
        if (tocList[i].level < minLevel) {
          minLevel = tocList[i].level;
        }
      }

      return minLevel;
    }
  },
  mounted() {
    this.getMarkdownToc(this.content);
  }
};
</script>