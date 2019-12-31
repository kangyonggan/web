<template>
  <div>
    <div class="user-panel">
      <div class="title">
        找回密码
      </div>
      <el-form
        class="form"
        ref="form"
        :model="params"
        :rules="rules"
      >
        <el-form-item
          label="电子邮箱"
          prop="email"
        >
          <el-input
            v-model="params.email"
            placeholder="请输入电子邮箱"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="邮箱验证码"
          prop="authCode"
        >
          <el-input
            v-model="params.authCode"
            placeholder="请输入邮箱验证码"
            @keyup.enter.native="submit"
            clearable
          />
          <el-button
            plain
            class="sendBtn"
            v-loading="loading"
            @click="sendAuthCode"
          >
            {{ text }}
          </el-button>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password"
        >
          <el-input
            v-model="params.password"
            placeholder="请输入新密码"
            @keyup.enter.native="submit"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit"
            size="medium"
            type="success"
            v-loading="loading"
            @click="submit"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>

      <div class="new-account">
        <div class="create-tips">
          没有康永敢账号？
          <router-link :to="'/user/join?redirectUrl=' + $route.path">
            创建一个账号
          </router-link>
          。
        </div>
      </div>
    </div>

    <base-auth-code
      ref="authCode"
      @success="send"
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
                text: '发送',
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项'},
                        {max: 128, message: '电子邮箱最多为128位'},
                        {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '电子邮箱格式错误'},
                        {validator: this.validateEmail}
                    ],
                    authCode: [
                        {required: true, message: '邮箱验证码为必填项'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            validateEmail: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/email?email=' + value).then(() => {
                    callback(new Error('电子邮箱未认证'));
                }).catch(() => {
                    callback();
                });
            },
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.loading = true;
                    this.axios.put('resetPwd', this.params).then(() => {
                        this.$router.push({
                            path: '/user/success',
                            query: {
                                type: 'resetPwd'
                            }
                        });
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            },
            sendAuthCode() {
                let that = this;
                this.$refs.form.validateField('email', function (errMsg) {
                    if (errMsg) {
                        return;
                    }
                    that.$refs.authCode.show();
                });
            },
            send() {
                this.loading = true;
                this.text = '正在发送';
                this.axios.post('email', {email: this.params.email, type: 'RESET_PWD'}).then(() => {
                    this.success('邮箱验证码发送成功！');
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                    this.text = '发送';
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .user-panel {
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

      .sendBtn {
        position: absolute;
        right: 1px;
        top: 41px;
        padding: 11px 20px;
      }
    }

    .submit {
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