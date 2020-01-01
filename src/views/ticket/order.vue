<template>
  <div class="content">
    <el-col v-loading="loading">
      <el-col>
        <el-card class="box-card">
          <el-row>
            <el-steps
              :active="2"
              simple
            >
              <el-step :title="result.fromStationName" />
              <el-step :title="result.toStationName" />
            </el-steps>
          </el-row>

          <el-row class="header">
            多选方案
            <span>可极大提升抢票成功率</span>
          </el-row>

          <el-row class="checkbox">
            <el-col
              :span="4"
              style="text-align: right;padding-right: 20px;"
            >
              出发日期：
            </el-col>
            <el-checkbox-group
              v-model="params.trainDates"
            >
              <el-col
                :span="4"
                v-for="date in result.trainDates"
                :key="date"
              >
                <el-checkbox
                  :disabled="date === params.trainDates[0]"
                  :label="date"
                >
                  {{ date }}
                  <span
                    style="font-size: 12px;font-weight: normal;"
                    v-if="date === params.trainDates[0]"
                  >（{{ result.weekday }}）</span>
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>

          <el-row class="checkbox">
            <el-col
              :span="4"
              style="text-align: right;padding-right: 20px;"
            >
              抢票车次：
            </el-col>
            <el-checkbox-group
              v-model="params.trainNos"
            >
              <el-col
                class="train-info"
                :span="20"
                v-for="ticket in result.goodTickets"
                :key="ticket.trainNo"
              >
                <el-checkbox
                  :disabled="ticket.trainNo === params.trainNos[0]"
                  :label="ticket.trainNo"
                >
                  <span>
                    <label>车次:</label>
                    {{ ticket.stationTrainCode }}
                  </span>
                  <span>
                    <label>出发:</label>
                    {{ ticket.startTime }}
                  </span>
                  <span>
                    <label>历时:</label>
                    {{ ticket.lishi }}
                  </span>
                  <span>
                    <label>到达:</label>
                    {{ ticket.arriveTime }}
                    <span
                      style="font-size: 8px;color: #ccc;"
                      v-if="ticket.lishi.substring(0, 2) * 1 < 24 && ticket.startTime < ticket.arriveTime"
                    >
                      (当日)
                    </span>
                    <span
                      style="font-size: 8px;color: #e74e19 !important;"
                      v-else
                    >
                      (次日)
                    </span>
                  </span>
                  <div class="ticket-num">
                    <span v-show="ticket.swzNum">
                      <label>商务座:</label>
                      {{ ticket.swzNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A9 }}</em>
                    </span>
                    <span v-show="ticket.tzNum">
                      <label>特等座:</label>
                      {{ ticket.tzNum }}
                    </span>
                    <span v-show="ticket.zyNum">
                      <label>一等座:</label>
                      {{ ticket.zyNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.M }}</em>
                    </span>
                    <span v-show="ticket.zeNum">
                      <label>二等座:</label>
                      {{ ticket.zeNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.O }}</em>
                    </span>
                    <span v-show="ticket.grNum">
                      <label>高软:</label>
                      {{ ticket.grNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A6 }}</em>
                    </span>
                    <span v-show="ticket.rwNum">
                      <label>软卧:</label>
                      {{ ticket.rwNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A4 }}</em>
                    </span>
                    <span v-show="ticket.srrbNum">
                      <label>动卧:</label>
                      {{ ticket.srrbNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.F }}</em>
                    </span>
                    <span v-show="ticket.ywNum">
                      <label>硬卧:</label>
                      {{ ticket.ywNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A3 }}</em>
                    </span>
                    <span v-show="ticket.rzNum">
                      <label>软座:</label>
                      {{ ticket.rzNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A2 }}</em>
                    </span>
                    <span v-show="ticket.yzNum">
                      <label>硬座:</label>
                      {{ ticket.yzNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.A1 }}</em>
                    </span>
                    <span v-show="ticket.wzNum">
                      <label>无座:</label>
                      {{ ticket.wzNum }}
                      <em v-show="ticket.trainNo === params.trainNos[0]">{{ result.ticketPrice.WZ }}</em>
                    </span>
                    <span v-show="ticket.qtNum">
                      <label>其他:</label>
                      {{ ticket.qtNum }}
                    </span>
                  </div>
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>

          <el-row class="checkbox">
            <el-col
              :span="4"
              style="text-align: right;padding-right: 20px;"
            >
              抢票席座：
            </el-col>

            <el-checkbox-group
              v-model="params.trainSeats"
            >
              <el-col
                :span="2"
                v-for="seat in result.trainSeats"
                :key="seat.type"
              >
                <el-checkbox
                  :label="seat.type"
                >
                  {{ seat.label }}
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
            <el-col
              :span="7"
              style="font-size: 8px;color: #e74e19"
            >
              提示：发车前会放出大量无座票，抢票概率极大。
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                loading: false,
                params: {
                    trainDates: [],
                    trainNos: [],
                    trainSeats: []
                },
                result: {},
                rules: {
                    name: [
                        {required: true, message: '姓名为必填项'}
                    ],
                    idNo: [
                        {required: true, message: '身份证号码为必填项'}
                    ],
                    mobileNo: [
                        {required: true, message: '手机号为必填项'}
                    ]
                }
            };
        },
        methods: {
            initTicketInfo(params) {
                this.params.trainDates[0] = params.trainDate;
                this.params.trainNos[0] = params.trainNo;
                this.loading = true;
                this.axios.get('ticket/info?' + qs.stringify(params)).then(data => {
                    let trainSeats = [];
                    let types = [];
                    for (let i = 0; i < data.goodTickets.length; i++) {
                        let ticket = data.goodTickets[i];
                        this.dealNum(ticket, 'swzNum', '商务座', types, trainSeats);
                        this.dealNum(ticket, 'tzNum', '特等座', types, trainSeats);
                        this.dealNum(ticket, 'zyNum', '一等座', types, trainSeats);
                        this.dealNum(ticket, 'zeNum', '二等座', types, trainSeats);
                        this.dealNum(ticket, 'grNum', '高软', types, trainSeats);
                        this.dealNum(ticket, 'rwNum', '软卧', types, trainSeats);
                        this.dealNum(ticket, 'srrbNum', '动卧', types, trainSeats);
                        this.dealNum(ticket, 'ywNum', '硬卧', types, trainSeats);
                        this.dealNum(ticket, 'rzNum', '软座', types, trainSeats);
                        this.dealNum(ticket, 'yzNum', '硬座', types, trainSeats);
                        this.dealNum(ticket, 'wzNum', '无座', types, trainSeats);
                        this.dealNum(ticket, 'qtNum', '其他', types, trainSeats);
                    }
                    data.trainSeats = trainSeats;
                    console.log(data);


                    this.result = data;
                }).catch(() => {
                    this.error('网络异常，请稍后再试！');
                }).finally(() => {
                    this.loading = false;
                });
            },
            dealNum(ticket, type, label, types, trainSeats) {
                if (ticket[type] && !types.includes(type)) {
                    types.push(type);
                    trainSeats.push({
                        type: type,
                        label: label
                    });
                }
            }
        },
        mounted() {
            this.initTicketInfo(this.$route.query);
        }
    };
