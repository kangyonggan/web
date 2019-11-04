<template>
  <div class="content">
    <base-search />

    <el-col v-loading="loading">
      <el-col class="search-article">
        <el-card class="box-card">
          <el-row class="title">
            全部文章
          </el-row>

          <el-col style="margin-top: 15px;">
            <div class="search-label">
              标题：
            </div>
            <el-input
              placeholder="支持模糊搜索"
              size="medium"
              clearable
              v-model="params.title"
            />
          </el-col>

          <el-col style="margin-top: 15px;">
            <div class="search-label">
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
              @click="jump(1)"
            >
              搜索
            </el-button>
          </el-col>

          <div style="clear: both" />
        </el-card>
      </el-col>

      <el-col>
        <el-table
          :data="pageInfo.list"
          :header-cell-style="headerCellStyle"
          cell-class-name="body-cell"
          @sort-change="sortChange"
          :default-sort="params"
        >
          <el-table-column
            prop="title"
            label="文章标题"
            sortable
          >
            <template slot-scope="scope">
              <router-link :to="'/article/' + scope.row.id">
                {{ scope.row.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="访问量"
            width="90"
            prop="viewNum"
            sortable
          />
          <el-table-column
            prop="createdTime"
            label="发布日期"
            align="center"
            width="170"
            sortable
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
            :total="pageInfo.total"
            :page-size="params.pageSize * 1"
            :current-page="params.pageNum * 1"
            @size-change="sizeChange"
            @current-change="jump"
          />
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                params: {
                    pageNum: 1,
                    pageSize: 10
                },
                headerCellStyle: {
                    background: '#f5f6f8',
                    color: 'rgb(20, 36, 53)'
                },
                loading: false,
                pageInfo: {
                    total: 0
                }
            };
        },
        methods: {
            jump(pageNum) {
                if (!pageNum) {
                    pageNum = 1;
                }
                this.params.pageNum = pageNum;

                let query = this.params;
                if (!this.params.createdTime) {
                    query.createdTime = undefined;
                }
                this.$router.push({
                    path: 'article',
                    query: query
                });
            },
            loadData() {
                this.loading = true;
                this.axios.get('article?' + qs.stringify(this.params)).then(data => {
                    this.pageInfo = data.pageInfo;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            sizeChange(pageSize) {
                this.params.pageSize = pageSize;

                this.jump();
            },
            sortChange(column) {
                this.params.order = column.order;
                this.params.prop = column.prop;
                this.jump();
            }
        },
        mounted() {
            this.params = Object.assign({}, this.$route.query);
            this.loadData();
        },
        beforeRouteUpdate(to, from, next) {
            this.params = Object.assign({}, to.query);
            this.loadData();
            next();
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

    .search-label {
      font-weight: 600;
      font-size: 14px;
      float: left;
      line-height: 32px;
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

  /deep/ th.el-table_1_column_1 {
    padding-left: 20px;
  }

  /deep/ th.el-table_1_column_2 div {
    padding-left: 0;
  }

  /deep/ .el-table__body {
    padding: 0 20px;
    table-layout: auto;
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
