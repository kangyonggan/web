<template>
  <div style="position: relative">
    <div
      id="kline"
      v-loading="loading"
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
    }
  },
  data() {
    return {
      loading: false,
      timerHeartbeat: undefined,
      ws: undefined,
      kline: undefined,
      pricePrecision: {
        btc: 2,
        eth: 2,
        eos: 4,
        xrp: 5,
        ltc: 2,
        bch: 2,
        bsv: 4,
        fil: 4,
        dot: 4,
        link: 4,
        ht: 4,
        bnb: 4,
        yfi: 2,
        trx: 6,
        etc: 4,
        comp: 2,
        uni: 4,
        ftt: 4,
        neo: 2,
        qtum: 4,
        sushi: 4,
        zen: 4,
        aave: 4
      }
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
      this.kline.setLeftMinVisibleBarCount(50);
      this.kline.setRightMinVisibleBarCount(50);
      this.kline.setDataSpace(10);
      this.kline.resize();
    },
    /**
     * 历史K线数据
     */
    historyKLine(symbol, interval) {
      this.loading = true;
      let params = 'symbol=' + symbol + '&interval=' + interval;
      this.axios.get('/quotation/symbolList?' + params).then(data => {
        data = data.symbolList;
        for (let i = 0; i < data.length; i++) {
          data[i].timestamp = data[i].id * 1000;
          data[i].volume = data[i].vol;
        }

        this.kline.setPriceVolumePrecision(this.pricePrecision[symbol.substring(0, symbol.indexOf('/')).toLowerCase()], 2);
        this.kline.applyNewData(data);
      }).catch(res => {
        this.error(res.message);
      }).finally(() => {
        this.loading = false;
      });
    },
    initWs() {
      let ts = new Date().getTime();
      let sign = require('js-sha256').sha256(('BQMEX_' + ts + '##'));
      this.ws = new WebSocket('wss://real.bqmex.com/ws/quotation?ts=' + ts + '&sign=' + sign);

      let that = this;
      this.ws.onopen = function () {
        that.sub(that.symbol, that.interval);

        // 心跳
        that.timerHeartbeat = setInterval(function () {
          let params = {
            topic: 'ping'
          };
          try {
            that.ws.send(JSON.stringify(params));
          } catch (e) {
            that.close();
            that.initWs();
          }
        }, 10000);
      };

      this.ws.onmessage = function (e) {
        let data = JSON.parse(e.data);
        if (data.topic === that.symbol + '_' + that.interval) {
          data = data.data;
          data.timestamp = data.id * 1000;
          data.volume = data.vol;
          that.lastPrice = data.close * 1;
          that.kline.updateData(data);
          that.$emit('update-last-price', that.lastPrice);
          document.title = that.lastPrice + ' ' +  that.symbol.toUpperCase();
        }
      };

      this.ws.onclose = function () {
        that.close();
      };
    },
    close() {
      clearInterval(this.timerHeartbeat);
      this.timerHeartbeat = undefined;
      try {
        this.unsub(this.symbol, this.interval);
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
      this.ws = undefined;
    },
    /**
     * 取消订阅
     */
    unsub(symbol, interval) {
      this.lastPrice = 0;
      let params = {
        topic: 'unsub',
        symbol: symbol,
        interval: interval
      };
      this.ws.send(JSON.stringify(params));
    },
    /**
     * 订阅
     */
    sub(symbol, interval) {
      let params = {
        topic: 'sub',
        symbol: symbol,
        interval: interval
      };
      this.ws.send(JSON.stringify(params));
    },
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
  height: 650px;
}
</style>
