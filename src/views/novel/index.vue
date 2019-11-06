<template>
  <div class="content">
    <base-search :active-tab="1" />

    <el-col>
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
        url="/novel"
        :params="params"
      >
        <el-table-column
          prop="name"
          label="名称"
          width="180"
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
          width="170"
          sortable
        />
        <el-table-column
          label="总章节数"
          prop="count"
          width="120"
          sortable
        />
        <el-table-column
          label="推荐指数"
          prop="hold"
          width="150"
          sortable
        >
          <template slot-scope="scope">
            <base-rate :num="scope.row.hold" />
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
          align="center"
          width="190"
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
</style>
