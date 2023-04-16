// 引入uni-subscribemsg公共模块
const UniSubscribemsg = require('uni-subscribemsg');
// 初始化实例
let uniSubscribemsg = new UniSubscribemsg({
  dcloudAppid: "__UNI__F6D80D9",
  provider: "weixin-mp",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const dbJQL = uniCloud.databaseForJQL({ event, context })
  const res = await dbJQL.collection('userInfo').get()
  const date = getTime()
  const now = Number(new Date(date))
  for (let i = 0; i < res.data.length; i++) {
    for (let j = 0; j < res.data[i].carId.length; j++) {
      let userTime = Number(new Date(res.data[i].carId[j].time))
      let result = (Math.abs(now - userTime)) / 60000
      if (result >= 10) continue
      await send(res.data[i].carId[j], date)
      await delay(1500)
    }
  }
  return 'ok'
}

const send = (carItem, date) => {
  // 发送提醒
  return uniSubscribemsg.sendSubscribeMessage({
    touser: carItem.openId,
    template_id: 'yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY',
    page: "pages/index/index",
    miniprogram_state: "formal",
    lang: "zh_CN",
    data: {
      car_number5: {
        value: carItem.license
      },
      phrase3: {
        value: '定时提醒'
      },
      phrase1: {
        value: '待处理'
      },
      time2: {
        value: date
      },
      thing9: {
        value: carItem.text
      }
    }
  })
}

const delay = (time) => {
  // 延迟防止连续发送
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const getTime = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);
  var second = ('0' + date.getSeconds()).slice(-2);
  var formattedDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return formattedDate
}