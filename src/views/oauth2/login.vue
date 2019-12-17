<template>
  <div>
    <div class="oauth2-panel">
      <div class="title">
        用户登录
      </div>
      <el-form
        class="form"
        ref="form"
        :model="params"
        :rules="rules"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input
            v-model="params.account"
            placeholder="请输入账号"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <router-link to="/oauth2/password/reset">
            忘记密码？
          </router-link>
          <el-input
            type="password"
            v-model="params.password"
            placeholder="请输入密码"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            size="medium"
            type="success"
            v-loading="loading"
            @click="submit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="new-account">
        <div class="third-links">
          <label class="label">其他账号登录：</label>
          <img
            id="qqLoginBtn"
            src="../../assets/images/qq.png"
            @click="qqLogin"
          >
          <svg
            height="16"
            width="16"
            style="margin-left: 8px;"
            @click="githubLogin"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </div>

        <div class="create-tips">
          没有康永敢账号？
          <router-link :to="'/oauth2/join?redirectUrl=' + $route.path">
            创建一个账号
          </router-link>
          。
        </div>
      </div>

      <el-dialog
        title="纯前端验证"
        :visible.sync="dialogVisible"
        width="360px"
        destroy-on-close
      >
        <div id="jigsaw">
          <div id="captcha" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import '../../libs/jigsaw.min';

    export default {
        data() {
            return {
                dialogVisible: false,
                appInfo: {},
                loading: false,
                params: {},
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'}
                    ]
                }
            };
        },
        methods: {
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.dialogVisible = true;
                    this.$nextTick(function () {
                        let that = this;
                        window.jigsaw.init({
                            el: document.getElementById('jigsaw'),
                            onSuccess: function () {
                                that.dialogVisible = false;
                                that.loading = true;
                                that.axios.post('login', that.params).then((data) => {
                                    that.$store.commit('setUser', data.user);
                                    localStorage.setItem('menus', JSON.stringify(data.menus));
                                    let redirectUrl = that.$route.query.redirectUrl || '/';
                                    that.$router.push({
                                        path: redirectUrl
                                    });
                                }).catch(res => {
                                    that.error(res.respMsg);
                                }).finally(() => {
                                    that.loading = false;
                                });
                            }
                        });
                    });
                });
            },
            qqLogin() {
                // eslint-disable-next-line
                QC.Login.showPopup({
                    appId: '101828246',
                    redirectURI: 'https://kangyonggan.com/admin/login'
                });
            },
            githubLogin() {
                window.open('https://github.com/login/oauth/authorize?client_id=0c9e693180e5376a2ae7&redirect_uri=https://kangyonggan.com/admin/login');
            }
        }
    };
</script>

<style scoped lang="scss">
  .oauth2-panel {
    max-width: 500px;
    background: #fff;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    margin: 60px auto 0 auto;
  }

  .title {
    font-size: 24px;
    border-bottom: 1px solid #e1e4e8;
    width: 80%;
    padding-bottom: 10px;
    margin: 20px auto 20px auto;
  }

  .el-form {
    width: 70%;
    margin: 0 auto;

    .el-form-item {
      a {
        float: right;
        color: #0366d6;
        text-decoration: none;
        font-size: 12px;
        line-height: 24px;
        margin-top: 10px;
      }
    }

    button {
      margin-top: 20px;
      width: 100%;
    }
  }

  .new-account {
    clear: both;
    margin-top: 40px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    border-top: 1px solid #d8dee2;
    font-size: 14px;

    .third-links {
      width: 50%;
      float: left;
      position: relative;

      label {
        position: absolute;
        left: 10px;
        top: -1px;
      }

      img {
        cursor: pointer;
      }
    }

    .create-tips {
      float: right;
      margin-right: 10px;

      a {
        color: #0366d6;
        text-decoration: none;
      }
    }
  }
</style>