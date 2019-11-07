<template>
  <div class="content">
    <el-card v-loading="loading">
      <ul>
        <li
          v-for="video in videos"
          :key="video.id"
        >
          <dl>
            <dd>
              <router-link
                :to="'video/' + video.id"
                :style="'background-image: url(' + video.cover + ')'"
              />
              <div class="tags">
                {{ video.tags }}
              </div>
            </dd>
            <dt>
              {{ video.title }}
              <span>{{ util.formatTimestamp(video.createdTime, 'yyyy年MM月dd日') }}</span>
            </dt>
          </dl>
        </li>
      </ul>
      <div style="clear: both" />
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                videos: []
            };
        },
        mounted() {
            this.loading = true;
            this.axios.get('video?pageSize=10000').then(data => {
                this.videos = data.pageInfo.list;
            }).catch(res => {
                this.error(res.respMsg);
            }).finally(() => {
                this.loading = false;
            });
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 15px 8px;
    min-height: 150px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      float: left;
      width: 390px;
      margin: 10px 5px 10px 10px;
      border: 1px solid #d2d2d2;
      text-align: center;

      dl {
        margin: 0;
        padding: 0;

        dd {
          width: 370px;
          height: 260px;
          margin: 10px auto 0 auto;
          overflow: hidden;
          position: relative;

          .tags {
            position: absolute;
            bottom: 15px;
            right: 20px;
            color: #fff;
            font-size: 22px;
          }

          a {
            display: inline-block;
            width: 370px;
            height: 260px;
            background-position: 50%;
            background-size: cover;
          }
        }

        dt {
          margin-top: 3px;
          margin-bottom: 5px;
          color: #595959;
          line-height: 22px;
          text-align: left;
          margin-left: 13px;

          span {
            float: right;
            color: #999;
            font-size: 13px;
            margin-right: 13px;
          }
        }
      }
    }
  }
</style>
