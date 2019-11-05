<template>
  <div class="content">
    <base-search :active-tab="1" />

    <el-col v-loading="loading">
      <el-col class="search-novel">
        <el-card class="box-card">
          <el-row class="title">
            全部小说
          </el-row>

          <el-form
            :inline="true"
            :model="params"
            size="medium"
            label-width="90px"
            label-suffix="："
            style="margin-top: 25px;"
          >
            <el-form-item label="名称">
              <el-input
                v-model="params.name"
                placeholder="请输入小说名称,支持模糊搜索"
                clearable
              />
            </el-form-item>
            <el-form-item label="作者">
              <el-input
                v-model="params.author"
                placeholder="请输入作者名称,支持模糊搜索"
                clearable
              />
            </el-form-item>
            <el-form-item label="分类">
              <el-select
                v-model="params.category"
                placeholder="请选择小说分类"
                clearable
              >
                <el-option
                  v-for="item in categories"
                  :key="item.code"
                  :value="item.code"
                  :label="item.value"
                >
                  {{ item.value }}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站长推荐">
              <el-checkbox
                v-model="params.hold"
                true-label="1"
                false-label=""
              />
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
            prop="name"
            label="名称"
            sortable
          >
            <template slot-scope="scope">
              <router-link :to="'/novel/' + scope.row.id">
                {{ scope.row.name }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author"
            sortable
          />
          <el-table-column
            label="分类"
            prop="category"
            sortable
          >
            <template slot-scope="scope">
              <el-tag size="mini">
                {{ getCategory(scope.row.category) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="总章节数"
            prop="count"
            align="center"
            sortable
          />
          <el-table-column
            label="站长推荐"
            prop="hold"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              <i
                class="el-icon-check"
                style="color: #f68136;font-size: 20px;"
                v-show="scope.row.hold"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="最新章节"
            prop="lastSectionTitle"
            sortable
          >
            <template slot-scope="scope">
              <router-link :to="'/novel/' + scope.row.id + '/' + scope.row.lastSectionId">
                {{ scope.row.lastSectionTitle }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedTime"
            label="最后更新时间"
            sortable
          >
            <template slot-scope="scope">
              <i
                class="el-icon-time"
                v-show="scope.row.updatedTime"
              />
              <span
                v-show="scope.row.updatedTime"
                style="margin-left: 5px"
              >{{ util.formatTimestamp(scope.row.updatedTime) }}</span>
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
                    pageSize: 10,
                    hold: ''
                },
                headerCellStyle: {
                    background: '#f5f6f8',
                    color: 'rgb(20, 36, 53)'
                },
                loading: false,
                pageInfo: {
                    total: 0
                },
                categories: []
            };
        },
        methods: {
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 10,
                    hold: ''
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
                    path: 'novel',
                    query: query
                });
            },
            loadData() {
                this.loading = true;
                this.axios.get('novel?' + qs.stringify(this.params)).then(data => {
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
            },
            loadCategories() {
                this.axios.get('dict?type=NOVEL_CATEGORY').then(data => {
                    this.categories = data.dicts;
                }).catch(res => {
                   this.error(res.respMsg);
                });
            },
            getCategory(category) {
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].code === category) {
                        return this.categories[i].value;
                    }
                }
                return category;
            }
        },
        mounted() {
            this.params = Object.assign({}, this.$route.query);
            this.loadCategories();
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

  .search-novel {
    .title {
      color: #000;
      font-size: 24px;
      margin-left: 35px;
    }

    .el-input, .el-select {
      width: 400px;
      margin-right: 50px;
    }
  }

  /deep/ th div {
    padding-left: 20px !important;
  }

  /deep/ th:first-child {
    padding-left: 10px !important;
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
