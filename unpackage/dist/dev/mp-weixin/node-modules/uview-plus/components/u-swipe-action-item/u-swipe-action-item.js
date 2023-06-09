"use strict";
const common_vendor = require("../../../../common/vendor.js");
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("closeOther", "setState");
};
const _sfc_main = {
  name: "u-swipe-action-item",
  emits: ["click"],
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11, common_vendor.touch],
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11, common_vendor.touch, common_vendor.wxs],
  data() {
    return {
      // 按钮的尺寸信息
      size: {},
      // 父组件u-swipe-action的参数
      parentData: {
        autoClose: true
      },
      // 当前状态，open-打开，close-关闭
      status: "close"
    };
  },
  watch: {
    // 由于wxs无法直接读取外部的值，需要在外部值变化时，重新执行赋值逻辑
    wxsInit(newValue, oldValue) {
      this.queryRect();
    }
  },
  computed: {
    wxsInit() {
      return [this.disabled, this.autoClose, this.threshold, this.options, this.duration];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.updateParentData();
      common_vendor.index.$u.sleep().then(() => {
        this.queryRect();
      });
    },
    updateParentData() {
      this.getParentData("u-swipe-action");
    },
    // 查询节点
    queryRect() {
      this.$uGetRect(".u-swipe-action-item__right__button", true).then((buttons) => {
        this.size = {
          buttons,
          show: this.show,
          disabled: this.disabled,
          threshold: this.threshold,
          duration: this.duration
        };
      });
    },
    // 按钮被点击
    buttonClickHandler(item, index) {
      this.$emit("click", {
        index,
        name: this.name
      });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.options, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: "8b5d76c2-0-" + i0,
        c: common_vendor.p({
          name: item.icon,
          color: item.style && item.style.color ? item.style.color : "#ffffff",
          size: item.iconSize ? _ctx.$u.addUnit(item.iconSize) : item.style && item.style.fontSize ? _ctx.$u.getPx(item.style.fontSize) * 1.2 : 17,
          customStyle: {
            marginRight: item.text ? "2px" : 0
          }
        })
      } : {}, {
        d: item.text
      }, item.text ? {
        e: common_vendor.t(item.text),
        f: common_vendor.s({
          color: item.style && item.style.color ? item.style.color : "#ffffff",
          fontSize: item.style && item.style.fontSize ? item.style.fontSize : "16px",
          lineHeight: item.style && item.style.fontSize ? item.style.fontSize : "16px"
        })
      } : {}, {
        g: common_vendor.s({
          backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
          borderRadius: item.style && item.style.borderRadius ? item.style.borderRadius : "0",
          padding: item.style && item.style.borderRadius ? "0" : "0 15px"
        }),
        h: common_vendor.s(item.style),
        i: index,
        j: `u-swipe-action-item__right__button-${index}`,
        k: common_vendor.s({
          alignItems: item.style && item.style.borderRadius ? "center" : "stretch"
        }),
        l: common_vendor.o(($event) => $options.buttonClickHandler(item, index), index)
      });
    }),
    b: $data.status,
    c: $data.size
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8b5d76c2"], ["__file", "D:/object2/carManagement/node_modules/uview-plus/components/u-swipe-action-item/u-swipe-action-item.vue"]]);
wx.createComponent(Component);
