"use strict";const t=require("../../../../common/vendor.js"),e={name:"u-grid",mixins:[t.mpMixin,t.mixin,t.props$10],data:()=>({index:0,width:0}),watch:{parentData(){this.children.length&&this.children.map((t=>{"function"==typeof t.updateParentData&&t.updateParentData()}))}},created(){this.children=[]},computed:{parentData(){return[this.hoverClass,this.col,this.size,this.border]},gridStyle(){let e={};switch(this.align){case"left":default:e.justifyContent="flex-start";break;case"center":e.justifyContent="center";break;case"right":e.justifyContent="flex-end"}return t.index.$u.deepMerge(e,t.index.$u.addStyle(this.customStyle))}},methods:{childClick(t){this.$emit("click",t)}}};const i=t._export_sfc(e,[["render",function(e,i,n,r,a,s){return{a:t.s(s.gridStyle)}}],["__scopeId","data-v-1e856121"]]);wx.createComponent(i);
