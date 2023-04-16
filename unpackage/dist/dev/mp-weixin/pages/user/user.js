"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: [
        {
          name: "clock",
          title: "定时提醒"
        },
        {
          name: "file-text",
          title: "我发布的"
        }
      ]
    };
  },
  onPullDownRefresh() {
    common_vendor.index.stopPullDownRefresh();
  },
  methods: {
    loginout() {
      this.$store.state.loginInfo = {
        isLogin: false,
        info: {
          userName: "未登录",
          avatar: "/static/avatar.png",
          openId: "",
          carId: []
        }
      };
    },
    clickIcon(name) {
      switch (this.list[name].title) {
        case "定时提醒":
          common_vendor.index.navigateTo({
            url: "/pages/toastTime/toastTime"
          });
          break;
        case "我发布的":
          common_vendor.index.navigateTo({
            url: "/pages/myCar/myCar"
          });
          break;
      }
    },
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
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  (_easycom_u_button2 + _easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2)();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../node-modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../node-modules/uview-plus/components/u-grid/u-grid.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid)();
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
  } : {
    f: common_vendor.f($data.list, (listItem, listIndex, i0) => {
      return {
        a: "0f7520f0-3-" + i0 + "," + ("0f7520f0-2-" + i0),
        b: common_vendor.p({
          customStyle: {
            paddingTop: 60 + "rpx"
          },
          name: listItem.name,
          size: 33
        }),
        c: common_vendor.t(listItem.title),
        d: listIndex,
        e: "0f7520f0-2-" + i0 + ",0f7520f0-1"
      };
    }),
    g: common_vendor.o($options.clickIcon),
    h: common_vendor.p({
      border: false,
      col: "2",
      border: true
    })
  }, {
    i: _ctx.$store.state.loginInfo.isLogin
  }, _ctx.$store.state.loginInfo.isLogin ? {
    j: common_vendor.o($options.loginout),
    k: common_vendor.p({
      type: "error",
      text: "退出登录"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "D:/object2/carManagement/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
