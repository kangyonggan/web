<template>
  <div class="symbol-list">
    <ul>
      <li style="cursor: default;">
        <div style="width: 120px;margin-left: 6px;color: #595959;font-weight: bold">
          币种
        </div>
        <div
          style="width: 90px;text-align: right;color: #595959;font-weight: bold"
        >
          最新
        </div>
      </li>
      <li
        v-for="s in symbolList"
        :key="s.symbol"
        :class="{active: s.symbol.toLowerCase() === symbol.toLowerCase()}"
        @click="changeSymbol(s.symbol)"
      >
        <div style="width: 120px;margin-left: 6px;color: #595959">
          {{ s.symbol }}
        </div>
        <div
          style="width: 90px;text-align: right"
        >
          {{ s.price }}
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
      }
    },
    data() {
      return {
        timer: undefined,
        symbolList: []
      };
    },
    methods: {
      /**
       * 加载币种列表
       */
      loadCurrencyList() {
        let that = this;
        let fc = function () {
          that.axios.get('/market/symbolList').then(data => {
            that.symbolList = data.symbolList;
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
            symbol: symbol.toLowerCase(),
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
  .symbol-list {
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
      }

      li.active {
        background: #e5e7eA;
      }
    }
  }
</style>
