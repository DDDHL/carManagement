"use strict";const e=require("../common/vendor.js"),t={data:()=>({inputType:[{text:"车牌号码",value:"",type:"text"},{text:"现公里数",value:"",type:"number"},{text:"保养公里",value:"",type:"number"}],fileList:[],text:"最多上传4张图片，默认第一张为封面图。定时通知功能请在车辆详情页中设置哦~"}),methods:{deletePic(e){this.fileList.splice(e.index,1)},async afterRead(e){let t=[].concat(e.file),i=this.fileList.length;t.map((e=>{this.fileList.push({...e,status:"uploading",message:"上传中"})}));for(let s=0;s<t.length;s++){let e=this.fileList[i];this.fileList.splice(i,1,Object.assign(e,{status:"success",message:"",url:""})),i++}},submit(){if(!this.fileList.length)return void e.index.showToast({icon:"error",title:"请至少选一张图",duration:2e3});let t=!1;for(let i=0;i<this.inputType.length;i++)if(!this.inputType[i].value){e.index.showToast({icon:"error",title:`请填写${this.inputType[i].text}`,duration:2e3}),t=!0;break}t||(e.index.showLoading({title:"正在新增~",mask:!0}),Promise.all(this.fileList.map((e=>this.uploadFilePromise(e.thumb)))).then((e=>{this.addData(e)})).catch((t=>{e.index.hideLoading(),e.index.showModal({content:t.message||"新增失败",showCancel:!1})})))},uploadFilePromise:t=>new Promise(((i,s)=>{e.Ls.uploadFile({filePath:t,cloudPath:Date.now()+".png",success(e){i(e.fileID)},fail(e){s(e)}})})),addData(t){e.Ls.database().collection("carInfo").add({license:this.inputType[0].value,km:this.inputType[1].value,maintenance_km:this.inputType[2].value,toastTime:"",imgUrls:t,createTime:e.dayjs().format("YYYY-MM-DD HH:MM")}).then((t=>{e.index.showToast({title:"新增成功",duration:1500}),this.clearInfo()})).catch((t=>{e.index.showModal({content:t.message||"新增失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))},clearInfo(){this.fileList.length=0;for(let e=0;e<this.inputType.length;e++)this.inputType[e].value=""}}};if(!Array){(e.resolveComponent("u-notice-bar")+e.resolveComponent("u-upload")+e.resolveComponent("u-line")+e.resolveComponent("u--input")+e.resolveComponent("u-button"))()}Math||((()=>"../node-modules/uview-plus/components/u-notice-bar/u-notice-bar.js")+(()=>"../node-modules/uview-plus/components/u-upload/u-upload.js")+(()=>"../node-modules/uview-plus/components/u-line/u-line.js")+(()=>"../node-modules/uview-plus/components/u--input/u--input.js")+(()=>"../node-modules/uview-plus/components/u-button/u-button.js"))();const i=e._export_sfc(t,[["render",function(t,i,s,o,n,l){return{a:e.p({text:n.text}),b:e.o(l.afterRead),c:e.o(l.deletePic),d:e.p({fileList:n.fileList,multiple:!0,maxCount:4,previewFullImage:!0}),e:e.f(n.inputType,((t,i,s)=>({a:e.t(t.text),b:"95793483-3-"+s,c:e.o((e=>t.value=e),t.text),d:e.p({placeholder:`请输入${t.text}`,type:t.type,border:"surround",modelValue:t.value}),e:t.text}))),f:e.o(l.clearInfo),g:e.p({type:"warning",text:"一键清空",shape:"circle"}),h:e.o(l.submit),i:e.p({type:"success",text:"确定新增",shape:"circle"})}}],["__scopeId","data-v-95793483"]]);wx.createComponent(i);
