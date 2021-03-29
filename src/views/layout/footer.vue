<template>
  <div class="footer">
    <div class="content">
      <div class="friend-link">
        友情链接
      </div>
      <ul class="friend-links">
        <li>
          <a
            target="_blank"
            href="https://ckfksc.com/index"
          >疯狂赛车
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="http://ckssss.com/"
          >生生世世
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://houbb.github.io/"
          >侯宾宾
          </a>
        </li>
      </ul>

      <div class="author-info">
        ©2015-{{ year }}
        <router-link to="/about">
          康永敢
        </router-link>
        版权所有 皖ICP备18009089号.
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                year: new Date().getFullYear()
            };
        }
    };
</script>

<style scoped lang="scss">
  .footer {
    min-width: 1240px;
    height: 87px;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    clear: both;

    .friend-link {
      float: left;
      height: 87px;
      line-height: 87px;
      font-weight: bold;
      font-size: 14px;
    }

    .friend-links {
      float: left;
      list-style: none;
      margin: 0 0 0 30px;
      padding: 0;

      li {
        float: left;
        margin-left: 15px;
        height: 87px;
        line-height: 87px;
        text-align: center;

        a {
          text-decoration: none;
          font-size: 13px;
          color: #1677d9;
        }
      }
    }

    .author-info {
      color: #8c8c8c;
      font-size: 13px;
      height: 87px;
      line-height: 87px;
      float: right;

      a {
        color: #8c8c8c;
        font-size: 13px;
      }
    }
  }
</style>