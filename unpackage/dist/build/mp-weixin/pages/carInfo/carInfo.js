"use strict";const e=require("../../common/vendor.js"),t={data:()=>({carInfo:{},show:!1,title:"",content:"",type:"",popShow:!1,maintenance_km:0,km:0,license:""}),onLoad(){this.carInfo=this.$store.state.clickItem,this.flashData()},methods:{async getData(){},flashData(){this.maintenance_km=this.carInfo.maintenance_km,this.km=this.carInfo.km,this.license=this.carInfo.license},async save(){const t=e.Ls.database();if("update"===this.content){if(!this.km||!this.maintenance_km||!this.license)return void e.index.showToast({icon:"error",title:"请填写完整！",duration:2e3});e.index.showLoading({title:"执行中",mask:!0}),await t.collection("carInfo").where(`_id=="${this.carInfo._id}"`).update({maintenance_km:this.maintenance_km,km:this.km,license:this.license}),e.index.hideLoading(),this.carInfo.maintenance_km=this.maintenance_km,this.carInfo.km=this.maintenance_km,this.carInfo.license=this.license,e.index.showToast({title:"更新成功",duration:1500}),this.popShow=!1}},toast(e){switch(this.type=e,e){case"set":this.title="设置定时提醒",this.content="set",this.popShow=!0;break;case"delete":this.title="删除操作",this.content="确定要删除该车辆？",this.show=!0;break;case"update":this.title="编辑车辆信息",this.content="update",this.popShow=!0}},confirm(){e.index.showLoading({title:"执行中",mask:!0}),this.deleteData(),this.show=!1},setToastTime(){},updateData(){},async deleteData(){const t=e.Ls.database();await t.collection("carInfo").where(`_id=="${this.carInfo._id}"`).remove(),await e.Ls.callFunction({name:"carManager",data:{type:"deleteImg",fileUrls:this.carInfo.imgUrls}}),e.index.hideLoading(),e.index.showToast({title:"删除成功",mask:!0,duration:1500}),setTimeout((()=>{e.index.switchTab({url:"/pages/index/index"})}),1500)}}};if(!Array){(e.resolveComponent("u-swiper")+e.resolveComponent("u-line")+e.resolveComponent("u-tag")+e.resolveComponent("u-button")+e.resolveComponent("u-modal")+e.resolveComponent("u--input")+e.resolveComponent("u-popup"))()}Math||((()=>"../../node-modules/uview-plus/components/u-swiper/u-swiper.js")+(()=>"../../node-modules/uview-plus/components/u-line/u-line.js")+(()=>"../../node-modules/uview-plus/components/u-tag/u-tag.js")+(()=>"../../node-modules/uview-plus/components/u-button/u-button.js")+(()=>"../../node-modules/uview-plus/components/u-modal/u-modal.js")+(()=>"../../node-modules/uview-plus/components/u--input/u--input.js")+(()=>"../../node-modules/uview-plus/components/u-popup/u-popup.js"))();const n=e._export_sfc(t,[["render",function(t,n,o,s,i,a){return e.e({a:e.p({list:i.carInfo.imgUrls,height:"300","img-mode":"aspectFit",indicator:!0,indicatorMode:"line",circular:!0}),b:e.p({text:"车牌号",size:"mini"}),c:e.t(i.carInfo.license),d:e.p({text:"公里数",size:"mini",type:"warning"}),e:e.t(i.carInfo.km),f:e.t(i.carInfo.maintenance_km),g:e.o((e=>a.toast("delete"))),h:e.p({type:"error",text:"删除车辆"}),i:e.o((e=>a.toast("set"))),j:e.p({type:"warning",text:"设置提醒"}),k:e.o((e=>a.toast("update"))),l:e.p({type:"success",text:"编辑信息"}),m:e.o((e=>i.show=!1)),n:e.o(a.confirm),o:e.p({show:i.show,showCancelButton:!0,buttonReverse:!0,title:i.title,content:i.content}),p:e.t(i.title),q:"update"===i.content},"update"===i.content?{r:e.o((e=>i.license=e)),s:e.p({placeholder:"请输入车牌号",border:"surround",modelValue:i.license}),t:e.o((e=>i.km=e)),v:e.p({placeholder:"请输入公里数",type:"number",border:"surround",modelValue:i.km}),w:e.o((e=>i.maintenance_km=e)),x:e.p({placeholder:"请输入保养公里数",type:"number",border:"surround",modelValue:i.maintenance_km})}:{},{y:e.o(a.save),z:e.p({type:"success",text:"保存设置"}),A:e.o((e=>i.popShow=!1)),B:e.p({show:i.popShow,mode:"bottom",round:"20"})})}],["__scopeId","data-v-d5f7ee03"]]);wx.createPage(n);