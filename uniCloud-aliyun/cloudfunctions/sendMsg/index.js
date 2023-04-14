// 引入uni-subscribemsg公共模块
const UniSubscribemsg = require('uni-subscribemsg');
// 初始化实例
let uniSubscribemsg = new UniSubscribemsg({
  dcloudAppid: "__UNI__F6D80D9",
  provider: "weixin-mp",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { templateId, lisence, km, text, openId } = event
  try {
    // 发送模板消息
    let date = getTime()
    let res = await uniSubscribemsg.sendSubscribeMessage({
      touser: openId,
      template_id: templateId,
      page: "pages/index/index",
      miniprogram_state: "formal",
      lang: "zh_CN",
      data: {
        car_number5: {
          value: lisence
        },
        phrase3: {
          value: '提醒'
        },
        phrase1: {
          value: km
        },
        time2: {
          value: date
        },
        thing9: {
          value: text
        }
      }
    });
    return res
  } catch (err) {
    return err
  }
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