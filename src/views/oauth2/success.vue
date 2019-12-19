<template>
  <div>
    <div
      v-if="type === 'join'"
      class="msg"
    >
      您已成为康永敢平台用户，{{ count }}秒后将自动前往平台。
    </div>
    <div
      v-else-if="type === 'resetPwd'"
      class="msg"
    >
      密码已重置，{{ count }}秒后将自动前往登录界面。
    </div>
    <div v-else>
      我也不知道你从哪跳转过来的，{{ count }}秒后将自动前往首页。
    </div>

    <div
      class="jump"
      @click="jump"
    >
      点我立即前往>>>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                type: '',
                count: 5,
                timer: undefined
            };
        },
        methods: {
            jump() {
                if (this.type === 'join') {
                    window.location.pathname = '/admin';
                    return;
                }
                this.$router.push({
                    path: this.type === 'resetPwd' ? 'oauth2/login' : '/'
                });
            }
        },
        mounted() {
            this.type = this.$route.query.type;
            let that = this;
            this.timer = setInterval(function () {
                that.count--;
                if (that.count <= 0) {
                    clearInterval(that.timer);
                    that.jump();
                }
            }, 1000);
        }
    };
</script>

<style scoped lang="scss">
  .msg {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-top: 60px;
  }

  .jump {
    text-align: center;
    margin-top: 40px;
    cursor: pointer;
  }

  .jump:hover {
    color: red;
  }
</style>

