<template>
  <div
    class="kline-header"
  >
    <ul>
      <li
        v-for="int in intervalList"
        :key="int.code"
        :class="{active: int.code === interval}"
        @click="changeInterval(int.code)"
      >
        {{ int.val }}
      </li>
    </ul>
    <div
      class="last-price"
      v-if="lastPrice !== 0"
    >
      ${{ lastPrice }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  props: {
    interval: {
      required: true,
      type: String
    },
    symbol: {
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
      loading: false,
      intervalList: [
        {
          code: '1m',
          val: '1分钟',
        },
        {
          code: '3m',
          val: '3分钟',
        },
        {
          code: '5m',
          val: '5分钟',
        },
        {
          code: '15m',
          val: '15分钟',
        },
        {
          code: '30m',
          val: '30分钟',
        },
        {
          code: '1h',
          val: '1小时',
        },
        {
          code: '4h',
          val: '4小时',
        },
        {
          code: '1d',
          val: '1天',
        },
        {
          code: '1w',
          val: '1周',
        },
        {
          code: '1M',
          val: '1月',
        }
      ],
    };
  },
  methods: {
    /**
     * 修改周期
     */
    changeInterval(interval) {
      this.$emit('change');
      this.$router.push({
        to: '/market',
        query: {
          symbol: this.symbol,
          interval: interval
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.kline-header {
  height: 30px;

  ul {
    width: 80%;
    float: left;
    list-style: none;
    height: 30px;
    padding: 0;
    margin: 0;

    li {
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      cursor: pointer;
      padding: 0 8px;
    }

    li.active {
      background: #e5e7eA;
    }

    li:hover {
      background: #e5e7eA;
    }
  }

  .last-price {
    float: left;
    font-size: 22px;
    margin-left: 10px;
    color: #303133;
  }
}
</style>
