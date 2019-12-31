<template>
  <div class="content">
    <el-col v-loading="loading">
      <el-col>
        <el-card class="box-card">
          <el-row class="header">
            列车信息
          </el-row>

          <el-row class="info">
            <el-col :span="12">
              <label>车次：</label>
              {{ query.stationTrainCode }}
            </el-col>
            <el-col :span="12">
              <label>出发地：</label>
              {{ result.fromStationName }}
              <span>（{{ query.startTime }}出发）</span>
            </el-col>
            <el-col :span="12">
              <label>出发日期：</label>
              {{ query.trainDate }}
              <span>（{{ result.weekday }}）</span>
            </el-col>
            <el-col :span="12">
              <label>目的地：</label>
              {{ result.toStationName }}
              <span>（{{ query.arriveTime }}到达）</span>
            </el-col>
          </el-row>

          <el-row class="header">
            途径站
          </el-row>

          <el-row class="stations">
            <el-steps
              align-center
              finish-status="success"
            >
              <el-step
                v-for="station in result.allStations"
                :key="station.station_no"
                :title="station.station_name"
                :status="station.station_no === query.fromStationNo || station.station_no === query.toStationNo ? 'finish' : 'wait'"
              />
            </el-steps>
          </el-row>

          <el-row class="header">
            选择席别
          </el-row>

          <el-row class="seats">
            <el-checkbox-group
              v-model="params.chooseSeats"
              v-if="'G'.includes(query.stationTrainCode.substring(0, 1))"
            >
              <el-col :span="4">
                <el-checkbox
                  label="swzNum"
                  :class="'num-' + (!isNaN(query.swzNum) || query.swzNum === '有')"
                >
                  商务座（<span class="price">{{ result.ticketPrice.A9 }}</span>）{{ query.swzNum }}<span v-show="!isNaN(query.swzNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col :span="4">
                <el-checkbox
                  label="zyNum"
                  :class="'num-' + (!isNaN(query.zyNum) || query.zyNum === '有')"
                >
                  一等座（<span class="price">{{ result.ticketPrice.M }}</span>）{{ query.zyNum }}<span v-show="!isNaN(query.zyNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col :span="4">
                <el-checkbox
                  label="zeNum"
                  :class="'num-' + (!isNaN(query.zeNum) || query.zyNum === '有')"
                >
                  二等座（<span class="price">{{ result.ticketPrice.O }}</span>）{{ query.zeNum }}<span v-show="!isNaN(query.zeNum)">张票</span>
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="params.chooseSeats"
              v-else-if="'D'.includes(query.stationTrainCode.substring(0, 1))"
            >
              <el-col :span="4">
                <el-checkbox
                  label="zyNum"
                  :class="'num-' + (!isNaN(query.zyNum) || query.zyNum === '有')"
                >
                  一等座（<span class="price">{{ result.ticketPrice.M }}</span>）{{ query.zyNum }}<span v-show="!isNaN(query.zyNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col :span="4">
                <el-checkbox
                  label="zeNum"
                  :class="'num-' + (!isNaN(query.zeNum) || query.zyNum === '有')"
                >
                  二等座（<span class="price">{{ result.ticketPrice.O }}</span>）{{ query.zeNum }}<span v-show="!isNaN(query.zeNum)">张票</span>
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="params.chooseSeats"
              v-else
            >
              <el-col :span="4">
                <el-checkbox
                  label="rwNum"
                  :class="'num-' + (!isNaN(query.rwNum) || query.rwNum === '有')"
                >
                  软卧（<span class="price">{{ result.ticketPrice.A4 }}</span>）{{ query.rwNum }}<span v-show="!isNaN(query.rwNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col :span="4">
                <el-checkbox
                  label="ywNum"
                  :class="'num-' + (!isNaN(query.ywNum) || query.ywNum === '有')"
                >
                  硬卧（<span class="price">{{ result.ticketPrice.A3 }}</span>）{{ query.ywNum }}<span v-show="!isNaN(query.ywNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col
                :span="4"
                :class="'num-' + (!isNaN(query.yzNum) || query.yzNum === '有')"
              >
                <el-checkbox label="yzNum">
                  硬座（<span class="price">{{ result.ticketPrice.A1 }}</span>）{{ query.yzNum }}<span v-show="!isNaN(query.yzNum)">张票</span>
                </el-checkbox>
              </el-col>
              <el-col
                :span="4"
                :class="'num-' + (!isNaN(query.wzNum) || query.wzNum === '有')"
              >
                <el-checkbox label="wzNum">
                  无座（<span class="price">{{ result.ticketPrice.WZ }}</span>）{{ query.wzNum }}<span v-show="!isNaN(query.wzNum)">张票</span>
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>

          <el-row class="header">
            乘客信息
          </el-row>

          <el-row class="passenger">
            <el-form
              inline
              :model="params"
              :rules="rules"
            >
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
            </el-form>
          </el-row>

          <el-row class="actions">
            <el-col>
              <el-button
                icon="el-icon-check"
                size="medium"
                type="primary"
                @click="warning('开发中...')"
              >
                提交订单
              </el-button>
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
                params: {
                    chooseSeats: []
                },
                query: {
                    stationTrainCode: ''
                },
                loading: false,
                result: {
                    ticketPrice: {}
                },
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
                this.loading = true;
                this.axios.get('ticket/info?' + qs.stringify(params)).then(data => {
                    this.result = data;
                    this.result.fromStationName = data.allStations[this.query.fromStationNo * 1 - 1].station_name;
                    this.result.toStationName = data.allStations[this.query.toStationNo * 1 - 1].station_name;
                }).catch(() => {
                    this.error('网络异常，请稍后再试！');
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            let query = this.$route.query;
            this.query = query;

            this.initTicketInfo({
                trainDate: query.trainDate,
                trainNo: query.trainNo,
                fromStationNo: query.fromStationNo,
                toStationNo: query.toStationNo,
                fromStationTelecode: query.fromStationTelecode,
                toStationTelecode: query.toStationTelecode,
                seatTypes: query.seatTypes
            });
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
    font-size: 18px;
    margin-top: 25px;
    padding-bottom: 5px;
  }

  .info {
    margin-top: 10px;

    .el-col {
      margin-top: 5px;
    }

    label {
      display: inline-block;
      color: #3177BF;
      font-size: 15px;
      text-align: right;
      width: 120px;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }

  .stations {
    margin-top: 15px;

    /deep/ .el-step__title {
      font-size: 12px;
      margin-top: 6px;
      line-height: 15px;
      color: #595959;
    }
  }

  .seats {
    margin-top: 15px;

    .price {
      color: #fb7403;
    }

    .num-false {
      /deep/ .el-checkbox__label {
        color: #999;
        font-weight: normal;

        .price {
          color: #999;
        }
      }
    }
  }

  .passenger {
    margin-top: 15px;

    .el-form-item {
      margin-left: 30px;

      .el-input {
        width: 180px;
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
