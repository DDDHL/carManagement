"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      list: [],
      searchKey: ""
    };
  },
  onShow() {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    this.getData();
  },
  onPullDownRefresh() {
    this.getData();
  },
  methods: {
    search() {
      if (!this.searchKey)
        this.getData();
    },
    async getData() {
      const db = common_vendor.Ls.database();
      let res;
      if (this.searchKey) {
        res = await db.collection("carInfo").where(`license=="${this.searchKey}"`).get();
      } else {
        res = await db.collection("carInfo").get();
      }
      this.list = res.result.data;
      common_vendor.index.hideLoading();
      common_vendor.index.stopPullDownRefresh();
    },
    clickItem(item) {
      this.$store.state.clickItem = item;
      common_vendor.index.navigateTo({
        url: "/pages/carInfo/carInfo"
      });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_tag2 = common_vendor.resolveComponent("u-tag");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  (_easycom_u_icon2 + _easycom_u_input2 + _easycom_u_tag2 + _easycom_u_empty2)();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_tag = () => "../../node-modules/uview-plus/components/u-tag/u-tag.js";
const _easycom_u_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_input + _easycom_u_tag + _easycom_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.getData),
    b: common_vendor.p({
      size: "30",
      name: "search"
    }),
    c: common_vendor.o($options.search),
    d: common_vendor.o($options.getData),
    e: common_vendor.o(($event) => $data.searchKey = $event),
    f: common_vendor.p({
      placeholder: "搜索车牌号",
      modelValue: $data.searchKey
    }),
    g: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.imgUrls[0],
        b: "1cf27b2a-2-" + i0,
        c: common_vendor.t(`${item.license}`),
        d: "1cf27b2a-3-" + i0,
        e: common_vendor.t(`${item.km}km`),
        f: index,
        g: common_vendor.o(($event) => $options.clickItem(item), index)
      };
    }),
    h: common_vendor.p({
      text: "车牌号",
      size: "mini"
    }),
    i: common_vendor.p({
      text: "公里数",
      size: "mini",
      type: "warning"
    }),
    j: common_vendor.p({
      show: !$data.list.length,
      mode: "list",
      icon: "/static/dataEmpty.png",
      text: "车辆信息为空",
      textSize: "2vh",
      marginTop: "25vh"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/object2/carManagement/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
