"use strict";const e=require("../../../../common/vendor.js"),t={name:"u-loading-icon",mixins:[e.mpMixin,e.mixin,e.props$16],data:()=>({array12:Array.from({length:12}),aniAngel:360,webviewHide:!1,loading:!1}),computed:{otherBorderColor(){const t=e.index.$u.colorGradient(this.color,"#ffffff",100)[80];return"circle"===this.mode?this.inactiveColor?this.inactiveColor:t:"transparent"}},watch:{show(e){}},mounted(){this.init()},methods:{init(){setTimeout((()=>{}),20)},addEventListenerToWebview(){const e=getCurrentPages(),t=e[e.length-1].$getAppWebview();t.addEventListener("hide",(()=>{this.webviewHide=!0})),t.addEventListener("show",(()=>{this.webviewHide=!1}))}}};const i=e._export_sfc(t,[["render",function(t,i,o,r,n,d){return e.e({a:t.show},t.show?e.e({b:!n.webviewHide},n.webviewHide?{}:e.e({c:"spinner"===t.mode},"spinner"===t.mode?{d:e.f(n.array12,((e,t,i)=>({a:t})))}:{},{e:e.n(`u-loading-icon__spinner--${t.mode}`),f:t.color,g:t.$u.addUnit(t.size),h:t.$u.addUnit(t.size),i:t.color,j:d.otherBorderColor,k:d.otherBorderColor,l:d.otherBorderColor,m:`${t.duration}ms`,n:"semicircle"===t.mode||"circle"===t.mode?t.timingFunction:""}),{o:t.text},t.text?{p:e.t(t.text),q:t.$u.addUnit(t.textSize),r:t.textColor}:{},{s:e.s(t.$u.addStyle(t.customStyle)),t:e.n(t.vertical&&"u-loading-icon--vertical")}):{})}],["__scopeId","data-v-adfb58a0"]]);wx.createComponent(i);
