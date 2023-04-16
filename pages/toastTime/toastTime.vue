<template>
  <view class="content">
    <u-swipe-action>
      <u-swipe-action-item :options="options" @click="deleteTime(item.id)"
        v-for="item in $store.state.loginInfo.info.carId" :key="item.id">
        <view class="swipe-action u-border-top u-border-bottom">
          <view class="swipe-action__content">
            <text class="swipe-action__content__text">{{`${item.license} ，时间：${item.time}`}}</text>
          </view>
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
    <u-empty :show="!$store.state.loginInfo.info.carId.length" mode="list" icon="/static/listEmpty.png" text='定时任务为空'
      textSize='2vh' marginTop="25vh" />
  </view>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        text: '删除'
      }],
    };
  },
  methods: {
    async deleteTime (e) {
      uni.showLoading({
        title: '执行中',
        mask: true
      })
      let arr = this.$store.state.loginInfo.info.carId
      arr.map((item, index) => {
        if (item.id == e) {
          arr.splice(index, 1)
          this.$store.state.loginInfo.info.carId = arr
        }
      })
      const db = uniCloud.database();
      let res = await db.collection('userInfo').where(`
      openId=="${this.$store.state.loginInfo.info.openId}"`).update({
        carId: arr
      })
      console.log(res)
      if (res.result.errCode == 0) {
        uni.hideLoading()
        uni.showToast({
          title: '删除成功',
          duration: 1500,
        })
      } else {
        uni.hideLoading()
        uni.showToast({
          title: '删除失败',
          duration: 1500,
          icon: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;

  .u-page {
    padding: 0;
  }

  .u-demo-block__title {
    padding: 10px 0 2px 15px;
  }

  .swipe-action {
    &__content {
      padding: 25rpx 0;

      &__text {
        font-size: 15px;
        color: $u-main-color;
        padding-left: 30rpx;
      }
    }
  }
}
</style>