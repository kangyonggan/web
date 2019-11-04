<template>
  <el-date-picker
    :size="size"
    :value="value"
    @input="$emit('input', $event)"
    type="daterange"
    value-format="yyyy-MM-dd"
    unlink-panels
    :editable="false"
    range-separator="至"
    :picker-options="pickerOptions"
    :start-placeholder="startPlaceholder ? startPlaceholder : '请选择开始日期'"
    :end-placeholder="endPlaceholder ? endPlaceholder : '请选择结束日期'"
  />
</template>

<script>
    export default {
        props: {
            value: {
                required: false,
                type: Array,
                default: function () {
                    return [];
                }
            },
            size: {
                required: false,
                type: String,
                default: undefined
            },
            startPlaceholder: {
                required: false,
                type: String,
                default: undefined
            },
            endPlaceholder: {
                required: false,
                type: String,
                default: undefined
            }
        },
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        }
    };
</script>