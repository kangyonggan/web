import Vue from 'vue';
import {Message} from 'element-ui';

Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.warning = warning;

/**
 * 消息队列。用于过滤重复的message
 *
 * @type {Array}
 */
const messageQueue = [];

/**
 * 成功消息
 *
 * @param msg
 */
function success(msg) {
    message('success', msg);
}

/**
 * 警告消息
 *
 * @param msg
 */
function warning(msg) {
    message('warning', msg);
}

/**
 * 错误消息
 *
 * @param msg
 */
function error(msg) {
    message('error', msg);
}

/**
 * 消息
 *
 * @param type
 * @param msg
 */
function message(type, msg) {
    // 消息去重
    if (messageQueue.includes(msg)) {
        return;
    }
    // 消息放入队列
    messageQueue.push(msg);
    Message({
        showClose: true,
        message: msg,
        type: type,
        onClose: function () {
            // 从队列移除消息
            messageQueue.splice(messageQueue.indexOf(msg), 1);
        }
    });
}

Vue.directive('skeleton', {
    update: function (el, binding, vnode) {
        let oldValue = binding.oldValue;
        let value = binding.value;
        if (typeof value !== 'object') {
            value = {loading: value};
            oldValue = {loading: oldValue};
        }

        // 从false变成true的画骨架
        if (!oldValue.loading && value.loading) {
            // el-table（自识别：宽度、列数、行高。可配置：行数、圆角、背景色）
            if ('el-table' === vnode.componentOptions.tag) {
                // 隐藏空数据提示
                let totalWidth = el.clientWidth;
                let emptyText = el.querySelector('.el-table__empty-block');
                if (emptyText) {
                    emptyText.style.display = 'none';
                }

                // 读取每一列的宽度
                let colsWidth = [];
                let usedWidth = 0;
                let freeCount = 0;
                let cols = vnode.componentOptions.children;
                for (let i = 0; i < cols.length; i++) {
                    colsWidth.push(cols[i].componentOptions.propsData.width * 1);
                    if (cols[i].componentOptions.propsData.width) {
                        usedWidth += cols[i].componentOptions.propsData.width * 1;
                    } else {
                        freeCount++;
                    }
                }

                // 没指定宽度的列宽 = (总宽 - 已指定的总宽) / 未指定宽度的个数
                let autoWidth = (totalWidth - usedWidth) / freeCount;
                for (let i = 0; i < colsWidth.length; i++) {
                    if (!colsWidth[i]) {
                        colsWidth[i] = autoWidth;
                    }
                }

                // 在tbody中画骨架
                let tbody = el.querySelector('.el-table__body tbody');
                // tr行数
                let rows = value.rows || 5;
                // 骨架屏背景色
                let bg = value.bg || '#eaebed';
                // 圆角
                let radius = value.radius || 5;
                for (let i = 0; i < rows; i++) {
                    let tr = document.createElement('tr');
                    tr.className = 'skeleton-tr el-table__row';
                    for (let j = 0; j < colsWidth.length; j++) {
                        let td = document.createElement('td');
                        let cell = document.createElement('div');
                        cell.className = 'cell';
                        let div = document.createElement('div');
                        div.style = 'background: ' + bg + ';border-radius: ' + radius + 'px;text-indent:-999px;width:' + (Math.random() * 50 + 30) + '%;';
                        div.appendChild(document.createTextNode('.'));
                        cell.appendChild(div);
                        td.appendChild(cell);
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            }
        }
        // 从true到false删除骨架
        if (oldValue.loading && !value.loading) {
            // el-table
            if ('el-table' === vnode.componentOptions.tag) {
                let allSkeletons = el.querySelectorAll('.skeleton-tr');
                let tbody = el.querySelector('.el-table__body tbody');
                for (let i = 0; i < allSkeletons.length; i++) {
                    tbody.removeChild(allSkeletons[i]);
                }
                let emptyText = el.querySelector('.el-table__empty-block');
                if (emptyText) {
                    emptyText.style.display = 'block';
                }
            }
        }
    }
});