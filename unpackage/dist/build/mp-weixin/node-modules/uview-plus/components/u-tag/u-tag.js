"use strict";const e=require("../../../../common/vendor.js"),o={name:"u-tag",mixins:[e.mpMixin,e.mixin,e.props],data:()=>({}),computed:{style(){const e={};return this.bgColor&&(e.backgroundColor=this.bgColor),this.color&&(e.color=this.color),this.borderColor&&(e.borderColor=this.borderColor),e},textColor(){const e={};return this.color&&(e.color=this.color),e},imgStyle(){const e="large"===this.size?"17px":"medium"===this.size?"15px":"13px";return{width:e,height:e}},closeSize(){return"large"===this.size?15:"medium"===this.size?13:12},iconSize(){return"large"===this.size?21:"medium"===this.size?19:16},elIconColor(){return this.iconColor?this.iconColor:this.plain?this.type:"#ffffff"}},methods:{closeHandler(){this.$emit("close",this.name)},clickHandler(){this.$emit("click",this.name)}}};if(!Array){(e.resolveComponent("u-icon")+e.resolveComponent("u-transition"))()}Math||((()=>"../u-icon/u-icon.js")+(()=>"../u-transition/u-transition.js"))();const i=e._export_sfc(o,[["render",function(o,i,t,n,s,l){return e.e({a:o.icon},o.icon?e.e({b:o.$u.test.image(o.icon)},o.$u.test.image(o.icon)?{c:o.icon,d:e.s(l.imgStyle)}:{e:e.p({color:l.elIconColor,name:o.icon,size:l.iconSize})}):{},{f:e.t(o.text),g:e.s(l.textColor),h:e.n(`u-tag__text--${o.type}`),i:e.n(o.plain&&`u-tag__text--${o.type}--plain`),j:e.n(`u-tag__text--${o.size}`),k:e.n(`u-tag--${o.shape}`),l:e.n(!o.plain&&`u-tag--${o.type}`),m:e.n(o.plain&&`u-tag--${o.type}--plain`),n:e.n(`u-tag--${o.size}`),o:e.n(o.plain&&o.plainFill&&`u-tag--${o.type}--plain--fill`),p:e.o(((...e)=>l.clickHandler&&l.clickHandler(...e))),q:e.s({marginRight:o.closable?"10px":0,marginTop:o.closable?"10px":0}),r:e.s(l.style),s:o.closable},o.closable?{t:e.p({name:"close",size:l.closeSize,color:"#ffffff"}),v:e.n(`u-tag__close--${o.size}`),w:e.o(((...e)=>l.closeHandler&&l.closeHandler(...e))),x:o.closeColor}:{},{y:e.p({mode:"fade",show:o.show})})}],["__scopeId","data-v-d6c3ec91"]]);wx.createComponent(i);