"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      options: [{
        text: "删除"
      }]
    };
  },
  methods: {
    async deleteTime(e) {
      common_vendor.index.showLoading({
        title: "执行中",
        mask: true
      });
      let arr = this.$store.state.loginInfo.info.carId;
      arr.map((item, index) => {
        if (item.id == e) {
          arr.splice(index, 1);
          this.$store.state.loginInfo.info.carId = arr;
        }
      });
      const db = common_vendor.Ls.database();
      let res = await db.collection("userInfo").where(`
      openId=="${this.$store.state.loginInfo.info.openId}"`).update({
        carId: arr
      });
      console.log(res);
      if (res.result.errCode == 0) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "删除成功",
          duration: 1500
        });
      } else {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "删除失败",
          duration: 1500,
          icon: "error"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_swipe_action_item2 = common_vendor.resolveComponent("u-swipe-action-item");
  const _easycom_u_swipe_action2 = common_vendor.resolveComponent("u-swipe-action");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_u_swipe_action_item2 + _easycom_u_swipe_action2 + _easycom_u_empty2)();
}
const _easycom_u_swipe_action_item = () => "../../node-modules/uview-plus/components/u-swipe-action-item/u-swipe-action-item.js";
const _easycom_u_swipe_action = () => "../../node-modules/uview-plus/components/u-swipe-action/u-swipe-action.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_swipe_action_item + _easycom_u_swipe_action + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.$store.state.loginInfo.info.carId, (item, k0, i0) => {
      return {
        a: common_vendor.t(`${item.license} ，时间：${item.time}`),
        b: common_vendor.o(($event) => $options.deleteTime(item.id), item.id),
        c: item.id,
        d: "a7d360ef-1-" + i0 + ",a7d360ef-0"
      };
    }),
    b: common_vendor.p({
      options: $data.options
    }),
    c: common_vendor.p({
      show: !_ctx.$store.state.loginInfo.info.carId.length,
      mode: "list",
      icon: "/static/listEmpty.png",
      text: "定时任务为空",
      textSize: "2vh",
      marginTop: "25vh"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a7d360ef"], ["__file", "D:/object2/carManagement/pages/toastTime/toastTime.vue"]]);
wx.createPage(MiniProgramPage);
