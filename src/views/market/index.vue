<template>
  <div>
    <div style="width: 20%;float: left">
      <symbol-list
        :symbol="symbol"
        :interval="interval"
        @change="changeSub"
      />
    </div>
    <div style="width: 80%; float: right">
      <kline-header
        :symbol="symbol"
        :interval="interval"
        :last-price="lastPrice"
        @change="changeSub"
      />
      <kline-body
        ref="kline-body"
        :symbol="symbol"
        :interval="interval"
        @update-last-price="updateLastPrice"
      />
    </div>
  </div>
</template>

<script>
import SymbolList from './symbol-list';
import KlineHeader from './kline-header';
import KlineBody from './kline-body';

export default {
  components: {SymbolList, KlineHeader, KlineBody},
  data() {
    return {
      symbol: '',
      interval: '',
      lastPrice: 0,
      marginCoinConfig: {}
    };
  },
  methods: {
    /**
     * 修改订阅
     */
    changeSub() {
      this.$refs['kline-body'].unsub(this.symbol, this.interval);
    },
    /**
     * 更新最新价
     *
     * @param lastPrice
     */
    updateLastPrice(lastPrice) {
      this.lastPrice = lastPrice;
    }
  },
  mounted() {
    this.symbol = this.$route.query.symbol || 'btcusdt';
    this.interval = this.$route.query.interval || '1h';
    let that = this;
    this.$nextTick(() => {
      that.$refs['kline-body'].historyKLine(that.symbol, that.interval);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.symbol = to.query.symbol || 'btcusdt';
    this.interval = to.query.interval || '1h';
    let that = this;
    this.$nextTick(() => {
      that.$refs['kline-body'].historyKLine(that.symbol, that.interval);
      that.$refs['kline-body'].sub(that.symbol, that.interval);
    });
    next();
  }
};
</script>

