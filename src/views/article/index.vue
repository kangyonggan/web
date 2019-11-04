<template>
  <div class="content">
    <base-search />

    <el-col class="search-article">
      <el-card class="box-card">
        <el-row class="title">
          全部文章
        </el-row>

        <el-col style="margin-top: 15px;">
          <div class="tags-label">
            标签：
          </div>
          <ul class="tags">
            <li
              v-for="(tag, index) in tags"
              :key="index"
              @click="handleClickTag(tag, index)"
              :class="{active: index === activeTag}"
            >
              {{ tag }}
            </li>
          </ul>
        </el-col>

        <el-col style="margin-top: 15px;">
          <div class="tags-label">
            标题：
          </div>
          <el-input
            placeholder="支持模糊搜索"
            size="medium"
            v-model="params.title"
          />
        </el-col>

        <el-col style="margin-top: 15px;">
          <div class="tags-label">
            日期：
          </div>
          <base-daterange
            size="medium"
            v-model="params.createdTime"
          />
          <el-button
            size="medium"
            type="primary"
            style="margin-left: 20px;"
          >
            搜索
          </el-button>
        </el-col>

        <div style="clear: both" />
      </el-card>
    </el-col>

    <el-row>
      <el-table
        :data="articleList"
        :header-cell-style="headerCellStyle"
        cell-class-name="body-cell"
      >
        <el-table-column
          label="文章标题"
        >
          <template slot-scope="scope">
            <router-link :to="'/article/' + scope.row.id">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="访问量"
          width="120"
          prop="viewNum"
        />
        <el-table-column
          label="标签"
          width="138"
        >
          <template slot-scope="scope">
            <el-tag
              size="mini"
              type="danger"
              v-for="tag in scope.row.tags.split(',')"
              :key="tag"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="发布日期"
          align="center"
          width="240"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span
              style="margin-left: 5px"
            >{{ util.formatTimestamp(scope.row.createdTime) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-row style="background: #fff;padding: 20px 0;">
        <el-pagination
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="1000">
        </el-pagination>
      </el-row>
    </el-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                activeTag: 0,
                params: {},
                tags: ['全部', 'Java', 'Vue', 'MySQL', 'Linux', 'SSH', 'SpringBoot', 'Html'],
                headerCellStyle: {
                    background: '#f5f6f8',
                    color: 'rgb(20, 36, 53)'
                },
                articleList: [
                    {
                        id: 1,
                        tags: 'Java,SpringBoot',
                        viewNum: 102,
                        title: '用ElementUI实现多级菜单遇到的问题及解决方案',
                        createdTime: 1572617564577
                    },
                    {
                        id: 2,
                        tags: 'Linux',
                        viewNum: 102,
                        title: '前端消息去重思路及具体实现',
                        createdTime: 1572617564577
                    },
                    {
                        id: 3,
                        tags: 'MySQL,Java',
                        viewNum: 102,
                        title: 'SpringBoot中对配置文件明文密码进行加密',
                        createdTime: 1572617564577
                    },
                    {
                        id: 4,
                        tags: 'Vue,Html',
                        viewNum: 102,
                        title: 'Vue中使用AES算法对请求响应加解密',
                        createdTime: 1572617564577
                    },
                    {
                        id: 5,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Java根据IP离线获取国家、省市区和经纬度',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用,Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Vue中使用AES算法对请求响应加解密,Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Vue中使用AES算法对请求响应加解密,Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Vue中使用AES算法对请求响应加解密,Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        tags: 'Vue,Java',
                        viewNum: 102,
                        title: 'Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用,Vue中使用AES算法对请求响应加解密',
                        createdTime: 1572617564577
                    }
                ]
            };
        },
        methods: {
            handleClickTag(tag, index) {
                this.params.tag = tag;
                this.activeTag = index;
            }
        }
    };
</script>

<style scoped lang="scss">
  .box-card {
    padding: 0 20px;
  }

  .search-article {
    .title {
      color: #000;
      font-size: 24px;
    }

    .tags-label {
      font-weight: 600;
      font-size: 14px;
      float: left;
      line-height: 32px;
    }

    .tags {
      list-style: none;
      padding-left: 0;
      margin: 0 0 0 15px;
      float: left;

      li {
        float: left;
        cursor: pointer;
        margin-right: 10px;
        font-weight: 500;
        font-size: 14px;
        color: #606266;
        padding: 4px 12px;
      }

      li.active {
        background-color: #f5f5f5;
        color: #409eff;
      }
    }

    .el-date-editor {
      float: left;
      margin-left: 15px;
      width: 462px;
    }

    .el-input {
      width: 552px;
      float: left;
      margin-left: 15px;
    }
  }

  table {
    .body-cell div {
      a {
        color: #333;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      a:hover {
        color: #e74e19;
      }
    }
  }
</style>
