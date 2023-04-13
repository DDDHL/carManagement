<template>
  <view class="content">
    <view class="listItem" v-for="item in 10" :key="item" @click="clickItem">
      <view class="pic">
        <image class="logo" src="/static/logo.png"></image>
      </view>
      <view class="text">
        <view class="header">
          <u-tag text="车牌号" size="mini"></u-tag> 粤A114514
        </view>
        <view class="info">
          <u-tag text="公里数" size="mini" type="warning"></u-tag> 10KM
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello'
    }
  },
  onLoad () {

  },
  methods: {
    clickItem () {
      uni.navigateTo({
        url: '/pages/carInfo/carInfo?id=114514'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;

  .listItem {
    display: flex;
    margin-top: 1vh;
    padding-left: 2vw;

    .pic {
      flex-grow: 0.1;
      display: flex;
      align-items: center;
      justify-content: center;

      >image {
        width: 13vh;
        height: 13vh;
        border-radius: 2vh;
      }
    }

    .text {
      flex-grow: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 2vw;
    }
  }

  .listItem:active {
    background: #f7f7f7;
  }

  &::after {
    content: '';
    display: block;
    width: 100vw;
    height: 7vh;
  }
}
</style>