<template>
  <div class="content">
    <base-search :active-tab="1" />

    <el-col>
      <el-card
        class="novel-info"
        v-loading="loading"
      >
        <img :src="novel.cover">

        <div class="right">
          <div class="name">
            {{ novel.name }}

            <el-button
              style="float: right"
              type="primary"
              size="mini"
              icon="el-icon-sold-out"
              @click="pullNovel"
              v-loading="loadingPull"
              round
            >
              更新
            </el-button>
          </div>

          <div class="info">
            <div class="item">
              作者：{{ novel.author }}
            </div>
            <div class="item">
              最新章节：
              <router-link
                :to="'/novel/' + novel.id + '/' + lastSection.id"
                v-if="lastSection"
              >
                {{ lastSection.title }}
              </router-link>
              <span v-else>无</span>
            </div>
            <div class="item">
              来源：
              <a
                target="_blank"
                v-if="novelSource.id"
                :href="novelSource.baseUrl + novelSource.novelUrl.replace('@', novel.code)"
              >{{ novelSource.baseUrl + novelSource.novelUrl.replace('@', novel.code) }}</a>
            </div>
            <div class="item">
              最后更新：
              <span v-if="lastSection">{{ util.formatTimestamp(lastSection.updatedTime) }}</span>
              <span v-else>无</span>
            </div>
          </div>

          <div class="summary">
            {{ novel.summary }}
          </div>
        </div>
      </el-card>

      <el-card
        v-loading="loadingLastList"
        class="section-list"
        style="height: 180px;"
      >
        <div class="name">
          最新九章
          <el-tooltip
            content="刷新查看最新章节"
            placement="top"
          >
            <i
              class="el-icon-refresh"
              @click="refresh"
            >
              刷新
            </i>
          </el-tooltip>
        </div>
        <ul v-if="lastList.length">
          <li
            v-for="section in lastList"
            :key="section.id"
          >
            <router-link :to="'/novel/' + novel.id + '/' + section.id">
              {{ section.title }}
            </router-link>
          </li>
        </ul>
        <div
          v-else
          class="empty"
        >
          暂无章节
        </div>
      </el-card>

      <el-card
        v-loading="loadingAllList"
        class="section-list"
      >
        <div class="name">
          全部章节
          <el-tooltip
            v-show="params.order === 'ascending'"
            content="变为倒叙"
            placement="top"
          >
            <i
              class="el-icon-sort"
              @click="sort"
            >
              正序
            </i>
          </el-tooltip>
          <el-tooltip
            v-show="params.order === 'descending'"
            content="变为正序"
            placement="top"
          >
            <i
              class="el-icon-sort"
              @click="sort"
            >
              倒叙
            </i>
          </el-tooltip>
        </div>
        <ul v-if="pageInfo.total">
          <li
            v-for="section in pageInfo.list"
            :key="section.id"
          >
            <router-link :to="'/novel/' + novel.id + '/' + section.id">
              {{ section.title }}
            </router-link>
          </li>
        </ul>
        <div
          v-else
          class="empty"
        >
          暂无章节
        </div>
        <el-col v-if="pageInfo.total">
          <el-pagination
            layout="prev, pager, next, jumper, ->, total, slot"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            :current-page="pageInfo.pageNum"
            @current-change="jump"
          />
        </el-col>
      </el-card>
    </el-col>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                params: {
                    order: 'ascending'
                },
                loading: false,
                novel: {},
                lastSection: undefined,
                novelSource: {},
                loadingLastList: false,
                lastList: [],
                loadingAllList: false,
                pageInfo: {},
                loadingPull: false
            };
        },
        methods: {
            loadNovel() {
                this.loading = true;
                this.axios.get('novel/' + this.$route.params.id).then(data => {
                    this.novel = data.novel;
                    this.lastSection = data.lastSection;
                    this.novelSource = data.novelSource;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            loadLastList() {
                this.loadingLastList = true;
                this.axios.get('novel/' + this.$route.params.id + '/sections?pageSize=9&prop=id&order=descending').then(data => {
                    this.lastList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingLastList = false;
                });
            },
            loadAllList() {
                this.loadingAllList = true;
                this.axios.get('novel/' + this.$route.params.id + '/sections?pageSize=90&prop=id&' + qs.stringify(this.params)).then(data => {
                    this.pageInfo = data.pageInfo;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingAllList = false;
                });
            },
            pullNovel() {
                this.loadingPull = true;
                this.axios.put('novel/' + this.novel.id + '/pull').then(() => {
                    this.success('已加入更新队列，请稍后刷新！');
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingPull = false;
                });
            },
            sort() {
                if ('ascending' === this.params.order) {
                    this.params.order = 'descending';
                } else {
                    this.params.order = 'ascending';
                }

                this.jump(1);
            },
            refresh() {
                window.location.reload();
            },
            jump(pageNum) {
                if (!pageNum) {
                    pageNum = 1;
                }
                this.params.pageNum = pageNum;

                this.$router.push({
                    path: '/novel/' + this.novel.id,
                    query: this.params
                });
            }
        },
        mounted() {
            Object.keys(this.$route.query).forEach(key => {
                this.params[key] = this.$route.query[key];
            });
            this.loadNovel();
            this.loadLastList();
            this.loadAllList();
        },
        beforeRouteUpdate(to, from, next) {
            this.loadNovel();
            this.loadLastList();
            this.loadAllList();
            next();
        }
    };
</script>

<style scoped lang="scss">
  .novel-info {
    height: 200px;

    img {
      float: left;
      width: 128px;
      height: 158px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(221, 221, 221);
      border-image: initial;
      padding: 1px;
    }

    .right {
      float: left;
      width: 1040px;
      margin-left: 20px;

      .name {
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      .info {
        margin-top: 10px;
        font-size: 14px;
        height: 56px;

        .item {
          float: left;
          width: 500px;
          line-height: 25px;
        }
      }

      .summary {
        border-top: 1px solid #d5d5d5;
        padding-top: 10px;
        font-size: 13px;
        color: #595959;
        height: 57px;
        overflow: hidden;
      }
    }
  }

  .section-list {
    margin-top: 20px;

    .name {
      padding-bottom: 15px;
      color: #000;
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      border-bottom: 2px solid #1677d9;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 10px 0 0;

      li {
        float: left;
        width: 33%;
        border-bottom: 1px dashed #d5d5d5;

        a {
          line-height: 32px;
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }

    .empty {
      line-height: 118px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }

    .el-tooltip {
      float: right;
      cursor: pointer;
      font-size: 14px;
      outline: none;
    }

    .el-tooltip:hover {
      color: #e74e19;
    }

    .el-tooltip::before {
      font-size: 18px;
    }

    .el-pagination {
      margin: 20px 0;
    }
  }
</style>