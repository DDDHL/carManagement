"use strict";const e=require("../../common/vendor.js"),o={data:()=>({options:[{text:"删除"}]}),methods:{async deleteTime(o){e.index.showLoading({title:"执行中",mask:!0});let t=this.$store.state.loginInfo.info.carId;t.map(((e,i)=>{e.id==o&&(t.splice(i,1),this.$store.state.loginInfo.info.carId=t)}));const i=e.Ls.database();let n=await i.collection("userInfo").where(`\n      openId=="${this.$store.state.loginInfo.info.openId}"`).update({carId:t});console.log(n),0==n.result.errCode?(e.index.hideLoading(),e.index.showToast({title:"删除成功",duration:1500})):(e.index.hideLoading(),e.index.showToast({title:"删除失败",duration:1500,icon:"error"}))}}};if(!Array){(e.resolveComponent("u-swipe-action-item")+e.resolveComponent("u-swipe-action")+e.resolveComponent("u-empty"))()}Math||((()=>"../../node-modules/uview-plus/components/u-swipe-action-item/u-swipe-action-item.js")+(()=>"../../node-modules/uview-plus/components/u-swipe-action/u-swipe-action.js")+(()=>"../../node-modules/uview-plus/components/u-empty/u-empty.js"))();const t=e._export_sfc(o,[["render",function(o,t,i,n,s,d){return{a:e.f(o.$store.state.loginInfo.info.carId,((o,t,i)=>({a:e.t(`${o.license} ，时间：${o.time}`),b:e.o((e=>d.deleteTime(o.id)),o.id),c:o.id,d:"3f9eee6d-1-"+i+",3f9eee6d-0"}))),b:e.p({options:s.options}),c:e.p({show:!o.$store.state.loginInfo.info.carId.length,mode:"list",icon:"/static/listEmpty.png",text:"定时任务为空",textSize:"2vh",marginTop:"25vh"})}}],["__scopeId","data-v-3f9eee6d"]]);wx.createPage(t);
