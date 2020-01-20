<template>
  <div>
    <el-card>
      <div slot="header">
        <span>制作GIF</span>
      </div>
      <el-col>
        <el-form
          ref="form"
          :inline="true"
          :model="params"
        >
          <el-col>
            <div
              class="frame"
              v-for="(frame, index) in frameList"
              :key="index"
            >
              <img
                v-show="frame.img"
                :src="frame.img"
                @click="selectFile($event)"
              >
              <div
                v-show="!frame.img"
                class="file-label"
                @click="selectFile($event)"
              >
                第{{ index + 1 }}帧
              </div>
              <input
                type="file"
                class="hidden"
                @change="imgChange($event, index)"
              >
            </div>
            
            <canvas
              class="hidden"
              id="canvas"
              :width="params.width"
              :height="params.height"
            />

            <div
              class="more"
              @click="addFrame"
            >
              <i
                class="el-icon-plus"
                style="font-size: 60px"
              />
            </div>
          </el-col>
          <el-col style="margin-top: 20px;border-top: 1px dashed #d5d5d5;padding-top: 20px;">
            <el-col :span="6">
              <el-form-item
                label="GIF宽度"
                prop="width"
              >
                <el-input-number
                  placeholder="GIF宽度"
                  v-model="params.width"
                  :min="100"
                  :max="1000"
                  :step="10"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="GIF高度"
                prop="height"
              >
                <el-input-number
                  placeholder="GIF高度"
                  v-model="params.height"
                  :min="100"
                  :max="1000"
                  :step="10"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submit"
                >
                  <i class="el-icon-check" />
                  开始制作
                </el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>

        <el-col style="text-align: center;margin: 20px 0">
          <img
            v-show="result"
            :src="result"
            :style="{width: params.width + 'px', height: params.height + 'px'}"
            class="resultImg"
          >
        </el-col>
      </el-col>
    </el-card>
  </div>
</template>

<script>
    import $ from 'jquery';
    import GIF from '../../libs/gif/gif';

    window.jQuery = $;

    export default {
        data() {
            return {
                params: {
                    width: 240,
                    height: 180
                },
                frameList: [{
                    img: ''
                }, {
                    img: ''
                }],
                result: ''
            };
        },
        methods: {
            selectFile: function (e) {
                e.preventDefault();
                e.target.parentNode.childNodes[2].click();
                return false;
            },
            imgChange: function (e, index) {
                e.preventDefault();
                let pic = e.target.files[0];
                // 校验
                if (!this.validPic(pic)) {
                    return;
                }

                // 图片预览
                let file = new FileReader();
                file.readAsDataURL(pic);

                let that = this;
                file.onload = function () {
                    that.frameList[index].img = this.result;
                };
                return false;
            },
            validPic: function (pic) {
                if (!pic) {
                    return false;
                }

                // 格式校验
                let ext = pic.name.substring(pic.name.lastIndexOf('.') + 1).toLowerCase();
                if ('jpeg,jpg,png'.indexOf(ext) === -1) {
                    this.warning('请选择 png、jpeg、jpg 格式的图片文件');
                    return false;
                }
                return true;
            },
            addFrame: function () {
                this.frameList.push({
                    img: ''
                });
            },
            submit() {
                for (let i = 0; i < this.frameList.length; i++) {
                    if (!this.frameList[i].img) {
                        this.warning('请选择第' + (i + 1) + '帧的图片');
                        return;
                    }
                }
                if (!this.params.width) {
                    this.params.width = 240;
                }
                if (!this.params.height) {
                    this.params.height = 180;
                }

                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');

                let gif = new GIF({
                    workers: this.frameList.length,
                    quality: 30,
                    workerScript: '/gif/gif.worker.js'
                });
                let that = this;
                gif.on('finished', function (blob) {
                    let file = new FileReader();
                    file.readAsDataURL(blob);
                    file.onload = function () {
                        that.result = file.result;
                    };
                });

                let count = 0, imgObjList = [];

                for (let i = 0; i < this.frameList.length; i++) {
                    let tmpImg = new Image();
                    tmpImg.src = this.frameList[i].img;
                    imgObjList.push(tmpImg);
                    tmpImg.onload = function () {
                        count++;
                        if (count === that.frameList.length) {
                            that.generateGif(gif, imgObjList, ctx, canvas);
                        }
                    };
                }
            },
            generateGif: function (gif, imgObjList, ctx, canvas) {
                for (let i = 0; i < imgObjList.length; i++) {
                    ctx.save();
                    ctx.drawImage(imgObjList[i], 0, 0, canvas.width, canvas.height);

                    ctx.restore();
                    gif.addFrame(canvas, {copy: true, delay: 1500});
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                gif.render();
            }
        }
    };
</script>

<style lang="scss" scoped>
  .hidden {
    display: none;
  }

  .frame {
    margin: 18px 28px;
    float: left;
    width: 240px;
    height: 180px;
    cursor: pointer;
    position: relative;
  }

  .frame img {
    width: 240px;
    height: 180px;
  }

  .frame .file-label {
    border: 1px dashed #ccc;
    border-radius: 8px;
    width: 240px;
    height: 180px;
    text-align: center;
    line-height: 180px;
    color: #999;
  }

  .more {
    margin: 18px 28px;
    float: left;
    width: 240px;
    height: 180px;
    border: 1px dashed #ccc;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    line-height: 160px;
  }

  .more:hover {
    border: 1px dashed #2d8cf0;
  }

  .more i {
    margin-top: 50px;
  }

  .resultImg {
    max-width: 100%;
  }
</style>