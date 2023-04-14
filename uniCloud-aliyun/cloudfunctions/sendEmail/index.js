'use strict';
const nodemailer = require('nodemailer')

exports.main = async (event, context) => {
  var user = '2170269059@qq.com' //自己的邮箱
  var pass = 'eyxfpoewsnrtdici' //qq邮箱的授权码
  var rece = '2293725360@qq.com' //对方邮箱
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    }
  })
  const info = await transporter.sendMail({
    from: `自动提醒系统<${user}>`,
    to: `提醒人<${rece}>`,
    subject: '汽车管理系统信息提醒',
    html: '<h3>你好</h3><br/><h3>监测到车牌号：粤A86R99的车辆已到维修时间，请登录小程序获取车辆信息并及时对车辆进行维护。谢谢！</h3>',
  })

  if (info.messageId) {
    // return {code: 0, msg: '发送成功'}  
    return info
  } else {
    // return {code: 1, msg: '发送失败', info}  
    return info
  }
}