<template>
  <div style="font-size: 13px;text-align: center">
    <span
      v-if="num === '有'"
      style="font-weight: 400;color: #26a306"
    >
      有
    </span>
    <span
      v-else-if="num === '无'"
      style="font-weight: 100;color: #999"
    >
      无
    </span>
    <span
      v-else-if="num === ''"
      style="font-weight: 100;color: #bbb;font-family: Tahoma,'宋体';"
    >
      --
    </span>
    <span
      v-else
      style="color:#333"
    >
      {{ num }}
    </span>
  </div>
</template>

<script>
    export default {
        props: {
            num: {
                required: false,
                type: String,
                default: ''
            }
        }
    };
</script>
