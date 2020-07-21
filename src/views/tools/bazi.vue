<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header">
        <span>五行八字</span>
      </div>
      <el-col>
        <el-form
          ref="form"
          :inline="true"
          :model="params"
          :rules="rules"
        >
          <el-col>
            <el-col :span="5">
              <el-form-item
                label="阴/阳历"
                prop="isLunar"
              >
                <el-radio-group v-model="params.isLunar">
                  <el-radio :label="true">
                    阴历
                  </el-radio>
                  <el-radio :label="false">
                    阳历
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="出生日期"
                prop="birthday"
              >
                <el-date-picker
                  v-model="params.birthday"
                  type="date"
                  value-format="yyyyMMdd"
                  placeholder="选择出生日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="出生时辰"
                prop="hour"
              >
                <el-select
                  clearable
                  v-model="params.hour"
                  placeholder="选择出生时辰"
                >
                  <el-option
                    v-for="i in 24"
                    :key="i"
                    :label="((i - 1 &lt; 10) ? ('0' + (i - 1)) : (i - 1)) + ':00 ~ ' + ((i - 1 &lt; 10) ? ('0' + (i - 1)) : (i - 1)) + ':59'"
                    :value="i - 1"
                  >
                    {{ (i - 1 &lt; 10) ? ('0' + (i - 1)) : (i - 1) }}:00 ~ {{ (i - 1 &lt; 10) ? ('0' + (i - 1)) : (i -
                      1) }}:59
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submit"
                >
                  <i class="el-icon-check" />
                  计算
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
      <table class="table">
        <tbody>
          <tr>
            <td width="90">
              阳历生日
            </td>
            <td width="150">
              {{ result.birthday }}
            </td>
            <td width="50">
              生肖
            </td>
            <td width="260">
              {{ result.shengXiao }}
            </td>
            <td width="50">
              星座
            </td>
            <td>
              {{ result.xingZuo }}
            </td>
          </tr>
          <tr>
            <td>
              生辰八字
            </td>
            <td>
              {{ result.baZi }}
            </td>
            <td>五行</td>
            <td>
              <span style="line-height: 60px;">
                {{ result.wuXing }}
              </span>
              <ul v-if="result.que">
                <li
                  v-for="i in result.que.length"
                  :key="i"
                >
                  {{ result.que[i - 1] }}
                </li>
              </ul>
            </td>
            <td>运势</td>
            <td>
              {{ result.yuShi }}
            </td>
          </tr>
        </tbody>
      </table>
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {
                    isLunar: true,
                    birthday: undefined,
                    hour: ''
                },
                rules: {
                    birthday: [
                        {required: true, message: '请选择出生日期'}
                    ],
                    hour: [
                        {required: true, message: '请选择出生时辰'}
                    ]
                },
                result: {}
            };
        },
        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.result = {};
                    this.axios.post('tools/bazi', this.params).then(data => {
                        this.result = data;
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .el-input {
    width: 210px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;

    tbody {
      tr {
        td {
          padding: 5px 8px;
          line-height: 36px;
          border: 1px solid #ccc;
          font-size: 13px;

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
            float: right;

            li {
              font-size: 8px;
              line-height: normal;
            }
          }
        }

        td:nth-child(odd) {
          background: #f5f7fa;
          text-align: center;
        }
      }
    }
  }
</style>
