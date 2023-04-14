'use strict';
exports.main = async (event, context) => {
  try {
    const {
      code
    } = event;
    // 云函数中如需要请求其他http服务，则使用uniCloud.httpclient.request(URL,requestOptions)
    const res = await uniCloud.httpclient.request(
      "https://api.weixin.qq.com/sns/jscode2session?appid=wx74bc31dc04a0ba42&secret=6631596e57bc48554a0eee837593a384&js_code=" +
      code +
      "&grant_type=authorization_code", {
        // 返回的数据格式
        dataType: "json"
      }
    )
    return res
  } catch (e) {
    return e
  }
};