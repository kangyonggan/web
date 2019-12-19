<template>
  <div class="layout">
    <div class="container">
      <Navbar />
      <div class="content">
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
            default-expand-all
            @node-click="handleNodeClick"
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
          <div class="node">
            <a
              class="title1"
              name="一、接入指南"
            >
              一、接入指南
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title2"
              name="1.1 成为开发者"
            >
              1.1 成为开发者
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title2"
              name="1.2 创建应用"
            >
              1.2 创建应用
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title1"
              name="二、网站应用"
            >
              二、网站应用
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title2"
              name="2.1 网站接入概述"
            >
              2.1 网站接入概述
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title2"
              name="2.2 网站开发流程"
            >
              2.2 网站开发流程
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title3"
              name="2.2.1 准备工作"
            >
              2.2.1 准备工作
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
          <div class="node">
            <a
              class="title1"
              name="三、更新历史"
            >
              三、更新历史
            </a>
            <div class="description">
              开发中...
            </div>
          </div>
        </el-col>
      </div>
      <div class="empty" />
    </div>
    <Footer />
    <back-top />
  </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    import Navbar from './navbar';
    import Footer from './footer';
    import BackTop from '../layout/back-top';

    export default {
        components: {Navbar, Footer, BackTop},
        data() {
            return {
                data: [
                    {
                        label: '一、接入指南',
                        children: [{
                            label: '1.1 成为开发者'
                        }, {
                            label: '1.2 创建应用'
                        }]
                    }, {
                        label: '二、网站应用',
                        children: [{
                            label: '2.1 网站接入概述'
                        }, {
                            label: '2.2 网站开发流程',
                            children: [{
                                label: '2.2.1 准备工作'
                            }]
                        }]
                    },
                    {
                        label: '三、更新历史'
                    }
                ]
            };
        },
        methods: {
            handleNodeClick(data) {
                window.location.hash = data.label;
            }
        }
    };
</script>

<style scoped lang="scss">
  .layout {
    height: 100%;
    background: url("../../assets/images/wiki-bg.jpg") repeat-x 0 0;
  }

  .container {
    min-height: 100%;
    margin-bottom: -48px;
  }

  .empty {
    height: 48px;
  }

  .main {
    padding: 10px;
  }

  /deep/ .content {
    max-width: 1024px;
    margin: 0 auto;
  }

  .left {
    margin-top: 20px;
    border: 1px solid #d1eafa;
    border-right: 0;

    /deep/ .el-tree-node__content {
      height: 40px;
    }

    /deep/ .el-tree div .is-current {
      color: #3fa6d3;
    }
  }

  .right {
    margin-top: 20px;
    border: 1px solid #d1eafa;
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
  }

  .node {
    .title1 {
      display: block;
      font-size: 22px;
      font-weight: bold;
      line-height: 45px;
      border-bottom: 2px solid #d5d5d5;
    }

    .title2 {
      display: block;
      font-size: 20px;
      line-height: 45px;
      border-bottom: 1px dashed #d5d5d5;
    }

    .title3 {
      display: block;
      font-size: 18px;
      line-height: 45px;
      border-bottom: 1px dashed #d5d5d5;
    }

    .description {
      min-height: 300px;
      margin-top: 20px;
    }
  }

</style>

