<template>
  <div class="content">
    <el-col>
      <el-col class="search-ticket">
        <el-card class="box-card">
          <el-row class="title">
            12309余票查询
          </el-row>

          <el-form
            ref="form"
            :rules="rules"
            :inline="true"
            :model="params"
            label-width="100px"
            label-suffix="："
            style="margin-top: 25px;"
          >
            <el-row>
              <el-form-item
                label="出发地"
                size="small"
                prop="fromStationNo"
              >
                <el-select
                  v-model="params.fromStationNo"
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
                    :value="item.stationNo"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="目的地"
                size="small"
                prop="toStationNo"
              >
                <el-select
                  v-model="params.toStationNo"
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
                    :value="item.stationNo"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="出发日期"
                size="small"
                prop="date"
              >
                <el-date-picker
                  :editable="false"
                  v-model="params.date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择出发日期"
                />
              </el-form-item>

              <el-form-item style="float: right">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="query"
                  size="small"
                >
                  查询
                </el-button>
                <el-button
                  size="small"
                  type="success"
                  icon="el-icon-time"
                  @click="warning('开发中...')"
                >
                  抢票
                </el-button>
              </el-form-item>
            </el-row>

            <el-row v-show="trainTypeAll.length">
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
            <div style="font-size: 16px;color: #000;text-align: right">
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
        <el-table-column>
          <template slot="header">
            <span>
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
              <span v-if="scope.row.startTime < scope.row.arriveTime">
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
              @click="warning('开发中...')"
            >
              预定
            </el-button>
            <div
              v-else
              style="color: #999;text-align: center"
            >
              预定
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:left;width:100%;text-align: center;color: #999;font-size: 13px;margin-top: 10px;">
        仅供学习使用，请勿用于商业用途，由此带来的一切后果，本站概不负责。
      </div>
    </el-col>
  </div>
</template>

<script>
    import Num from './num';
    import qs from 'qs';

    export default {
        components: {Num},
        data() {
            return {
                loading: false,
                oldList: [],
                list: [],
                rules: {
                    fromStationNo: [
                        {required: true, message: '请选择出发地'}
                    ],
                    toStationNo: [
                        {required: true, message: '请选择目的地'}
                    ],
                    date: [
                        {required: true, message: '请选择出发日期'}
                    ]
                },
                oldParams: {
                    fromStationNo: undefined,
                    toStationNo: undefined
                },
                params: {
                    fromStationNo: undefined,
                    toStationNo: undefined,
                    date: this.util.formatTimestamp(new Date().getTime() + 86400000, 'yyyy-MM-dd')
                },
                tags: {
                    trainTypes: [],
                    fromStations: [],
                    fromStationsHahChange: false,
                    toStations: [],
                    toStationsHahChange: false
                },
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
                isToStationIndeterminate: false
            };
        },
        methods: {
            query() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.params._random = Math.random();

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
                this.tags.fromStationsHahChange = this.oldParams.fromStationNo !== val;
            },
            toStationsChange(val) {
                this.tags.toStationsHahChange = this.oldParams.toStationNo !== val;
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

                    this.list.push(item);
                }
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
                        this.axios.get('/ticket?' + qs.stringify(this.params)).then(data => {
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
                        }).catch(res => {
                            this.error(res.respMsg);
                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                });
            }
        },
        mounted() {
            Object.keys(this.$route.query).forEach(key => {
                this.params[key] = this.$route.query[key];
                if (key === 'fromStationNo' && this.params[key]) {
                    this.searchFromStations(this.params[key]);
                }
                if (key === 'toStationNo' && this.params[key]) {
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
    .title {
      color: #000;
      font-size: 24px;
      margin-left: 35px;
    }
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

    .el-table__header {
      /*width: 1240px !important;*/
    }

    th {
      background: #f5f6f8;
      color: #595959;

      .cell {
        text-align: center;
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


</style>
