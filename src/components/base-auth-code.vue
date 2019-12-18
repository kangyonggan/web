<template>
  <el-dialog
    title="纯前端验证"
    :visible.sync="dialogVisible"
    width="360px"
    destroy-on-close
  >
    <div id="jigsaw">
      <div id="captcha" />
    </div>
  </el-dialog>
</template>

<script>
    import '../libs/jigsaw.min';

    export default {
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            show() {
                this.dialogVisible = true;
                this.$nextTick(function () {
                    let that = this;
                    window.jigsaw.init({
                        el: document.getElementById('jigsaw'),
                        onSuccess: function () {
                            that.dialogVisible = false;
                            that.$emit('success');
                        }
                    });
                });
            }
        }
    };
</script>

<style lang="scss">
</style>