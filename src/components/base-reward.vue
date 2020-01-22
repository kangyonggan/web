<template>
  <div class="reward">
    <el-button
      type="danger"
      @click="show = !show"
    >
      打赏
    </el-button>
    <div
      v-if="show"
      class="imgs"
    >
      <div class="imgPanel">
        <img
          src="../assets/images/ali.png"
          @mouseenter="startingAli = true"
          @mouseleave="startingAli = false"
        >
        <p :class="{anim: startingAli}">
          支 付 宝
        </p>
      </div>
      <div
        class="imgPanel"
      >
        <img
          src="../assets/images/wechat.png"
          @mouseenter="startingWechat = true"
          @mouseleave="startingWechat = false"
        >
        <p :class="{anim: startingWechat}">
          微 😂信
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                startingAli: false,
                startingWechat: false
            };
        }
    };
</script>

<style scoped lang="scss">
  .reward {
    clear: both;
    margin-top: 50px;
    text-align: center;

    img {
      margin-top: 20px;
      width: 180px;
    }

    p {
      color: #333;
    }
  }

  .imgs {
    text-align: center;
  }

  .imgPanel {
    display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
  }

  p.anim {
    animation: myfirst 0.1s 0s infinite;
    -moz-animation: myfirst 0.1s 0s infinite; /* Firefox */
    -webkit-animation: myfirst 0.1s 0s infinite; /* Safari and Chrome */
    -o-animation: myfirst 0.1s 0s infinite; /* Opera */
  }

  @keyframes myfirst {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    12% {
      transform: rotate(15deg);
      -ms-transform: rotate(15deg); /* IE 9 */
      -moz-transform: rotate(15deg); /* Firefox */
      -webkit-transform: rotate(15deg); /* Safari and Chrome */
      -o-transform: rotate(15deg); /* Opera */
    }
    25% {
      transform: rotate(30deg);
      -ms-transform: rotate(30deg); /* IE 9 */
      -moz-transform: rotate(30deg); /* Firefox */
      -webkit-transform: rotate(30deg); /* Safari and Chrome */
      -o-transform: rotate(30deg); /* Opera */
    }
    38% {
      transform: rotate(20deg);
      -ms-transform: rotate(20deg); /* IE 9 */
      -moz-transform: rotate(20deg); /* Firefox */
      -webkit-transform: rotate(20deg); /* Safari and Chrome */
      -o-transform: rotate(20deg); /* Opera */
    }
    50% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    62% {
      transform: rotate(-15deg);
      -ms-transform: rotate(-15deg); /* IE 9 */
      -moz-transform: rotate(-15deg); /* Firefox */
      -webkit-transform: rotate(-15deg); /* Safari and Chrome */
      -o-transform: rotate(-15deg); /* Opera */
    }
    75% {
      transform: rotate(-30deg);
      -ms-transform: rotate(-30deg); /* IE 9 */
      -moz-transform: rotate(-30deg); /* Firefox */
      -webkit-transform: rotate(-30deg); /* Safari and Chrome */
      -o-transform: rotate(-30deg); /* Opera */
    }
    88% {
      transform: rotate(-20deg);
      -ms-transform: rotate(-20deg); /* IE 9 */
      -moz-transform: rotate(-20deg); /* Firefox */
      -webkit-transform: rotate(-20deg); /* Safari and Chrome */
      -o-transform: rotate(-20deg); /* Opera */
    }
    100% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    12% {
      transform: rotate(15deg);
      -ms-transform: rotate(15deg); /* IE 9 */
      -moz-transform: rotate(15deg); /* Firefox */
      -webkit-transform: rotate(15deg); /* Safari and Chrome */
      -o-transform: rotate(15deg); /* Opera */
    }
    25% {
      transform: rotate(30deg);
      -ms-transform: rotate(30deg); /* IE 9 */
      -moz-transform: rotate(30deg); /* Firefox */
      -webkit-transform: rotate(30deg); /* Safari and Chrome */
      -o-transform: rotate(30deg); /* Opera */
    }
    38% {
      transform: rotate(20deg);
      -ms-transform: rotate(20deg); /* IE 9 */
      -moz-transform: rotate(20deg); /* Firefox */
      -webkit-transform: rotate(20deg); /* Safari and Chrome */
      -o-transform: rotate(20deg); /* Opera */
    }
    50% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    62% {
      transform: rotate(-15deg);
      -ms-transform: rotate(-15deg); /* IE 9 */
      -moz-transform: rotate(-15deg); /* Firefox */
      -webkit-transform: rotate(-15deg); /* Safari and Chrome */
      -o-transform: rotate(-15deg); /* Opera */
    }
    75% {
      transform: rotate(-30deg);
      -ms-transform: rotate(-30deg); /* IE 9 */
      -moz-transform: rotate(-30deg); /* Firefox */
      -webkit-transform: rotate(-30deg); /* Safari and Chrome */
      -o-transform: rotate(-30deg); /* Opera */
    }
    88% {
      transform: rotate(-20deg);
      -ms-transform: rotate(-20deg); /* IE 9 */
      -moz-transform: rotate(-20deg); /* Firefox */
      -webkit-transform: rotate(-20deg); /* Safari and Chrome */
      -o-transform: rotate(-20deg); /* Opera */
    }
    100% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }

  }

  @-webkit-keyframes myfirst /* Safari and Chrome */
  {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    12% {
      transform: rotate(15deg);
      -ms-transform: rotate(15deg); /* IE 9 */
      -moz-transform: rotate(15deg); /* Firefox */
      -webkit-transform: rotate(15deg); /* Safari and Chrome */
      -o-transform: rotate(15deg); /* Opera */
    }
    25% {
      transform: rotate(30deg);
      -ms-transform: rotate(30deg); /* IE 9 */
      -moz-transform: rotate(30deg); /* Firefox */
      -webkit-transform: rotate(30deg); /* Safari and Chrome */
      -o-transform: rotate(30deg); /* Opera */
    }
    38% {
      transform: rotate(20deg);
      -ms-transform: rotate(20deg); /* IE 9 */
      -moz-transform: rotate(20deg); /* Firefox */
      -webkit-transform: rotate(20deg); /* Safari and Chrome */
      -o-transform: rotate(20deg); /* Opera */
    }
    50% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    62% {
      transform: rotate(-15deg);
      -ms-transform: rotate(-15deg); /* IE 9 */
      -moz-transform: rotate(-15deg); /* Firefox */
      -webkit-transform: rotate(-15deg); /* Safari and Chrome */
      -o-transform: rotate(-15deg); /* Opera */
    }
    75% {
      transform: rotate(-30deg);
      -ms-transform: rotate(-30deg); /* IE 9 */
      -moz-transform: rotate(-30deg); /* Firefox */
      -webkit-transform: rotate(-30deg); /* Safari and Chrome */
      -o-transform: rotate(-30deg); /* Opera */
    }
    88% {
      transform: rotate(-20deg);
      -ms-transform: rotate(-20deg); /* IE 9 */
      -moz-transform: rotate(-20deg); /* Firefox */
      -webkit-transform: rotate(-20deg); /* Safari and Chrome */
      -o-transform: rotate(-20deg); /* Opera */
    }
    100% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }

  }

  @-o-keyframes myfirst /* Opera */
  {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    12% {
      transform: rotate(15deg);
      -ms-transform: rotate(15deg); /* IE 9 */
      -moz-transform: rotate(15deg); /* Firefox */
      -webkit-transform: rotate(15deg); /* Safari and Chrome */
      -o-transform: rotate(15deg); /* Opera */
    }
    25% {
      transform: rotate(30deg);
      -ms-transform: rotate(30deg); /* IE 9 */
      -moz-transform: rotate(30deg); /* Firefox */
      -webkit-transform: rotate(30deg); /* Safari and Chrome */
      -o-transform: rotate(30deg); /* Opera */
    }
    38% {
      transform: rotate(20deg);
      -ms-transform: rotate(20deg); /* IE 9 */
      -moz-transform: rotate(20deg); /* Firefox */
      -webkit-transform: rotate(20deg); /* Safari and Chrome */
      -o-transform: rotate(20deg); /* Opera */
    }
    50% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }
    62% {
      transform: rotate(-15deg);
      -ms-transform: rotate(-15deg); /* IE 9 */
      -moz-transform: rotate(-15deg); /* Firefox */
      -webkit-transform: rotate(-15deg); /* Safari and Chrome */
      -o-transform: rotate(-15deg); /* Opera */
    }
    75% {
      transform: rotate(-30deg);
      -ms-transform: rotate(-30deg); /* IE 9 */
      -moz-transform: rotate(-30deg); /* Firefox */
      -webkit-transform: rotate(-30deg); /* Safari and Chrome */
      -o-transform: rotate(-30deg); /* Opera */
    }
    88% {
      transform: rotate(-20deg);
      -ms-transform: rotate(-20deg); /* IE 9 */
      -moz-transform: rotate(-20deg); /* Firefox */
      -webkit-transform: rotate(-20deg); /* Safari and Chrome */
      -o-transform: rotate(-20deg); /* Opera */
    }
    100% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg); /* IE 9 */
      -moz-transform: rotate(0deg); /* Firefox */
      -webkit-transform: rotate(0deg); /* Safari and Chrome */
      -o-transform: rotate(0deg); /* Opera */
    }

  }
</style>
