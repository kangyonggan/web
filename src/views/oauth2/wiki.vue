<template>
  <div>
    <el-col
      class="left"
      :xs="24"
      :sm="24"
      :md="6"
      :lg="6"
      :xl="6"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
      />
    </el-col>
    <el-col
      class="right"
      :xs="24"
      :sm="24"
      :md="18"
      :lg="18"
      :xl="18"
    >
      开发中...
    </el-col>
  </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        data() {
            return {
                data: [{
                    label: '更新历史'
                }, {
                    label: '接入指南',
                    children: [{
                        label: '成为开发者'
                    }, {
                        label: '创建应用'
                    }]
                }, {
                    label: '网站应用',
                    children: [{
                        label: '网站接入概述'
                    }, {
                        label: '网站开发流程',
                        children: [{
                            label: '准备工作'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        }
    };
</script>

<style scoped lang="scss">
  .left {
    margin-top: 10px;
    background: #fff;
    border: 1px solid #f2f2f2;

    /deep/ .el-tree-node__content:hover {
      background-color: #fff;
      color: #409eff;
    }

    /deep/ .is-current {
      color: #409eff;
    }

  }

  .right {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
  }

</style>

