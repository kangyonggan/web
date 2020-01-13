<template>
  <el-dialog
    title="登录"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    destroy-on-close
  >
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
        <router-link to="/user/password/reset">
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
        没有康永敢网站的账号？
        <router-link :to="'/user/join?redirectUrl=' + $route.path">
          创建一个账号
        </router-link>
        。
      </div>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
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

                    this.loading = true;
                    this.axios.post('login', this.params).then((data) => {
                        this.$store.commit('setUser', data.user);
                        localStorage.setItem('menus', JSON.stringify(data.menus));
                        this.dialogVisible = false;
                        this.success('登录成功');
                        this.$emit('success');
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            },
            show() {
                this.dialogVisible = true;
            }
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-dialog {
    max-width: 460px;
    min-width: 300px;
  }

  /deep/ .el-dialog__body {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .el-form {
    margin: 0 auto;

    a {
      float: right;
      color: #0366d6;
      text-decoration: none;
      font-size: 12px;
      line-height: 24px;
      margin-top: 10px;
    }

    button {
      margin-top: 20px;
      width: 100%;
    }
  }

  .new-account {
    text-align: center;
    font-size: 13px;
    color: #595959;

    .create-tips {
      a {
        color: #0366d6;
        text-decoration: none;
      }
    }
  }
</style>