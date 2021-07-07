<template>
  <div class="currency-list">
    <ul>
      <li style="cursor: default;">
        <div style="width: 70px;margin-left: 6px;color: #595959;font-weight: bold">
          币种
        </div>
        <div
          style="width: 70px;text-align: right;color: #595959;font-weight: bold"
        >
          最新
        </div>
        <div
          style="float: right;margin-right: 5px;color: #595959;font-weight: bold"
        >
          涨跌
        </div>
      </li>
      <li
        v-for="currency in currencyList"
        :key="currency.quotationCoin"
        :class="{active: currency.quotationCoin === symbol, 'up-color': currency.rate * 1 >= 0}"
        @click="changeSymbol(currency.quotationCoin)"
      >
        <div>
          <el-avatar
            :size="26"
            :src="currency.quotationCoinLogo"
            style="margin-left: 3px;margin-top: 3px;"
          />
        </div>
        <div style="width: 70px;margin-left: 6px;color: #595959">
          {{ currency.quotationCoin }}
        </div>
        <div
          v-if="currency.quotationCoin === symbol && lastPrice !== 0"
          style="width: 70px;text-align: right"
        >
          {{ lastPrice }}
        </div>
        <div
          v-else
          style="width: 70px;text-align: right"
        >
          {{ currency.latestPriceStr }}
        </div>
        <div
          style="float: right;margin-right: 5px;"
          class="rate"
        >
          <span v-if="currency.rate * 1 >= 0">+</span>{{ currency.rate }}%
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    symbol: {
      required: true,
      type: String
    },
    interval: {
      required: true,
      type: String
    },
    lastPrice: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      timer: undefined,
      currencyList: []
    };
  },
  methods: {
    /**
     * 加载币种列表
     */
    loadCurrencyList() {
      let that = this;
      let fc = function () {
        that.axios.get('/quotation/list?type=ALL', {baseURL: '/bzone/'}).then(data => {
          that.currencyList = data;
        }).catch(res => {
          that.error(res.message);
        });
      };
      fc();
      this.timer = setInterval(fc, 5000);
    },

    /**
     * 修改币种
     */
    changeSymbol(symbol) {
      this.$emit('change');
      this.$router.push({
        to: '/market',
        query: {
          symbol: symbol,
          interval: this.interval
        }
      });
    }
  },
  mounted() {
    this.loadCurrencyList();
  },
  unmounted() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
};
</script>

<style scoped lang="scss">
.currency-list {
  margin-top: 10px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      width: 100%;
      height: 30px;
      margin-bottom: 5px;
      line-height: 100%;
      cursor: pointer;
      font-size: 12px;

      div {
        float: left;
        height: 33px;
        line-height: 33px;
        font-size: 12px;
      }

      .rate {
        color: #eb4d5c;
      }
    }

    li.active {
      background: #e5e7eA;
    }

    li.up-color .rate {
      color: #13b887
    }
  }
}
</style>
