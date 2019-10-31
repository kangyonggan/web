<template>
  <div class="navbar">
    <div class="content">
      <router-link
        to="/"
        class="logo"
      >
        <img src="../../assets/images/logo.png">
      </router-link>

      <div class="navList">
        <router-link
          v-for="nav in navList"
          :key="nav.code"
          :to="nav.code"
        >
          {{ nav.value }}
        </router-link>
      </div>

      <el-button
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
                    }
                ]
            };
        }
    };
</script>

<style scoped lang="scss">
    .navbar {
        height: 80px;
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

        .navList {
            float: left;
            margin-left: 20px;

            a {
                display: inline-block;
                width: 75px;
                text-align: center;
                line-height: 80px;
                float: left;
                color: #333;
                text-decoration: none;
            }
        }
    }
</style>