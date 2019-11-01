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
            href="https://fund.htsec.com/"
          >基金评价系统
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
        开发有风险，入坑需谨慎 中国开发监督管理委员会核准走路自带音响网上开发委托业务
        <br>
        ©2015-{{ year }} 走路自带音响 版权所有 皖ICP备18009089号.
      </div>

      <div class="links-img" />
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
      width: 600px;
      color: #8c8c8c;
      font-size: 13px;
      line-height: 20px;
      float: left;
      margin-left: 90px;
      margin-top: 23px;
    }

    .links-img {
      width: 167px;
      height: 20px;
      margin-top: 33px;
      float: right;
      background: url("../../assets/images/links.jpeg");
    }
  }
</style>