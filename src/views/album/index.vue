<template>
  <div class="content">
    <el-card v-loading="loading">
      <ul>
        <li
          v-for="album in albums"
          :key="album.id"
        >
          <dl>
            <dd>
              <router-link
                :to="'album/' + album.id"
                :style="'background-image: url(' + album.cover + ')'"
              />
              <div class="size">
                {{ album.size }}
              </div>
            </dd>
            <dt>
              {{ album.name }}
              <span>{{ util.formatTimestamp(album.createdTime, 'yyyy年MM月dd日') }}</span>
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
                albums: []
            };
        },
        mounted() {
            this.loading = true;
            this.axios.get('album').then(data => {
                this.albums = data.albums;
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

          .size {
            position: absolute;
            bottom: 15px;
            right: 20px;
            color: #fff;
            font-size: 34px;
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
