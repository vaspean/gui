(function(t){function e(e){for(var a,s,i=e[0],l=e[1],c=e[2],d=0,p=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&p.push(n[s][0]),n[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],a=!0,i=1;i<r.length;i++){var l=r[i];0!==n[l]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},n={app:0},o=[];function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[t.$store.state.appLoaded?t._e():r("Loader"),r("Toolbar"),r("ToolbarBottom"),r("Table"),r("a",{staticClass:"button15 button15_send",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.editDone.apply(null,arguments)}}},[t._v("Отправить")])],1)},o=[],s=r("1da1"),i=(r("96cf"),r("bc3a")),l=r.n(i),c=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},u=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"loader"},[a("img",{staticClass:"loader__img",attrs:{src:r("fa5e"),alt:""}})])}],d={},p=d,g=r("2877"),h=Object(g["a"])(p,c,u,!1,null,null,null),f=h.exports,m=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",{staticClass:"gui__modes"},[r("li",{staticClass:"form_radio_btn",on:{click:function(e){return t.$store.commit("signalsSelectedClear")}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.modeClick,expression:"modeClick"}],attrs:{type:"radio",id:"radio_inverse",name:"mode",value:"2",checked:""},domProps:{checked:t._q(t.modeClick,"2")},on:{change:function(e){t.modeClick="2"}}}),t._m(0)]),r("li",{staticClass:"form_radio_btn",on:{click:function(e){return t.$store.commit("signalsSelectedClear")}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.modeClick,expression:"modeClick"}],attrs:{type:"radio",id:"radio_toOne",name:"mode",value:"1"},domProps:{checked:t._q(t.modeClick,"1")},on:{change:function(e){t.modeClick="1"}}}),t._m(1)]),r("li",{staticClass:"form_radio_btn",on:{click:function(e){return t.$store.commit("signalsSelectedClear")}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.modeClick,expression:"modeClick"}],attrs:{type:"radio",id:"radio_toZero",name:"mode",value:"0"},domProps:{checked:t._q(t.modeClick,"0")},on:{change:function(e){t.modeClick="0"}}}),t._m(2)]),r("li",{staticClass:"form_radio_btn",on:{click:function(e){return t.$store.commit("signalsSelectedClear")}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.modeClick,expression:"modeClick"}],attrs:{type:"radio",id:"radio_editor",name:"mode",value:"3"},domProps:{checked:t._q(t.modeClick,"3")},on:{change:function(e){t.modeClick="3"}}}),t._m(3)]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){e.preventDefault(),t.currentCellWidth=-3}}},[t._v("ᐊ")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){e.preventDefault(),t.currentCellWidth=3}}},[t._v("ᐅ")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){e.preventDefault(),t.currentCellHeight=-3}}},[t._v("ᐃ")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){e.preventDefault(),t.currentCellHeight=3}}},[t._v("ᐁ")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.$store.commit("clearHeightAndWidth")}}},[t._v("С")])]),r("li",{staticClass:"pagination"},[r("a",{staticClass:"button15",class:{disabled:1==t.$store.state.editMode},attrs:{id:"previousPage",href:""},on:{click:function(e){return e.preventDefault(),t.previousPage()}}},[t._v("←")]),r("span",[t._v("Страница: "+t._s(t.page)+"/"+t._s(t.pages))]),r("a",{staticClass:"button15",class:{disabled:1==t.$store.state.editMode},attrs:{id:"nextPage",href:""},on:{click:function(e){return e.preventDefault(),t.nextPage()}}},[t._v("→")])]),r("li",[r("span",{staticStyle:{"margin-right":"5px","font-size":"15px"}},[t._v("Перемещение:")]),r("a",{staticClass:"button15",attrs:{id:"previousPage",href:""},on:{click:function(e){return e.preventDefault(),t.$store.commit("editModeClick")}}},[t._v(t._s(t.editModeMessage))])])])},v=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("label",{staticClass:"radio__label radio__label_inverse",attrs:{for:"radio_inverse"}},[r("span",[t._v("¬")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("label",{staticClass:"radio__label radio__label_toOne",attrs:{for:"radio_toOne"}},[r("span",[t._v("1")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("label",{staticClass:"radio__label radio__label_toZero",attrs:{for:"radio_toZero"}},[r("span",[t._v("0")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("label",{staticClass:"radio__label radio__label_editor",attrs:{for:"radio_editor"}},[r("span",[t._v("✎")])])}],y=(r("159b"),r("b0c0"),{data:function(){return{checkPostOk:!1}},methods:{nextPage:function(){var t=this;1!=this.$store.state.editMode&&(console.log(this.currentDataToServer()),l.a.post("http://127.0.0.1:7999/dataPage?page=".concat(this.page),JSON.parse(JSON.stringify(this.currentDataToServer()))).then((function(e){t.page<t.pages&&(t.page+=1);var r=document.getElementsByClassName("table__container");r[0].scrollLeft=0,t.getDataByPage(t.page)})))},previousPage:function(){var t=this;1!=this.$store.state.editMode&&(console.log(this.currentDataToServer()),l.a.post("http://127.0.0.1:7999/dataPage?page=".concat(this.page),JSON.parse(JSON.stringify(this.currentDataToServer()))).then((function(e){t.page>1&&(t.page-=1);var r=document.getElementsByClassName("table__container");r[0].scrollLeft=8188,t.getDataByPage(t.page)})))},currentDataToServer:function(){var t=[];return this.$store.state.mainDataArray.forEach((function(e){void 0!=e.groupId&&"group"!=e.type||t.push(e),void 0!=e.groupId&&"signal"==e.type&&t.forEach((function(t){"group"==t.type&&t.data!=[]&&(t.data=[])}))})),this.$store.state.mainDataArray.forEach((function(e){void 0!=e.groupId&&"signal"==e.type&&t.forEach((function(t){if("group"==t.type&&t.groupId==e.groupId){var r={};r.id=e.id,r.name=e.name,r.value=e.value,t.data.push(JSON.parse(JSON.stringify(r)))}}))})),t},getDataByPage:function(t){var e=this;l.a.get("http://127.0.0.1:7999/dataPage?page=".concat(t)).then((function(t){var r;r="signal"!=t.data[0].type?t.data[0].data[0].value.length:t.data[0].value.length;var a={numOfStr:t.data.length,numOfTime:r},n=[];t.data.forEach((function(t){n.push(t),"group"==t.type&&(t.data.forEach((function(e){e.readOnly=t.readOnly,e.color=t.color,e.type="signal",e.groupId=t.groupId,e.partOfGroup=t.data.indexOf(e),n.push(JSON.parse(JSON.stringify(e)))})),e.$set(t,"data",t.data.length))})),l.a.get("http://127.0.0.1:7999/pagination").then((function(t){e.$store.commit("pagesSet",t.data.pages)})),e.$store.commit("updateMainDataArray",n),e.$store.commit("startInfoForTableSet",a)}))}},computed:{editModeMessage:function(){return this.$store.state.editMode?"Выключить":"Включить"},currentCellWidth:{get:function(){return this.$store.state.currentCellWidth},set:function(t){this.$store.commit("changeCellWidth",t)}},currentCellHeight:{get:function(){return this.$store.state.currentCellHeight},set:function(t){this.$store.commit("changeCellHeight",t)}},modeClick:{get:function(){return this.$store.state.modeClick},set:function(t){this.$store.commit("modeClickSet",t)}},pages:{get:function(){return this.$store.state.pages},set:function(t){this.$store.commit("pagesSet",t)}},page:{get:function(){return this.$store.state.page},set:function(t){this.$store.commit("pageSet",t)}}},watch:{currentCellHeight:function(t){document.documentElement.style.setProperty("--size-cell-height","".concat(t,"px"))},currentCellWidth:function(t){document.documentElement.style.setProperty("--size-cell-width","".concat(t,"px"))}}}),S=y,C=Object(g["a"])(S,m,v,!1,null,null,null),A=C.exports,_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.signalsSelectedArr.length>0||t.$store.state.cellsSelectedArr.length>1,expression:"($store.state.signalsSelectedArr.length > 0) || ($store.state.cellsSelectedArr.length>1)"}],staticClass:"toolbar"},[r("span",[t._v("Выбрано "+t._s(t.countOfCurrentArray)+" шт")]),r("span",{staticClass:"clearSelected",on:{click:function(e){return t.$store.commit("allArrSelectedClear")}}},[t._v("❎")]),r("ul",[r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.allInvert.apply(null,arguments)}}},[t._v("Инвертировать")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.allToOne.apply(null,arguments)}}},[t._v("Задать в 1")])]),r("li",[r("a",{staticClass:"button15",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.allToZero.apply(null,arguments)}}},[t._v("Задать в 0")])]),0!=t.$store.state.signalsSelectedArr.length?r("li",{staticClass:"selectColorChose"},[r("span",[t._v("Цвет:")]),r("select",{directives:[{name:"model",rawName:"v-model",value:t.chosenColor,expression:"chosenColor"}],style:"background-color:"+t.chosenColor,attrs:{name:"colorpicker"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.chosenColor=e.target.multiple?r:r[0]}}},[r("option",{staticStyle:{"background-color":"navy"},attrs:{value:"navy"}}),r("option",{staticStyle:{"background-color":"blue"},attrs:{value:"blue"}}),r("option",{staticStyle:{"background-color":"teal"},attrs:{value:"teal"}}),r("option",{staticStyle:{"background-color":"aqua"},attrs:{value:"aqua"}}),r("option",{staticStyle:{"background-color":"green"},attrs:{value:"green"}}),r("option",{staticStyle:{"background-color":"lime"},attrs:{value:"lime"}}),r("option",{staticStyle:{"background-color":"olive"},attrs:{value:"olive"}}),r("option",{staticStyle:{"background-color":"yellow"},attrs:{value:"yellow"}}),r("option",{staticStyle:{"background-color":"maroon"},attrs:{value:"maroon"}}),r("option",{staticStyle:{"background-color":"red"},attrs:{value:"red"}}),r("option",{staticStyle:{"background-color":"purple"},attrs:{value:"purple"}}),r("option",{staticStyle:{"background-color":"fuchsia"},attrs:{value:"fuchsia"}}),r("option",{staticStyle:{"background-color":"gray"},attrs:{value:"gray"}}),r("option",{staticStyle:{"background-color":"black"},attrs:{value:"black"}})]),r("a",{staticClass:"button15",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.setSignalColor.apply(null,arguments)}}},[t._v("Задать")])]):t._e()]),r("div",{staticClass:"generator"},[r("span",[t._v("Генератор:")]),r("label",{attrs:{for:"generatorInputZero"}},[t._v("Кол-во нулей")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.generatorProperty.countZero,expression:"generatorProperty.countZero"}],attrs:{type:"number",id:"generatorInputZero"},domProps:{value:t.generatorProperty.countZero},on:{input:function(e){e.target.composing||t.$set(t.generatorProperty,"countZero",e.target.value)}}}),r("label",{attrs:{for:"generatorInputOne"}},[t._v("Кол-во единиц")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.generatorProperty.countOne,expression:"generatorProperty.countOne"}],attrs:{type:"number",id:"generatorInputOne"},domProps:{value:t.generatorProperty.countOne},on:{input:function(e){e.target.composing||t.$set(t.generatorProperty,"countOne",e.target.value)}}}),r("label",{attrs:{for:"generatorCheckbox"}},[t._v("Начать с 1")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.generatorProperty.startFromOne,expression:"generatorProperty.startFromOne"}],attrs:{type:"checkbox",id:"generatorCheckbox"},domProps:{checked:Array.isArray(t.generatorProperty.startFromOne)?t._i(t.generatorProperty.startFromOne,null)>-1:t.generatorProperty.startFromOne},on:{change:function(e){var r=t.generatorProperty.startFromOne,a=e.target,n=!!a.checked;if(Array.isArray(r)){var o=null,s=t._i(r,o);a.checked?s<0&&t.$set(t.generatorProperty,"startFromOne",r.concat([o])):s>-1&&t.$set(t.generatorProperty,"startFromOne",r.slice(0,s).concat(r.slice(s+1)))}else t.$set(t.generatorProperty,"startFromOne",n)}}}),r("a",{staticClass:"button15",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.generatorClick.apply(null,arguments)}}},[t._v("Задать")])]),0!=t.$store.state.signalsSelectedArr.length?r("div",{staticClass:"moveSignal"},[r("a",{staticClass:"button15",class:{disabled:!t.$store.state.editMode},attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.moveSignalsTop.apply(null,arguments)}}},[t._v("ᐃ")]),r("a",{staticClass:"button15",class:{disabled:!t.$store.state.editMode},attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.moveSignalsBottom.apply(null,arguments)}}},[t._v("ᐁ")])]):t._e()])},$=[],b=(r("caad"),r("2532"),r("d81d"),r("a434"),{data:function(){return{generatorProperty:{countZero:1,countOne:1,startFromOne:!1},chosenColor:"Black"}},computed:{countOfCurrentArray:function(){var t;return t=0===this.$store.state.cellsSelectedArr.length?this.$store.state.signalsSelectedArr.length:this.$store.state.cellsSelectedArr.length,t}},methods:{moveSignalsTop:function(){this.$store.state.editMode&&this.$store.commit("selectedSignalsMove","up")},moveSignalsBottom:function(){this.$store.state.editMode&&this.$store.commit("selectedSignalsMove","down")},interactWithSelectedSignals:function(t){var e=this;this.$store.state.mainDataArray.forEach((function(r){if(e.$store.state.signalsSelectedArr.includes(r.id)&&1!=r.readOnly&&"signal"==r.type){var a=r.value,n=a.map((function(e){switch(t){case"invert":return e=0===e?1:0;case"toOne":return 1;case"toZero":return 0}}));e.$set(r,"value",JSON.parse(JSON.stringify(n)))}}))},interactWithSelectedCellsArea:function(t){var e=this;this.$store.state.cellsSelectedArr.forEach((function(r){var a=e.$store.state.mainDataArray[r.id].value;switch(t){case"invert":0===a[r.index]?a[r.index]=1:a[r.index]=0;break;case"toOne":a[r.index]=1;break;case"toZero":a[r.index]=0;break}e.$set(e.$store.state.mainDataArray[r.id],"value",JSON.parse(JSON.stringify(a)))}))},allInvert:function(){0!=this.$store.state.signalsSelectedArr.length?this.interactWithSelectedSignals("invert"):0!=this.$store.state.cellsSelectedArr.length&&this.interactWithSelectedCellsArea("invert")},allToOne:function(){0!=this.$store.state.signalsSelectedArr.length?this.interactWithSelectedSignals("toOne"):0!=this.$store.state.cellsSelectedArr.length&&this.interactWithSelectedCellsArea("toOne")},allToZero:function(){0!=this.$store.state.signalsSelectedArr.length?this.interactWithSelectedSignals("toZero"):0!=this.$store.state.cellsSelectedArr.length&&this.interactWithSelectedCellsArea("toZero")},generatorClick:function(){var t=this;if(this.generatorProperty.countOne<1||this.generatorProperty.countZero<1)alert("Пожалуйста, выставите положительные числа для генератора");else if(0!=this.$store.state.signalsSelectedArr.length){var e=this.$store.state.startInfoForTable.numOfTime,r=this.generatorCreateSignal(e);this.$store.state.mainDataArray.forEach((function(e){e.readOnly||"signal"!=e.type||t.$store.state.signalsSelectedArr.includes(e.id)&&t.$set(e,"value",JSON.parse(JSON.stringify(r)))}))}else if(0!=this.$store.state.cellsSelectedArr.length){var a=[],n=[];this.$store.state.cellsSelectedArr.forEach((function(t){a.includes(t.id)||a.push(t.id),n.includes(t.index)||n.push(t.index)}));for(var o={min:Math.min.apply(Math,a),max:Math.max.apply(Math,a)},s={min:Math.min.apply(Math,n),max:Math.max.apply(Math,n)},i=o.min;i<=o.max;i++)if(!this.$store.state.mainDataArray[i].readOnly&&"signal"==this.$store.state.mainDataArray[i].type){for(var l=this.$store.state.mainDataArray[i].value,c=s.max-s.min+1,u=this.generatorCreateSignal(c),d=0;d<c;d++)l.splice(s.min+d,1,u[d]);this.$set(this.$store.state.mainDataArray[i],"value",JSON.parse(JSON.stringify(l)))}}},generatorCreateSignal:function(t){var e=[];while(e.length<=t)if(this.generatorProperty.startFromOne){for(var r=0;r<this.generatorProperty.countOne;r++)e.push(1);for(var a=0;a<this.generatorProperty.countZero;a++)e.push(0)}else{for(var n=0;n<this.generatorProperty.countZero;n++)e.push(0);for(var o=0;o<this.generatorProperty.countOne;o++)e.push(1)}return e.splice(t,e.length-t),e},setSignalColor:function(){var t=this;this.$store.state.mainDataArray.forEach((function(e){t.$store.state.signalsSelectedArr.includes(e.id)&&t.$set(e,"color",t.chosenColor)}))}}}),O=b,k=Object(g["a"])(O,_,$,!1,null,null,null),D=k.exports,x=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"table"},[r("draggable",{attrs:{disabled:!t.$store.state.editMode,tag:"ul",draggable:".signalNoGroup",move:t.moveSignal,"ghost-class":"ghost"},on:{start:t.startDragSignal,end:t.endDragSignal},model:{value:t.mainDataStore,callback:function(e){t.mainDataStore=e},expression:"mainDataStore"}},[t._l(t.$store.state.mainDataArray,(function(e){return t.openedGroupCheck(e)?r("li",{key:e.name,staticClass:"signal__item",class:{signalName_selected:t.$store.state.signalsSelectedArr.includes(e.id),signal_disabled:1==e.readOnly,signalNoGroup:void 0==e.groupId||"group"==e.type,signal_group_name:"signal"==e.type&&void 0!=e.groupId},on:{click:function(r){return r.preventDefault(),t.$store.commit("signalSelect",e.id)}}},["group"==e.type?r("svg",{staticClass:"group_arrow",class:{disabled:t.$store.state.editMode},staticStyle:{"enable-background":"new 0 0 306 306"},style:t.openedGroupArrowStyle(e.groupId),attrs:{version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 306 306","xml:space":"preserve"},on:{click:function(r){r.preventDefault(),t.$store.commit("groupOpenClose",e.groupId),t.$store.commit("signalSelect",e.id)}}},[r("g",{attrs:{id:"keyboard-arrow-right"}},[r("polygon",{attrs:{points:"58.65,267.75 175.95,153 58.65,35.7 94.35,0 247.35,153 94.35,306"}})])]):t._e(),r("p",{staticClass:"signalName",class:{}},[t._v(" "+t._s(t.groupBranchSymbol(e))+t._s(t._f("signalNameFormat")(e.name))+" ")])]):t._e()})),r("div",{staticClass:"table__select_all",attrs:{slot:"footer"},slot:"footer"},[r("a",{staticClass:"button15 button15__signal_name",attrs:{href:""},on:{click:function(e){return e.preventDefault(),t.$store.commit("allSignalsSelect")}}},[t._v("Выбрать все")])])],2),r("div",{staticClass:"table__container"},[r("table",{staticClass:"graph"},[r("tbody",{staticClass:"graph__body"},[t._l(t.$store.state.mainDataArray,(function(e,a){return r("tr",{directives:[{name:"show",rawName:"v-show",value:t.openedGroupCheck(e),expression:"openedGroupCheck(signal)"}],key:e.name,staticClass:"graph__tr",attrs:{scope:"row"}},[t._l(t.groupArraySum(e.groupId),(function(a,n){return"group"==e.type?r("td",{key:n,staticClass:"signalValue",staticStyle:{"font-size":"12px"}},[t._v(t._s(t._f("binToDec")(a)))]):t._e()})),t._l(e.value,(function(n,o){return"signal"==e.type?r("td",{key:o,staticClass:"signalValue",class:{isSelected:t.$store.state.signalsSelectedArr.includes(e.id)||t.cellsSelectedCheck(+a,o),signal_disabled_cell:1==e.readOnly||"signal"!=e.type},on:{click:function(r){return t.interactWithCell(+a,o,e.readOnly,e.type)}}},[r("div",{staticClass:"signal_level",style:t.signalStyle(n,e.color,e.isClockSignal)},[e.isClockSignal&&1==n?r("div",{staticClass:"signal__clock"},[r("div",{staticClass:"signal__clock_part",style:t.signalClockStyle(e.color,1)}),r("div",{staticClass:"signal__clock_part",style:t.signalClockStyle(e.color,2)}),r("div",{staticClass:"signal__clock_part",style:t.signalClockStyle(e.color,3)})]):t._e()])]):t._e()}))],2)})),r("tr",t._l(t.$store.state.startInfoForTable.numOfTime,(function(e,a){return r("td",{key:e,staticClass:"signalTime"},[t._v(" "+t._s(e)+" ")])})),0)],2)])])],1)},w=[],P=r("b85c");r("4de4"),r("d3b7"),r("25f0"),r("7db0"),r("99af"),r("a15b"),r("ac1f"),r("1276");function M(t){return t.split(" ").join(" ")}function I(t){return parseInt(t,2)}var T=r("b76a"),N=r.n(T),E={filters:{signalNameFormat:M,binToDec:I},components:{draggable:N.a},data:function(){return{}},computed:{mainDataStore:{get:function(){return this.$store.state.mainDataArray},set:function(t){this.$store.commit("updateMainDataArray",t)}},countGroups:function(){return this.$store.state.mainDataArray.filter((function(t){return"group"==t.type})).length}},created:function(){var t=this;l.a.get("http://127.0.0.1:7999").then((function(e){1==e.data.ok&&(t.$store.commit("appLoad"),l.a.get("http://127.0.0.1:7999/dataPage?page=1").then((function(e){var r;r="signal"!=e.data[0].type?e.data[0].data[0].value.length:e.data[0].value.length;var a={numOfStr:e.data.length,numOfTime:r},n=[];e.data.forEach((function(e){n.push(e),"group"==e.type&&(e.data.forEach((function(t){t.readOnly=e.readOnly,t.color=e.color,t.type="signal",t.groupId=e.groupId,t.partOfGroup=e.data.indexOf(t),n.push(JSON.parse(JSON.stringify(t)))})),t.$set(e,"data",e.data.length))})),l.a.get("http://127.0.0.1:7999/pagination").then((function(e){t.$store.commit("pagesSet",e.data.pages)})),t.$store.commit("updateMainDataArray",n),t.$store.commit("startInfoForTableSet",a)})))}))},methods:{groupBranchSymbol:function(t){if(void 0!=t.groupId&&"signal"==t.type)return"└╴"},groupArraySum:function(t){for(var e=this,r=[],a=0;a<this.$store.state.startInfoForTable.numOfTime;a++)r.push(0);return this.$store.state.mainDataArray.forEach((function(a){if(void 0!=a.groupId&&"signal"==a.type&&a.groupId===t)for(var n=0;n<e.$store.state.startInfoForTable.numOfTime;n++)r[n]+=a.value[n].toString(2)})),r},moveSignal:function(t){},startDragSignal:function(t){},endDragSignal:function(t){},getIndexOfCurrentGroup:function(t){return this.$store.state.mainDataArray.indexOf(this.$store.state.mainDataArray.find((function(e){if("group"==e.type&&e.groupId==t)return e})))},signalStyle:function(t,e,r){return 1==t?r?"":"border-top: ".concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(e):"border-bottom: ".concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(e)},signalClockStyle:function(t,e){switch(e){case 1:return"border-bottom: ".concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(t,"; width: 50%; margin-top: -").concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/16,"px");case 2:return"border-top: ".concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(t,"; border-left: ").concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(t,"; border-right: ").concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(t,"; width: 25%; margin-top: -").concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/16,"px");case 3:return"border-bottom: ".concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/8,"px solid ").concat(t,"; width: 25%; margin-top: -").concat((this.$store.state.currentCellHeight+this.$store.state.currentCellWidth)/2/16,"px")}},cellsSelectedCheck:function(t,e){var r,a=Object(P["a"])(this.$store.state.cellsSelectedArr);try{for(a.s();!(r=a.n()).done;){var n=r.value;if(n.id===t&&n.index===e)return!0}}catch(o){a.e(o)}finally{a.f()}},interactWithCell:function(t,e,r,a){if(!r&&"signal"==a){var n=JSON.parse(JSON.stringify(this.$store.state.mainDataArray[t].value));switch(parseInt(this.$store.state.modeClick)){case 0:n[e]=0,this.$set(this.$store.state.mainDataArray[t],"value",n);break;case 1:n[e]=1,this.$set(this.$store.state.mainDataArray[t],"value",n);break;case 2:0==n[e]?n[e]=1:n[e]=0,this.$set(this.$store.state.mainDataArray[t],"value",n);break;case 3:if(this.$store.commit("signalsSelectedClear"),this.$store.state.cellsSelectedArr.length<2&&(1===this.$store.state.cellsSelectedArr.length?this.$store.state.cellsSelectedArr[0].id!=t||this.$store.state.cellsSelectedArr[0].index!=e?this.$store.commit("cellsSelectedArrPush",{id:t,index:e}):this.$store.commit("cellsSelectedArrDelete"):this.$store.commit("cellsSelectedArrPush",{id:t,index:e})),2==this.$store.state.cellsSelectedArr.length){for(var o=Math.min(this.$store.state.cellsSelectedArr[0].id,this.$store.state.cellsSelectedArr[1].id);o<=Math.max(this.$store.state.cellsSelectedArr[0].id,this.$store.state.cellsSelectedArr[1].id);o++)for(var s=Math.min(this.$store.state.cellsSelectedArr[0].index,this.$store.state.cellsSelectedArr[1].index);s<=Math.max(this.$store.state.cellsSelectedArr[0].index,this.$store.state.cellsSelectedArr[1].index);s++)this.$store.state.mainDataArray[o].readOnly||"signal"!=this.$store.state.mainDataArray[o].type||this.$store.commit("cellsSelectedArrPush",{id:o,index:s});this.$store.commit("cellsSelectedArrDelete"),this.$store.commit("cellsSelectedArrDelete")}break}}},openedGroupArrowStyle:function(t){return!!this.$store.state.groupsOpenedArr.includes(t)&&"transform: rotate(90deg);"},openedGroupCheck:function(t){return void 0!=t.groupId&&"group"!=t.type&&this.$store.state.groupsOpenedArr.includes(t.groupId)||void 0==t.groupId||"group"==t.type}},watch:{}},W=E,F=Object(g["a"])(W,x,w,!1,null,null,null),J=F.exports,Z={components:{Loader:f,Toolbar:A,ToolbarBottom:D,Table:J,draggable:N.a},data:function(){return{mainDataArray:this.$store.state.mainDataArray,pressedCtrlZ:!1,list:[{name:"John",id:0},{name:"Joao",id:1},{name:"Jean",id:2}]}},mounted:function(){var t=this;window.addEventListener("keydown",(function(e){"z"==e.key&&e.ctrlKey&&1!=t.pressedCtrlZ&&(console.log("Alt + Z pressed!"),console.log(t.$store.state.modeClick),t.pressedCtrlZ=!t.pressedCtrlZ)})),window.addEventListener("keyup",(function(e){"z"==e.key&&e.ctrlKey&&0!=t.pressedCtrlZ&&(console.log("Alt + Z unpressed!"),t.pressedCtrlZ=!t.pressedCtrlZ)}))},methods:{editDone:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log(JSON.stringify(this.$store.state.mainDataArray));case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},H=Z,G=Object(g["a"])(H,n,o,!1,null,null,null),j=G.exports,B=r("8c4f");a["a"].use(B["a"]);var L=[],q=new B["a"]({routes:L}),z=q,V=(r("c740"),r("2f62")),K=r("c18c");a["a"].use(V["a"]);var R=new V["a"].Store({state:{appLoaded:!1,modeClick:2,page:1,pages:1,startInfoForTable:{},mainDataArray:[],varArrayForTransportGroupSignals:[],varArrayForOpenedGroups:[],signalsSelectedArr:[],cellsSelectedArr:[],groupsOpenedArr:[],editMode:!1,currentCellWidth:40,currentCellHeight:40},mutations:{appLoad:function(t){t.appLoaded=!t.appLoaded},changeCellWidth:function(t,e){t.currentCellWidth+e<20||t.currentCellWidth+e>60||(t.currentCellWidth+=e)},changeCellHeight:function(t,e){t.currentCellHeight+e<20||t.currentCellHeight+e>60||(t.currentCellHeight+=e)},clearHeightAndWidth:function(t){t.currentCellWidth=40,t.currentCellHeight=40},pageSet:function(t,e){t.page=e},pagesSet:function(t,e){t.pages=e},modeClickSet:function(t,e){t.modeClick=e},updateMainDataArray:function(t,e){t.mainDataArray=JSON.parse(JSON.stringify(e))},updateOneSignalInMainData:function(t,e){t.mainDataArray.splice(e.index,1,e.newValueOfsSignal)},deleteOneSignalInMainData:function(t,e){t.mainDataArray.splice(e,1)},pasteOneSignalInMainData:function(t,e){t.mainDataArray.splice(e.index,0,e.item)},startInfoForTableSet:function(t,e){t.startInfoForTable=e},signalSelect:function(t,e){t.cellsSelectedArr=[],t.signalsSelectedArr.includes(e)?t.signalsSelectedArr.splice(t.signalsSelectedArr.indexOf(e),1):t.signalsSelectedArr.push(e)},allSignalsSelect:function(t){t.cellsSelectedArr=[];for(var e=t.signalsSelectedArr.length,r=0;r<e;r++)t.signalsSelectedArr.splice(0,1);t.mainDataArray.forEach((function(e){t.signalsSelectedArr.push(e.id)}))},signalsSelectedClear:function(t){t.signalsSelectedArr=[]},cellsSelectedArrPush:function(t,e){t.cellsSelectedArr.push(e)},cellsSelectedArrDelete:function(t){t.cellsSelectedArr.splice(0,1)},allArrSelectedClear:function(t){var e;if(0!=t.signalsSelectedArr.length){e=t.signalsSelectedArr.length;for(var r=0;r<e;r++)t.signalsSelectedArr.splice(0,1)}else{e=t.cellsSelectedArr.length;for(var a=0;a<e;a++)t.cellsSelectedArr.splice(0,1)}},groupOpenClose:function(t,e){t.editMode||(t.groupsOpenedArr.includes(e)?t.groupsOpenedArr.splice(t.groupsOpenedArr.findIndex((function(t){return t===e})),1):t.groupsOpenedArr.push(e))},groupsOpenedArrClear:function(t){t.groupsOpenedArr=[]},groupsOpenedArrFullSet:function(t,e){t.groupsOpenedArr=e},moveSignals:function(t,e){Object(K["a"])(t.mainDataArray,e.from,e.to)},editModeClick:function(t){t.signalsSelectedArr=[];var e=function(e){return t.mainDataArray.indexOf(t.mainDataArray.find((function(t){if("group"==t.type&&t.groupId==e)return t})))};if(t.editMode)t.editMode&&(t.varArrayForTransportGroupSignals.forEach((function(r){t.mainDataArray.forEach((function(a){r.groupId==a.groupId&&"group"==a.type&&t.mainDataArray.splice(e(a.groupId)+1+r.partOfGroup,0,r)}))})),t.varArrayForTransportGroupSignals=[],t.groupsOpenedArr=t.varArrayForOpenedGroups,t.varArrayForOpenedGroups=[]);else{t.varArrayForOpenedGroups=t.groupsOpenedArr,t.groupsOpenedArr=[];for(var r=t.mainDataArray.filter((function(t){return"group"==t.type})).length,a=1;a<=r;a++)for(var n=0;n<t.mainDataArray[e(a)].data;n++)t.varArrayForTransportGroupSignals.push(t.mainDataArray[e(a)+1+n]);t.mainDataArray=t.mainDataArray.filter((function(t){return void 0==t.groupId||"group"==t.type}))}t.editMode=!t.editMode},selectedSignalsMove:function(t,e){if("up"==e){var r=!1;t.signalsSelectedArr.forEach((function(e){t.mainDataArray.forEach((function(a){0==t.mainDataArray.indexOf(a)&&a.id==e&&(r=!0)}))})),r||t.mainDataArray.forEach((function(e){if(t.signalsSelectedArr.includes(e.id)){if(0==t.mainDataArray.indexOf(e))return;Object(K["a"])(t.mainDataArray,+t.mainDataArray.indexOf(e),+t.mainDataArray.indexOf(e)-1)}}))}else if("down"==e){t.mainDataArray.reverse();var a=!1;t.signalsSelectedArr.forEach((function(e){t.mainDataArray.forEach((function(r){0==t.mainDataArray.indexOf(r)&&r.id==e&&(a=!0)}))})),a||t.mainDataArray.forEach((function(e){if(t.signalsSelectedArr.includes(e.id)){if(0==t.mainDataArray.indexOf(e))return;Object(K["a"])(t.mainDataArray,+t.mainDataArray.indexOf(e),+t.mainDataArray.indexOf(e)-1)}})),t.mainDataArray.reverse()}}},actions:{},modules:{},getters:{}});a["a"].config.productionTip=!1,new a["a"]({router:z,store:R,render:function(t){return t(j)}}).$mount("#app")},fa5e:function(t,e,r){t.exports=r.p+"img/loader.747d0ffa.gif"}});
//# sourceMappingURL=app.e0de7fd9.js.map