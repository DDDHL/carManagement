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
      license: "",
      date: "2023-4-15",
      index: 0,
      array: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      setType: "未设置提醒",
      startTime: ""
    };
  },
  onLoad() {
    this.carInfo = this.$store.state.clickItem;
    console.log(this.carInfo);
    this.startTime = common_vendor.dayjs().format("YYYY-MM-DD");
    this.flashData();
    let res = this.$store.state.loginInfo.info.carId.find((item) => item.id == this.carInfo._id);
    if (res) {
      this.date = common_vendor.dayjs(res.time).format("YYYY-MM-DD");
      this.index = common_vendor.dayjs(res.time).format("HH");
      this.setType = "已设置定时提醒";
    } else {
      this.date = common_vendor.dayjs().format("YYYY-MM-DD");
      this.index = common_vendor.dayjs().format("HH");
    }
  },
  methods: {
    bindDateChange(e) {
      this.date = e.detail.value;
    },
    bindTimeChange(e) {
      this.index = e.detail.value;
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
        for (let i = 0; i < this.$store.state.loginInfo.info.carId.length; i++) {
          if (this.$store.state.loginInfo.info.carId[i].id == this.carInfo._id) {
            this.$store.state.loginInfo.info.carId[i].km = this.km;
            this.$store.state.loginInfo.info.carId[i].license = this.license;
            break;
          }
        }
        await db.collection("userInfo").where(`
        openId=="${this.$store.state.loginInfo.info.openId}"`).update({
          carId: this.$store.state.loginInfo.info.carId
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
      } else {
        common_vendor.index.showLoading({
          title: "设置定时中",
          mask: true
        });
        let time = this.date + " " + this.array[this.index];
        let isHad = false;
        for (let i = 0; i < this.$store.state.loginInfo.info.carId.length; i++) {
          if (this.$store.state.loginInfo.info.carId[i].id == this.carInfo._id) {
            isHad = true;
            this.$store.state.loginInfo.info.carId[i] = {
              time,
              id: this.carInfo._id,
              openId: this.$store.state.loginInfo.info.openId,
              license: this.carInfo.license,
              km: this.carInfo.km,
              text: "定时提醒保养"
            };
            break;
          }
        }
        if (!isHad) {
          this.$store.state.loginInfo.info.carId.push({
            time,
            id: this.carInfo._id,
            openId: this.$store.state.loginInfo.info.openId,
            license: this.carInfo.license,
            km: this.carInfo.km,
            text: "车辆需要进行维修或者保养"
          });
        }
        let res = await db.collection("userInfo").where(`
openId=="${this.$store.state.loginInfo.info.openId}"`).update({
          carId: this.$store.state.loginInfo.info.carId
        });
        if (res.result.errCode == 0) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "设置定时成功",
            duration: 1500
          });
          this.setType = "已设置定时提醒";
        } else {
          this.$store.state.loginInfo.info.carId.pop();
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "设置定时失败",
            duration: 1500,
            icon: "error"
          });
        }
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
              this.title = "设置定时提醒";
              this.content = "set";
              this.popShow = true;
            } else {
              common_vendor.index.showModal({
                content: "请订阅消息并勾选不在提示！",
                showCancel: false
              });
            }
          });
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
    async deleteData() {
      const db = common_vendor.Ls.database();
      await db.collection("carInfo").where(`_id=="${this.carInfo._id}"`).remove();
      await common_vendor.Ls.callFunction({
        name: "carManager",
        data: { type: "deleteImg", fileUrls: this.carInfo.imgUrls }
      });
      for (let i = 0; i < this.$store.state.loginInfo.info.carId.length; i++) {
        if (this.$store.state.loginInfo.info.carId[i].id == this.carInfo._id) {
          this.$store.state.loginInfo.info.carId.splice(i, 1);
          break;
        }
      }
      await db.collection("userInfo").where(`
      openId=="${this.$store.state.loginInfo.info.openId}"`).update({
        carId: this.$store.state.loginInfo.info.carId
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
  } : {
    y: common_vendor.t($data.date),
    z: $data.date,
    A: $data.startTime,
    B: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    C: common_vendor.t($data.array[$data.index]),
    D: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    E: $data.index,
    F: $data.array,
    G: common_vendor.t($data.setType),
    H: common_vendor.s($data.setType === "未设置提醒" ? "color:red;" : "color:green;")
  }, {
    I: common_vendor.o($options.save),
    J: common_vendor.p({
      type: "success",
      text: "保存设置"
    }),
    K: common_vendor.o(($event) => $data.popShow = false),
    L: common_vendor.p({
      show: $data.popShow,
      mode: "bottom",
      round: "20"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-64f3582a"], ["__file", "D:/object2/carManagement/pages/carInfo/carInfo.vue"]]);
wx.createPage(MiniProgramPage);
