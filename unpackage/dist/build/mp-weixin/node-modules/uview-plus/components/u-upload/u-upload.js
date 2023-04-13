"use strict";const e=require("../../../../common/vendor.js"),t={name:"u-upload",mixins:[e.mpMixin,e.mixin,e.mixinUp,e.props$11],data:()=>({lists:[],isInCount:!0}),watch:{fileList:{immediate:!0,handler(){this.formatFileList()},immediate:!0,deep:!0}},emits:["error","beforeRead","oversize","afterRead","delete","clickPreview"],methods:{formatFileList(){const{fileList:t=[],maxCount:i}=this,s=t.map((t=>Object.assign(Object.assign({},t),{isImage:"image"===this.accept||e.index.$u.test.image(t.url||t.thumb),isVideo:"video"===this.accept||e.index.$u.test.video(t.url||t.thumb),deletable:"boolean"==typeof t.deletable?t.deletable:this.deletable})));this.lists=s,this.isInCount=s.length<i},chooseFile(){const{maxCount:t,multiple:i,lists:s,disabled:a}=this;if(a)return;let o;try{o=e.index.$u.test.array(this.capture)?this.capture:this.capture.split(",")}catch(l){o=[]}e.chooseFile(Object.assign({accept:this.accept,multiple:this.multiple,capture:o,compressed:this.compressed,maxDuration:this.maxDuration,sizeType:this.sizeType,camera:this.camera},{maxCount:t-s.length})).then((e=>{this.onBeforeRead(i?e:e[0])})).catch((e=>{this.$emit("error",e)}))},onBeforeRead(t){const{beforeRead:i,useBeforeRead:s}=this;let a=!0;e.index.$u.test.func(i)&&(a=i(t,this.getDetail())),s&&(a=new Promise(((e,i)=>{this.$emit("beforeRead",Object.assign(Object.assign({file:t},this.getDetail()),{callback:t=>{t?e():i()}}))}))),a&&(e.index.$u.test.promise(a)?a.then((e=>this.onAfterRead(e||t))):this.onAfterRead(t))},getDetail(e){return{name:this.name,index:null==e?this.fileList.length:e}},onAfterRead(e){const{maxSize:t,afterRead:i}=this;(Array.isArray(e)?e.some((e=>e.size>t)):e.size>t)?this.$emit("oversize",Object.assign({file:e},this.getDetail())):("function"==typeof i&&i(e,this.getDetail()),this.$emit("afterRead",Object.assign({file:e},this.getDetail())))},deleteItem(e){this.$emit("delete",Object.assign(Object.assign({},this.getDetail(e)),{file:this.fileList[e]}))},onPreviewImage(t){t.isImage&&this.previewFullImage&&e.index.previewImage({urls:this.lists.filter((t=>"image"===this.accept||e.index.$u.test.image(t.url||t.thumb))).map((e=>e.url||e.thumb)),current:t.url||t.thumb,fail(){e.index.$u.toast("预览图片失败")}})},onPreviewVideo(t){if(!this.data.previewFullImage)return;const{index:i}=t.currentTarget.dataset,{lists:s}=this.data;e.wx$1.previewMedia({sources:s.filter((e=>isVideoFile(e))).map((e=>Object.assign(Object.assign({},e),{type:"video"}))),current:i,fail(){e.index.$u.toast("预览视频失败")}})},onClickPreview(e){const{index:t}=e.currentTarget.dataset,i=this.data.lists[t];this.$emit("clickPreview",Object.assign(Object.assign({},i),this.getDetail(t)))}}};if(!Array){(e.resolveComponent("u-icon")+e.resolveComponent("u-loading-icon"))()}Math||((()=>"../u-icon/u-icon.js")+(()=>"../u-loading-icon/u-loading-icon.js"))();const i=e._export_sfc(t,[["render",function(t,i,s,a,o,l){return e.e({a:t.previewImage},t.previewImage?{b:e.f(o.lists,((i,s,a)=>e.e({a:i.isImage||i.type&&"image"===i.type},i.isImage||i.type&&"image"===i.type?{b:i.thumb||i.url,c:t.imageMode,d:e.o((e=>l.onPreviewImage(i)),s),e:e.s({width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)})}:{f:"c0023205-0-"+a,g:e.p({color:"#80CBF9",size:"26",name:i.isVideo||i.type&&"video"===i.type?"movie":"folder"}),h:e.t(i.isVideo||i.type&&"video"===i.type?"视频":"文件")},{i:"uploading"===i.status||"failed"===i.status},"uploading"===i.status||"failed"===i.status?e.e({j:"failed"===i.status},"failed"===i.status?{k:"c0023205-1-"+a,l:e.p({name:"close-circle",color:"#ffffff",size:"25"})}:{m:"c0023205-2-"+a,n:e.p({size:"22",mode:"circle",color:"#ffffff"})},{o:i.message},i.message?{p:e.t(i.message)}:{}):{},{q:"uploading"!==i.status&&(t.deletable||i.deletable)},"uploading"!==i.status&&(t.deletable||i.deletable)?{r:"c0023205-3-"+a,s:e.p({name:"close",color:"#ffffff",size:"10"}),t:e.o((e=>l.deleteItem(s)),s)}:{},{v:"success"===i.status},"success"===i.status?{w:"c0023205-4-"+a,x:e.p({name:"checkmark",color:"#ffffff",size:"12"})}:{},{y:s})))}:{},{c:o.isInCount},o.isInCount?e.e({d:t.$slots.default||t.$slots.$default},t.$slots.default||t.$slots.$default?{e:e.o(((...e)=>l.chooseFile&&l.chooseFile(...e)))}:e.e({f:e.p({name:t.uploadIcon,size:"26",color:t.uploadIconColor}),g:t.uploadText},t.uploadText?{h:e.t(t.uploadText)}:{},{i:t.disabled?"":"u-upload__button--hover",j:e.o(((...e)=>l.chooseFile&&l.chooseFile(...e))),k:e.n(t.disabled&&"u-upload__button--disabled"),l:e.s({width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)})})):{},{m:e.s(t.$u.addStyle(t.customStyle))})}],["__scopeId","data-v-c0023205"]]);wx.createComponent(i);
