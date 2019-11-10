<template>
  <div class="content">
    <div
      class="photos"
      id="photos"
    >
      <img
        v-for="(photo, index) in photos"
        :key="index"
        :src="photo"
        @click="showImg(index)"
        @mouseenter="clearInterval()"
        @mouseleave="startInterval()"
      >
    </div>
    <el-card v-loading="loading">
      <ul v-show="albums.length">
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
      <div
        v-show="!albums.length"
        class="empty"
      >
        暂无相册
      </div>
      <div style="clear: both" />
    </el-card>
  </div>
</template>

<script>
    import img1 from '../../assets/images/photos/1.jpeg';
    import img2 from '../../assets/images/photos/2.jpeg';
    import img3 from '../../assets/images/photos/3.jpeg';
    import img4 from '../../assets/images/photos/4.jpeg';
    import img5 from '../../assets/images/photos/5.jpeg';
    import img6 from '../../assets/images/photos/6.jpeg';
    import img7 from '../../assets/images/photos/7.jpeg';
    import img8 from '../../assets/images/photos/8.jpeg';

    export default {
        data() {
            return {
                loading: false,
                albums: [],
                index: 1,
                interval: null,
                photos: [img1, img2, img3, img4, img5, img6, img7, img8]
            };
        },
        methods: {
            showImg: function (index) {
                this.index = index;
                // 获取图片数组
                let photos = document.getElementById('photos');
                let images = photos.getElementsByTagName('img');
                let offset = (images.length - index) % images.length;
                // 计算每张图片按Y轴旋转的角度
                let deg = Math.floor(360 / images.length);
                for (let i = 0; i < images.length; i++) {
                    images[i].style = 'transform: rotateX(-15deg) rotateY(' + deg * (i + offset) + 'deg) translateZ(380px);';
                }
            },
            clearInterval: function () {
                clearInterval(this.interval);
            },
            startInterval: function () {
                this.clearInterval();
                let that = this;
                this.interval = setInterval(function () {
                    that.index += 1;
                    if (that.index >= that.photos.length) {
                        that.index = 0;
                    }

                    that.showImg(that.index);
                }, 2000);
            }
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
            this.showImg(this.index);
            this.startInterval();
        },
        destroyed() {
            this.clearInterval();
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 15px 8px;
    min-height: 150px;
  }

  .photos {
    margin: 60px auto 260px auto;
    height: 204px;
    width: 300px;
    position: relative;
    transform-style: preserve-3d;
    perspective: 800px;

    img {
      height: 180px;
      position: absolute;
      cursor: pointer;
      box-shadow: 1px -1px 6px #666;
      border-radius: 4px;
      transition: transform 1s;
    }

  }

  .empty {
    text-align: center;
    margin-top: 80px;
    color: #999;
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
