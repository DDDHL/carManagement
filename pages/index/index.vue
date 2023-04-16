<template>
  <view class="content">
    <view class="input">
      <u-input v-model="searchKey" placeholder="搜索车牌号" @change="search" @confirm="getData">
        <template #suffix>
          <u-icon size="30" name="search" @click="getData"></u-icon>
        </template>
      </u-input>
    </view>
    <view class="listItem" v-for="item,index in list" :key="index" @click="clickItem(item)">
      <view class="pic">
        <image class="logo" :src="item.imgUrls[0]" mode="aspectFill"></image>
      </view>
      <view class="text">
        <view class="header">
          <u-tag text="车牌号" size="mini"></u-tag>
          <view> &nbsp;{{`${item.license}`}}</view>
        </view>
        <view class="info">
          <u-tag text="公里数" size="mini" type="warning"></u-tag>
          <view> &nbsp;{{`${item.km}km`}}</view>
        </view>
      </view>
    </view>
    <u-empty :show="!list.length" mode="list" icon="/static/dataEmpty.png" text='车辆信息为空' textSize='2vh'
      marginTop="25vh" />
  </view>
</template>

<script>
import store from '@/store/index.js';
export default {
  data () {
    return {
      title: 'Hello',
      list: [],
      searchKey: ''
    }
  },
  onShow () {
    uni.showLoading({
      title: '加载中',
      mask: true
    });
    this.getData()
  },
  onPullDownRefresh () {
    this.getData()
  },
  methods: {
    search () {
      if (!this.searchKey) this.getData()
    },
    async getData () {
      const db = uniCloud.database()
      let res
      if (this.searchKey) {
        res = await db.collection('carInfo').where(`license=="${this.searchKey}"`).get()
      } else {
        res = await db.collection('carInfo').get()
      }
      this.list = res.result.data
      uni.hideLoading();
      uni.stopPullDownRefresh();
    },
    clickItem (item) {
      this.$store.state.clickItem = item
      uni.navigateTo({
        url: '/pages/carInfo/carInfo'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;

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
        width: 14vh;
        height: 14vh;
        border-radius: 1vh;
      }
    }

    .text {
      flex-grow: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 2vw;

      .header,
      .info {
        display: flex;
      }
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