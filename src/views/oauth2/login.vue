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
        <div class="create-tips">
          没有康永敢账号？
          <router-link :to="'/oauth2/join?redirectUrl=' + $route.path">
            创建一个账号
          </router-link>
          。
        </div>
      </div>
    </div>

    <base-auth-code
      ref="authCode"
      @success="login"
    />
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
                    this.$refs.authCode.show();
                });
            },
            login() {
                this.loading = true;
                this.axios.post('login', this.params).then((data) => {
                    this.$store.commit('setUser', data.user);
                    localStorage.setItem('menus', JSON.stringify(data.menus));
                    let redirectUrl = this.$route.query.redirectUrl || '/';
                    this.$router.push({
                        path: redirectUrl
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
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
    color: #595959;

    .create-tips {
      a {
        color: #0366d6;
        text-decoration: none;
      }
    }
  }
</style>