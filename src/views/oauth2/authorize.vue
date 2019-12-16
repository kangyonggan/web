<template>
  <div class="auth-content">
    <router-link to="/">
      <img
        src="../../assets/images/avatar.png"
        class="logo"
      >
    </router-link>

    <div class="auth-form">
      <div class="app-logo">
        <svg
          height="48"
          class="octicon octicon-mark-github"
          viewBox="0 0 16 16"
          version="1.1"
          width="48"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </div>
      <div style="margin-top: 10px;color: #595959;">
        使用 <b>康永敢</b>
      </div>
      <div>登录到 <b>Github</b></div>
      <div class="line" />

      <el-form
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
          <router-link to="/password/reset">
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
            size="small"
            type="success"
            v-loading="loading"
            @click="submit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="new-account">
        没有康永敢账号？
        <router-link to="/join">
          创建一个账号
        </router-link>
        。
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是以字母开头5至20位字母和数字组成'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
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

                    this.loading = true;
                    this.axios.post('login/oauth2', this.params).then((data) => {
                        window.location.href = data.callbackUrl + '?code=' + data.authCode;
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        },
        mounted() {
            Object.assign(this.params, this.$route.query);
        }
    };
</script>

<style scoped lang="scss">
  .auth-content {
    text-align: center;
    height: 100vh;
    background: #f9f9f9;
  }

  .logo {
    width: 60px;
    margin-top: 20px;
    border-radius: 50%;
    box-shadow: 0 1px 5px rgba(27, 31, 35, .15);
  }

  .auth-form {
    width: 308px;
    height: 420px;
    background: #fff;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    margin: 20px auto;

    .app-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      box-shadow: 0 1px 5px rgba(27, 31, 35, .15);
      margin: 20px auto 0 auto;

      img {
        width: 60px;
        height: 60px;
      }
    }

    .line {
      height: 10px;
      width: 266px;
      margin: 0 auto;
      border-bottom: 1px solid #e1e4e8 !important;
    }

    .el-form {
      width: 266px;
      margin: 10px auto 0 auto;

      .el-form-item {
        margin-bottom: 12px;

        /deep/ label {
          line-height: 34px;
        }

        a {
          float: right;
          color: #0366d6;
          text-decoration: none;
          font-size: 12px;
          line-height: 34px;
        }
      }

      button {
        margin-top: 8px;
        width: 266px;
      }
    }

    .new-account {
      clear: both;
      margin-top: 40px;
      height: 53px;
      line-height: 53px;
      text-align: center;
      border: 1px solid #d8dee2;
      border-radius: 5px;
      font-size: 14px;

      a {
        color: #0366d6;
        text-decoration: none;
      }
    }
  }
</style>