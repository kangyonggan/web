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
          <div class="article-list" />
        </el-card>
      </el-col>

      <el-col class="right">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">文章类型分布</span>
          </div>
          <div class="chart" />
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
          <div class="chart" />
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
    export default {};
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

    .article-list {
      height: 306px;
    }

    .chart {
      height: 306px;
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
      height: 306px;
    }

    .chart {
      height: 306px;
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