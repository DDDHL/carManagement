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
              <picker mode="date" :value="date" :start="startTime" @change="bindDateChange">
                <view class="uni-input">{{date}}</view>
              </picker>
            </view>
          </view>
          <view class="datePicker">
            <view class="text">
              时间：
            </view>
            <view class="time">
              <picker @change="bindTimeChange" :value="index" :range="array">
                <view class="uni-input">{{array[index]}}</view>
              </picker>
            </view>
          </view>
          <view class="datePicker">
            <view class="text">
              状态：
            </view>
            <view class="time" :style="setType==='未设置提醒'?'color:red;':'color:green;'">
              {{setType}}
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
      index: 0,
      array: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
        '23:00'
      ],
      setType: '未设置提醒',
      startTime: ''
    };
  },
  onLoad () {
    this.carInfo = this.$store.state.clickItem
    console.log(this.carInfo)
    this.startTime = dayjs().format('YYYY-MM-DD')
    this.flashData()
    let res = this.$store.state.loginInfo.info.carId.find(item => item.id == this.carInfo._id)
    if (res) {
      this.date = dayjs(res.time).format('YYYY-MM-DD')
      this.index = dayjs(res.time).format('HH')
      this.setType = '已设置定时提醒'
    } else {
      this.date = dayjs().format('YYYY-MM-DD')
      this.index = dayjs().format('HH')
    }
  },
  methods: {
    bindDateChange (e) {
      this.date = e.detail.value
    },
    bindTimeChange (e) {
      this.index = e.detail.value
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
        for (let i = 0; i < this.$store.state.loginInfo.info.carId.length; i++) {
          if (this.$store.state.loginInfo.info.carId[i].id == this.carInfo._id) {
            this.$store.state.loginInfo.info.carId[i].km = this.km
            this.$store.state.loginInfo.info.carId[i].license = this.license
            break
          }
        }
        await db.collection('userInfo').where(`
        openId=="${this.$store.state.loginInfo.info.openId}"`).update({
          carId: this.$store.state.loginInfo.info.carId
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
        uni.showLoading({
          title: '设置定时中',
          mask: true
        })
        let time = this.date + ' ' + this.array[this.index]
        this.$store.state.loginInfo.info.carId.push({
          time: time,
          id: this.carInfo._id,
          openId: this.$store.state.loginInfo.info.openId,
          license: this.carInfo.license,
          km: this.carInfo.km,
          text: '定时提醒保养'
        })
        // 存入定时提醒时间
        let res = await db.collection('userInfo').where(`
openId=="${this.$store.state.loginInfo.info.openId}"`).update({
          carId: this.$store.state.loginInfo.info.carId
        })
        if (res.result.errCode == 0) {
          uni.hideLoading()
          uni.showToast({
            title: '设置定时成功',
            duration: 1500,
          })
          this.setType = '已设置定时提醒'
        } else {
          uni.hideLoading()
          uni.showToast({
            title: '设置定时失败',
            duration: 1500,
            icon: 'error'
          })
        }
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
        border-radius: 1vh;
        background-color: #f9f9f9;

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