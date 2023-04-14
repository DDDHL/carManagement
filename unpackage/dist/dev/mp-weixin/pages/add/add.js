"use strict";
const utils_publicMethods = require("../../utils/publicMethods.js");
const common_vendor = require("../../common/vendor.js");
const imgUpload = () => "../../component/imgUpload.js";
const _sfc_main = {
  data() {
    return {};
  },
  onShow() {
    if (!this.$store.state.loginInfo.isLogin) {
      utils_publicMethods.loginCheck();
      return;
    }
  },
  components: { imgUpload }
};
if (!Array) {
  const _component_imgUpload = common_vendor.resolveComponent("imgUpload");
  _component_imgUpload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/object2/carManagement/pages/add/add.vue"]]);
wx.createPage(MiniProgramPage);
