<template>
  <div>
    <div class="search">
      <ul class="tabs">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          @click="clickTab"
          :class="{'active':index===currIndex}"
        >
          {{ tab.text }}
        </li>
      </ul>

      <div class="form">
        <img
          src="../assets/images/search-top-icon.png"
          :style="'left:' + imgLeft + 'px'"
        >
        <div
          class="input"
          :class="{preResult: showTips}"
        >
          <i class="el-icon-search" />
          <input
            id="key"
            name="key"
            v-model="key"
            autocomplete="off"
            @keyup.enter="goDetail"
            @input="search"
            @keydown="keydown"
            @click="clickInput"
          >
          <label
            :class="'placeholder ' + (pushRight ? 'placeholder-right' : '')"
            for="key"
          >
            {{ placeholder }}
          </label>
          <div
            class="tips"
            v-show="showTips"
          >
            <ul
              v-if="currIndex===0"
              v-loading="isSearching"
            >
              <li
                :class="{active: cursorIndex===index}"
                v-for="(item, index) in resultList"
                :key="index"
                @click="selectItem($event, item)"
                v-html="formatResultKey(item.title)"
              />
            </ul>
            <ul
              v-if="currIndex===1"
              v-loading="isSearching"
            >
              <li
                :class="{active: cursorIndex===index}"
                v-for="(item, index) in resultList"
                :key="index"
                @click="selectItem($event, item)"
              >
                <div
                  class="pre-name"
                  v-html="formatResultKey(item.name)"
                >
                  {{ item.name }}
                </div>
                <div
                  class="pre-author"
                  v-html="formatResultKey(item.author)"
                />
              </li>
            </ul>
            <div
              class="empty-result"
              v-show="!resultList.length && !isSearching"
            >
              没有匹配的结果
            </div>
          </div>
        </div>
      </div>

      <div
        class="notice"
        @mouseenter="stopDjt"
        @mouseleave="startDjt"
      >
        <img src="../assets/images/notic.png">
        <div class="djt">
          {{ djt }}
        </div>
      </div>
    </div>
    <div style="clear: both;height: 30px;" />
  </div>
</template>

