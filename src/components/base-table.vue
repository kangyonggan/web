<template>
  <el-col class="base-table">
    <el-table
      v-skeleton="{loading: loading, rows: params.pageSize || 10}"
      ref="table"
      :border="border"
      :data="list"
      @sort-change="sortChange"
      :default-sort="params"
    >
      <slot />
    </el-table>

    <el-row
      style="background: #fff;padding: 20px 0;"
      v-if="pagination"
    >
      <el-pagination
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total"
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
            },
            pagination: {
                required: false,
                type: Boolean,
                default: true
            },
            border: {
                required: false,
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                list: [],
                total: 0
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
            reload() {
                this.loading = true;
                this.axios.get(this.url + '?' + qs.stringify(this.params)).then(data => {
                    if (this.pagination) {
                        this.list = data.pageInfo.list;
                        this.total = data.pageInfo.total;
                    } else {
                        this.list = data.list;
                    }
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>