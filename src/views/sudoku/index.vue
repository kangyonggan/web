<template>
  <div class="content">
    <el-card>
      <el-form
        :inline="true"
        size="medium"
        label-suffix="："
        style="margin-top: 10px;"
      >
        <el-col>
          <el-form-item label="难度（初始数字最小个数）">
            <el-input-number
              v-model="level"
              :min="10"
              :max="50"
            />
          </el-form-item>
          <el-form-item style="margin-left: 35px;">
            <el-button
              type="primary"
              icon="el-icon-check"
              @click="startGame"
              v-loading="loading"
            >
              出题
            </el-button>
            <el-button
              @click="onShowAnswer"
              type="warning"
              icon="el-icon-view"
            >
              答案
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>

      <div>
        <table
          class="sudoku"
          cellpadding="0"
        >
          <tbody>
          <tr
            v-for="i in 9"
            :key="i"
          >
            <td
              v-for="j in 9"
              :key="j"
              :class="{lineX: i % 3 === 0, lineY: j % 3 === 0}"
            >
              <input
                v-if="data[i * 9 - 9 + j - 1]"
                :value="data[i * 9 - 9 + j - 1]"
                readonly
              >
              <input
                v-else
                :value="data[i * 9 - 9 + j - 1]"
                type="number"
                min="1"
                max="9"
              >
            </td>
          </tr>
          </tbody>
        </table>

        <table
          v-show="showAnswer"
          class="sudoku answer"
          cellpadding="0"
        >
          <tbody>
          <tr
            v-for="i in 9"
            :key="i"
          >
            <td
              v-for="j in 9"
              :key="j"
              :class="{lineX: i % 3 === 0, lineY: j % 3 === 0}"
            >
              <input
                v-model="answer[i * 9 - 9 + j - 1]"
                readonly
              >
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                level: 25,
                data: [],
                answer: [],
                showAnswer: false
            };
        },
        methods: {
            onShowAnswer() {
              if (!this.data.length) {
                  return;
              }
              this.showAnswer = !this.showAnswer;
            },
            startGame() {
                this.loading = true;
                this.data = [];
                this.axios.get('sudoku?level=' + this.level).then(data => {
                    this.data = data.data;
                    this.answer = data.answer;
                    this.showAnswer = false;

                    for (let i = 0; i < this.data.length; i++) {
                        if (!this.data[i]) {
                            this.data[i] = undefined;
                        }
                    }
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
  .sudoku {
    border-spacing: 0;
    border: 1px solid #ccc;
    float: left;
    margin-bottom: 20px;

    tr {
      td {
        border-top: 1px solid #d5d5d5;
        border-left: 1px solid #d5d5d5;

        input {
          width: 46px;
          height: 46px;
          outline: none;
          font-size: 25px;
          text-indent: 15px;
          border: 0;
        }
      }

      .lineX {
        border-bottom: 1px solid #ccc;
      }

      .lineY {
        border-right: 1px solid #ccc;
      }
    }
  }

  .answer {
    float: right;
  }
</style>