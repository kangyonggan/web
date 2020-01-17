<template>
  <el-card>
    <div slot="header">
      <span>JSON格式化</span>
    </div>
    <el-col :span="10">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入JSON字符串"
        v-model="jsonStr"
        @input="formatJson"
      />
    </el-col>
    <el-col
      :span="14"
      style="padding-left: 10px;"
    >
      <json-viewer
        :value="jsonObj"
        :expand-depth="5"
        copyable
        boxed
      />
    </el-col>

    <div style="clear: both;height: 10px;" />
  </el-card>
</template>

<script>
    function debounce(fn, delay) {
        let timer;
        return function () {
            let args = arguments;
            let val = args[0];
            if (val && val.length && val.length < 45) {
                this.pushRight = true;
            } else {
                this.pushRight = false;
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    import JsonViewer from 'vue-json-viewer';

    export default {
        components: {JsonViewer},
        data() {
            return {
                jsonStr: '{"name":"马小跳","mobileNo":"18812345678","subjects":["语文","数学"]}',
                jsonObj: {}
            };
        },
        methods: {
            formatJson: debounce(function (val) {
                try {
                    this.jsonObj = JSON.parse(val);
                } catch (e) {
                    this.error(e);
                }
            }, 500)
        },
        mounted() {
            this.formatJson(this.jsonStr);
        }
    };
</script>