<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";

::v-deep .u-upload {
  flex: none !important;
}

::v-deep .u-modal__content__text {
  flex: none !important;
}
</style>