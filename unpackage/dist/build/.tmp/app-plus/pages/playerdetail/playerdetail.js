(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/playerdetail/playerdetail"],{1820:function(t,e,n){"use strict";n.r(e);var i=n("25ae"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},"25ae":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("2f62"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){l(t,e,n[e])})}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={data:function(){return{playlist:{}}},onLoad:function(e){var n=this;t.request({url:"https://api.wulv5.com/music/playlist/detail?id=".concat(e.id),success:function(t){n.playlist=t.data.playlist}})},mounted:function(){console.log(this)},methods:s({},i.default.mapActions(["getsrc"]))};e.default=r}).call(this,n("6e42")["default"])},"3bec":function(t,e,n){"use strict";n.r(e);var i=n("a9e4"),a=n("1820");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("c81d");var l=n("2877"),r=Object(l["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"43ff":function(t,e,n){"use strict";n("3b28");var i=s(n("b0ce")),a=s(n("3bec"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},a9e4:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[n("view",{staticClass:"banner"},[n("image",{staticClass:"banner-img",attrs:{src:t.playlist.coverImgUrl}}),n("view",{staticClass:"banner-title"},[t._v(t._s(t.playlist.name))]),n("view",{staticClass:"banner-description"},[t._v(t._s(t.playlist.description))])]),n("view",{staticClass:"uni-list"},t._l(t.playlist.tracks,function(e,i){return n("view",{key:i,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover",eventid:"c6c5e992-0-"+i},on:{tap:function(n){t.getsrc(e)}}},[n("view",{staticClass:"uni-media-list"},[n("image",{staticClass:"uni-media-list-logo",attrs:{src:e.al.picUrl}}),n("view",{staticClass:"uni-media-list-body"},[n("view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(e.name))]),n("view",{staticClass:"uni-media-list-text-bottom uni-ellipsis"},[t._v(t._s(e.ar[0].name))])])])])}))])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},c81d:function(t,e,n){"use strict";var i=n("e932"),a=n.n(i);a.a},e932:function(t,e,n){}},[["43ff","common/runtime","common/vendor"]]]);