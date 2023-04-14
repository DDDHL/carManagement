"use strict";
const common_vendor = require("../common/vendor.js");
const loginCheck = () => {
  common_vendor.index.showModal({
    content: "请先登录后再使用该功能",
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      }
    }
  });
};
const sendMsg = (openId) => {
  return common_vendor.Ls.callFunction({
    name: "sendMsg",
    data: {
      openId,
      templateId: "yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY",
      lisence: "粤A114514",
      km: "你好",
      time: "2023-414",
      text: "存储"
    }
  });
};
exports.loginCheck = loginCheck;
exports.sendMsg = sendMsg;
