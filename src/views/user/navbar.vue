<template>
  <div class="navbar">
    <div class="content">
      <router-link to="/">
        <img src="../../assets/images/logo.png">
      </router-link>

      <div class="links">
        <div v-if="!$store.getters.getUser.name">
          <router-link to="/user/login">
            登录
          </router-link>
          <router-link :to="'/user/join?redirectUrl=' + $route.path">
            注册
          </router-link>
        </div>
        <div
          v-else
          class="user-info"
        >
          <span @click="admin">
            <i class="el-icon-monitor" />
            控制台
          </span>
          <span @click="logout">
            <i class="el-icon-switch-button" />
            注销
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            admin() {
                window.location.pathname = '/admin';
            },
            logout() {
                this.axios.get('logout').finally(() => {
                    localStorage.removeItem('token');
                    this.$store.commit('setUser', {});
                    this.$router.push({
                        path: this.$route.fullPath || '/'
                    });
                });
            }
        },
        mounted() {
            this.axios.post('accessLog', {type: 0}).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="scss">
  .navbar {
    padding: 0 10px;
    height: 47px;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;

    img {
      float: left;
      height: 46px;
    }

    .links {
      float: right;
      margin-top: 12px;

      a {
        display: inline-block;
        color: #595959;
        text-decoration: none;
        font-size: 14px;
        border-left: 1px solid #ccc;
        padding-left: 12px;
        margin-right: 12px;
      }

      a:first-child {
        border-left: 0;
      }
    }

    .user-info {
      font-size: 14px;
      cursor: pointer;

      span {
        margin-left: 20px;
      }
    }
  }
</style>