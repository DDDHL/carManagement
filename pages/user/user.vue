<template>
  <view class="content">
    <view class="header">
      <view class="avatar">
        <image class="logo" :src="$store.state.loginInfo.info.avatar" mode="aspectFill"></image>
      </view>
      <view class="name">
        {{$store.state.loginInfo.info.userName}}
      </view>
    </view>
    <view class="center">
      <view class="btn" v-if="!$store.state.loginInfo.isLogin">
        <u-button type="success" text="登录" @click="login"></u-button>
      </view>
      <view class="grid" v-else>
        <u-grid :border="false" col="2" border @click="clickIcon">
          <u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
            <u-icon :customStyle="{paddingTop:60+'rpx'}" :name="listItem.name" :size="33"></u-icon>
            <text class="grid-text">{{listItem.title}}</text>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        name: 'clock',
        title: '定时提醒'
      },
      {
        name: 'file-text',
        title: '我发布的'
      }],
    };
  },
  onPullDownRefresh () {
    uni.stopPullDownRefresh();
  },
  methods: {
    clickIcon (name) {
      switch (this.list[name].title) {
        case '定时提醒':
          uni.navigateTo({
            url: '/pages/toastTime/toastTime'
          })
          break
        case '我发布的':
          uni.navigateTo({
            url: '/pages/myCar/myCar'
          })
          break
      }
    },
    async login () {
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      this.getInfo().then(() => {
        this.adduser()
      }).catch((err) => {
        // 错误
        uni.hideLoading()
        uni.showModal({
          content: err.message || '登录失败！',
          showCancel: false
        })
      })
    },
    async adduser () {
      const db = uniCloud.database();
      let res = await db.collection("userInfo").where(`openId=="${this.$store.state.loginInfo.info.openId}"`)
        .get()
      if (res.result.errCode == 0 && res.result.data.length == 0) {
        console.log('没有用户信息： 新增用户')
        let a = db.collection("userInfo").add({
          openId: this.$store.state.loginInfo.info.openId,
          carId: []
        });
        if (res.result.errCode == 0) {
          console.log(this.$store.state.loginInfo)
          // 成功获取所有信息
          uni.hideLoading()
          uni.showToast({
            title: "登录成功",
            icon: "success"
          })
        } else {
          // 错误
          uni.hideLoading()
          uni.showModal({
            content: '登录失败！',
            showCancel: false
          })
        }
      } else {
        // 有信息，保存到store
        console.log('有信息， 保存到store')
        console.log(this.$store.state.loginInfo)
        this.$store.state.loginInfo.info.carId = res.result.data[0].carId
        // 成功获取所有信息
        uni.hideLoading()
        uni.showToast({
          title: "登录成功",
          icon: "success"
        })
      }
    },
    getInfo () {
      return new Promise((resolve, reject) => {
        wx.getUserProfile({ desc: '用于完善用户资料' }).then(res => {
          if (res.errMsg === 'getUserProfile:ok') {
            this.$store.state.loginInfo.isLogin = true
            this.$store.state.loginInfo.info.userName = res.userInfo.nickName
            this.$store.state.loginInfo.info.avatar = res.userInfo.avatarUrl
            this.getOpenid().then(code => {
              // 保存到数据库
              this.$store.state.loginInfo.info.openId = code
              resolve()
            })
          } else {
            reject()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getOpenid () {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: (res) => {
            uniCloud.callFunction({
              name: "getOpenid",
              data: {
                code: res.code
              },
              success: (res) => {
                if (res.result.res.statusMessage === 'OK') {
                  resolve(res.result.res.data.openid)
                } else {
                  reject('获取openId失败')
                }
              },
              fail: () => {
                reject('获取openId失败')
              }
            })
          }
        })
      })
    }
  }
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

    .grid-text {
      font-size: 2.5vh;
      color: #909399;
      padding: 10rpx 0 20rpx 0rpx;
    }

    .btn {
      width: 70vw;
      margin-left: 15vw;
      margin-top: 25vh;
    }
  }
}
</style>