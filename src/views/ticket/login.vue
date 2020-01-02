<template>
  <el-card>
    <el-row style="font-weight: bold;font-size: 20px;text-align: center;margin-top: 30px;">
      <span v-if="loginConf && loginConf.is_login === 'Y'">
        当前登录用户为：{{ loginConf.name }}
      </span>
      <span v-else>
        未登录
      </span>
    </el-row>

    <el-row
      v-if="qrPath"
      style="margin-top: 80px;text-align: center;"
    >
      <img :src="axios.defaults.baseURL + qrPath">

      <el-col style="margin-top: 30px">
        二维码状态：
        <span v-if="status === '0'">
          待扫码
        </span>
        <span v-else-if="status === '1'">
          已扫码，待确认
        </span>
        <span v-else-if="status === '2'">
          已登录
        </span>
        <span v-else>
          {{ status }}
        </span>
      </el-col>
    </el-row>

    <el-row style="margin-top: 80px;text-align: center;margin-bottom: 30px;">
      <el-button
        @click="reLogin"
        type="danger"
      >
        重新登录
      </el-button>
    </el-row>

    <base-auth-code
      ref="authCode"
      @success="success"
    />
  </el-card>
</template>

<script>
    export default {
        data() {
            return {
                loginConf: {},
                qrPath: '',
                timer: undefined,
                status: ''
            };
        },
        methods: {
            success() {
                this.axios.get('ticket/loginQr').then(data => {
                    this.qrPath = data.qrPath;

                    let that = this;
                    this.timer = setInterval(function () {
                        that.checkQr();
                    }, 2000);
                }).catch(() => {
                    this.error('权限不足！');
                });
            },
            reLogin() {
                this.$refs.authCode.show();
            },
            checkQr() {
                this.axios.get('ticket/checkQr').then(data => {
                    this.status = data.status;

                    if (this.status === '2') {
                        this.loginConf = data.loginConf;
                        this.qrPath = '';
                        if (this.timer) {
                            clearInterval(this.timer);
                            this.timer = undefined;
                        }
                    }
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.axios.get('ticket/loginConf').then(data => {
                this.loginConf = data.loginConf || {};
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="scss">
</style>