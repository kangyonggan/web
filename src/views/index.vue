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
              align="right"
            />
            <el-table-column
              label="发布日期"
              width="160"
              align="right"
            >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span
                  style="margin-left: 5px"
                >{{ util.formatTimestamp(scope.row.createdTime, 'yyyy-MM-dd HH:mm') }}</span>
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

    <!--小说-->
    <el-col
      :span="24"
      style="margin-top: 20px;position: relative;"
    >
      <span class="bat-title">小说</span>
      <img src="@/assets/images/bar2.jpg">
    </el-col>
    <el-col class="novel-content">
      <el-col style="width: 400px;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <div>
            <span class="title">站长推荐</span>
            <router-link
              class="more"
              to="/novel"
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
              label="分类"
              width="88"
            >
              <template slot-scope="scope">
                <el-tag size="mini">
                  {{ getCategory(scope.row.category) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="书名"
              width="180"
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
              align="right"
              width="90"
            />
          </el-table>
        </el-card>
      </el-col>

      <el-col style="width: 400px;margin: 0 20px;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <div>
            <span class="title">最近更新</span>
            <router-link
              class="more"
              to="/novel"
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
              label="分类"
              width="88"
            >
              <template slot-scope="scope">
                <el-tag size="mini">
                  {{ getCategory(scope.row.category) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="书名"
              width="180"
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
              align="right"
              width="90"
            />
          </el-table>
        </el-card>
      </el-col>

      <el-col style="width: 400px;">
        <el-card
          class="box-card"
          style="height: 461px;"
        >
          <span class="title">小说分类</span>
          <ve-pie
            style="margin-top: 10px;"
            :settings="{roseType: 'radius'}"
            :data="novelChartData"
          />
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
            <span class="title">大宝一周岁</span>
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
              v-for="item in photoList"
              :key="item.url"
            >
              <img :src="item.url">
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>

      <!--视频-->
      <el-col style="width: 400px;float: right">
        <el-card
          class="box-card"
          style="height: 390px;"
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
            <li>
              <dl>
                <dd>
                  <img src="../assets/images/test/video1.png">
                </dd>
                <dt>
                  <div class="summary">
                    这是我去年在路边捡一个女娃,后来我把他卖了200块钱.
                  </div>
                  <div>
                    <el-tag
                      size="mini"
                      type="danger"
                    >
                      千岛湖
                    </el-tag>
                    <em class="date">
                      2019年11月01日
                    </em>
                  </div>
                </dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>
                  <img src="../assets/images/test/video2.png">
                </dd>
                <dt>
                  <div class="summary">
                    有一天我出去玩,又把她以300块钱买了回来.
                  </div>
                  <el-tag
                    size="mini"
                    type="danger"
                  >
                    太湖
                  </el-tag>
                  <em class="date">
                    2019年11月01日
                  </em>
                </dt>
              </dl>
            </li>
            <li>
              <dl>
                <dd>
                  <img src="../assets/images/test/video1.png">
                </dd>
                <dt>
                  <div class="summary">
                    再后来,我又以400块钱卖了,请问我赚了多少钱.
                  </div>
                  <el-tag
                    size="mini"
                    type="danger"
                  >
                    黄山
                  </el-tag>
                  <em class="date">
                    2019年11月01日
                  </em>
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
    import Pie from 'v-charts/lib/pie';
    import Line from 'v-charts/lib/line';
    import img1 from '../assets/images/test/1.jpg';
    import img2 from '../assets/images/test/2.jpg';
    import img3 from '../assets/images/test/3.jpg';
    import img4 from '../assets/images/test/4.jpg';
    import img5 from '../assets/images/test/5.jpg';
    import img6 from '../assets/images/test/6.jpg';

    Vue.component(Pie.name, Pie);
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
                        'novelCount': '小说访问量'
                    }
                },
                loadingChartData: false,
                chartData: {
                    columns: ['date', 'webCount', 'articleCount', 'novelCount'],
                    rows: []
                },
                novelChartData: {
                    columns: ['category', 'count'],
                    rows: [
                        {'category': '玄幻修真', 'count': 2393},
                        {'category': '都市言情', 'count': 3530},
                        {'category': '历史军事', 'count': 2923},
                        {'category': '悬疑灵异', 'count': 2723}
                    ]
                },
                articleList: [],
                loadingArticleList: false,
                categories: [],
                novelList: [],
                loadingNovelList: false,
                newNovelList: [],
                loadingNewNovelList: false,
                photoList: [
                    {
                        url: img1
                    },
                    {
                        url: img2
                    },
                    {
                        url: img3
                    },
                    {
                        url: img4
                    },
                    {
                        url: img5
                    },
                    {
                        url: img6
                    }
                ]
            };
        },
        methods: {
            getCategory(category) {
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].code === category) {
                        return this.categories[i].value;
                    }
                }
                return category;
            },
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
            loadDictData() {
                this.axios.get('dict?type=NOVEL_CATEGORY').then(data => {
                    this.categories = data.dicts;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            loadNovelList() {
                this.loadingNovelList = true;
                this.axios.get('novel?pageSize=7&prop=id&order=ascending').then(data => {
                    this.novelList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingNovelList = false;
                });

                this.loadingNewNovelList = true;
                this.axios.get('novel?pageSize=7&prop=id&order=descending').then(data => {
                    this.newNovelList = data.pageInfo.list;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingNewNovelList = false;
                });
            }
        },
        mounted() {
            // 加载字典
            this.loadDictData();
            // 加载文章
            this.loadArticleList();
            // 加载图表
            this.loadChartData(1);
            // 加载小说
            this.loadNovelList();
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
        color: #333;
        text-decoration: none;
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      a:hover {
        color: #e74e19;
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

  /*小说*/
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
          margin: 6px;

          dd {
            float: left;
            width: 160px;
            margin: 0;

            img {
              border: 0;
              outline: none;
              border-radius: 3px;
              cursor: pointer;
            }
          }

          dt {
            width: 170px;
            float: right;
            font-size: 14px;
            color: #333;

            .summary {
              height: 70px;
              line-height: 1.5;
            }

            .date {
              color: #999;
              font-size: 12px;
              float: right;
            }
          }
        }
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