</script>

<style scoped lang="scss">
  .box-card {
    padding: 0 20px;
  }

  .header {
    border-bottom: 1px dashed #d5d5d5;
    font-weight: bold;
    font-size: 20px;
    margin-top: 25px;
    padding-bottom: 5px;

    span {
      color: #e74e19;
      font-size: 13px;
      font-weight: normal;
      margin-left: 6px;
    }
  }

  .checkbox {
    margin-top: 25px;

    /deep/ .is-disabled .el-checkbox__label {
      color: #000;
      cursor: pointer;

      span {
        color: #000 !important;

        label {
          color: #000 !important;
        }
      }
    }
  }

  .train-info {
    float: right;
    margin-bottom: 20px;
    background: #fdfdfd;
    padding: 8px 10px;
    border: 1px dashed #a74f19;

    .el-checkbox {
      display: block;

      /deep/ .el-checkbox__label {
        display: inline-block;
        width: 100%;

        span {
          font-size: 13px;
          display: inline-block;
          width: 90px;
          color: #777;

          label {
            color: #bbb;
          }
        }

        .ticket-num {
          float: right;

          span {
            width: 108px;
          }

          em {
            color: #e74e19;
            font-size: 8px;
          }
        }
      }
    }
  }

  .actions {
    clear: both;
    margin-top: 15px;
    padding-top: 20px;
    border-top: 1px solid #d5d5d5;
  }
</style>
