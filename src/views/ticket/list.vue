<template>
  <div class="content">
    <el-col>
      <el-col class="search-ticket">
        <el-card class="box-card">
          <el-form
            ref="form"
            :rules="rules"
            :inline="true"
            :model="params"
            label-width="95px"
            label-suffix="："
          >
            <el-row>
              <el-form-item
                label="出发地"
                size="small"
                prop="fromStationTelecode"
              >
                <el-select
                  style="width: 174px;"
                  v-model="params.fromStationTelecode"
                  placeholder="简拼/全拼/汉字"
                  filterable
                  remote
                  @change="fromStationsChange"
                  :remote-method="searchFromStations"
                  :loading="loadingFromStations"
                >
                  <el-option
                    v-for="item in fromStations"
                    :key="item.id"
                    :label="item.stationName"
                    :value="item.stationTelecode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="目的地"
                size="small"
                prop="toStationTelecode"
              >
                <el-select
                  style="width: 174px;"
                  v-model="params.toStationTelecode"
                  placeholder="简拼/全拼/汉字"
                  filterable
                  remote
                  @change="toStationsChange"
                  :remote-method="searchToStations"
                  :loading="loadingToStations"
                >
                  <el-option
                    v-for="item in toStations"
                    :key="item.id"
                    :label="item.stationName"
                    :value="item.stationTelecode"
                  />
                </el-select>
              </el-form-item>

              <el-form-item style="margin-left: 20px;">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="query"
                  size="small"
                >
                  查询
                </el-button>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item
                label="出发日期"
                size="small"
                prop="date"
              >
                <el-date-picker
                  style="width: 174px;"
                  :editable="false"
                  v-model="params.trainDate"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择出发日期"
                  :picker-options="dateOptions"
                />
              </el-form-item>

              <el-form-item
                label="出发时间"
              >
                <el-select
                  style="width: 174px;"
                  @change="handleChangeStartTime"
                  size="small"
                  v-model="tags.startTime"
                  placeholder="请选择出发时间"
                >
                  <el-option
                    v-for="item in startTimeList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-row>

            <div
              v-show="trainTypeAll.length"
              style="height: 1px;background: #f5f5f5"
            />

            <el-row
              v-show="trainTypeAll.length"
              style="margin-top: 10px;"
            >
              <el-form-item
                label="车次类型"
                style="margin-bottom: 0;"
              >
                <el-checkbox
                  :indeterminate="isTrainTypesIndeterminate"
                  v-model="trainTypesCheckAll"
                  @change="handleTrainTypesCheckAllChange"
                >
                  全部
                </el-checkbox>
                <el-checkbox-group
                  style="display: inline-block;margin-left: 30px;"
                  v-model="tags.trainTypes"
                  @change="handleCheckedTrainTypes"
                >
                  <el-checkbox
                    v-for="item in trainTypeAll"
                    :label="item.type"
                    :key="item.type"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <el-row v-show="fromStationAll.length">
              <el-form-item
                label="出发车站"
                style="margin-bottom: 0;"
              >
                <el-checkbox
                  :indeterminate="isFromStationIndeterminate"
                  v-model="fromStationCheckAll"
                  @change="handleFromStationCheckAllChange"
                >
                  全部
                </el-checkbox>
                <el-checkbox-group
                  style="display: inline-block;margin-left: 30px;"
                  v-model="tags.fromStations"
                  @change="handleCheckedFromStation"
                >
                  <el-checkbox
                    v-for="item in fromStationAll"
                    :label="item.type"
                    :key="item.type"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>

            <el-row v-show="toStationAll.length">
              <el-form-item
                label="到达车站"
                style="margin-bottom: 0;"
              >
                <el-checkbox
                  :indeterminate="isToStationIndeterminate"
                  v-model="toStationCheckAll"
                  @change="handleToStationCheckAllChange"
                >
                  全部
                </el-checkbox>
                <el-checkbox-group
                  style="display: inline-block;margin-left: 30px;"
                  v-model="tags.toStations"
                  @change="handleCheckedToStation"
                >
                  <el-checkbox
                    v-for="item in toStationAll"
                    :label="item.type"
                    :key="item.type"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-row>
          </el-form>

          <div
            class="infos"
            v-show="list.length"
          >
            {{ stationMap[params.fromStationTelecode] }} --> {{ stationMap[params.toStationTelecode] }}（{{ oldParams.trainDate }}）共计 <strong>{{
              list.length }}</strong> 个车次
          </div>
        </el-card>
      </el-col>
      <el-table
        ref="table"
        v-loading="loading"
        border
        :data="list"
      >
        <el-table-column
          prop="stationTrainCode"
          label="车次"
        >
          <template slot-scope="scope">
            <div
              style="font-size: 16px;color: #000;text-align: right;cursor: pointer;text-decoration: underline"
              @click="queryAllStations(scope.row)"
            >
              {{ scope.row.stationTrainCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot="header">
            <span>
              <span>出发站</span>
              <br>
              <span>到达站</span>
            </span>
          </template>
          <template slot-scope="scope">
            <div>
              <el-tag
                v-if="scope.row.fromStationTelecode === scope.row.startStationTelecode"
                type="warning"
              >
                始
              </el-tag>
              <el-tag v-else>
                过
              </el-tag>
              {{ stationMap[scope.row.fromStationTelecode] }}
            </div>

            <div style="margin-top: 2px;">
              <el-tag
                v-if="scope.row.toStationTelecode === scope.row.endStationTelecode"
                type="warning"
              >
                始
              </el-tag>
              <el-tag v-else>
                过
              </el-tag>
              {{ stationMap[scope.row.toStationTelecode] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          sortable
          prop="startTime"
        >
          <template slot="header">
            <span style="float: left;margin-left: 18px;">
              <span>出发时间</span>
              <br>
              <span>到达时间</span>
            </span>
          </template>
          <template slot-scope="scope">
            <div>
              {{ scope.row.startTime }}
            </div>

            <div style="margin-top: 2px;color: #999">
              {{ scope.row.arriveTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="历时">
          <template slot-scope="scope">
            <div>
              {{ scope.row.lishi }}
            </div>

            <div style="margin-top: 2px;color: #999">
              <span v-if="scope.row.lishi.substring(0, 2) * 1 < 24 && scope.row.startTime < scope.row.arriveTime">
                当日到达
              </span>
              <span
                v-else
              >
                次日到达
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span>
              <span>商务座</span>
              <br>
              <span>特等座</span>
            </span>
          </template>
          <template slot-scope="scope">
            <Num :num="scope.row.swzNum || scope.row.tzNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="一等座"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.zyNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="二等座"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.zeNum" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span>
              <span>高级</span>
              <br>
              <span>软卧</span>
            </span>
          </template>
          <template slot-scope="scope">
            <Num :num="scope.row.grNum" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span>
              <span style="margin-left: 6px">软卧</span>
              <br>
              <span>一等卧</span>
            </span>
          </template>
          <template slot-scope="scope">
            <Num :num="scope.row.rwNum" />
          </template>
        </el-table-column>
        <el-table-column label="动卧">
          <template slot-scope="scope">
            <Num :num="scope.row.srrbNum" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span>
              <span style="margin-left: 6px">硬卧</span>
              <br>
              <span>二等卧</span>
            </span>
          </template>
          <template slot-scope="scope">
            <Num :num="scope.row.ywNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="软座"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.rzNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="硬座"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.yzNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="无座"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.wzNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="其他"
          width="66"
        >
          <template slot-scope="scope">
            <Num :num="scope.row.qtNum" />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              style="padding: 6px 12px"
              v-if="scope.row.canWebBuy === 'Y'"
              @click="order(scope.row)"
            >
              抢票
            </el-button>
            <el-button
              size="small"
              type="danger"
              style="padding: 6px 12px"
              v-else
              @click="order(scope.row)"
            >
              抢票
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:left;width:100%;text-align: center;color: #999;font-size: 13px;margin-top: 10px;">
        仅供学习使用，请勿用于商业用途，由此带来的一切后果，本站概不负责。<br>
        如需购票，请前往
        <a
          href="https://www.12306.cn/"
          target="_blank"
        >
          12306官网
        </a>。
      </div>
    </el-col>

    <all-stations ref="allStations" />
  </div>
</template>

<script>
    import AllStations from './all-stations';
    import Num from './num';
    import qs from 'qs';

    export default {
        components: {AllStations, Num},
        data() {
            return {
                loading: false,
                oldList: [],
                list: [],
                rules: {
                    fromStationTelecode: [
                        {required: true, message: '请选择出发地'}
                    ],
                    toStationTelecode: [
                        {required: true, message: '请选择目的地'}
                    ],
                    trainDate: [
                        {required: true, message: '请选择出发日期'}
                    ]
                },
                oldParams: {
                    fromStationTelecode: undefined,
                    toStationTelecode: undefined
                },
                params: {
                    fromStationTelecode: undefined,
                    toStationTelecode: undefined,
                    trainDate: this.util.formatTimestamp(new Date().getTime() + 86400000, 'yyyy-MM-dd')
                },
                dateOptions: {
                    disabledDate: function (date) {
                        return date.getTime() < new Date().getTime() - 86400000 || date.getTime() > new Date().getTime() + 86400000 * 29;
                    }
                },
                tags: {
                    trainTypes: [],
                    fromStations: [],
                    fromStationsHahChange: false,
                    toStations: [],
                    toStationsHahChange: false,
                    startTime: '00:00--24:00'
                },
                startTimeList: ['00:00--24:00', '00:00-06:00', '06:00-12:00', '12:00--18:00', '18:00--24:00'],
                stationMap: {},
                fromStations: [],
                loadingFromStations: false,
                toStations: [],
                loadingToStations: false,
                trainTypeAll: [],
                trainTypesCheckAll: false,
                isTrainTypesIndeterminate: false,
                fromStationAll: [],
                fromStationCheckAll: false,
                isFromStationIndeterminate: false,
                toStationAll: [],
                toStationCheckAll: false,
                isToStationIndeterminate: false,
                header: {},
                headerY: 0
            };
        },
        methods: {
            query() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.params.random = Math.random();

                        this.$router.push({
                            path: '/ticket',
                            query: this.params
                        });
                    } else {
                        return false;
                    }
                });
            },
            fromStationsChange(val) {
                this.tags.fromStationsHahChange = this.oldParams.fromStationTelecode !== val;
            },
            toStationsChange(val) {
                this.tags.toStationsHahChange = this.oldParams.toStationTelecode !== val;
            },
            searchFromStations(key) {
                this.loadingFromStations = true;
                this.axios.get('ticket/stations?key=' + key).then(data => {
                    this.fromStations = data.stations;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingFromStations = false;
                });
            },
            searchToStations(key) {
                this.loadingToStations = true;
                this.axios.get('ticket/stations?key=' + key).then(data => {
                    this.toStations = data.stations;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loadingToStations = false;
                });
            },
            filterList() {
                this.list = [];
                for (let i = 0; i < this.oldList.length; i++) {
                    let item = this.oldList[i];

                    let tag = item.stationTrainCode.substring(0, 1);
                    if (!'ZTKGCD'.includes(tag)) {
                        tag = '';
                    }
                    if (this.tags.trainTypes.length && !this.tags.trainTypes.includes(tag)) {
                        continue;
                    }

                    let fromStationTelecode = item.fromStationTelecode;
                    if (this.tags.fromStations.length && !this.tags.fromStations.includes(fromStationTelecode)) {
                        continue;
                    }

                    let toStationTelecode = item.toStationTelecode;
                    if (this.tags.toStations.length && !this.tags.toStations.includes(toStationTelecode)) {
                        continue;
                    }
                    let arr = this.tags.startTime.split('--');
                    if (item.startTime < arr[0] || item.startTime > arr[1]) {
                        continue;
                    }

                    this.list.push(item);
                }
            },
            handleChangeStartTime(val) {
                this.tags.startTime = val;
                this.filterList();
            },
            handleCheckedTrainTypes(value) {
                let checkedCount = value.length;
                this.trainTypesCheckAll = checkedCount === this.trainTypeAll.length;
                this.isTrainTypesIndeterminate = checkedCount > 0 && checkedCount < this.trainTypeAll.length;
                this.filterList();
            },
            handleTrainTypesCheckAllChange(val) {
                this.tags.trainTypes = [];
                if (val) {
                    for (let index in Object.keys(this.trainTypeAll)) {
                        this.tags.trainTypes.push(this.trainTypeAll[index].type);
                    }
                }
                this.isTrainTypesIndeterminate = false;
                this.filterList();
            },
            handleCheckedFromStation(value) {
                let checkedCount = value.length;
                this.fromStationCheckAll = checkedCount === this.fromStationAll.length;
                this.isFromStationIndeterminate = checkedCount > 0 && checkedCount < this.fromStationAll.length;
                this.filterList();
            },
            handleFromStationCheckAllChange(val) {
                this.tags.fromStations = [];
                if (val) {
                    for (let index in Object.keys(this.fromStationAll)) {
                        this.tags.fromStations.push(this.fromStationAll[index].type);
                    }
                }
                this.isFromStationIndeterminate = false;
                this.filterList();
            },
            handleCheckedToStation(value) {
                let checkedCount = value.length;
                this.toStationCheckAll = checkedCount === this.toStationAll.length;
                this.isToStationIndeterminate = checkedCount > 0 && checkedCount < this.toStationAll.length;
                this.filterList();
            },
            handleToStationCheckAllChange(val) {
                this.tags.toStations = [];
                if (val) {
                    for (let index in Object.keys(this.toStationAll)) {
                        this.tags.toStations.push(this.toStationAll[index].type);
                    }
                }
                this.isToStationIndeterminate = false;
                this.filterList();
            },
            loadData() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.list = [];
                        this.trainTypeAll = [];
                        this.fromStationAll = [];
                        this.toStationAll = [];
                        this.axios.get('ticket?' + qs.stringify(this.params)).then(data => {
                            this.oldParams = Object.assign({}, this.params);

                            if (this.tags.fromStationsHahChange || this.tags.toStationsHahChange) {
                                this.tags.trainTypes = [];
                                this.trainTypesCheckAll = false;
                                this.isTrainTypesIndeterminate = false;
                            }
                            if (this.tags.fromStationsHahChange) {
                                this.tags.fromStations = [];
                                this.fromStationCheckAll = false;
                                this.isFromStationIndeterminate = false;
                                this.tags.fromStationsHahChange = false;
                            }
                            if (this.tags.toStationsHahChange) {
                                this.tags.toStations = [];
                                this.toStationCheckAll = false;
                                this.isToStationIndeterminate = false;
                                this.tags.toStationsHahChange = false;
                            }

                            this.oldList = data.list;
                            this.list = data.list;
                            this.trainTypeAll = data.trainTypeAll;
                            this.fromStationAll = data.fromStationAll;
                            this.toStationAll = data.toStationAll;

                            this.filterList();
                            this.headerY = this.getTop(this.header);
                        }).catch(res => {
                            this.error(res.respMsg);
                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            },
            handleScroll() {
                if (this.headerY <= window.pageYOffset - 33) {
                    this.header.classList.add('fixed-header');
                } else {
                    this.header.classList.remove('fixed-header');
                }
            },
            getTop(e) {
                let offset = e.offsetTop;
                if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
                return offset;
            },
            order(ticket) {
                this.$router.push({
                   path: '/ticket/order',
                   query: {
                       trainDate: this.oldParams.trainDate,
                       trainNo: ticket.trainNo,
                       stationTrainCode: ticket.stationTrainCode,
                       fromStationTelecode: ticket.fromStationTelecode,
                       toStationTelecode: ticket.toStationTelecode,
                       fromStationNo: ticket.fromStationNo,
                       toStationNo: ticket.toStationNo,
                       seatTypes: ticket.seatTypes
                   }
                });
            },
            queryAllStations(ticket) {
                this.$refs.allStations.show(ticket, this.oldParams.trainDate);
            }
        },
        beforeDestroy() {
            this.util.off(window, 'scroll', this.handleScroll);
        },
        mounted() {
            this.util.on(window, 'scroll', this.handleScroll);
            this.$nextTick(function () {
                this.header = document.getElementsByClassName('el-table__header-wrapper')[0];
            });

            Object.keys(this.$route.query).forEach(key => {
                this.params[key] = this.$route.query[key];
                if (key === 'fromStationTelecode' && this.params[key]) {
                    this.searchFromStations(this.params[key]);
                }
                if (key === 'toStationTelecode' && this.params[key]) {
                    this.searchToStations(this.params[key]);
                }
            });
            this.oldParams = Object.assign({}, this.params);

            this.axios.get('ticket/stationMap').then(data => {
                this.stationMap = data.stationMap;
            }).catch(res => {
                this.error(res.respMsg);
            });

            this.loadData();
        },
        beforeRouteUpdate(to, from, next) {
            this.loadData();
            next();
        }
    };
</script>

<style scoped lang="scss">
  .box-card {
    padding: 0 20px;
  }

  .search-ticket {
    position: relative;
  }

  /deep/ .el-form {
    .el-form-item__label, .el-form-item__content, .el-checkbox-group {
      line-height: 30px;
      height: 30px;
    }

    .el-form-item__error {
      display: none;
    }
  }

  /deep/ .el-table {
    font-size: 12px;
    font-weight: bold;

    .fixed-header {
      position: fixed;
      top: 0;
      z-index: 99;
      width: 1238px;
      border: 1px solid #d5d5d5;
    }

    th {
      background: #f5f6f8;
      color: #595959;

      .cell {
        text-align: center;
        padding: 0;
      }
    }

    tr, td {
      padding: 2px 0;

      .cell {
        line-height: 16px;
      }
    }

    .el-tag {
      font-weight: 100;
      font-size: 10px;
      height: 14px;
      line-height: 14px;
      padding: 0 1px;
    }
  }

  .infos {
    position: absolute;
    right: 20px;
    bottom: 10px;
    font-size: 13px;
  }

</style>
