<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="params"
        ref="form"
      >
        <el-form-item
          prop="title"
          style="min-width: 300px;margin-bottom: 5px;margin-top: 5px;"
        >
          <el-input
            v-model="params.title"
            placeholder="搜索标题，支持模糊搜索"
            clearable
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 5px;margin-top: 5px;">
          <el-button
            type="primary"
            :disabled="loading"
            @click="jump(1)"
          >
            <el-icon>
              <search />
            </el-icon>
            搜索
          </el-button>
          <el-button
            type="info"
            :disabled="loading"
            @click="$refs['form'].resetFields()"
          >
            <el-icon>
              <refresh-right />
            </el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card
      style="margin-top: 20px;"
      v-loading="loading"
    >
      <el-table
        :data="list"
        
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="文章标题"
        >
          <template #default="scope">
            <router-link :to="'/article/' + scope.row.id">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewNum"
          label="访问量"
          width="90"
        />
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="165"
        >
          <template #default="scope">
            {{ DateTimeUtil.format(scope.row.createdTime) }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :disabled="loading"
        style="margin: 10px 0;float:right"
        layout="prev, pager, next"
        :total="total"
        :pager-count="5"
        @current-change="jump($event)"
        :current-page="params.pageNum * 1"
        background
        hide-on-single-page
      />
    </el-card>
  </div>
</template>

<script>
import {Search, RefreshRight} from '@element-plus/icons';
import qs from 'qs'

export default {
  components: {Search, RefreshRight},
  data() {
    return {
      loading: false,
      params: {
        title: '',
        pageNum: 1
      },
      list: [],
      total: 0
    }
  },
  methods: {
    jump(pageNum) {
      this.params._ts = new Date().getTime()
      this.params.pageNum = pageNum
      this.$router.push({
        path: '/article',
        query: this.params
      })
    },
    loadData() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.axios.get('/article?' + qs.stringify(this.params)).then(data => {
        this.list = data.pageInfo.list
        this.total = data.pageInfo.total
      }).catch(res => {
        this.$error(res.msg)
      }).finally(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    Object.keys(this.$route.query).forEach(key => {
      this.params[key] = this.$route.query[key]
    })
    this.loadData()
  },
  beforeRouteUpdate(to, from, next) {
    Object.keys(to.query).forEach(key => {
      this.params[key] = to.query[key]
    })
    this.loadData()
    next();
  }
};
</script>

<style scoped lang="scss">
.cell a {
  color: var(--app-text-color);
  text-decoration: none;
}
.cell a:hover {
  color: var(--el-color-primary);
}
</style>