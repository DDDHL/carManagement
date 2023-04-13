<template>
  <view class="content">
    <view class="header">
      <view class="avatar">
        <image class="logo" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
      </view>
      <view class="name">
        等天黑
      </view>
    </view>
    <view class="center">

    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  onShow () {
    uni.showLoading({
      title: '加载中',
      mask: true
    });
    uni.hideLoading();
  },
  onPullDownRefresh () {
    uni.stopPullDownRefresh();
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;

  .header {
    width: 100vw;
    height: 35vh;
    background-color: #3c9cff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .avatar>image {
      margin-top: -5vh;
      width: 10vh;
      height: 10vh;
      border-radius: 10vh;
    }

    .name {
      margin-top: 1vh;
      font-size: 2vh;
    }
  }

  .center {
    width: 100vw;
    height: 60vh;
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    margin-top: -5vh;
    background-color: #fff;

    .avatar {}
  }
}
</style>