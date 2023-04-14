<template>
  <view>
    <imgUpload />
  </view>
</template>

<script>
import imgUpload from '@/component/imgUpload.vue'
import { loginCheck } from '@/utils/publicMethods'
export default {
  data () {
    return {

    };
  },
  onShow () {
    if (!this.$store.state.loginInfo.isLogin) {
      loginCheck()
      return
    }
  },
  components: { imgUpload }
}
</script>

<style lang="scss">

</style>