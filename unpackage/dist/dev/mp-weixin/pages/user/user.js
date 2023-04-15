"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onPullDownRefresh() {
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    async login() {
      common_vendor.index.showLoading({
        title: "登录中",
        mask: true
      });
      this.getInfo().then(() => {
        this.adduser();
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: err.message || "登录失败！",
          showCancel: false
        });
      });
    },
    async adduser() {
      const db = common_vendor.Ls.database();
      let res = await db.collection("userInfo").where(`openId=="${this.$store.state.loginInfo.info.openId}"`).get();
      if (res.result.errCode == 0 && res.result.data.length == 0) {
        console.log("没有用户信息： 新增用户");
        db.collection("userInfo").add({
          openId: this.$store.state.loginInfo.info.openId,
          carId: []
        });
        if (res.result.errCode == 0) {
          console.log(this.$store.state.loginInfo);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "登录失败！",
            showCancel: false
          });
        }
      } else {
        console.log("有信息， 保存到store");
        console.log(this.$store.state.loginInfo);
        this.$store.state.loginInfo.info.carId = res.result.data[0].carId;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
      }
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
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "D:/object2/carManagement/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
