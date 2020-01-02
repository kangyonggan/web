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
    max-width: 430px;
    min-width: 300px;
  }

  /deep/ .el-dialog__body {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .el-form {
    margin: 0 auto;

    button {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>