<template>
  <el-row>
    <el-col
      :xl="16"
      :lg="16"
      :md="16"
      class="hidden-sm-and-down"
      style="text-align: center"
    >
      <div class="login-bg">
        康永敢
      </div>
    </el-col>
    <el-col
      :xl="8"
      :lg="8"
      :md="8"
      :sm="24"
      :xs="24"
    >
      <el-col
        style="height: 150px; width: 100%"
        class="hidden-sm-and-down"
      />
      <el-card v-loading="loading">
        <template #header>
          <div style="color: var(--app-text-color-light)">
            用户登录
          </div>
        </template>
        <el-form
          ref="form"
          :model="params"
          :rules="rules"
        >
          <el-form-item
            prop="account"
            style="margin-top: 10px"
          >
            <el-input
              placeholder="请输入账号"
              v-model="params.account"
              @keyup.enter.native="submit"
              autocomplete="off"
              clearable
              show-word-limit
              :maxlength="10"
            >
              <template #prepend>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            class="form-item"
            prop="password"
          >
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="params.password"
              @keyup.enter.native="submit"
              autocomplete="off"
              show-password
              clearable
              show-word-limit
              :maxlength="20"
            >
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="submit"
          >
            登录
          </el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { User, Lock } from "@element-plus/icons"

export default {
  components: {User, Lock},
  data() {
    return {
      loading: false,
      params: {
        account: "admin",
        password: "o0o00o0",
      },
      rules: {
        account: [{required: true, message: "请输入账号"}],
        password: [{required: true, message: "请输入密码"}],
      },
    };
  },
  methods: {
    submit: function () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        this.axios.post("/login", this.params).then(data => {
          console.log(data)
          this.params.password = ""
          this.$store.commit('setUserInfo', data.user)
          this.$router.push({
            path: '/'
          })
        }).catch((res) => {
          this.$error(res.msg)
        }).finally(() => {
          this.loading = false
        })
      })
    },
  },
};
</script>

<style scoped lang="scss">
.login-bg {
  font-size: 110px;
  font-weight: bold;
  font-style: italic;
  color: var(--el-color-primary);
  text-align: center;
  margin-top: 240px;
}

.el-card {
  max-width: 360px;
  margin: 50px auto 0 auto;
  position: relative;

  .login-type {
    font-size: 14px;
    margin: 0 10px;
    cursor: pointer;
  }

  .active {
    color: var(--app-text-color-white);
  }

  .el-card__header {
    position: relative;

    .login-change {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .form-item {
    margin-top: 40px;
  }

  .el-button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
