"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_publicMethods = require("../../utils/publicMethods.js");
const _sfc_main = {
  data() {
    return {
      carInfo: {},
      show: false,
      title: "",
      content: "",
      type: "",
      popShow: false,
      maintenance_km: 0,
      km: 0,
      license: ""
    };
  },
  onLoad() {
    this.carInfo = this.$store.state.clickItem;
    this.flashData();
  },
  methods: {
    async getData() {
    },
    flashData() {
      this.maintenance_km = this.carInfo.maintenance_km;
      this.km = this.carInfo.km;
      this.license = this.carInfo.license;
    },
    async save() {
      const db = common_vendor.Ls.database();
      if (this.content === "update") {
        if (!this.km || !this.maintenance_km || !this.license) {
          common_vendor.index.showToast({
            icon: "error",
            title: `请填写完整！`,
            duration: 2e3
          });
          return;
        }
        common_vendor.index.showLoading({
          title: "执行中",
          mask: true
        });
        await db.collection("carInfo").where(`_id=="${this.carInfo._id}"`).update({
          maintenance_km: this.maintenance_km,
          km: this.km,
          license: this.license
        });
        common_vendor.index.hideLoading();
        this.carInfo.maintenance_km = this.maintenance_km;
        this.carInfo.km = this.maintenance_km;
        this.carInfo.license = this.license;
        common_vendor.index.showToast({
          title: "更新成功",
          duration: 1500
        });
        this.popShow = false;
      }
    },
    toast(type) {
      if (!this.$store.state.loginInfo.isLogin) {
        utils_publicMethods.loginCheck();
        return;
      }
      this.type = type;
      switch (type) {
        case "set":
          this.title = "设置定时提醒";
          this.content = "set";
          this.popShow = true;
          break;
        case "delete":
          this.title = "删除操作";
          this.content = "确定要删除该车辆？";
          this.show = true;
          break;
        case "update":
          this.title = "编辑车辆信息";
          this.content = "update";
          this.popShow = true;
          break;
      }
    },
    confirm() {
      common_vendor.index.showLoading({
        title: "执行中",
        mask: true
      });
      this.deleteData();
      this.show = false;
    },
    setToastTime() {
    },
    updateData() {
    },
    async deleteData() {
      const db = common_vendor.Ls.database();
      await db.collection("carInfo").where(`_id=="${this.carInfo._id}"`).remove();
      await common_vendor.Ls.callFunction({
        name: "carManager",
        data: { type: "deleteImg", fileUrls: this.carInfo.imgUrls }
      });
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "删除成功",
        mask: true,
        duration: 1500
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 1500);
    }
  }
};
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_tag2 = common_vendor.resolveComponent("u-tag");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_swiper2 + _easycom_u_line2 + _easycom_u_tag2 + _easycom_u_button2 + _easycom_u_modal2 + _easycom_u__input2 + _easycom_u_popup2)();
}
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_line = () => "../../node-modules/uview-plus/components/u-line/u-line.js";
const _easycom_u_tag = () => "../../node-modules/uview-plus/components/u-tag/u-tag.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_line + _easycom_u_tag + _easycom_u_button + _easycom_u_modal + _easycom_u__input + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      list: $data.carInfo.imgUrls,
      height: "300",
      ["img-mode"]: "aspectFill",
      indicator: true,
      indicatorMode: "line",
      circular: true
    }),
    b: common_vendor.p({
      text: "车牌号",
      size: "mini"
    }),
    c: common_vendor.t($data.carInfo.license),
    d: common_vendor.p({
      text: "公里数",
      size: "mini",
      type: "warning"
    }),
    e: common_vendor.t($data.carInfo.km),
    f: common_vendor.t($data.carInfo.maintenance_km),
    g: common_vendor.o(($event) => $options.toast("delete")),
    h: common_vendor.p({
      type: "error",
      text: "删除车辆"
    }),
    i: common_vendor.o(($event) => $options.toast("set")),
    j: common_vendor.p({
      type: "warning",
      text: "设置提醒"
    }),
    k: common_vendor.o(($event) => $options.toast("update")),
    l: common_vendor.p({
      type: "success",
      text: "编辑信息"
    }),
    m: common_vendor.o(($event) => $data.show = false),
    n: common_vendor.o($options.confirm),
    o: common_vendor.p({
      show: $data.show,
      showCancelButton: true,
      buttonReverse: true,
      title: $data.title,
      content: $data.content
    }),
    p: common_vendor.t($data.title),
    q: $data.content === "update"
  }, $data.content === "update" ? {
    r: common_vendor.o(($event) => $data.license = $event),
    s: common_vendor.p({
      placeholder: "请输入车牌号",
      border: "surround",
      modelValue: $data.license
    }),
    t: common_vendor.o(($event) => $data.km = $event),
    v: common_vendor.p({
      placeholder: "请输入公里数",
      type: "number",
      border: "surround",
      modelValue: $data.km
    }),
    w: common_vendor.o(($event) => $data.maintenance_km = $event),
    x: common_vendor.p({
      placeholder: "请输入保养公里数",
      type: "number",
      border: "surround",
      modelValue: $data.maintenance_km
    })
  } : {}, {
    y: common_vendor.o($options.save),
    z: common_vendor.p({
      type: "success",
      text: "保存设置"
    }),
    A: common_vendor.o(($event) => $data.popShow = false),
    B: common_vendor.p({
      show: $data.popShow,
      mode: "bottom",
      round: "20"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-64f3582a"], ["__file", "D:/object2/carManagement/pages/carInfo/carInfo.vue"]]);
wx.createPage(MiniProgramPage);
