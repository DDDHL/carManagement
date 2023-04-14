const loginCheck = () => {
  uni.showModal({
    content: '请先登录后再使用该功能',
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        uni.switchTab({
          url: '/pages/user/user'
        });
      }
    }
  })
}

const sendMsg = (openId) => {
  return uniCloud.callFunction({
    name: 'sendMsg',
    data: {
      openId,
      templateId: 'yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY',
      lisence: '粤A114514',
      km: '你好',
      time: '2023-414',
      text: '存储'
    }
  })
}

export {
  loginCheck,
  sendMsg
}