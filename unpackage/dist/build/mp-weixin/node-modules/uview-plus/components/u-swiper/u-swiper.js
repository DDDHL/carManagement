"use strict";const e=require("../../../../common/vendor.js"),t={name:"u-swiper",mixins:[e.mpMixin,e.mixin,e.props$4],data:()=>({currentIndex:0}),watch:{current(e,t){e!==t&&(this.currentIndex=e)}},computed:{itemStyle(){return t=>{const i={};return this.nextMargin&&this.previousMargin&&(i.borderRadius=e.index.$u.addUnit(this.radius),t!==this.currentIndex&&(i.transform="scale(0.92)")),i}}},methods:{getItemType(t){return"string"==typeof t?e.index.$u.test.video(this.getSource(t))?"video":"image":"object"==typeof t&&this.keyName?t.type?"image"===t.type?"image":"video"===t.type?"video":"image":e.index.$u.test.video(this.getSource(t))?"video":"image":void 0},getSource(t){return"string"==typeof t?t:"object"==typeof t&&this.keyName?t[this.keyName]:(e.index.$u.error("请按格式传递列表参数"),"")},change(e){const{current:t}=e.detail;this.pauseVideo(this.currentIndex),this.currentIndex=t,this.$emit("change",e.detail)},pauseVideo(t){const i=this.getSource(this.list[t]);if(e.index.$u.test.video(i)){e.index.createVideoContext(`video-${t}`,this).pause()}},getPoster:e=>"object"==typeof e&&e.poster?e.poster:"",clickHandler(e){this.$emit("click",e)}}};if(!Array){(e.resolveComponent("u-loading-icon")+e.resolveComponent("u-swiper-indicator"))()}Math||((()=>"../u-loading-icon/u-loading-icon.js")+(()=>"../u-swiper-indicator/u-swiper-indicator.js"))();const i=e._export_sfc(t,[["render",function(t,i,o,n,r,d){return e.e({a:t.loading},t.loading?{b:e.p({mode:"circle"})}:{c:e.f(t.list,((i,o,n)=>e.e({a:"image"===d.getItemType(i)},"image"===d.getItemType(i)?{b:d.getSource(i),c:t.imgMode,d:e.o((e=>d.clickHandler(o)),o),e:t.$u.addUnit(t.height),f:t.$u.addUnit(t.radius)}:{},{g:"video"===d.getItemType(i)},"video"===d.getItemType(i)?{h:`video-${o}`,i:d.getSource(i),j:d.getPoster(i),k:t.showTitle&&t.$u.test.object(i)&&i.title?i.title:"",l:t.$u.addUnit(t.height),m:e.o((e=>d.clickHandler(o)),o)}:{},{n:t.showTitle&&t.$u.test.object(i)&&i.title&&t.$u.test.image(d.getSource(i))},t.showTitle&&t.$u.test.object(i)&&i.title&&t.$u.test.image(d.getSource(i))?{o:e.t(i.title)}:{},{p:e.s(d.itemStyle(o)),q:o}))),d:t.$u.addUnit(t.height),e:e.o(((...e)=>d.change&&d.change(...e))),f:t.circular,g:t.interval,h:t.duration,i:t.autoplay,j:t.current,k:t.currentItemId,l:t.$u.addUnit(t.previousMargin),m:t.$u.addUnit(t.nextMargin),n:t.acceleration,o:t.displayMultipleItems,p:t.easingFunction},{q:!t.loading&&t.indicator&&!t.showTitle},t.loading||!t.indicator||t.showTitle?{}:{r:e.p({indicatorActiveColor:t.indicatorActiveColor,indicatorInactiveColor:t.indicatorInactiveColor,length:t.list.length,current:r.currentIndex,indicatorMode:t.indicatorMode})},{s:e.s(t.$u.addStyle(t.indicatorStyle)),t:t.bgColor,v:t.$u.addUnit(t.height),w:t.$u.addUnit(t.radius)})}],["__scopeId","data-v-bb70be48"]]);wx.createComponent(i);
