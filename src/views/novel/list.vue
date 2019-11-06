<template>
  <div class="content">
    <base-search :active-tab="1" />

    <el-col>
      <el-card
        class="novel-info"
        v-loading="loading"
      >
        <img :src="novel.cover">

        <div class="right">
          <div class="name">
            {{ novel.name }}
          </div>

          <div class="info">
            <div class="item">
              作者：{{ novel.author }}
            </div>
            <div class="item">
              最新章节：
              <router-link
                :to="'/novel/' + novel.id + '/' + lastSection.id"
                v-if="lastSection"
              >
                {{ lastSection.title }}
              </router-link>
              <span v-else>无</span>
            </div>
            <div class="item">
              来源：
              <a
                target="_blank"
                v-if="novelSource.id"
                :href="novelSource.baseUrl + novelSource.novelUrl.replace('@', novel.code)"
              >{{ novelSource.baseUrl + novelSource.novelUrl.replace('@', novel.code) }}</a>
            </div>
            <div class="item">
              最后更新：
              <span v-if="lastSection">{{ util.formatTimestamp(lastSection.updatedTime) }}</span>
              <span v-else>无</span>
            </div>
          </div>

          <div class="summary">
            {{ novel.summary }}
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                novel: {},
                lastSection: undefined,
                novelSource: {}
            };
        },
        methods: {
            loadData() {
                this.loading = true;
                this.axios.get('novel/' + this.$route.params.id).then(data => {
                    this.novel = data.novel;
                    this.lastSection = data.lastSection;
                    this.novelSource = data.novelSource;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.loadData();
        }
    };
</script>

<style scoped lang="scss">
  .novel-info {
    height: 200px;

    img {
      float: left;
      width: 128px;
      height: 158px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(221, 221, 221);
      border-image: initial;
      padding: 1px;
    }

    .right {
      float: left;
      width: 1040px;
      margin-left: 20px;

      .name {
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      .info {
        margin-top: 10px;
        font-size: 14px;
        height: 56px;

        .item {
          float: left;
          width: 500px;
          line-height: 25px;
        }
      }

      .summary {
        text-indent: 30px;
        border-top: 1px solid #d5d5d5;
        padding-top: 10px;
        font-size: 13px;
        color: #595959;
        height: 57px;
        overflow: hidden;
      }
    }
  }
</style>