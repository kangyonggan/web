<template>
  <div style="position: relative">
    <div
      id="kline"
      v-loading="loading"
      :style="{height: height + 'px'}"
    />
    <i
      title="复位"
      class="el-icon-aim"
      style="position: absolute;left: 50px;bottom: 50px;font-size: 16px;color: #999;cursor: pointer;z-index: 99"
      @click="resetKline"
    />
  </div>
</template>

<script>
import {init} from 'klinecharts';

export default {
  emits: ['update-last-price'],
  props: {
    interval: {
      required: true,
      type: String
    },
    symbol: {
      required: true,
      type: String
    },
    height: {
      required: false,
      type: Number,
      default: 650
    }
  },
  data() {
    return {
      loading: false,
      ws: undefined,
      kline: undefined
    };
  },
  methods: {
    /**
     * 画K线
     */
    initKline() {
      // 初始化图表
      this.kline = init('kline', {
        // 网格线
        grid: {
          show: true
        },
        // 蜡烛图
        candle: {
          bar: {
            upColor: '#13b887',
            downColor: '#eb4d5c'
          }
        },
      });
      this.resetKline();
    },
    resetKline() {
      this.kline.setOffsetRightSpace(6);
      this.kline.setLeftMinVisibleBarCount(0);
      this.kline.setRightMinVisibleBarCount(0);
      this.kline.setDataSpace(10);
      this.kline.resize();
    },
    /**
     * 历史K线数据
     */
    historyKLine() {
      this.loading = true;
      let params = 'symbol=' + this.symbol + '&interval=' + this.interval;
      this.axios.get('/market/historyList?' + params).then(data => {
        data = data.historyList;
        this.kline.applyNewData(data);
      }).catch(res => {
        this.error(res.message);
      }).finally(() => {
        this.loading = false;
      });
    },
    initWs() {
      this.ws = new WebSocket(this.env.socketUrl);

      let that = this;
      this.ws.onopen = function () {
        console.log('onopen');
        if (that.symbol && that.interval) {
          that.sub(that.symbol, that.interval);
        }
      };

      this.ws.onmessage = function (e) {
        let data = JSON.parse(e.data);
        that.lastPrice = data.close * 1;
        that.kline.updateData(data);
        that.$emit('update-last-price', that.lastPrice);
      };
    },
    /**
     * 取消订阅
     */
    unsub(symbol, interval) {
      this.lastPrice = 0;
      let params = {
        method: 'UNSUBSCRIBE',
        params: [symbol.toLowerCase() + '_perpetual@continuousKline_' + interval],
        id: new Date().getTime()
      };
      console.log('unsub', params);
      this.ws.send(JSON.stringify(params));
    },
    /**
     * 订阅
     */
    sub(symbol, interval) {
      let params = {
        method: 'SUBSCRIBE',
        params: [symbol.toLowerCase() + '_perpetual@continuousKline_' + interval],
        id: new Date().getTime()
      };
      console.log('sub', params);
      this.ws.send(JSON.stringify(params));
    },
    close() {
      try {
        this.unsub(this.symbol, this.interval);
      } catch (e) {
        console.error(e);
      }
      this.ws = undefined;
    }
  },
  unmounted() {
    this.close();
  },
  mounted() {
    this.initKline();
    this.initWs();
  }
};
</script>

<style scoped lang="scss">
#kline {
  width: 100%;
}
</style>
