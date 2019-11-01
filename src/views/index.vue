<template>
  <div class="content">
    <base-search />

    <!--文章-->
    <el-col class="article-content">
      <el-col>
        <el-card class="box-card">
          <div slot="header">
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
            :data="articleList"
          >
            <el-table-column
              prop="title"
              label="标题"
              width="608"
            >
              <template slot-scope="scope">
                <router-link :to="'/article/' + scope.row.id">
                  {{ scope.row.title }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="日期"
              align="center"
              width="170"
            >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span style="margin-left: 5px">{{ util.formatTimestamp(scope.row.createdTime, 'yyyy-MM-dd HH:mm') }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col class="right">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">文章类型分布</span>
          </div>
          <div class="chart">
            <ve-pie
              :settings="{roseType: 'radius'}"
              :data="articleChartData"
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
      <el-col>
        <el-card class="box-card">
          <div slot="header">
            <span class="title">读者收藏榜</span>
            <router-link
              class="more"
              to="/"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>
          <div class="novel-list" />
        </el-card>
      </el-col>

      <el-col class="center">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">人气排行榜</span>
            <router-link
              class="more"
              to="/"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>
          <div class="novel-list" />
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-card">
          <div slot="header">
            <span class="title">小说阅读量走势</span>
          </div>
          <div class="chart">
            <ul>
              <li
                v-for="(item, index) in novelChartDates"
                :key="index"
                :class="{active: index === novelChartDateActive}"
                @click="changeNovelChart(index)"
              >
                {{ item }}
              </li>
            </ul>
            <ve-line
              :settings="{xAxisType: 'time'}"
              :data="novelChartData"
            />
          </div>
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
      <el-col>
        <el-card class="box-card">
          <el-carousel
            :interval="4000"
            type="card"
            height="348px"
          >
            <el-carousel-item
              v-for="item in 6"
              :key="item"
            >
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>

      <!--视频-->
      <el-col class="right">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">视频</span>
            <router-link
              class="more"
              to="/"
            >
              <el-tooltip
                content="更多"
                placement="top"
              >
                <i class="el-icon-more" />
              </el-tooltip>
            </router-link>
          </div>
          <div class="video-list" />
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
    import Vue from 'vue';
    import Pie from 'v-charts/lib/pie';
    import Line from 'v-charts/lib/line';

    Vue.component(Pie.name, Pie);
    Vue.component(Line.name, Line);

    export default {
        data() {
            return {
                novelChartDates: ['近一月', '近一季', '近半年', '近一年', '上线以来'],
                novelChartDateActive: 0,
                articleChartData: {
                    columns: ['type', 'count'],
                    rows: [
                        {'type': 'Java', 'count': 1393},
                        {'type': 'Javascript', 'count': 3530},
                        {'type': 'SpringBoot', 'count': 2923},
                        {'type': 'MySQL', 'count': 1723},
                        {'type': 'Linux', 'count': 3792},
                        {'type': 'Vue', 'count': 4593}
                    ]
                },
                novelChartData: {
                    columns: ['日期', '阅读量', '收藏量'],
                    rows: [
                        {'日期': '2019-11-01', '阅读量': 139, '收藏量': 23},
                        {'日期': '2019-11-02', '阅读量': 50, '收藏量': 123},
                        {'日期': '2019-11-03', '阅读量': 103, '收藏量': 43},
                        {'日期': '2019-11-04', '阅读量': 123, '收藏量': 64},
                        {'日期': '2019-11-05', '阅读量': 92, '收藏量': 23},
                        {'日期': '2019-11-06', '阅读量': 59, '收藏量': 84}
                    ]
                },
                articleList: [
                    {
                        id: 1,
                        title: '用ElementUI实现多级菜单遇到的问题及解决方案',
                        createdTime: 1572617564577
                    },
                    {
                        id: 2,
                        title: '前端消息去重思路及具体实现',
                        createdTime: 1572617564577
                    },
                    {
                        id: 3,
                        title: 'SpringBoot中对配置文件明文密码进行加密',
                        createdTime: 1572617564577
                    },
                    {
                        id: 4,
                        title: 'Vue中使用AES算法对请求响应加解密',
                        createdTime: 1572617564577
                    },
                    {
                        id: 5,
                        title: 'Java根据IP离线获取国家、省市区和经纬度',
                        createdTime: 1572617564577
                    },
                    {
                        id: 6,
                        title: 'Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用,Eureka分区在SpringBoot项目和非SpringBoot项目的配置和使用',
                        createdTime: 1572617564577
                    }
                ]
            };
        },
        methods: {
            changeNovelChart(index) {
                this.novelChartDateActive = index;
            }
        }
    };
</script>

<style lang="scss">
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
  }

  /*文章*/
  .article-content {
    .el-col {
      width: 820px;
    }

    .right {
      width: 400px;
      margin-left: 20px;
    }

    .el-card__header {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .el-card__body {
      padding: 10px 20px;
    }

    .el-table {
      height: 326px;
    }

    .el-table::before {
      height: 0;
    }

    th .cell {
      font-size: 13px;
      color: rgb(135, 150, 169);
      font-weight: 100;
    }

    tr .cell {
      line-height: 21px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;

      a {
        color: #333;
        text-decoration: none;
      }

      a:hover {
        color: #e74e19;
      }
    }

    .chart {
      height: 326px;
    }
  }

  /*小说*/
  .novel-content {
    margin-top: -5px;

    .el-col {
      width: 400px;
    }

    .center {
      margin: 0 20px;
    }

    .novel-list {
      height: 386px;
    }

    .chart {
      height: 386px;

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        height: 45px;

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

    .el-col {
      width: 820px;
    }

    .right {
      width: 400px;
      margin-left: 20px;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    .video-list {
      height: 306px;
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