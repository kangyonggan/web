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
        class="login-btn"
        type="primary"
        round
      >
        登录
      </el-button>
    </div>
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
                        value: '小说'
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
                        code: '/game',
                        value: '游戏'
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
        width: 75px;
        height: 80px;
        line-height: 80px;
        text-align: center;

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
  }
</style>