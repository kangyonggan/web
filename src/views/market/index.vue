<template>
  <div>
    <div style="width: 20%;float: left">
      <currency-list
        :symbol="symbol"
        :interval="interval"
        :last-price="lastPrice"
        @change="changeSub"
      />
    </div>
    <div style="width: 80%; float: right">
      <kline-header
        :symbol="symbol"
        :interval="interval"
        :last-price="lastPrice"
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
import CurrencyList from './currency-list';
import KlineHeader from './kline-header';
import KlineBody from './kline-body';

export default {
  components: {CurrencyList, KlineHeader, KlineBody},
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
    this.symbol = this.$route.query.symbol || 'BTC/USDT';
    this.interval = this.$route.query.interval || '5min';
    let that = this;
    this.$nextTick(() => {
      that.$refs['kline-body'].historyKLine(that.symbol, that.interval);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.symbol = to.query.symbol || 'BTC/USDT';
    this.interval = to.query.interval || '5min';
    let that = this;
    this.$nextTick(() => {
      that.$refs['kline-body'].historyKLine(that.symbol, that.interval);
      that.$refs['kline-body'].sub(that.symbol, that.interval);
    });
    next();
  }
};
</script>

