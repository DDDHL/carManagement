"use strict";const t=require("../../../../common/vendor.js"),e=t=>{t.wxsCallMethods||(t.wxsCallMethods=[]),t.wxsCallMethods.push("closeOther","setState")},s={name:"u-swipe-action-item",emits:["click"],mixins:[t.mpMixin,t.mixin,t.props$11,t.touch],mixins:[t.mpMixin,t.mixin,t.props$11,t.touch,t.wxs],data:()=>({size:{},parentData:{autoClose:!0},status:"close"}),watch:{wxsInit(t,e){this.queryRect()}},computed:{wxsInit(){return[this.disabled,this.autoClose,this.threshold,this.options,this.duration]}},mounted(){this.init()},methods:{init(){this.updateParentData(),t.index.$u.sleep().then((()=>{this.queryRect()}))},updateParentData(){this.getParentData("u-swipe-action")},queryRect(){this.$uGetRect(".u-swipe-action-item__right__button",!0).then((t=>{this.size={buttons:t,show:this.show,disabled:this.disabled,threshold:this.threshold,duration:this.duration}}))},buttonClickHandler(t,e){this.$emit("click",{index:e,name:this.name})}}};if(!Array){t.resolveComponent("u-icon")()}Math,e(s);const i=t._export_sfc(s,[["render",function(e,s,i,o,n,l){return{a:t.f(e.options,((s,i,o)=>t.e({a:s.icon},s.icon?{b:"3665eb91-0-"+o,c:t.p({name:s.icon,color:s.style&&s.style.color?s.style.color:"#ffffff",size:s.iconSize?e.$u.addUnit(s.iconSize):s.style&&s.style.fontSize?1.2*e.$u.getPx(s.style.fontSize):17,customStyle:{marginRight:s.text?"2px":0}})}:{},{d:s.text},s.text?{e:t.t(s.text),f:t.s({color:s.style&&s.style.color?s.style.color:"#ffffff",fontSize:s.style&&s.style.fontSize?s.style.fontSize:"16px",lineHeight:s.style&&s.style.fontSize?s.style.fontSize:"16px"})}:{},{g:t.s({backgroundColor:s.style&&s.style.backgroundColor?s.style.backgroundColor:"#C7C6CD",borderRadius:s.style&&s.style.borderRadius?s.style.borderRadius:"0",padding:s.style&&s.style.borderRadius?"0":"0 15px"}),h:t.s(s.style),i:i,j:`u-swipe-action-item__right__button-${i}`,k:t.s({alignItems:s.style&&s.style.borderRadius?"center":"stretch"}),l:t.o((t=>l.buttonClickHandler(s,i)),i)}))),b:n.status,c:n.size}}],["__scopeId","data-v-3665eb91"]]);wx.createComponent(i);
