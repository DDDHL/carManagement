"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  _easycom_u_empty2();
}
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  _easycom_u_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      show: true,
      mode: "list",
      icon: "/static/no.png",
      text: "暂未开发",
      textSize: "2vh",
      marginTop: "25vh"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-091d73e0"], ["__file", "D:/object2/carManagement/pages/myCar/myCar.vue"]]);
wx.createPage(MiniProgramPage);
