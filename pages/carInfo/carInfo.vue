<template>
  <view class="content">
    <view class="header">
      <u-swiper :list="carInfo.imgUrls" height="300" img-mode="aspectFill" indicator indicatorMode="line"
        circular></u-swiper>
    </view>
    <u-line></u-line>
    <view class="center">
      <view class="title">
        <u-tag text="车牌号" size="mini"></u-tag>
        <h2>&nbsp;{{carInfo.license}}</h2>
      </view>
      <view class="title">
        <u-tag text="公里数" size="mini" type="warning"></u-tag>
        <h2>&nbsp;{{carInfo.km}}km</h2>
      </view>
      <view class="info">
        <view class="textGroup">
          <view class="left">
            需要保养的公里数：
          </view>
          <view class="right">
            {{carInfo.maintenance_km}}km
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <u-button type="error" text="删除车辆" @click="toast('delete')"></u-button>
    </view>
    <view class="bottom">
      <u-button type="warning" text="设置提醒" @click="toast('set')"></u-button>
    </view>
    <view class="bottom">
      <u-button type="success" text="编辑信息" @click="toast('update')"></u-button>
    </view>
    <u-modal :show="show" showCancelButton buttonReverse :title="title" :content='content' @cancel="show = false"
      @confirm="confirm"></u-modal>
    <u-popup :show="popShow" mode="bottom" round="20" @close="popShow = false">
      <view class="pop">
        <view class="name">{{title}}</view>
        <view v-if="content==='update'">
          <view class="input">
            <h4>现车牌号&nbsp;&nbsp;</h4>
            <u--input placeholder="请输入车牌号" border="surround" v-model="license"></u--input>
          </view>
          <view class="input">
            <h4>现公里数&nbsp;&nbsp;</h4>
            <u--input placeholder="请输入公里数" type="number" border="surround" v-model="km"></u--input>
          </view>
          <view class="input">
            <h4>保养公里&nbsp;&nbsp;</h4>
            <u--input placeholder="请输入保养公里数" type="number" border="surround" v-model="maintenance_km"></u--input>
          </view>
        </view>
        <view class="set" v-else>
          <view class="datePicker">
            <view class="text">
              日期：
            </view>
            <view class="time">
              <picker mode="date" :value="date" @change="bindDateChange">
                <view class="uni-input">{{date}}</view>
              </picker>
            </view>
          </view>
          <view class="datePicker">
            <view class="text">
              时间：
            </view>
            <view class="time">
              <picker mode="time" :value="time" @change="bindTimeChange">
                <view class="uni-input">{{time}}</view>
              </picker>
            </view>
          </view>
          <view class="datePicker">
            <view class="text">
              状态：
            </view>
            <view class="time">
              你好
            </view>
          </view>
        </view>
        <view class="bottom">
          <u-button type="success" text="保存设置" @click="save"></u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { loginCheck } from '@/utils/publicMethods'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      carInfo: {},
      show: false,
      title: '',
      content: '',
      type: '',
      popShow: false,
      maintenance_km: 0,
      km: 0,
      license: '',
      date: '2023-4-15',
      time: '19:00'
    };
  },
  onLoad () {
    this.carInfo = this.$store.state.clickItem
    console.log(this.carInfo)
    this.flashData()
    if (!this.carInfo.toastTime) {
      this.date = dayjs().format('YYYY-MM-DD')
      this.time = dayjs().format('HH:MM')
    } else {
      this.time = dayjs(this.carInfo.toastTime).format('HH:MM')
      this.date = dayjs(this.carInfo.toastTime).format('YYYY-MM-DD')
    }
  },
  methods: {
    bindDateChange (e) {
      this.date = e.detail.value
    },
    bindTimeChange (e) {
      this.time = e.detail.value
    },
    flashData () {
      this.maintenance_km = this.carInfo.maintenance_km
      this.km = this.carInfo.km
      this.license = this.carInfo.license
    },
    async save () {
      const db = uniCloud.database();
      if (this.content === 'update') {
        if (!this.km || !this.maintenance_km || !this.license) {
          uni.showToast({
            icon: 'error',
            title: `请填写完整！`,
            duration: 2000
          });
          return
        }
        uni.showLoading({
          title: '执行中',
          mask: true
        })
        // 更新
        let res = await db.collection('carInfo').where(`_id=="${this.carInfo._id}"`).update({
          maintenance_km: this.maintenance_km,
          km: this.km,
          license: this.license
        })
        uni.hideLoading()
        this.carInfo.maintenance_km = this.maintenance_km
        this.carInfo.km = this.maintenance_km
        this.carInfo.license = this.license
        uni.showToast({
          title: '更新成功',
          duration: 1500,
        })
        this.popShow = false
      } else {
        // 设置提醒时间
      }
    },
    toast (type) {
      if (!this.$store.state.loginInfo.isLogin) {
        loginCheck()
        return
      }
      this.type = type
      switch (type) {
        case 'set':
          uni.requestSubscribeMessage({
            tmplIds: ['yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY']
          }).then(res => {
            let isOk = false
            for (let key in res) {
              if (res[key] == "accept") isOk = true
              if (res[key == "fail"]) isOk = false
            }
            if (isOk) {
              this.title = '设置定时提醒'
              this.content = 'set'
              this.popShow = true
            } else {
              uni.showModal({
                content: '请订阅消息并勾选不在提示！',
                showCancel: false
              })
            }
          })
          break
        case 'delete':
          this.title = '删除操作'
          this.content = '确定要删除该车辆？'
          this.show = true
          break
        case 'update':
          this.title = '编辑车辆信息'
          this.content = 'update'
          this.popShow = true
          break
      }
    },
    confirm () {
      uni.showLoading({
        title: '执行中',
        mask: true
      })
      this.deleteData()
      this.show = false
    },
    setToastTime () {

    },
    updateData () {

    },
    async deleteData () {
      const db = uniCloud.database();
      let res = await db.collection('carInfo').where(`_id=="${this.carInfo._id}"`).remove()
      let res2 = await uniCloud.callFunction({
        name: 'carManager',
        data: { type: 'deleteImg', fileUrls: this.carInfo.imgUrls }
      })
      uni.hideLoading();
      uni.showToast({
        title: '删除成功',
        mask: true,
        duration: 1500,
      })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        });
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;

  .center {
    width: 100vw;
    display: flex;
    flex-direction: column;

    .title {
      margin: 2vh 0 0 3vw;
      display: flex;
      align-items: center;
      height: 5vh;

      h2 {
        margin-left: 2vw;
      }
    }

    .info {
      width: 94vw;
      height: 7vh;
      background-color: #f9f9f9;
      border-radius: 1.2vh;
      margin: 2vh 3vw;

      .textGroup {
        display: flex;
        width: 90vw;
        margin-left: 2vw;
        margin-top: 2vh;
        justify-content: space-between;

        .left,
        .right {
          font-size: 2vh;
        }
      }
    }
  }

  .bottom {
    width: 80vw;
    margin-left: 10vw;
    margin-top: 3vh;
  }

  .pop {
    width: 100vw;
    height: 40vh;

    .name {
      text-align: center;
      margin-top: 2vh;
      font-size: 22px;
    }

    .input {
      margin-top: 2vh;
      width: 88vw;
      display: flex;
      align-items: center;
      margin-left: 6vw;
    }

    .set {
      margin-top: 1.5vh;
      display: flex;
      flex-direction: column;
      align-items: center;

      .datePicker {
        display: flex;
        width: 80vw;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-top: 1.5vh;
        font-size: 2.5vh;
        height: 6vh;
        border: 1px solid;

        .text {
          line-height: 6vh;
          width: 30vw;
        }

        .time {
          line-height: 6vh;
          width: 50vw;
        }
      }
    }
  }
}
</style>