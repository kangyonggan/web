<template>
  <el-card class="tools">
    <el-card
      v-for="(tool, index) in tools"
      :key="index"
    >
      <img
        :src="tool.cover"
        @click="detail(tool.name)"
      >
    </el-card>
  </el-card>
</template>

<script>
    export default {
        data() {
            return {
                tools: [
                    {
                        name: 'ticket',
                        cover: require('../../assets/images/tools/ticket.jpg')
                    },
                    {
                        name: 'imgBed',
                        cover: require('../../assets/images/tools/imgBed.jpg')
                    },
                    {
                        name: 'json',
                        cover: require('../../assets/images/tools/json.jpg')
                    },
                    {
                        name: 'wuba',
                        cover: require('../../assets/images/tools/wuba.jpg')
                    },
                    {
                        name: 'idNo',
                        cover: require('../../assets/images/tools/idNo.jpg')
                    }
                ]
            };
        },
        methods: {
            detail(name) {
                this.$router.push({
                    path: '/tools/' + name
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .tools {
    .el-card {
      float: left;
      width: 380px;
      height: 290px;
      margin: 0 8px 30px 8px;
      text-align: center;

      img {
        width: 340px;
        height: 255px;
        cursor: pointer;
      }
    }

    .el-card:hover {
      border: 1px dashed #f68136;
    }
  }
</style>