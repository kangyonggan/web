<template>
  <el-col class="base-table">
    <svg
      v-show="loading"
      width="100%"
      height="48px"
    >
      <rect
        x="1%"
        y="14px"
        width="23%"
        height="20px"
        fill="#d5d5d5"
      />
      <rect
        x="26%"
        y="14px"
        width="23%"
        height="20px"
        fill="#d5d5d5"
      />
      <rect
        x="51%"
        y="14px"
        width="23%"
        height="20px"
        fill="#d5d5d5"
      />
      <rect
        x="76%"
        y="14px"
        width="23%"
        height="20px"
        fill="#d5d5d5"
      />
    </svg>
    <svg
      v-show="loading"
      v-for="i in 10"
      :key="i"
      width="100%"
      height="47px"
      style="background: #fff;float: left;border-bottom: 1px solid #f5f6f8"
    >
      <rect
        x="1%"
        y="14px"
        rx="3"
        ry="3"
        width="23%"
        height="20px"
        fill="#f5f6f8"
      />
      <rect
        x="26%"
        y="14px"
        rx="3"
        ry="3"
        width="23%"
        height="20px"
        fill="#f5f6f8"
      />
      <rect
        x="51%"
        y="14px"
        rx="3"
        ry="3"
        width="23%"
        height="20px"
        fill="#f5f6f8"
      />
      <rect
        x="76%"
        y="14px"
        rx="3"
        ry="3"
        width="23%"
        height="20px"
        fill="#f5f6f8"
      />
    </svg>
    <el-table
      v-show="!loading"
      ref="table"
      :border="border"
      :data="list"
      @sort-change="sortChange"
      :default-sort="params"
    >
      <slot />
    </el-table>

    <el-row
      v-show="!loading"
      style="background: #fff;padding: 20px 0;"
      v-if="pagination"
    >
      <el-pagination
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total"
        :page-size="params.pageSize"
        :current-page="params.pageNum"
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