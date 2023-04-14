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
      <u-button type="success" text="获取订阅权限" @click="test"></u-button>
      <u-button type="success" text="发送" @click="send"></u-button>
    </view>
  </view>
</template>
<script>
import { sendMsg, getPermissions } from '@/utils/publicMethods'
export default {
  data () {
    return {

    };
  },
  onPullDownRefresh () {
    uni.stopPullDownRefresh();
  },
  methods: {
    send () {
      sendMsg(this.$store.state.loginInfo.info.openId)
    },
    test () {
      uni.requestSubscribeMessage({
        tmplIds: ['yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY']
      }).then(res => {
        let isOk = false
        for (let key in res) {
          if (res[key] == "accept") isOk = true
          if (res[key == "fail"]) isOk = false
        }
        if (isOk) {
          uni.showToast({
            title: "订阅成功",
            icon: "none"
          })
        } else {
          uni.showModal({
            content: '获取权限失败',
            showCancel: false
          })
        }
      })
    },
    async login () {
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      this.getInfo().then(() => {
        // 成功获取所有信息
        uni.hideLoading()
        console.log(this.$store.state.loginInfo)
      }).catch((err) => {
        // 错误
        uni.hideLoading()
        uni.showModal({
          content: err.message || '登录失败！',
          showCancel: false
        })
      })
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

    .btn {
      width: 70vw;
      margin-left: 15vw;
      margin-top: 25vh;
    }
  }
}
</style>