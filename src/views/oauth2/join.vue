<template>
  <div>
    <div class="oauth2-panel">
      <div class="title">
        注册账号
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
          <el-input
            type="password"
            v-model="params.password"
            placeholder="请输入密码"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="rePassword"
        >
          <el-input
            type="password"
            v-model="params.rePassword"
            placeholder="请再次输入密码"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="params.name"
            placeholder="请输入姓名"
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
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="new-account">
        已有康永敢账号？
        <router-link :to="'/oauth2/login?redirectUrl=' + $route.path">
          马上去登录
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
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是5至20位字母和数字组成，且以字母开头'},
                        {validator: this.validateAccount}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ],
                    rePassword: [
                        {required: true, message: '确认密码为必填项'},
                        {validator: this.validateRePassword}
                    ],
                    name: [
                        {required: true, message: '姓名为必填项'},
                        {max: 20, message: '姓名最多为20位'},
                    ]
                }
            };
        },
        methods: {
            validateAccount: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/account?account=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            validateRePassword: function (rule, value, callback) {
                if (this.params.password !== value) {
                    callback(new Error('两次密码不一致'));
                }
                callback();
            },
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('join', this.params).then(() => {
                        this.$router.push({
                           path: this.$route.query.redirectUrl || '/'
                        });
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .oauth2-panel {
    max-width: 600px;
    background: #fff;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    margin: 20px auto;
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

    a {
      color: #0366d6;
      text-decoration: none;
    }
  }
</style>