<script>
    import djt from '../libs/djt';

    function debounce(fn, delay) {
        let timer;
        return function () {
            let args = arguments;
            let val = args[0].target.value;
            if (val && val.length && val.length < 45) {
                this.pushRight = true;
            } else {
                this.pushRight = false;
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    export default {
        props: {
            activeTab: {
                required: false,
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                tabs: [{
                    text: '文 章',
                    url: 'article/search'
                }, {
                    text: '书 籍',
                    url: 'novel/search'
                }],
                imgLeft: 25,
                currIndex: 0,
                placeholder: '请输入需要查找的文章标题，支持模糊搜索',
                key: '',
                keyId: 0,
                resultList: [],
                isSearching: false,
                showTips: false,
                cursorIndex: -1,
                pushRight: false,
                djt: '',
                djtInterval: null
            };
        },
        mounted: function () {
            this.showTips = false;
            this.imgLeft = 25 + this.activeTab * 80;
            this.currIndex = this.activeTab;

            if (this.currIndex === 0) {
                this.placeholder = '请输入需要查找的文章标题，支持模糊搜索';
            } else if (this.currIndex === 1) {
                this.placeholder = '请输入需要查找的书籍名称或作者，支持模糊搜索';
            }

            let that = this;
            // 点击空白区域关闭
            document.onclick = function (e) {
                if (e.target.getAttribute('name') !== 'key') {
                    that.showTips = false;
                }
            };

            this.djt = djt.random();
            this.startDjt();
        },
        methods: {
            startDjt: function () {
                this.stopDjt();
                let that = this;
                this.djtInterval = setInterval(function () {
                    that.djt = djt.random();
                }, 2000);
            },
            stopDjt: function () {
                if (this.djtInterval) {
                    clearInterval(this.djtInterval);
                }
                this.djtInterval = null;
            },
            /**
             * 格式化结果集，高亮key
             */
            formatResultKey: function (text) {
                let index = text.toLowerCase().indexOf(this.key.toLowerCase());
                if (index === -1) {
                    return text;
                }
                return text.substring(0, index) + '<span style="color: #e74e19">' + text.substring(index, index + this.key.length) + '</span>' + text.substring(index + this.key.length);
            },
            /**
             * 点击Tab页
             *
             * @param e
             */
            clickTab: function (e) {
                this.showTips = false;
                this.key = '';
                this.keyId = 0;
                this.resultList = [];
                let parent = e.target.parentNode;

                let currIndex = 0;
                for (let i = 0; i < parent.children.length; i++) {
                    if (parent.children[i] === e.target) {
                        currIndex = i;
                    }
                    parent.children[i].setAttribute('class', '');
                }

                if (currIndex === 0) {
                    this.placeholder = '请输入需要查找的文章标题，支持模糊搜索';
                } else if (currIndex === 1) {
                    this.placeholder = '请输入需要查找的书籍名称或作者，支持模糊搜索';
                }
                this.imgLeft = 25 + currIndex * 80;
                e.target.setAttribute('class', 'active');

                this.currIndex = currIndex;
            },

            /**
             * 去详情界面
             */
            goDetail: function () {
                if (!this.keyId) {
                    return;
                }
                this.showTips = false;
                if (this.currIndex === 0) {
                    // 搜索文章
                    this.$router.push({
                        path: '/article/' + this.keyId
                    });
                } else {
                    // 搜索书籍
                    this.$router.push({
                        path: '/novel/' + this.keyId,
                    });
                }
            },
            /**
             * 点击输入框，显示结果框（有结果的情况下）
             */
            clickInput: function () {
                if (!this.showTips && this.key) {
                    this.showTips = true;
                }
            },
            /**
             * 搜索（防抖）
             */
            search: debounce(function (e) {
                this.resultList = [];
                if (e.target.value) {
                    this.showTips = true;
                    this.isSearching = true;
                    this.cursorIndex = -1;
                    if (this.currIndex === 0) {
                        // 搜索文章
                        this.axios.get('article/search?key=' + e.target.value).then(data => {
                            this.resultList = data.list;
                            this.isSearching = false;
                        }).catch(res => {
                            this.error(res.respMsg);
                            this.isSearching = false;
                        });
                    } else {
                        // 搜索书籍
                        this.axios.get('novel/search?key=' + e.target.value).then(data => {
                            this.resultList = data.list;
                            this.isSearching = false;
                        }).catch(res => {
                            this.error(res.respMsg);
                            this.isSearching = false;
                        });
                    }
                } else {
                    this.showTips = false;
                }
            }, 500),
            /**
             * 点击结果进行跳转
             */
            selectItem: function (e, item) {
                this.key = this.currIndex === 0 ? item.title : item.name;
                this.keyId = item.id;
                this.showTips = false;
                this.goDetail();
            },
            /**
             * 监听 上、下 方向键
             * @param e
             * @returns {boolean}
             */
            keydown: function (e) {
                this.keyId = 0;
                if (this.showTips) {
                    if (e.keyCode === 38) {
                        // 上
                        this.cursorIndex = this.cursorIndex - 1;
                        if (this.cursorIndex < 0) {
                            this.cursorIndex = this.resultList.length - 1;
                        }
                    } else if (e.keyCode === 40) {
                        // 下
                        this.cursorIndex = this.cursorIndex + 1;
                        if (this.cursorIndex >= this.resultList.length) {
                            this.cursorIndex = 0;
                        }
                    }

                    if (this.cursorIndex >= 0 && this.resultList.length > this.cursorIndex) {
                        this.key = this.currIndex === 0 ? this.resultList[this.cursorIndex].title : this.resultList[this.cursorIndex].name;
                        this.keyId = this.resultList[this.cursorIndex].id;
                    }
                }

                return true;
            }
        }
    };
</script>

<style scoped lang="scss">
  .search {
    width: 1000px;
    height: 134px;
    margin: 0 auto;
  }

  .tabs {
    display: block;
    list-style: none;
    height: 40px;
    padding: 0;
    margin: 0;

    li {
      float: left;
      width: 70px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      color: #303133;
      font-size: 14px;
      margin-left: 10px;
    }

    li.active {
      color: #1677d9;
    }
  }

  .form {
    position: relative;
    margin-top: 10px;

    img {
      position: absolute;
      top: -15px;
      z-index: 1000;
    }

    .preResult {
      border-bottom: 1px solid #dedede !important;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    .input {
      position: relative;
      width: 960px;
      height: 45px;
      border: 2px solid #dedede;
      border-radius: 5px;
      background: #fff;

      .el-icon-search {
        color: #bdc4d5;
        font-size: 24px;
        margin-top: 10px;
      }

      .placeholder {
        z-index: 1;
        position: absolute;
        top: 13px;
        left: 66px;
        font-size: 13px;
        color: #ccc;
        cursor: text;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
      }

      .placeholder-right {
        right: 10px;
        left: auto;
      }

      .tips {
        position: absolute;
        left: -2px;
        top: 46px;
        right: -2px;
        padding: 10px 20px 20px 20px;
        box-sizing: border-box;
        border: 2px solid #dedede;
        border-top: 0;
        background: #fff;
        z-index: 9999;
        max-height: 450px;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .empty-result {
          height: 150px;
          text-align: center;
          color: #999;
          font-size: 15px;
          line-height: 150px;
        }

        li {
          padding: 3px 10px;
          height: 30px;
          line-height: 25px;
          font-size: 14px;
          color: #888;
          cursor: pointer;

          .pre-name {
            float: left;
          }

          .pre-author {
            float: right;
            color: #999;
          }
        }

        li:hover {
          background: #f5f5f5;
        }

        li.active {
          background: #f5f5f5;
          color: #e74e19;
        }
      }

      i {
        margin: 8px 15px 0 20px;
        float: left;
      }

      input {
        position: absolute;
        left: 60px;
        top: 5px;
        outline: none;
        width: 888px;
        height: 33px;
        border: none;
        color: #595959;
      }
    }
  }

  .notice {
    width: 924px;
    margin-top: 10px;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    color: #ff863c;
    background: #f6e6dd;
    border-radius: 4px;

    img {
      float: left;
      margin-top: 14px;
    }

    .djt {
      display: inline-block;
      margin-left: 15px;
      font-size: 14px;
      height: 40px;
      width: 894px;
      overflow: hidden;
    }
  }
</style>
