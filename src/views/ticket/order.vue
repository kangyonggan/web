<template>
  <div class="content">
    <el-form
      inline
      ref="form"
      v-loading="loading"
      :model="params"
      :rules="rules"
    >
      <el-card style="padding-bottom: 10px;">
        <el-row>
          <el-steps
            :active="2"
            simple
          >
            <el-step :title="result.fromStationName" />
            <el-step :title="result.toStationName" />
          </el-steps>
        </el-row>

        <el-row
          class="header"
          style="margin-top: 20px;"
        >
          抢票方案
          <span>多选几种方案，可极大提升抢票成功率</span>
        </el-row>

        <el-row class="checkbox">
          <el-col
            :span="3"
            style="text-align: right;padding-right: 20px;"
          >
            出发日期：
          </el-col>
          <el-col :span="21">
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
          </el-col>
        </el-row>

        <el-row class="checkbox">
          <el-col
            :span="3"
            style="text-align: right;padding-right: 20px;"
          >
            抢票车次：
          </el-col>
          <el-col :span="21">
            <el-checkbox-group
              v-model="params.trainNos"
            >
              <el-col
                class="train-info"
                :span="24"
                v-for="ticket in result.goodTickets"
                :key="ticket.trainNo"
              >
                <el-checkbox
                  :disabled="ticket.trainNo === params.trainNos[0]"
                  :label="ticket.trainNo"
                >
                  <span>
                    <label>车次:</label>
                    <span
                      style="padding-left: 2px;text-decoration: underline;"
                      @click="queryAllStations(ticket)"
                    >{{ ticket.stationTrainCode }}</span>
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
          </el-col>
        </el-row>

        <el-row
          class="checkbox"
          style="margin-top:10px;"
        >
          <el-col
            :span="3"
            style="text-align: right;padding-right: 20px;"
          >
            抢票席座：
          </el-col>

          <el-form-item
            prop="trainSeats"
            class="seat-item"
          >
            <el-checkbox-group
              v-model="params.trainSeats"
            >
              <el-col
                style="width: 90px;"
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
          </el-form-item>

          <el-col
            :span="8"
            style="font-size: 8px;color: #e74e19;float: right;text-align: right;"
          >
            提示：发车前会放出大量无座票，且黄牛会每隔30分钟吐票一次。
          </el-col>
        </el-row>
      </el-card>

      <el-card style="margin-top: 20px;">
        <el-row class="header">
          乘客信息
          <span>目前仅支持一个人，而且仅支持成人。</span>
        </el-row>

        <el-row class="passenger">
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input
              clearable
              size="small"
              v-model="params.name"
              placeholder="请输入姓名"
            />
          </el-form-item>
          <el-form-item
            label="身份证号码"
            prop="idNo"
          >
            <el-input
              clearable
              size="small"
              v-model="params.idNo"
              placeholder="请输入18位身份证号码"
            />
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobileNo"
          >
            <el-input
              clearable
              size="small"
              v-model="params.mobileNo"
              placeholder="请输入手机号"
            />
          </el-form-item>
        </el-row>

        <el-row class="actions">
          <el-col>
            <el-button
              icon="el-icon-check"
              size="medium"
              type="primary"
              @click="submit"
            >
              提交订单
            </el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-card style="margin-top: 20px;">
        <el-row class="header">
          抢票说明
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col
            :span="12"
            style="border-right: 1px dashed #d5d5d5;"
          >
            <el-steps
              :active="0"
              direction="vertical"
              style="height: 300px;"
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
          </el-col>

          <el-col
            :span="12"
            class="tips"
          >
            <ul>
              <li>站长微信手机同号：18516690317。</li>
              <li>用户提交订单并审核通过后，程序会调用12306接口，把乘客信息添加到站长的常用联系人中，从而不需要用户登录12306。</li>
              <li>程序定时调用12306接口查询余票，如果有符合条件的车票立即下单，这时候站长12306的未完成订单中会出现待支付的车票订单。</li>
              <li>站长把车票订单截图发送给用户，用户确认没问题之后把钱转给站长（30分钟内），因为站长是个人不是企业，没那么多钱进行垫付。</li>
              <li>站长收到钱后对订单进行支付，并把支付结果以及已支付订单截图给用户。</li>
              <li>期间用户可在本站查询和管理订单的一切信息，包括退票。</li>
              <li>退票后需要联系站长退钱，但是自己要承担12306收取的退票费用，站长可以不赚钱，但绝不能贴钱。</li>
              <li>用户拿着身份证去火车站即可取票乘车，到此用户和站长的交易全部完成。</li>
            </ul>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <all-stations ref="allStations" />

    <el-dialog
      title="请核对以下信息"
      :visible.sync="dialogVisible"
      width="600px"
      class="confirm-info"
    >
      <el-row class="title">
        {{ result.fromStationName }} ---> {{ result.toStationName }}
      </el-row>
      <el-row>
        <el-col
          class="label"
        >
          出发日期：
        </el-col>
        <el-col
          v-for="(trainDate, index) in params.trainDates"
          :key="index"
        >
          {{ trainDate }}<span v-show="index < params.trainDates.length - 1">、</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          class="label"
        >
          抢票车次：
        </el-col>
        <el-col
          v-for="(trainNo, index) in params.trainNos"
          :key="index"
        >
          {{ getStationTrainCode(trainNo) }}<span v-show="index < params.trainNos.length - 1">、</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          class="label"
        >
          抢票席座：
        </el-col>
        <el-col
          v-for="(trainSeat, index) in params.trainSeats"
          :key="index"
        >
          {{ getSeatName(trainSeat) }}<span v-show="index < params.trainSeats.length - 1">、</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          class="label"
        >
          乘客信息：
        </el-col>
        {{ params.name }}、
        {{ params.idNo }}、
        {{ params.mobileNo }}
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="confirmOk"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import AllStations from './all-stations';
    import qs from 'qs';

    export default {
        components: {AllStations},
        data() {
            return {
                dialogVisible: false,
                loading: false,
                params: {
                    trainDates: [],
                    trainNos: [],
                    trainSeats: []
                },
                result: {},
                rules: {
                    name: [
                        {required: true, message: '姓名为必填项'},
                        {max: 20, message: '姓名多20个字符'}
                    ],
                    idNo: [
                        {required: true, message: '身份证号码为必填项'},
                        {validator: this.validateIdNol}
                    ],
                    mobileNo: [
                        {max: 20, message: '手机号多20个字符'}
                    ],
                    trainSeats: [
                        {required: true, message: '席别为必填项'}
                    ]
                }
            };
        },
        methods: {
            validateIdNol: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('validate/idNo?idNo=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            initTicketInfo(params) {
                this.params.trainDates[0] = params.trainDate;
                this.params.trainNos[0] = params.trainNo;
                this.params.fromStationTelecode = params.fromStationTelecode;
                this.params.toStationTelecode = params.toStationTelecode;
                this.loading = true;
                this.axios.get('ticket/info?' + qs.stringify(params)).then(data => {
                    let trainSeats = [];
                    let types = [];
                    for (let i = 0; i < data.goodTickets.length; i++) {
                        let ticket = data.goodTickets[i];
                        this.dealNum(ticket, 'swz', '商务座', types, trainSeats);
                        this.dealNum(ticket, 'tz', '特等座', types, trainSeats);
                        this.dealNum(ticket, 'zy', '一等座', types, trainSeats);
                        this.dealNum(ticket, 'ze', '二等座', types, trainSeats);
                        this.dealNum(ticket, 'gr', '高软', types, trainSeats);
                        this.dealNum(ticket, 'rw', '软卧', types, trainSeats);
                        this.dealNum(ticket, 'srrb', '动卧', types, trainSeats);
                        this.dealNum(ticket, 'yw', '硬卧', types, trainSeats);
                        this.dealNum(ticket, 'rz', '软座', types, trainSeats);
                        this.dealNum(ticket, 'yz', '硬座', types, trainSeats);
                        this.dealNum(ticket, 'wz', '无座', types, trainSeats);
                        this.dealNum(ticket, 'qt', '其他', types, trainSeats);
                    }
                    data.trainSeats = trainSeats;
                    this.result = data;
                }).catch(() => {
                    this.error('网络异常，请稍后再试！');
                }).finally(() => {
                    this.loading = false;
                });
            },
            dealNum(ticket, type, label, types, trainSeats) {
                if (ticket[type + 'Num'] && !types.includes(type)) {
                    types.push(type);
                    trainSeats.push({
                        type: type,
                        label: label
                    });
                }
            },
            queryAllStations(ticket) {
                this.$refs.allStations.show(ticket, this.params.trainDates[0]);
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.dialogVisible = true;
                });
            },
            confirmOk() {
                this.dialogVisible = false;
                this.loading = true;
                this.axios.post('ticket/submitOrder', this.params).then(data => {
                    this.$router.push({
                        path: '/ticket/submitted',
                        query: {
                            orderNo: data.orderNo
                        }
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            getStationTrainCode(trainNo) {
                if (!this.result.goodTickets) {
                    return;
                }
                for (let i = 0; i < this.result.goodTickets.length; i++) {
                    if (trainNo === this.result.goodTickets[i].trainNo) {
                        return this.result.goodTickets[i].stationTrainCode;
                    }
                }
            },
            getSeatName(trainSeat) {
                if (!this.result.trainSeats) {
                    return;
                }
                for (let i = 0; i < this.result.trainSeats.length; i++) {
                    if (trainSeat === this.result.trainSeats[i].type) {
                        return this.result.trainSeats[i].label;
                    }
                }
            }
        },
        mounted() {
            this.initTicketInfo(this.$route.query);
        }
    };
</script>

<style scoped lang="scss">
  .header {
    border-bottom: 1px dashed #d5d5d5;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 10px;

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

    .seat-item {
      margin-bottom: 0;

      /deep/ .el-form-item__content {
        line-height: normal;
      }
    }
  }

  .train-info {
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
            width: 120px;
          }

          em {
            color: #e74e19;
            font-size: 8px;
          }
        }
      }
    }
  }

  .passenger {
    margin-top: 25px;

    .el-form-item {
      margin-left: 30px;

      .el-input {
        width: 180px;
      }
    }
  }

  .tips {
    padding-left: 20px;

    ul {
      li {
        font-size: 13px;
        color: #999;
        margin-bottom: 10px;
      }
    }
  }

  .confirm-info {
    /deep/ .el-dialog__body {
      padding-top: 5px;
    }

    .title {
      font-weight: bold;
      color: #000;
      font-size: 16px;
      text-align: center;
    }

    .el-row {
      margin-top: 15px;

      .el-col {
        display: inline-block;
        font-size: 13px;
        float: left;
        width: auto;
      }

      .label {
        font-weight: bold;
        text-align: right;
        padding-right: 10px;
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
