<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header">
        <span>生成身份证</span>
      </div>
      <el-col>
        <el-form
          :inline="true"
          :model="params"
        >
          <el-col>
            <el-col :span="6">
              <el-form-item
                label="省份"
                prop="prov"
              >
                <el-select
                  clearable
                  filterable
                  v-model="params.prov"
                  placeholder="不选则随机生成"
                >
                  <el-option
                    v-for="prov in Object.keys(allProvinces)"
                    :key="prov"
                    :label="allProvinces[prov]"
                    :value="prov"
                  >
                    <span style="float: left;width: 245px;overflow: hidden">{{ allProvinces[prov] }}</span>
                    <span style="float: right; color: #999; font-size: 12px">{{ prov }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="最小年龄"
                prop="startAge"
              >
                <el-input-number
                  placeholder="最小年龄"
                  v-model="params.startAge"
                  :min="1"
                  :max="params.endAge"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="最大年龄"
                prop="endAge"
              >
                <el-input-number
                  placeholder="最大年龄"
                  v-model="params.endAge"
                  controls-position="right"
                  :min="params.startAge"
                  :max="150"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="生成个数"
                prop="size"
              >
                <el-input-number
                  placeholder="生成个数"
                  v-model="params.size"
                  controls-position="right"
                  :min="20"
                  :step="10"
                  :max="500"
                />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="6">
              <el-form-item
                label="性别"
                prop="gender"
              >
                <el-checkbox-group
                  v-model="params.gender"
                  :min="1"
                >
                  <el-checkbox
                    label="0"
                  >
                    男
                  </el-checkbox>
                  <el-checkbox
                    label="1"
                  >
                    女
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="长度"
                prop="len"
              >
                <el-checkbox-group
                  v-model="params.len"
                  :min="1"
                >
                  <el-checkbox
                    label="18"
                  >
                    18位
                  </el-checkbox>
                  <el-checkbox
                    label="15"
                  >
                    15位
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submit"
                >
                  <i class="el-icon-check" />
                  生成
                </el-button>
                <el-button
                  @click="exportExcel"
                  type="warning"
                >
                  <i class="el-icon-download" />
                  导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-col>
    </el-card>

    <el-card
      style="margin-top: 20px;"
      v-loading="loading"
    >
      <el-table
        :data="idNos"
        stripe
      >
        <el-table-column
          type="index"
        />
        <el-table-column
          prop="name"
          label="姓名"
          sortable
        />
        <el-table-column
          prop="idNo"
          label="身份证号码"
          width="200"
          sortable
        />
        <el-table-column
          prop="gender"
          label="性别"
          sortable
        />
        <el-table-column
          prop="birthday"
          label="出生日期"
          sortable
        />
        <el-table-column
          prop="length"
          label="长度"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.length }}位
          </template>
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="地区"
          sortable
          width="400"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                loading: false,
                params: {
                    prov: '',
                    startAge: 18,
                    endAge: 35,
                    size: 20,
                    gender: ['0', '1'],
                    len: ['18']
                },
                allProvinces: [],
                idNos: []
            };
        },
        methods: {
            submit() {
                this.loading = true;
                this.axios.post('tools/idNo', this.params).then(data => {
                    this.idNos = data.idNos;
                }).catch(res => {
                    this.idNos = [];
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            exportExcel() {
                window.open(this.axios.defaults.baseURL + 'tools/idNoExport?' + qs.stringify(this.params));
            }
        },
        mounted() {
            this.axios.get('tools/allProvinces').then(data => {
                this.allProvinces = data.allProvinces;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>
