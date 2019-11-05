<template>
  <div class="content">
    <base-search :active-tab="1" />

    <el-col>
      <el-col>
        <el-card v-loading="loading">
          <div>小说简介</div>
        </el-card>
      </el-col>

      <base-table
          ref="table"
          :url="'/novel/' + this.$route.params.id + '/sections'"
          :jump-url="'/novel/' + this.$route.params.id"
          :params="params"
        >
          <el-table-column
            width="120"
            label="序号"
          >
            <template slot-scope="scope">
              {{ getIndex(scope) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            sortable
          >
            <template slot-scope="scope">
              <router-link :to="'/novel/' + novel.id + '/' + scope.row.id">
                {{ scope.row.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedTime"
            label="更新时间"
            width="210"
            sortable
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 5px">{{ util.formatTimestamp(scope.row.updatedTime) }}</span>
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
                loading: false,
                novel: {},
                params: {
                    pageNum: 1,
                    pageSize: 10
                }
            };
        },
        methods: {
            loadData() {
                this.loading = true;
                this.axios.get('novel/' + this.$route.params.id).then(data => {
                    this.novel = data.novel;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            getIndex(scope) {
                return scope.$index + (this.params.pageNum - 1) * this.params.pageSize + 1;
            }
        },
        mounted() {
            Object.keys(this.$route.query).forEach(key => {
                this.params[key] = this.$route.query[key];
            });
            this.loadData();
            this.$refs.table.reload();
        },
        beforeRouteUpdate(to, from, next) {
            this.$refs.table.reload();
            next();
        }
    };
</script>