"use strict";const e=require("../../common/vendor.js"),o={data:()=>({list:[{name:"clock",title:"定时提醒"},{name:"file-text",title:"我发布的"}]}),onPullDownRefresh(){e.index.stopPullDownRefresh()},methods:{clickIcon(o){switch(this.list[o].title){case"定时提醒":e.index.navigateTo({url:"/pages/toastTime/toastTime"});break;case"我发布的":e.index.navigateTo({url:"/pages/myCar/myCar"})}},async login(){e.index.showLoading({title:"登录中",mask:!0}),this.getInfo().then((()=>{this.adduser()})).catch((o=>{e.index.hideLoading(),e.index.showModal({content:o.message||"登录失败！",showCancel:!1})}))},async adduser(){const o=e.Ls.database();let t=await o.collection("userInfo").where(`openId=="${this.$store.state.loginInfo.info.openId}"`).get();0==t.result.errCode&&0==t.result.data.length?(console.log("没有用户信息： 新增用户"),o.collection("userInfo").add({openId:this.$store.state.loginInfo.info.openId,carId:[]}),0==t.result.errCode?(console.log(this.$store.state.loginInfo),e.index.hideLoading(),e.index.showToast({title:"登录成功",icon:"success"})):(e.index.hideLoading(),e.index.showModal({content:"登录失败！",showCancel:!1}))):(console.log("有信息， 保存到store"),console.log(this.$store.state.loginInfo),this.$store.state.loginInfo.info.carId=t.result.data[0].carId,e.index.hideLoading(),e.index.showToast({title:"登录成功",icon:"success"}))},getInfo(){return new Promise(((o,t)=>{e.wx$1.getUserProfile({desc:"用于完善用户资料"}).then((e=>{"getUserProfile:ok"===e.errMsg?(this.$store.state.loginInfo.isLogin=!0,this.$store.state.loginInfo.info.userName=e.userInfo.nickName,this.$store.state.loginInfo.info.avatar=e.userInfo.avatarUrl,this.getOpenid().then((e=>{this.$store.state.loginInfo.info.openId=e,o()}))):t()})).catch((e=>{t(e)}))}))},getOpenid:()=>new Promise(((o,t)=>{e.index.login({provider:"weixin",success:n=>{e.Ls.callFunction({name:"getOpenid",data:{code:n.code},success:e=>{"OK"===e.result.res.statusMessage?o(e.result.res.data.openid):t("获取openId失败")},fail:()=>{t("获取openId失败")}})}})}))}};if(!Array){(e.resolveComponent("u-button")+e.resolveComponent("u-icon")+e.resolveComponent("u-grid-item")+e.resolveComponent("u-grid"))()}Math||((()=>"../../node-modules/uview-plus/components/u-button/u-button.js")+(()=>"../../node-modules/uview-plus/components/u-icon/u-icon.js")+(()=>"../../node-modules/uview-plus/components/u-grid-item/u-grid-item.js")+(()=>"../../node-modules/uview-plus/components/u-grid/u-grid.js"))();const t=e._export_sfc(o,[["render",function(o,t,n,s,i,a){return e.e({a:o.$store.state.loginInfo.info.avatar,b:e.t(o.$store.state.loginInfo.info.userName),c:!o.$store.state.loginInfo.isLogin},o.$store.state.loginInfo.isLogin?{f:e.f(i.list,((o,t,n)=>({a:"8993df2d-3-"+n+",8993df2d-2-"+n,b:e.p({customStyle:{paddingTop:"60rpx"},name:o.name,size:33}),c:e.t(o.title),d:t,e:"8993df2d-2-"+n+",8993df2d-1"}))),g:e.o(a.clickIcon),h:e.p({border:!1,col:"2",border:!0})}:{d:e.o(a.login),e:e.p({type:"success",text:"登录"})})}],["__scopeId","data-v-8993df2d"]]);wx.createPage(t);