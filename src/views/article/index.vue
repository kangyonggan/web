<template>
  <div class="content">
    <base-search />

    <el-col v-loading="loading">
      <el-col class="search-article">
        <el-card class="box-card">
          <el-row class="title">
            全部文章
          </el-row>

          <el-form
            :inline="true"
            :model="params"
            size="medium"
            label-width="90px"
            label-suffix="："
            style="margin-top: 25px;"
          >
            <el-form-item label="标题">
              <el-input
                v-model="params.title"
                placeholder="请输入标题,支持模糊搜索"
                clearable
              />
            </el-form-item>
            <el-form-item label="发布日期">
              <base-daterange v-model="params.createdTime" />
            </el-form-item>

            <el-col>
              <el-form-item style="margin-left: 35px;margin-top: 10px;">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="jump(1)"
                >
                  搜索
                </el-button>
                <el-button
                  @click="reset"
                  icon="el-icon-refresh"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>

          <div style="clear: both" />
        </el-card>
      </el-col>

      <el-col>
        <el-table
          ref="table"
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
            width="190"
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
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 10
                };
                this.$refs.table.clearSort();
                this.jump(1);
            },
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
      margin-left: 35px;
    }

    .el-input {
      width: 460px;
      margin-right: 50px;
    }
  }

  /deep/ th div {
    padding-left: 0 !important;
  }

  /deep/ th:first-child {
    padding-left: 32px !important;
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
