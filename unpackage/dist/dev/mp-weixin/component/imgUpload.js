"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputType: [
        { text: "车牌号码", value: "", type: "text" },
        { text: "现公里数", value: "", type: "number" },
        { text: "保养公里", value: "", type: "number" }
      ],
      fileList: [],
      text: "最多上传4张图片，默认第一张为封面图。定时通知功能请在车辆详情页中设置哦~"
    };
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      let lists = [].concat(event.file);
      let fileListLen = this.fileList.length;
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      for (let i = 0; i < lists.length; i++) {
        let item = this.fileList[fileListLen];
        this.fileList.splice(fileListLen, 1, Object.assign(item, {
          status: "success",
          message: "",
          url: ""
        }));
        fileListLen++;
      }
    },
    submit() {
      if (!this.fileList.length) {
        common_vendor.index.showToast({
          icon: "error",
          title: `请至少选一张图`,
          duration: 2e3
        });
        return;
      }
      let lock = false;
      for (let i = 0; i < this.inputType.length; i++) {
        if (!this.inputType[i].value) {
          common_vendor.index.showToast({
            icon: "error",
            title: `请填写${this.inputType[i].text}`,
            duration: 2e3
          });
          lock = true;
          break;
        }
      }
      var pattPlateNumber = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
      if (!pattPlateNumber.test(this.inputType[0].value)) {
        common_vendor.index.showToast({
          icon: "error",
          title: `车牌号不合法`,
          duration: 2e3
        });
        return;
      }
      if (lock)
        return;
      common_vendor.index.showLoading({
        title: "正在新增~",
        mask: true
      });
      Promise.all(
        this.fileList.map((val) => this.uploadFilePromise(val.thumb))
      ).then((imgUrls) => {
        this.addData(imgUrls);
      }).catch((err) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: err.message || "新增失败",
          showCancel: false
        });
      });
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        common_vendor.Ls.uploadFile({
          filePath: url,
          //要上传的文件对象
          cloudPath: Date.now() + ".png",
          //保存在云端的文件名，这里以时间戳命名
          success(res) {
            resolve(res.fileID);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    // 插入1条数据，同时判断成功失败状态
    addData(imgUrls) {
      const db = common_vendor.Ls.database();
      db.collection("carInfo").add({
        license: this.inputType[0].value,
        km: this.inputType[1].value,
        maintenance_km: this.inputType[2].value,
        toastTime: "",
        imgUrls,
        createTime: common_vendor.dayjs().format("YYYY-MM-DD HH:MM"),
        creater: this.$store.state.loginInfo.info.openId
      }).then((res) => {
        common_vendor.index.showToast({
          title: "新增成功",
          duration: 1500
        });
        this.clearInfo();
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "新增失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    clearInfo() {
      this.fileList.length = 0;
      for (let i = 0; i < this.inputType.length; i++) {
        this.inputType[i].value = "";
      }
    }
  }
};
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_notice_bar2 + _easycom_u_upload2 + _easycom_u_line2 + _easycom_u__input2 + _easycom_u_button2)();
}
const _easycom_u_notice_bar = () => "../node-modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_u_upload = () => "../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_u_line = () => "../node-modules/uview-plus/components/u-line/u-line.js";
const _easycom_u__input = () => "../node-modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_notice_bar + _easycom_u_upload + _easycom_u_line + _easycom_u__input + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: $data.text
    }),
    b: common_vendor.o($options.afterRead),
    c: common_vendor.o($options.deletePic),
    d: common_vendor.p({
      fileList: $data.fileList,
      multiple: true,
      maxCount: 4,
      previewFullImage: true
    }),
    e: common_vendor.f($data.inputType, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: "fe24963f-3-" + i0,
        c: common_vendor.o(($event) => item.value = $event, item.text),
        d: common_vendor.p({
          placeholder: `请输入${item.text}`,
          type: item.type,
          border: "surround",
          modelValue: item.value
        }),
        e: item.text
      };
    }),
    f: common_vendor.o($options.clearInfo),
    g: common_vendor.p({
      type: "warning",
      text: "一键清空",
      shape: "circle"
    }),
    h: common_vendor.o($options.submit),
    i: common_vendor.p({
      type: "success",
      text: "确定新增",
      shape: "circle"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fe24963f"], ["__file", "D:/object2/carManagement/component/imgUpload.vue"]]);
wx.createComponent(Component);
