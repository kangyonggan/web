<template>
  <el-card>
    <el-row style="font-weight: bold;font-size: 20px;text-align: center;margin-top: 30px;">
      订单号：{{ $route.query.orderNo }}
    </el-row>
    <el-row style="margin-top: 80px;">
      <el-steps
        :active="1"
      >
        <el-step
          title="提交订单"
          description="微信联系站长进行审核。"
        />
        <el-step
          title="站长审核"
          description="用户可在本站查看和管理抢票记录。"
        />
        <el-step
          title="抢到车票"
          description="把车票费用转给站长，站长进行支付。"
        />
        <el-step
          title="支付成功"
          description="抢票全流程完毕。"
        />
      </el-steps>
    </el-row>

    <el-row style="margin-top: 80px;text-align: center;margin-bottom: 30px;">
      <el-button @click="$router.push('/tools/ticket')">
        继续抢票
      </el-button>
    </el-row>
  </el-card>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
</style>