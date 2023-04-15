"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    "clickItem": {},
    "loginInfo": {
      isLogin: false,
      info: {
        userName: "未登录",
        avatar: "/static/avatar.png",
        openId: "",
        carId: []
      }
    }
  }
});
exports.store = store;
