<template>
  <view class="content">
    <u-notice-bar :text="text"></u-notice-bar>
    <view class="img">
      <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="4"
        :previewFullImage="true"></u-upload>
    </view>
    <u-line></u-line>
    <view class="form">
      <view class="inputItem" v-for="item,index in inputType" :key="item.text">
        <view class="text">
          {{item.text}}
        </view>
        <view class="input">
          <u--input :placeholder="`请输入${item.text}`" :type="item.type" border="surround"
            v-model="item.value"></u--input>
        </view>
      </view>
      <view class="btn">
        <u-button type="success" text="确定新增" shape="circle" @click="submit"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      inputType: [{ text: '车牌号码', value: '', type: 'text' }, { text: '现公里数', value: '', type: 'number' },
        { text: '保养公里', value: '', type: 'number' }
      ],
      fileList: [],
      text: '最多上传4张图片，默认第一张为封面图。定时通知功能请在车辆详情页中设置哦~'
    }
  },
  methods: {
    // 删除图片
    deletePic (event) {
      this.fileList.splice(event.index, 1)
    },
    // 新增图片
    async afterRead (event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this.fileList.length
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this.fileList[fileListLen]
        this.fileList.splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen++
      }
    },
    uploadFilePromise (url) {
      // return new Promise((resolve, reject) => {
      //   uniCloud.uploadFile({
      //     filePath: url, //要上传的文件对象
      //     cloudPath: Date.now() + '.png', //保存在云端的文件名，这里以时间戳命名
      //     success (res) {
      //       let imageUrl = res.fileID //云端返回的图片地址
      //     }
      //   })
      // })
    },
    submit () {
      if (!this.fileList.length) {
        uni.showToast({
          icon: 'error',
          title: `请至少选一张图`,
          duration: 2000
        });
        return
      }
      let lock = false
      for (let i = 0; i < this.inputType.length; i++) {
        if (!this.inputType[i].value) {
          uni.showToast({
            icon: 'error',
            title: `请填写${this.inputType[i].text}`,
            duration: 2000
          });
          lock = true
          break
        }
      }
      if (lock) return
      uni.showLoading({
        title: '正在新增~'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 80vh;

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;

    .u-upload {
      flex: none;
    }
  }

  .inputItem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 8vh;

    .text {
      font-size: 2vh;
      width: 18vw;
    }

    .input {
      width: 74vw;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 80vw;
    margin-top: 2vh;
  }
}
</style>