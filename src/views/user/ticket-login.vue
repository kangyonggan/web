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

    <el-row style="margin-top: 50px;text-align: center">
      <el-button
        @click="getLoginConf"
        type="success"
      >
        刷新
      </el-button>
    </el-row>
  </el-card>
</template>

<script>
    export default {
        data() {
            return {
                loginConf: {}
            };
        },
        methods: {
            getLoginConf() {
                this.axios.get('ticket/loginConf').then(data => {
                    this.loginConf = data.loginConf || {};
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        },
        mounted() {
            this.getLoginConf();
        }
    };
</script>
