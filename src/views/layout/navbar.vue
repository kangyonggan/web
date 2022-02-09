<template>
  <div class="navbar">
    <router-link to="/">
      <div class="logo">
        <img
          alt="logo"
          src="../../assets/imgs/logo.png"
        >
      </div>
    </router-link>

    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      unique-opened
      router
    >
      <navbar-menu
        v-for="menu in menus"
        :menu="menu"
        :key="menu.path"
      />
    </el-menu>

    <div
      class="logout"
      v-if="$store.getters.getUserInfo.account"
      @click="logout"
    >
      注销
    </div>

    <div
      v-else
      to="/login"
      class="logout"
    >
      登录
    </div>
  </div>
</template>

<script>
  import NavbarMenu from './navbar-menu'
  import Menus from './menus'

  export default {
    components: {NavbarMenu},
    data() {
      return {
        activeIndex: this.getActiveMenu(this.$route.path || '/'),
        menus: Menus,
      }
    },
    methods: {
      logout() {
        this.axios.get('/logout').finally(() => {
          this.$store.commit("setUserInfo", {})
          this.$router.push('/login')
        })
      },
      getActiveMenu(path) {
        for (let i = 0; i < Menus.length; i++) {
          if (Menus[i].path !== '/' && path.startsWith(Menus[i].path)) {
            return Menus[i].path
          }
        }
      }
    },
    watch: {
      '$route'(newRoute) {
        this.activeIndex = this.getActiveMenu(newRoute.path)
      }
    }
  }
</script>

<style
  scoped
  lang="scss">
  .navbar {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid var(--app-border-color);

    .logo {
      float: left;
      margin-left: 10px;

      img {
        margin: 15px 0 0 10px;
        height: 30px;
        float: left;
      }
    }

    .el-menu {
      width: calc(100% - 280px);
      float: left;
      margin-left: 20px;
    }

    .logout {
      cursor: pointer;
      float: right;
      margin-right: 20px;
      margin-left: 10px;
      line-height: 60px;
      color: var(--el-color-primary);
      text-decoration: none;
    }
  }
</style>
