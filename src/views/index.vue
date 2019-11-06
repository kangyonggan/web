<template>
  <div class="content">
    <base-search />

    <!--文章-->
    <el-col>
      <el-col style="width: 820px;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <div>
            <span class="title">最新文章</span>
            <router-link
              class="more"
              to="/article"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>
          <el-table
            v-loading="loadingArticleList"
            :data="articleList"
            :header-cell-style="headerCellStyle"
            cell-class-name="body-cell"
          >
            <el-table-column
              label="文章标题"
            >
              <template slot-scope="scope">
                <router-link :to="'/article/' + scope.row.id">
                  {{ scope.row.title }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="访问量"
              prop="viewNum"
              width="60"
            />
            <el-table-column
              label="发布日期"
              width="160"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span
                  style="margin-left: 5px"
                >
                  {{ util.formatTimestamp(scope.row.createdTime, 'yyyy-MM-dd HH:mm') }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col style="width: 400px;float: right;">
        <el-card
          class="box-card"
          style="height: 461px;"
          v-loading="loadingChartData"
        >
          <span class="title">流量走势</span>
          <div style="margin-top: 10px;">
            <ul class="tags">
              <li
                v-for="(item, index) in chartDates"
                :key="index"
                :class="{active: index === chartTagActive}"
                @click="loadChartData(index)"
              >
                {{ item }}
              </li>
            </ul>
            <ve-line
              :data="chartData"
              :settings="chartSettings"
            />
          </div>
        </el-card>
      </el-col>
    </el-col>

    <!--书籍-->
    <el-col
      :span="24"
      style="margin-top: 20px;position: relative;"
    >
      <span class="bat-title">书籍</span>
      <img src="@/assets/images/bar2.jpg">
    </el-col>
    <el-col class="novel-content">
      <el-col style="width: 610px;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <div>
            <span class="title">站长推荐</span>
            <router-link
              class="more"
              to="/novel?order=descending&prop=hold"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>

          <el-table
            v-loading="loadingNovelList"
            :data="novelList"
            :header-cell-style="headerCellStyle"
            cell-class-name="body-cell"
          >
            <el-table-column
              label="书名"
              width="100"
            >
              <template slot-scope="scope">
                <router-link :to="'/novel/' + scope.row.id">
                  {{ scope.row.name }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="90"
            />
            <el-table-column
              label="推荐指数"
              prop="hold"
              width="150"
            >
              <template slot-scope="scope">
                <base-rate :num="scope.row.hold" />
              </template>
            </el-table-column>
            <el-table-column
              label="最新章节"
              prop="lastSectionTitle"
            >
              <template slot-scope="scope">
                <router-link :to="'/novel/' + scope.row.id + '/' + scope.row.lastSectionId">
                  {{ scope.row.lastSectionTitle }}
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col style="width: 610px;float: right;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <div>
            <span class="title">最近更新</span>
            <router-link
              class="more"
              to="/novel?order=descending&prop=updatedTime"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>

          <el-table
            v-loading="loadingNewNovelList"
            :data="newNovelList"
            :header-cell-style="headerCellStyle"
            cell-class-name="body-cell"
          >
            <el-table-column
              label="书名"
              width="100"
            >
              <template slot-scope="scope">
                <router-link :to="'/novel/' + scope.row.id">
                  {{ scope.row.name }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="90"
            />
            <el-table-column
              label="最新章节"
              prop="lastSectionTitle"
            >
              <template slot-scope="scope">
                <router-link :to="'/novel/' + scope.row.id + '/' + scope.row.lastSectionId">
                  {{ scope.row.lastSectionTitle }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              prop="updatedTime"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span
                  style="margin-left: 5px"
                >
                  {{ util.formatTimestamp(scope.row.updatedTime, 'yyyy-MM-dd HH:mm') }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-col>

    <!--生活记录-->
    <el-col
      :span="24"
      style="margin-top: 20px;position: relative;"
    >
      <span class="bat2-title">生活记录</span>
      <img src="@/assets/images/bar1.jpg">
    </el-col>
    <el-col class="life-content">
      <!--相册-->
      <el-col style="width: 820px;">
        <el-card
          class="box-card"
          style="height: 390px;"
        >
          <div>
            <span class="title">大宝百天照</span>
            <router-link
              class="more"
              to="/album"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>

          <el-carousel
            :interval="4000"
            type="card"
            height="292px"
          >
            <el-carousel-item
              v-for="(item, index) in photoList"
              :key="index"
            >
              <img
                :src="item"
                style="max-width: 389px;max-height: 292px;"
              >
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>

      <!--视频-->
      <el-col style="width: 400px;float: right">
        <el-card
          class="box-card"
          style="height: 390px;"
          v-loading="loadingVideoList"
        >
          <div>
            <span class="title">生活随拍</span>
            <router-link
              class="more"
              to="/video"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>
          <ul class="video-list">
            <li
              v-for="video in videoList"
              :key="video.id"
            >
              <dl>
                <dd>
                  <router-link :to="'video/' + video.id">
                    <img :src="video.cover">
                  </router-link>
                </dd>
                <dt>
                  <router-link
                    class="summary"
                    :to="'video/' + video.id"
                  >
                    {{ video.title }}
                  </router-link>
                  <div>
                    <el-tag
                      size="mini"
                      type="danger"
                    >
                      {{ video.tags }}
                    </el-tag>
                    <em class="date">
                      {{ util.formatTimestamp(video.createdTime, 'yyyy年MM月dd日') }}
                    </em>
                  </div>
                </dt>
              </dl>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
    import Vue from 'vue';
    import Line from 'v-charts/lib/line';
    import img1 from '../assets/images/100/1.jpeg';
    import img2 from '../assets/images/100/2.jpeg';
    import img3 from '../assets/images/100/3.jpeg';
    import img4 from '../assets/images/100/4.jpeg';
    import img5 from '../assets/images/100/5.jpeg';
    import img6 from '../assets/images/100/6.jpeg';

    Vue.component(Line.name, Line);

    export default {
        data() {
            return {
                headerCellStyle: {
                    fontSize: '13px',
                    color: 'rgb(135, 150, 169)',
                    fontWeight: '100'
                },
                chartDates: ['近一周', '近一月', '近三月', '近六月', '近一年'],
                chartTagActive: 1,
                chartSettings: {
                    labelMap: {
                        'webCount': '网站访问量',
                        'articleCount': '文章访问量',
                        'novelCount': '书籍访问量'
                    }
                },
                loadingChartData: false,
                chartData: {
                    columns: ['date', 'webCount', 'articleCount', 'novelCount'],
                    rows: []
                },
                articleList: [],
                loadingArticleList: false,
                novelList: [],
                loadingNovelList: false,
                newNovelList: [],
                loadingNewNovelList: false,
                videoList: [],
                loadingVideoList: false,
                photoList: [img1, img2, img3, img4, img5, img6]
            };
        },
        methods: {
            loadArticleList() {
                this.loadingArticleList = true;
                this.axios.get('article?pageSize=7').then(data => {
                    this.articleList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingArticleList = false;
                });
            },
            loadChartData(index) {
                this.chartTagActive = index;
                this.loadingChartData = true;
                this.axios.get('accessLog?tag=' + index).then(data => {
                    this.chartData.rows = data.accessLogs;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingChartData = false;
                });
            },
            loadNovelList() {
                this.loadingNovelList = true;
                this.axios.get('novel?pageSize=7&prop=hold&order=descending').then(data => {
                    this.novelList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingNovelList = false;
                });

                this.loadingNewNovelList = true;
                this.axios.get('novel?pageSize=7&prop=updatedTime&order=descending').then(data => {
                    this.newNovelList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingNewNovelList = false;
                });
            },
            loadVideoList() {
                this.loadingVideoList = true;
                this.axios.get('video?pageSize=3').then(data => {
                    this.videoList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingVideoList = false;
                });
            }
        },
        mounted() {
            // 加载文章
            this.loadArticleList();
            // 加载图表
            this.loadChartData(1);
            // 加载书籍
            this.loadNovelList();
            // 加载视频
            this.loadVideoList();
        }
    };
</script>

<style scoped lang="scss">
  /*通用box*/
  .box-card {
    .title {
      display: inline-block;
      padding: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #f68136;
      color: #333;
    }

    .more {
      display: inline-block;
      float: right;
      margin-top: 6px;
    }

    .el-table::before {
      height: 0;
    }

    .body-cell div {
      a {
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .tags {
      list-style: none;
      padding: 0;
      margin: 0;
      height: 40px;

      li {
        text-align: center;
        float: left;
        width: 60px;
        height: 22px;
        line-height: 22px;
        margin-right: 10px;
        cursor: pointer;
        border-radius: 28px;
        font-size: 14px;
        font-weight: 600;
        position: relative;
      }

      li::after {
        content: "|";
        position: absolute;
        right: -8px;
        top: 7px;
        width: 10px;
        height: 10px;
        line-height: 10px;
        text-align: center;
        overflow: hidden;
        color: #bebebe;
      }

      li:last-child::after {
        content: '';
      }

      li.active {
        background: #f5f5f5;
        color: #1677d9;
      }
    }
  }

  /*书籍*/
  .novel-content {
    margin-top: -5px;
  }

  .bat-title {
    position: absolute;
    left: 145px;
    top: 25px;
    color: #fff;
    font-size: 24px;
  }

  /*生活记录*/
  .life-content {
    margin-top: -5px;

    .video-list {
      height: 306px;
      list-style: none;
      padding: 0;
      margin-top: 15px;

      li {
        width: 100%;
        float: left;

        dl {
          width: 342px;
          height: 90px;
          margin: 5px;
          padding-bottom: 5px;
          border-bottom: 1px dashed #d5d5d5;

          dd {
            float: left;
            width: 160px;
            height: 90px;
            margin: 0;

            img {
              border: 0;
              outline: none;
              border-radius: 3px;
              cursor: pointer;
              width: 100%;
              height: 100%;
            }
          }

          dt {
            width: 170px;
            float: right;
            font-size: 14px;
            color: #333;

            .summary {
              display: block;
              height: 60px;
              line-height: 1.5;
              text-decoration: none;
              padding-top: 5px;
              color: #595959;
            }

            .summary:hover {
              color: #e74e19;
            }

            .date {
              color: #999;
              font-size: 12px;
              float: right;
            }
          }
        }
      }

      li:last-child dl {
        border-bottom: 0;
      }

    }
  }

  .bat2-title {
    position: absolute;
    left: 120px;
    top: 50px;
    color: #fff;
    font-size: 24px;
  }

</style>