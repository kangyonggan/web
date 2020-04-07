<template>
  <div
    class="multi-slider el-slider"
    ref="slider"
  >
    <div class="el-slider__runway">
      <div
        v-for="(item, index) in items"
        :key="index"
      >
        <el-tooltip
          v-if="item.enable"
          :content="item.label + '：' + item.value + '%'"
          placement="top"
        >
          <div
            class="el-slider__bar"
            :style="'width: ' + calcBgWidth(index) + '%; left: ' + calcLeft(index) + '%;background:' + item.background"
          />
        </el-tooltip>

        <el-tooltip
          ref="tooltip"
          v-if="calcDisp(item, index)"
          :content="getBtnTip(index)"
          placement="top"
        >
          <div
            @mousedown="onDragStart($event, index)"
            @mousemove="onDragging"
            @mouseup="onDragEnd"
            class="el-slider__button-wrapper"
            :style="'left:' + calcLeft(index) + '%;'"
          >
            <el-tooltip
              ref="tooltip"
              v-if="calcDisp(item, index)"
              :content="getBtnTip(index)"
              placement="top"
            >
              <div
                class="el-tooltip el-slider__button"
              />
            </el-tooltip>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                isDragging: false,
                oldX: 0,
                positionX: 0,
                currentIndex: -1
            };
        },
        methods: {
            calcDisp(item, index) {
                if (!item.enable || index === 0) {
                    return false;
                }
                for (let i = 0; i < index; i++) {
                    if (this.items[i].enable) {
                        return true;
                    }
                }
                return false;
            },
            calcBgWidth(index) {
                if (this.currentIndex !== -1) {
                    let changeVal = (this.positionX - this.oldX) * 100 / 500;
                    if (index === this.currentIndex - 1) {
                        return this.items[index].value + changeVal;
                    } else if (index === this.currentIndex) {
                        return this.items[index].value - changeVal;
                    }
                }

                return this.items[index].value;
            },
            calcLeft(index) {
                let left = 0;
                for (let i = 0; i < index; i++) {
                    left += this.items[i].value;
                }
                if (this.currentIndex === index) {
                    let changeVal = (this.positionX - this.oldX) * 100 / 500;
                    return left += changeVal;
                }

                return left;
            },
            getBtnTip(index) {
                if (this.currentIndex === index) {
                    let changeVal = (this.positionX - this.oldX) * 100 / 500;
                    changeVal = Math.round(changeVal);
                    return this.items[index - 1].label + '：' + (this.items[index - 1].value + changeVal) + '% / ' + this.items[index].label + '：' + (this.items[index].value - changeVal) + '%';
                }
                return this.items[index - 1].label + '：' + this.items[index - 1].value + '% / ' + this.items[index].label + '：' + this.items[index].value + '%';
            },
            onDragStart(event, index) {
                this.positionX = event.clientX;
                this.isDragging = true;
                this.currentIndex = index;
                this.oldX = event.clientX;
                window.addEventListener('mousemove', this.onDragging);
                window.addEventListener('mouseup', this.onDragEnd);
            },
            onDragging(event) {
                if (this.isDragging) {
                    this.positionX = event.clientX;
                }
            },
            onDragEnd() {
                window.removeEventListener('mousemove', this.onDragging);
                window.removeEventListener('mouseup', this.onDragEnd);

                let changeVal = (this.positionX - this.oldX) * 100 / 500;
                changeVal = Math.round(changeVal);
                if (changeVal > 0 && changeVal < this.items[this.currentIndex].value ||
                    (changeVal < 0 && -changeVal < this.items[this.currentIndex - 1].value)) {
                    this.items[this.currentIndex - 1].value += changeVal;
                    this.items[this.currentIndex].value -= changeVal;
                }

                this.isDragging = false;
                this.currentIndex = -1;
                this.oldX = 0;
                this.positionX = 0;
            }
        }
    };
</script>

<style scoped lang="scss">
  .multi-slider {
    width: 500px;

    .el-slider__button-wrapper {
      outline: none;
    }

    .el-slider__button {
      outline: none;
    }
  }
</style>