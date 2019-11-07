<template>
  <div class="content">
    <base-search />

    <el-col>
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
                  @click="$refs.table.jump(1)"
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

      <base-table
        ref="table"
        url="/article"
        :params="params"
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
          width="200"
          sortable
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span
              style="margin-left: 5px"
            >{{ util.formatTimestamp(scope.row.createdTime) }}</span>
          </template>
        </el-table-column>
      </base-table>
    </el-col>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {}
            };
        },
        methods: {
            reset() {
                Object.keys(this.params).forEach(key => {
                    this.params[key] = undefined;
                });
                this.$refs.table.clearSort();
                this.$refs.table.jump(1);
            }
        },
        mounted() {
            Object.keys(this.$route.query).forEach(key => {
                this.params[key] = this.$route.query[key];
            });
            this.$refs.table.reload();
        },
        beforeRouteUpdate(to, from, next) {
            this.$refs.table.reload();
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
</style>
