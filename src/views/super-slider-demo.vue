<template>
  <div>
    <ul class="items">
      <ol
        v-for="(item, index) in items"
        :key="index"
      >
        <el-checkbox
          v-model="items[index].enable"
          @change="changeChecked"
        >
          {{ item.label }} - {{ item.value }}% - {{ item.background }}
        </el-checkbox>
      </ol>
    </ul>

    <super-slider :items="items" />

    <ul class="tips">
      <ol>1、不支持手机端滑动</ol>
      <ol>2、支持自定义颜色</ol>
      <ol>3、支持动态增减</ol>
      <ol>4、鼠标悬浮在线段上可查看当前线段的百分比</ol>
      <ol>5、鼠标悬浮在分割点上可查看相邻两个线段的百分比</ol>
      <ol>6、小bug:拖拽时，分割点的Tip不能随分割点移动</ol>
      <ol>7、此组件实现逻辑参考element-ui的slider逻辑</ol>
    </ul>
  </div>
</template>

<script>
    import SuperSlider from '../components/super-slider';

    export default {
        components: {SuperSlider},
        data() {
            return {
                items: [{
                    enable: true,
                    value: 50,
                    label: '语文',
                    background: '#409eff'
                }, {
                    enable: true,
                    value: 30,
                    label: '数学',
                    background: 'green'
                }, {
                    enable: true,
                    value: 20,
                    label: '英语',
                    background: '#f60'
                }],
                defaultValue: {
                    '1': [100],
                    '2': [60, 40],
                    '3': [50, 30, 20]
                }
            };
        },
        methods: {
            changeChecked() {
                let enableCount = 0;
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].enable) {
                        this.items[i].value = this.defaultValue[this.getEnableCount()][enableCount++];
                    } else {
                        this.items[i].value = 0;
                    }
                }
            },
            getEnableCount() {
                let count = 0;
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].enable) {
                        count++;
                    }
                }
                return count;
            }
        }
    };
</script>

<style scoped lang="scss">
  .items {
    list-style: none;
    padding-left: 0;
    height: 30px;

    ol {
      float: left;
      margin-right: 50px;
      padding-left: 0;
    }
  }

  .tips {
    list-style: none;
    padding-left: 0;
    border-top: 1px solid #d5d5d5;
    padding-top: 20px;

    ol {
      padding-left: 0;
      line-height: 25px;
      font-size: 13px;
    }
  }
</style>