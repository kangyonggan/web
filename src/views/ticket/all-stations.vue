<template>
  <el-dialog
    :title="ticket.stationTrainCode + '途径站点'"
    :visible.sync="dialogVisible"
    width="900"
  >
    <el-steps
      v-loading="loading"
      align-center
      finish-status="success"
    >
      <el-step
        v-for="station in allStations"
        :key="station.station_no"
        :title="station.station_name"
        :status="station.station_no === ticket.fromStationNo || station.station_no === ticket.toStationNo ? 'finish' : 'wait'"
      />
    </el-steps>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                dialogVisible: false,
                allStations: [],
                ticket: []
            };
        },
        methods: {
            show(ticket, trainDate) {
                this.dialogVisible = true;
                this.loading = true;
                this.allStations = [];
                this.ticket = ticket;
                this.axios.get('ticket/allStations?trainDate=' + trainDate + '&trainNo=' + ticket.trainNo
                    + '&fromStationTelecode=' + ticket.fromStationTelecode + '&toStationTelecode='
                    + ticket.toStationTelecode).then(data => {
                    this.allStations = data.allStations;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  /deep/ .el-dialog__body {
    padding-top: 15px;
  }

  /deep/ .el-step__title {
    font-size: 12px;
    margin-top: 6px;
    line-height: 15px;
    color: #595959;
  }
</style>