(function(t){function e(e){for(var r,i,c=e[0],l=e[1],s=e[2],p=0,f=[];p<c.length;p++)i=c[p],a[i]&&f.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,c=1;c<n.length;c++){var l=n[c];0!==a[l]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"31f2":function(t,e,n){"use strict";var r=n("e39b"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-app-bar",{attrs:{app:""}},[n("v-toolbar-title",{staticClass:"headline text-uppercase"},[n("span",[t._v("GEC")]),n("span",{staticClass:"font-weight-light"},[t._v("BIOREPOSITORY")])]),n("v-spacer")],1),n("v-content",[n("HelloWorld"),n("v-container",{attrs:{"grid-list-xs":"","text-center":""}},[n("v-layout",{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[n("v-flex",{attrs:{xs1:""}},[n("v-divider",{staticClass:"mt-6",staticStyle:{"padding-top":"1px","background-color":"rgb(95, 225, 255)"}})],1)],1),n("v-layout",{attrs:{row:"",wrap:"","pt-2":""}},[n("v-flex",{attrs:{xs12:""}},[n("span",{staticClass:"caption grey--text"},[t._v("\n            Photo Credit: Paul Carlson, 2019\n          ")])])],1)],1)],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-parallax",{staticClass:"pa-0 undo-image-transform",attrs:{dark:"",src:n("c2d1")}},[r("v-container",{attrs:{"grid-list-xs":"",fluid:""}},[r("v-layout",{attrs:{"align-center":"",column:"","justify-center":""}},[r("v-flex",{attrs:{xs12:"","text-center":""}},[r("h1",{staticClass:"display-3 mb-4 text-capitalize that-font",attrs:{id:"that-header"}},[t._v("EXPLORE OUR WATERS")]),r("v-spacer",{staticClass:"py-4"})],1),r("v-flex",{attrs:{xs12:"",md6:"","px-auto":""}},[r("v-card",{attrs:{"max-width":"800",width:t.cardWidth,tile:""}},[r("v-card-actions",[r("v-layout",{attrs:{column:"","text-center":"","py-3":"","px-5":""}},[r("v-flex",{attrs:{xs10:"","px-5":""}},[r("v-text-field",{attrs:{name:"query",label:"Search collections",id:"id"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.redirect(e)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),r("v-flex",{attrs:{xs5:"","pa-5":""}},[r("v-btn",{attrs:{color:"rgb(95, 225, 255)",dark:"",href:t.link}},[t._v("\n              Search\n              ")])],1)],1)],1)],1)],1)],1)],1)],1)},c=[],l=(n("b54a"),n("7f7f"),{data:function(){return{content:"",collections:["fish","coral","diatoms"],coll:"fish"}},computed:{cardWidth:function(){return"xs"==this.$vuetify.breakpoint.name?"300":"800"},link:function(){return this.content.trim()?"apps/viewer/#/?q="+this.content.trim():"apps/viewer/#/"}},methods:{redirect:function(){window.location.href=this.link}}}),s=l,u=(n("31f2"),n("2877")),p=n("6544"),f=n.n(p),d=n("8336"),v=n("b0af"),x=n("99d9"),h=n("a523"),b=n("0e8f"),y=n("a722"),m=n("8b9c"),g=n("2fa4"),w=n("8654"),V=Object(u["a"])(s,i,c,!1,null,null,null),O=V.exports;f()(V,{VBtn:d["a"],VCard:v["a"],VCardActions:x["a"],VContainer:h["a"],VFlex:b["a"],VLayout:y["a"],VParallax:m["a"],VSpacer:g["a"],VTextField:w["a"]});var k={name:"App",components:{HelloWorld:O},data:function(){return{}}},C=k,_=n("7496"),j=n("40dc"),S=n("a75b"),P=n("ce7e"),E=n("2a7f"),T=Object(u["a"])(C,a,o,!1,null,null,null),A=T.exports;f()(T,{VApp:_["a"],VAppBar:j["a"],VContainer:h["a"],VContent:S["a"],VDivider:P["a"],VFlex:b["a"],VLayout:y["a"],VSpacer:g["a"],VToolbarTitle:E["a"]});var R=n("f309");r["a"].use(R["a"]);var W=new R["a"]({icons:{iconfont:"mdi"}});r["a"].config.productionTip=!1,new r["a"]({vuetify:W,render:function(t){return t(A)}}).$mount("#app")},c2d1:function(t,e,n){t.exports=n.p+"img/fishb.f5d53a05.jpg"},e39b:function(t,e,n){}});
//# sourceMappingURL=app-legacy.8f697ca1.js.map