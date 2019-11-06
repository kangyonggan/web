<template>
  <div class="toolbar">
    <router-link
      v-if="prevSection"
      class="prev"
      :to="'/novel/' + section.novelId + '/' + prevSection.id"
    >
      <i class="el-icon-arrow-left" />
      {{ prevSection.title }}
    </router-link>

    <router-link
      class="toc"
      :to="'/novel/' + section.novelId"
    >
      <div>
        <i class="el-icon-arrow-up" />
        <span>回到目录</span>
      </div>
    </router-link>

    <router-link
      v-if="nextSection"
      class="next"
      :to="'/novel/' + section.novelId + '/' + nextSection.id"
    >
      {{ nextSection.title }}
      <i class="el-icon-arrow-right" />
    </router-link>
  </div>
</template>

<script>
    export default {
        props: {
            section: {
                required: true,
                type: Object
            },
            prevSection: {
                required: false,
                type: Object,
                default: undefined
            },
            nextSection: {
                required: false,
                type: Object,
                default: undefined
            }
        }
    };
</script>

<style scoped lang="scss">
  .toolbar {
    background: #fff;
    border: 1px solid #d5d5d5;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    padding: 0 15px;
    position: relative;

    .prev {
      float: left;
    }

    .toc {
      position: absolute;
      left: 580px;
      top: 0;
      width: 80px;
      height: 40px;

      div {
        position: relative;

        i {
          position: absolute;
          top: 2px;
          left: 21px;
        }

        span {
          position: absolute;
          top: 7px;
          left: 0;
        }
      }
    }

    .next {
      float: right;
    }
  }
</style>