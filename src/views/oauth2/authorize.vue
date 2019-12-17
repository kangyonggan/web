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
        <img :src="appInfo.icon">
      </div>
      <div style="margin-top: 10px;color: #595959;">
        使用 <b>康永敢</b>
      </div>
      <div>登录到 <b>{{ appInfo.name }}</b></div>
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
        <router-link to="/oauth2/join">
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
                appInfo: {},
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
                    this.axios.post('oauth2/login', this.params).then((data) => {
                        window.location.href = data.callbackUrl + '?code=' + data.code;
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
            this.axios.get('oauth2/appInfo?clientId=' + this.params.clientId).then(data => {
                this.appInfo = data.appInfo || {};
            }).catch(res => {
                this.error(res.respMsg);
            });
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