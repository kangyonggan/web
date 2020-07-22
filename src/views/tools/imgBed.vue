<template>
  <div>
    <el-col :span="15">
      <el-card class="box-card">
        <el-upload
          v-loading="loadingUpload"
          :action="axios.defaults.baseURL + 'fileUpload/weibo'"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :data="uploadData"
          :show-file-list="false"
          drag
        >
          <img
            v-if="result.url"
            class="img"
            :src="result.url"
          >
          <div v-else>
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              只能上传gif/jpg/jpeg/bmp/png/webp文件，且不超过100MB。
            </div>
          </div>
        </el-upload>

        <div
          class="summary"
          v-if="!$store.getters.getUser.account"
        >
          说明：请先<a
            @click="login"
            style="cursor: pointer"
          >登录</a>，
          匿名上传的图片均会显示在右侧列表中，图片最终是匿名上传到微博。

          <span
            v-show="showLoginBtn"
            style="float: right;cursor: pointer;color: #1677d9"
            @click="dialogVisible = true"
          >
            登录微博
          </span>
        </div>
        <div
          v-else
          class="summary"
        >
          上传的图片在本站范围仅自己可见，图片最终是匿名上传到微博。

          <span
            v-show="showLoginBtn"
            style="float: right;cursor: pointer;color: #1677d9"
            @click="dialogVisible = true"
          >
            登录微博
          </span>
        </div>
        <div
          class="urls"
          v-show="result.url"
        >
          <div class="url">
            本站原图：
            <a
              class="small"
              target="_blank"
              :href="axios.defaults.baseURL + result.web"
            >
              {{ getWebUrl(result.web) }}
            </a>

            <span
              class="copy-btn"
              v-clipboard:copy="getWebUrl(result.web)"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >复制</span>
          </div>
          <div class="url">
            微博大图：
            <a
              class="small"
              target="_blank"
              :href="result.url"
            >
              {{ result.url }}
            </a>
            <span
              class="copy-btn"
              v-clipboard:copy="result.url"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >复制</span>
          </div>
          <div class="url">
            微博中图：
            <a
              class="small"
              target="_blank"
              :href="result.middle"
            >
              {{ result.middle }}
            </a>
            <span
              class="copy-btn"
              v-clipboard:copy="result.middle"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >复制</span>
          </div>
          <div class="url">
            微博小图：
            <a
              class="small"
              target="_blank"
              :href="result.small"
            >
              {{ result.small }}
            </a>
            <span
              class="copy-btn"
              v-clipboard:copy="result.small"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError"
            >复制</span>
          </div>
          <div class="url">
            微博缩略图：
            <a
              class="small"
              target="_blank"
              :href="result.square"
            >
              {{ result.square }}
            </a>
            <span
              class="copy-btn"
              @click="copy(result.square)"
            >复制</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="9">
      <el-card
        class="box-card"
        style="margin-left: 10px;"
      >
        <div>
          <span class="title">上传历史</span>
        </div>

        <ul v-if="pageInfo.total">
          <li
            v-for="item in pageInfo.list"
            :key="item.id"
          >
            <a
              :href="'https://wx3.sinaimg.cn/large/' + item.pid + '.jpg'"
              target="_blank"
            >
              <img :src="'https://wx3.sinaimg.cn/square/' + item.pid + '.jpg'">

              <div class="date">
                {{ util.formatTimestamp(item.createdTime, 'MM-dd HH:mm') }}
              </div>
            </a>
          </li>
        </ul>

        <div
          v-else
          style="color: #999;text-align: center;line-height: 100px;"
        >
          暂无数据
        </div>

        <el-pagination
          class="pagination"
          v-show="pageInfo.pages > 1"
          layout="prev, pager, next, ->, total"
          :total="pageInfo.total"
          :page-size="params.pageSize"
          :current-page="params.pageNum"
          @current-change="jump"
        />

        <div
          class="tips"
          v-show="!$store.getters.getUser.account"
        >
          当前为匿名上传历史，<a
            @click="login"
            style="cursor: pointer"
          >登录</a>后可查看我的上传历史。
        </div>
      </el-card>
    </el-col>

    <base-login ref="login-modal" />

    <el-dialog
      center
      title="微博登录"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      destroy-on-close
    >
      <div style="text-align: center">
        <img
          v-if="qrUrl"
          :src="axios.defaults.baseURL + qrUrl"
        >
        <div v-show="msg">
          {{ msg }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                dialogVisible: false,
                loadingUpload: false,
                loadingHistory: false,
                showLoginBtn: false,
                qrUrl: '',
                qrid: '',
                msg: '',
                timer: undefined,
                params: {
                    pageNum: 1,
                    pageSize: 12
                },
                pageInfo: {
                    list: [],
                    total: 0
                },
                uploadData: {
                    'x-auth-token': localStorage.getItem('token')
                },
                imgTypes: [
                    'image/gif',
                    'image/jpeg',
                    'image/bmp',
                    'image/png',
                    'image/webp'
                ],
                result: {
                    url: '',
                    middle: '',
                    small: '',
                    square: '',
                    web: ''
                }
            };
        },
        methods: {
            getWebUrl(url) {
                let port = '';
                if (window.location.port) {
                    port = ':' + window.location.port;
                }
                return window.location.protocol + '//' + window.location.hostname + port + '/api/' + url;
            },
            beforeUpload(file) {
                if (!this.imgTypes.includes(file.type)) {
                    this.error('只能选择 gif/jpg/jpeg/bmp/png/webp 格式的图片!');
                    return false;
                }
                if (file.size / 1024 / 1024 > 100) {
                    this.error('图片大小不能超过100MB!');
                    return false;
                }

                this.loadingUpload = true;
                return true;
            },
            uploadError() {
                this.loadingUpload = false;
                this.url = '';
                this.error('图片上传失败，请联系管理员');
            },
            uploadSuccess(res) {
                this.loadingUpload = false;
                if (res.respCo !== '0000') {
                    this.qrUrl = '';
                    this.qrid = '';
                    this.msg = '';
                    this.axios.get('terminal/qrcode').then(data => {
                        this.qrUrl = data.url;
                        this.qrid = data.qrid;
                        this.showLoginBtn = true;
                        this.dialogVisible = true;

                        let that = this;
                        this.timer = setInterval(function () {
                            that.qrcheck();
                        }, 1500);
                    }).catch(resp => {
                        this.error(resp.respMsg);
                    });
                    return;
                }

                this.result.url = res.data.url;
                this.result.middle = res.data.middle;
                this.result.small = res.data.small;
                this.result.square = res.data.square;
                this.result.web = res.data.web;
                this.success('图片上传成功');

                this.jump(1);
            },
            qrcheck() {
                this.axios.get('terminal/qrcheck?qrid=' + this.qrid).then(data => {
                    this.msg = data.msg;

                    if (data.retcode * 1 === 20000000) {
                        this.dialogVisible = false;
                        this.showLoginBtn = false;
                        clearInterval(this.timer);
                        this.success('你好' + data.nick + '，请重新上传');
                    }
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            loadHistory() {
                this.loadingHistory = true;
                this.axios.get('tools/weibo?' + qs.stringify(this.params)).then(data => {
                    this.pageInfo = data.pageInfo;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingHistory = false;
                });
            },
            jump(pageNum) {
                this.params.pageNum = pageNum;
                this.loadHistory();
            },
            onCopySuccess() {
                this.success('复制成功');
            },
            onCopyError() {
                this.error('复制失败');
            },
            login() {
                this.$refs['login-modal'].show();
            }
        },
        mounted() {
            this.loadHistory();
        },
        watch: {
            '$store.state.user': function () {
                this.uploadData['x-auth-token'] = localStorage.getItem('token');
                this.jump(1);
            }
        }
    };
</script>

<style scoped lang="scss">
  .box-card {
    .title {
      display: inline-block;
      padding: 0 0 8px;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 2px solid #f68136;
      color: #333;
    }

    .tips {
      clear: both;
      text-align: center;
      font-size: 10px;
      color: rgb(135, 150, 169);
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px dashed #d9d9d9;
    }

    /deep/ .el-upload {
      width: 100%;

      .img {
        max-width: 100%;
        max-height: 320px;
      }

      .el-upload__tip {
        margin-top: 20px;
        color: #999;
      }

      .el-upload-dragger {
        width: 100%;
        height: 320px;

        .el-icon-upload {
          margin-top: 80px;
        }
      }
    }

    .summary {
      margin-top: 7px;
      font-size: 12px;
      color: #999;
    }

    .urls {
      color: #000;
      margin-top: 25px;
      font-size: 14px;

      .url {
        border-bottom: 1px dashed #d9d9d9;
        margin-top: 10px;
        padding-bottom: 5px;

        .small {
          font-size: 12px;
        }

        .copy-btn {
          float: right;
          cursor: pointer;
          color: #1677d9;
        }
      }
    }

    .pagination {
      clear: both;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 15px;

      li {
        float: left;
        width: 100px;
        height: 120px;
        text-align: center;

        a {
          display: inline-block;
          width: 90px;
          text-align: center;

          img {
            margin-top: 5px;
            border: 1px solid #f5f5f5;
            width: 80px;
            height: 80px;
          }

          .date {
            color: #999;
            font-size: 10px;
          }
        }
      }
    }
  }

  /deep/ .el-dialog--center {
    width: 350px;
  }
</style>