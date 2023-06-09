"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swipe-action",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$12],
  data() {
    return {};
  },
  provide() {
    return {
      swipeAction: this
    };
  },
  computed: {
    // 这里computed的变量，都是子组件u-swipe-action-item需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
    // 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-swipe-action-item)
    // 拉取父组件新的变化后的参数
    parentData() {
      return [this.autoClose];
    }
  },
  watch: {
    // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
    parentData() {
      if (this.children.length) {
        this.children.map((child) => {
          typeof child.updateParentData === "function" && child.updateParentData();
        });
      }
    }
  },
  created() {
    this.children = [];
  },
  methods: {
    closeOther(child) {
      if (this.autoClose) {
        this.children.map((item, index) => {
          if (child !== item) {
            item.closeHandler();
          }
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/object2/carManagement/node_modules/uview-plus/components/u-swipe-action/u-swipe-action.vue"]]);
wx.createComponent(Component);
