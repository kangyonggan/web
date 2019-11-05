<template>
  <el-col
    class="base-table"
    v-loading="loading"
  >
    <el-table
      ref="table"
      :data="pageInfo.list"
      @sort-change="sortChange"
      :default-sort="params"
    >
      <slot />
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
</template>

<script>
    import qs from 'qs';

    export default {
        props: {
            url: {
                required: true,
                type: String
            },
            jumpUrl: {
                required: false,
                type: String,
                default: ''
            },
            params: {
                required: true,
                type: Object
            }
        },
        data() {
            return {
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

                this.$router.push({
                    path: this.jumpUrl ? this.jumpUrl : this.url,
                    query: this.params
                });
            },
            clearSort() {
                this.$refs.table.clearSort();
            },
            reload(pageNum) {
                if (pageNum) {
                    this.params.pageNum = pageNum;
                }

                this.loading = true;
                this.axios.get(this.url + '?' + qs.stringify(this.params)).then(data => {
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
        }
    };
</script>

<style lang="scss">
  .base-table {
    .el-table {
      thead {
        th {
          background: #f5f6f8;
          color: #595959;
        }
      }

      .el-table__header-wrapper {
        background: #f5f6f8;
      }

      .el-table__header, .el-table__body {
        width: 1200px !important;
        margin: 0 auto;
        table-layout: auto;
      }

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