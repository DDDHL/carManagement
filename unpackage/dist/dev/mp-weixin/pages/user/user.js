"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publicMethods = require("../../utils/publicMethods.js");
const _sfc_main = {
  data() {
    return {};
  },
  onPullDownRefresh() {
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    send() {
      utils_publicMethods.sendMsg(this.$store.state.loginInfo.info.openId);
    },
    test() {
      common_vendor.index.requestSubscribeMessage({
        tmplIds: ["yHEPvG95v7yLi2zFgWykNGhxNMLaeLEE8ku9px4RynY"]
      }).then((res) => {
        let isOk = false;
        for (let key in res) {
          if (res[key] == "accept")
            isOk = true;
          if (res[key == "fail"])
            isOk = false;
        }
        if (isOk) {
          common_vendor.index.showToast({
            title: "订阅成功",
            icon: "none"
          });
        } else {
          common_vendor.index.showModal({
            content: "获取权限失败",
            showCancel: false
          });
        }
      });
    },
    async login() {
      common_vendor.index.showLoading({
        title: "登录中",
        mask: true
      });
      this.getInfo().then(() => {
        common_vendor.index.hideLoading();
        console.log(this.$store.state.loginInfo);
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: err.message || "登录失败！",
          showCancel: false
        });
      });
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        common_vendor.wx$1.getUserProfile({ desc: "用于完善用户资料" }).then((res) => {
          if (res.errMsg === "getUserProfile:ok") {
            this.$store.state.loginInfo.isLogin = true;
            this.$store.state.loginInfo.info.userName = res.userInfo.nickName;
            this.$store.state.loginInfo.info.avatar = res.userInfo.avatarUrl;
            this.getOpenid().then((code) => {
              this.$store.state.loginInfo.info.openId = code;
              resolve();
            });
          } else {
            reject();
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getOpenid() {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success: (res) => {
            common_vendor.Ls.callFunction({
              name: "getOpenid",
              data: {
                code: res.code
              },
              success: (res2) => {
                if (res2.result.res.statusMessage === "OK") {
                  resolve(res2.result.res.data.openid);
                } else {
                  reject("获取openId失败");
                }
              },
              fail: () => {
                reject("获取openId失败");
              }
            });
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$store.state.loginInfo.info.avatar,
    b: common_vendor.t(_ctx.$store.state.loginInfo.info.userName),
    c: !_ctx.$store.state.loginInfo.isLogin
  }, !_ctx.$store.state.loginInfo.isLogin ? {
    d: common_vendor.o($options.login),
    e: common_vendor.p({
      type: "success",
      text: "登录"
    })
  } : {}, {
    f: common_vendor.o($options.test),
    g: common_vendor.p({
      type: "success",
      text: "获取订阅权限"
    }),
    h: common_vendor.o($options.send),
    i: common_vendor.p({
      type: "success",
      text: "发送"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "D:/object2/carManagement/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
