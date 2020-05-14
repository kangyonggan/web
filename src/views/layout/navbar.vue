<template>
  <div class="navbar">
    <div class="content">
      <router-link
        to="/"
        class="logo"
      >
        <img src="../../assets/images/logo.png">
      </router-link>

      <ul class="nav-list">
        <li
          v-for="nav in navList"
          :key="nav.code"
        >
          <router-link
            :to="nav.code"
            :class="isActive(nav.code) ? 'active' : ''"
          >
            {{ nav.value }}
          </router-link>
        </li>
      </ul>

      <el-button
        v-if="!$store.getters.getUser.account"
        class="login-btn"
        type="primary"
        @click="login"
        round
      >
        登录
      </el-button>
      <div
        v-else
        class="user-info"
      >
        <span @click="admin">
          <i class="el-icon-user" />
          欢迎，{{ $store.getters.getUser.name || $store.getters.getUser.account }}
        </span>
        <span @click="logout">
          <i class="el-icon-switch-button" />
          退出
        </span>
      </div>
    </div>

    <base-login ref="login-modal" />
  </div>
</template>

<script>
    export default {
        data() {
            return {
                currentUrl: '/',
                navList: [
                    {
                        code: '/',
                        value: '首页'
                    },
                    {
                        code: '/article',
                        value: '文章'
                    },
                    {
                        code: '/novel',
                        value: '书籍'
                    },
                    {
                        code: '/album',
                        value: '相册'
                    },
                    {
                        code: '/video',
                        value: '视频'
                    },
                    {
                        code: '/tools',
                        value: '工具'
                    },
                    {
                        code: '/sudoku',
                        value: '数独'
                    },
                    {
                        code: '/about',
                        value: '关于'
                    }
                ]
            };
        },
        methods: {
            isActive: function (url) {
                if (url === '/') {
                    return this.currentUrl === '/';
                }
                return this.currentUrl.startsWith(url);
            },
            login() {
                this.$refs['login-modal'].show();
            },
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
            this.currentUrl = this.$route.path;

            this.axios.post('accessLog', {type: 0}).catch(res => {
                this.error(res.respMsg);
            });
        },
        watch: {
            '$route'(newRoute) {
                this.currentUrl = newRoute.path;
            }
        }
    };
</script>

<style scoped lang="scss">
  .navbar {
    height: 79px;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;

    .logo {
      float: left;
      display: inline-block;
      height: 80px;

      img {
        height: 80px;
      }
    }

    .nav-list {
      float: left;
      list-style: none;
      margin-top: 0;

      li {
        float: left;
        height: 80px;
        line-height: 80px;
        text-align: center;
        margin-right: 20px;

        a {
          color: #333;
          text-decoration: none;
          padding: 12px;
        }

        a.active {
          border-bottom: 2px solid #f68136;
        }
      }
    }

    .login-btn {
      height: 36px;
      line-height: 0;
      margin-top: 22px;
      width: 88px;
      float: right;
      background: #1677d9;
    }

    .user-info {
      height: 80px;
      line-height: 80px;
      float: right;
      font-size: 14px;
      cursor: pointer;

      span {
        margin-left: 20px;
      }
    }
  }
</style>