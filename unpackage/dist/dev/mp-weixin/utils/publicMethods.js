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
exports.loginCheck = loginCheck;
