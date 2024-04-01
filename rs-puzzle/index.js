(()=>{"use strict";var e={214:(e,n,t)=>{t.d(n,{A:()=>s});var r=t(354),i=t.n(r),a=t(314),o=t.n(a)()(i());o.push([e.id,".word-element, .new-container-element {\n    display: inline-block;\n    text-align: center;\n    padding:  5px 10px; \n    height: 40px;\n    line-height: 40px;\n    margin: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    background-color: rgb(124, 16, 97);;\n    border-radius: 5px;\n    color: rgb(251, 251, 252);\n    font-size: large;\n  }\n  .word-element:hover {\n    background-color: #1f2191;\n  }\n\n  #word-container {\n    width: 850px;\n    height: 50px;\n    display: flex;\n    justify-content: stretch;\n    align-items: stretch;\n  }\n\n.new-container {\n  width: 850px;\n  display: flex;\n  gap: 5px;\n  height: 60px;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column-reverse;\n  width: 850px;\n  height: 750px;\n  align-items: stretch;\n  justify-content: stretch;\n  background-color: rgba(14, 44, 100, 0.5);\n  border-radius: 20px;\n  padding: 15px;\n}\n\n.painting-container {\n  width: 850px;\n  height: 700px;\n}\n\n.continue-button {\n  margin: 30px;\n  width: 200px;\n}\n\n  /* CSS for animation */\n  @keyframes moveCard {\n    0% {\n      transform: scale(1);\n    }\n    100% {\n      transform: scale(0);\n    }\n  }\n  .result-block .word-element {\n    animation: moveCard 0.5s ease;\n\n  }\n  #main-wrapper {\n    display:flex;\n    flex-direction: row-reverse;\n    align-items: center;\n    justify-content: center;\n  }\n\n\n  @media screen and (max-width: 1278px) {\n    #main-wrapper {\n      display:flex;\n      flex-direction: column-reverse;\n      justify-content: center;\n      align-items: center;\n    }\n  }\n\n\n  @media screen and (max-width: 904px) {\n    .word-element, .new-container-element {\n      padding:  2px 3px; \n      height: 40px;\n      line-height: 40px;\n      margin: 2px;\n      font-size: medium;\n    }\n  \n    #word-container {\n      width: 720px;\n     }\n  \n  .new-container {\n    width: 720px;\n  }\n  \n  .game-container {\n    width: 720px;\n    height: 710px;\n    padding: 5px;\n  }\n  \n  .painting-container {\n    width: 720px;\n    height: 700px;\n  }\n  }\n","",{version:3,sources:["webpack://./src/app/gamePage/gamePage.css"],names:[],mappings:"AAAA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,kBAAkB;IAClB,YAAY;IACZ,iBAAiB;IACjB,WAAW;IACX,eAAe;IACf,sCAAsC;IACtC,kCAAkC;IAClC,kBAAkB;IAClB,yBAAyB;IACzB,gBAAgB;EAClB;EACA;IACE,yBAAyB;EAC3B;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,wBAAwB;IACxB,oBAAoB;EACtB;;AAEF;EACE,YAAY;EACZ,aAAa;EACb,QAAQ;EACR,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,wBAAwB;EACxB,wCAAwC;EACxC,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;EAEE,sBAAsB;EACtB;IACE;MACE,mBAAmB;IACrB;IACA;MACE,mBAAmB;IACrB;EACF;EACA;IACE,6BAA6B;;EAE/B;EACA;IACE,YAAY;IACZ,2BAA2B;IAC3B,mBAAmB;IACnB,uBAAuB;EACzB;;;EAGA;IACE;MACE,YAAY;MACZ,8BAA8B;MAC9B,uBAAuB;MACvB,mBAAmB;IACrB;EACF;;;EAGA;IACE;MACE,iBAAiB;MACjB,YAAY;MACZ,iBAAiB;MACjB,WAAW;MACX,iBAAiB;IACnB;;IAEA;MACE,YAAY;KACb;;EAEH;IACE,YAAY;EACd;;EAEA;IACE,YAAY;IACZ,aAAa;IACb,YAAY;EACd;;EAEA;IACE,YAAY;IACZ,aAAa;EACf;EACA",sourcesContent:[".word-element, .new-container-element {\n    display: inline-block;\n    text-align: center;\n    padding:  5px 10px; \n    height: 40px;\n    line-height: 40px;\n    margin: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    background-color: rgb(124, 16, 97);;\n    border-radius: 5px;\n    color: rgb(251, 251, 252);\n    font-size: large;\n  }\n  .word-element:hover {\n    background-color: #1f2191;\n  }\n\n  #word-container {\n    width: 850px;\n    height: 50px;\n    display: flex;\n    justify-content: stretch;\n    align-items: stretch;\n  }\n\n.new-container {\n  width: 850px;\n  display: flex;\n  gap: 5px;\n  height: 60px;\n}\n\n.game-container {\n  display: flex;\n  flex-direction: column-reverse;\n  width: 850px;\n  height: 750px;\n  align-items: stretch;\n  justify-content: stretch;\n  background-color: rgba(14, 44, 100, 0.5);\n  border-radius: 20px;\n  padding: 15px;\n}\n\n.painting-container {\n  width: 850px;\n  height: 700px;\n}\n\n.continue-button {\n  margin: 30px;\n  width: 200px;\n}\n\n  /* CSS for animation */\n  @keyframes moveCard {\n    0% {\n      transform: scale(1);\n    }\n    100% {\n      transform: scale(0);\n    }\n  }\n  .result-block .word-element {\n    animation: moveCard 0.5s ease;\n\n  }\n  #main-wrapper {\n    display:flex;\n    flex-direction: row-reverse;\n    align-items: center;\n    justify-content: center;\n  }\n\n\n  @media screen and (max-width: 1278px) {\n    #main-wrapper {\n      display:flex;\n      flex-direction: column-reverse;\n      justify-content: center;\n      align-items: center;\n    }\n  }\n\n\n  @media screen and (max-width: 904px) {\n    .word-element, .new-container-element {\n      padding:  2px 3px; \n      height: 40px;\n      line-height: 40px;\n      margin: 2px;\n      font-size: medium;\n    }\n  \n    #word-container {\n      width: 720px;\n     }\n  \n  .new-container {\n    width: 720px;\n  }\n  \n  .game-container {\n    width: 720px;\n    height: 710px;\n    padding: 5px;\n  }\n  \n  .painting-container {\n    width: 720px;\n    height: 700px;\n  }\n  }\n"],sourceRoot:""}]);const s=o},278:(e,n,t)=>{t.d(n,{A:()=>A});var r=t(354),i=t.n(r),a=t(314),o=t.n(a),s=t(417),l=t.n(s),d=new URL(t(650),t.b),c=o()(i()),u=l()(d);c.push([e.id,`body {\n    min-height: 100vh;\n    background-image: url(${u});;\n    background-size: cover;\n    background-position: center center;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\nform {\n    display: flex;\n    flex-direction: column;\n    width: 400px;\n    font-size: medium;\n    color: rgb(70, 189, 41);\n    margin: 0 auto;\n    gap: 10px;\n}\n\ninput, button {\n    border-radius: 5px;\n    font-size: large;\n    height: 60px;\n    text-align: center;\n    border-color: transparent;\n    width: 400px;\n    margin-top: 15px;\n}\n\nbutton {\n    background-color: rgb(82, 102, 158);\n    color: rgb(243, 239, 239);\n    font-size: x-large;\n    cursor: pointer;\n    transition: transform 0.2s ease, background-color 0.2s ease;\n}\n\nbutton:hover {\n    transform: scale(1.02);\n    background-color: rgb(124, 16, 97);\n  }\n\n  button[disabled] {\n    opacity: 0.5; \n    pointer-events: none;\n  }\n  \n  button[disabled]:hover {\n    opacity: 0.5; \n    cursor: not-allowed; \n  }  \n\n.wrongInput {\n    color: rgb(207, 34, 57);\n}\n\n.hidden {\n    display: none;\n}`,"",{version:3,sources:["webpack://./src/app/loginPage/loginPage.css"],names:[],mappings:"AAAA;IACI,iBAAiB;IACjB,yDAA4H;IAC5H,sBAAsB;IACtB,kCAAkC;IAClC,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,YAAY;IACZ,iBAAiB;IACjB,uBAAuB;IACvB,cAAc;IACd,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,mCAAmC;IACnC,yBAAyB;IACzB,kBAAkB;IAClB,eAAe;IACf,2DAA2D;AAC/D;;AAEA;IACI,sBAAsB;IACtB,kCAAkC;EACpC;;EAEA;IACE,YAAY;IACZ,oBAAoB;EACtB;;EAEA;IACE,YAAY;IACZ,mBAAmB;EACrB;;AAEF;IACI,uBAAuB;AAC3B;;AAEA;IACI,aAAa;AACjB",sourcesContent:["body {\n    min-height: 100vh;\n    background-image: url('C:\\Users\\admin\\Desktop\\JavaScript\\rs-school\\kolirina-JSFE2023Q4\\rs-puzzle\\src\\images\\background.jpg');;\n    background-size: cover;\n    background-position: center center;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\nform {\n    display: flex;\n    flex-direction: column;\n    width: 400px;\n    font-size: medium;\n    color: rgb(70, 189, 41);\n    margin: 0 auto;\n    gap: 10px;\n}\n\ninput, button {\n    border-radius: 5px;\n    font-size: large;\n    height: 60px;\n    text-align: center;\n    border-color: transparent;\n    width: 400px;\n    margin-top: 15px;\n}\n\nbutton {\n    background-color: rgb(82, 102, 158);\n    color: rgb(243, 239, 239);\n    font-size: x-large;\n    cursor: pointer;\n    transition: transform 0.2s ease, background-color 0.2s ease;\n}\n\nbutton:hover {\n    transform: scale(1.02);\n    background-color: rgb(124, 16, 97);\n  }\n\n  button[disabled] {\n    opacity: 0.5; \n    pointer-events: none;\n  }\n  \n  button[disabled]:hover {\n    opacity: 0.5; \n    cursor: not-allowed; \n  }  \n\n.wrongInput {\n    color: rgb(207, 34, 57);\n}\n\n.hidden {\n    display: none;\n}"],sourceRoot:""}]);const A=c},546:(e,n,t)=>{t.d(n,{A:()=>s});var r=t(354),i=t.n(r),a=t(314),o=t.n(a)()(i());o.push([e.id,"#welcome-wrapper {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    color: white;\n    margin: 0 auto;\n    background-color: rgba(14, 44, 100, 0.5);\n    padding: 20px;\n    gap: 20px;\n    border-radius: 20px;\n    max-width: 750px;\n    text-align: center;\n    }\n\n.fade-in {\n    opacity: 0;\n    transition: opacity 0.5s ease;\n    }\n      \n.fade-in.active {\n    opacity: 1;\n    }    \n\n.welcome {\n    display: flex;\n    justify-content: center;\n    font-size: x-large;\n    font-family:Arial, Helvetica, sans-serif;\n    justify-content: center;\n    color: white;\n}\n\n#welcome {\n    display: flex;\n    font-size: large;\n    letter-spacing: 0.1em;\n    line-height: 30px;\n    text-align: center;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 20px;\n    margin-bottom: 20px;\n   }\n\n#title {\n    letter-spacing: 1em;\n    font-size: xx-large;\n    font-weight: bold;\n    text-align: center;\n}\n\n@media screen and (max-width: 904px) {\n    #welcome-wrapper {\n        max-width: 720px;\n    }\n}","",{version:3,sources:["webpack://./src/app/welcomePage.css"],names:[],mappings:"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;IACZ,cAAc;IACd,wCAAwC;IACxC,aAAa;IACb,SAAS;IACT,mBAAmB;IACnB,gBAAgB;IAChB,kBAAkB;IAClB;;AAEJ;IACI,UAAU;IACV,6BAA6B;IAC7B;;AAEJ;IACI,UAAU;IACV;;AAEJ;IACI,aAAa;IACb,uBAAuB;IACvB,kBAAkB;IAClB,wCAAwC;IACxC,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,qBAAqB;IACrB,iBAAiB;IACjB,kBAAkB;IAClB,iBAAiB;IACjB,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;GACpB;;AAEH;IACI,mBAAmB;IACnB,mBAAmB;IACnB,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI;QACI,gBAAgB;IACpB;AACJ",sourcesContent:["#welcome-wrapper {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    color: white;\n    margin: 0 auto;\n    background-color: rgba(14, 44, 100, 0.5);\n    padding: 20px;\n    gap: 20px;\n    border-radius: 20px;\n    max-width: 750px;\n    text-align: center;\n    }\n\n.fade-in {\n    opacity: 0;\n    transition: opacity 0.5s ease;\n    }\n      \n.fade-in.active {\n    opacity: 1;\n    }    \n\n.welcome {\n    display: flex;\n    justify-content: center;\n    font-size: x-large;\n    font-family:Arial, Helvetica, sans-serif;\n    justify-content: center;\n    color: white;\n}\n\n#welcome {\n    display: flex;\n    font-size: large;\n    letter-spacing: 0.1em;\n    line-height: 30px;\n    text-align: center;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 20px;\n    margin-bottom: 20px;\n   }\n\n#title {\n    letter-spacing: 1em;\n    font-size: xx-large;\n    font-weight: bold;\n    text-align: center;\n}\n\n@media screen and (max-width: 904px) {\n    #welcome-wrapper {\n        max-width: 720px;\n    }\n}"],sourceRoot:""}]);const s=o},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,i,a){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(o[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&o[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),t&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=t):c[2]=t),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),n.push(c))}},n}},417:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},354:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(i," */");return[n].concat([a]).join("\n")}return[n].join("\n")}},277:(e,n,t)=>{t.r(n),t.d(n,{default:()=>f});var r=t(72),i=t.n(r),a=t(825),o=t.n(a),s=t(659),l=t.n(s),d=t(56),c=t.n(d),u=t(540),A=t.n(u),h=t(113),p=t.n(h),m=t(214),g={};g.styleTagTransform=p(),g.setAttributes=c(),g.insert=l().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=A(),i()(m.A,g);const f=m.A&&m.A.locals?m.A.locals:void 0},505:(e,n,t)=>{t.r(n),t.d(n,{default:()=>f});var r=t(72),i=t.n(r),a=t(825),o=t.n(a),s=t(659),l=t.n(s),d=t(56),c=t.n(d),u=t(540),A=t.n(u),h=t(113),p=t.n(h),m=t(278),g={};g.styleTagTransform=p(),g.setAttributes=c(),g.insert=l().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=A(),i()(m.A,g);const f=m.A&&m.A.locals?m.A.locals:void 0},137:(e,n,t)=>{t.r(n),t.d(n,{default:()=>f});var r=t(72),i=t.n(r),a=t(825),o=t.n(a),s=t(659),l=t.n(s),d=t(56),c=t.n(d),u=t(540),A=t.n(u),h=t(113),p=t.n(h),m=t(546),g={};g.styleTagTransform=p(),g.setAttributes=c(),g.insert=l().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=A(),i()(m.A,g);const f=m.A&&m.A.locals?m.A.locals:void 0},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},o=[],s=0;s<e.length;s++){var l=e[s],d=r.base?l[0]+r.base:l[0],c=a[d]||0,u="".concat(d," ").concat(c);a[d]=c+1;var A=t(u),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==A)n[A].references++,n[A].updater(h);else{var p=i(h,r);r.byIndex=s,n.splice(s,0,{identifier:u,updater:p,references:1})}o.push(u)}return o}function i(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,i){var a=r(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<a.length;o++){var s=t(a[o]);n[s].references--}for(var l=r(e,i),d=0;d<a.length;d++){var c=t(a[d]);0===n[c].references&&(n[c].updater(),n.splice(c,1))}a=l}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,i&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},15:function(e,n,t){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const i=r(t(915)),a=r(t(982));n.default=class{constructor(e,n){this.userData=e,this.GameData=n,this.wrapper=document.createElement("div"),this.wrapper.id="welcome-wrapper",this.wrapper.classList.add("fade-in"),setTimeout((()=>{this.wrapper.classList.add("active")}),500),this.title=document.createElement("div"),this.title.id="title",this.title.classList.add("welcome"),this.title.innerText="ENGLISH  PUZZLE",this.welcome=document.createElement("div"),this.welcome.classList.add("welcome"),this.welcome.id="welcome",this.setupWelcomeMessage(),this.wrapper.appendChild(this.title),this.wrapper.appendChild(this.welcome),this.startButton=document.createElement("button"),this.startButton.type="button",this.startButton.textContent="Start Game",this.wrapper.appendChild(this.startButton),this.logoutButton=document.createElement("button"),this.logoutButton.type="button",this.logoutButton.textContent="Logout",this.wrapper.appendChild(this.logoutButton),document.body.appendChild(this.wrapper),this.setupListeners()}setupWelcomeMessage(){if(this.userData){const{firstName:e,surname:n}=this.userData;this.welcome.innerHTML=`Welcome, ${e} ${n}!<br>Improve your English with the interactive puzzle game.<br>You are going to do a puzzle with English words forming sentences<br>and bit by bit reveal a work of art.<br>Enjoy the learning process!`}}setupListeners(){this.logoutButton.addEventListener("click",(()=>{this.logout(),this.hide(),new a.default(this.GameData)})),this.startButton.addEventListener("click",(()=>{this.hide(),new i.default}))}logout(){localStorage.removeItem("userData"),console.log("Stored user data:",localStorage.getItem("userData")),this.hide()}show(){this.wrapper.style.display="block"}hide(){this.wrapper.style.display="none"}}},464:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(i,a){function o(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,s)}l((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){return t(this,void 0,void 0,(function*(){try{const e=yield fetch("https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json");if(!e.ok)throw new Error("Failed to fetch rounds data");return yield e.json()}catch(e){return console.error("Error fetching rounds data:",e),{rounds:[],roundsCount:0}}}))}},915:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(i,a){function o(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,s)}l((r=r.apply(e,n||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=i(t(464));n.default=class{constructor(){this.rounds=[],this.currentRoundIndex=0,this.textExampleIndex=0,this.newContainers=[],this.draggedElement=null,this.continueButton=document.createElement("button"),this.words=[],this.originalOrder=[],this.gameData={rounds:[],roundsCount:0},this.initGame(),this.continueButton.addEventListener("click",this.handleContinue.bind(this))}initGame(){return r(this,void 0,void 0,(function*(){try{this.gameData=yield(0,a.default)(),this.rounds=this.gameData.rounds;const e=document.createElement("div");e.id="main-wrapper",e.classList.add("main-wrapper"),document.body.appendChild(e),e.appendChild(this.continueButton);const n=document.createElement("div");n.id="game-container",n.classList.add("game-container"),e.appendChild(n),this.rounds.length>0&&(this.container=document.createElement("div"),this.container.id="word-container",n.appendChild(this.container),this.startGame()),console.log("запущена initgame");const t=document.createElement("div");t.id="painting-container",t.classList.add("painting-container"),n.appendChild(t);for(let e=0;e<10;e++){const n=document.createElement("div");n.id=`new-container-${e}`,n.classList.add("new-container"),this.newContainers.push(n),t.appendChild(n),n.addEventListener("dragover",this.handleDragOver.bind(this)),n.addEventListener("drop",this.handleDrop.bind(this))}}catch(e){console.error("Error initializing game:",e)}}))}startGame(){const e=this.getTextExamplesByLevel()[this.rounds[this.currentRoundIndex].levelData.id];if(this.continueButton.removeEventListener("click",this.handleContinue),e&&e.length>0){const n=e[this.textExampleIndex];this.originalOrder=n.split(/\s+/),this.words=this.shuffleArray(this.originalOrder.slice());const t=this.words;this.renderWordContainer(t),this.renderContinueButton()}else console.error("No text examples found for the current level.")}renderContinueButton(){console.log("внутри renderContinueButton"),this.continueButton.textContent="Continue",this.continueButton.classList.add("continue-button"),this.continueButton.disabled=!0}handleContinue(){this.textExampleIndex<this.rounds[this.currentRoundIndex].words.length-1?(console.log("запущен handlecontinue"),this.textExampleIndex++,console.log(this.textExampleIndex),this.container.innerHTML="",this.startGame()):(console.log("End of text examples reached for the current round."),this.continueButton.removeEventListener("click",this.handleContinue.bind(this)))}shuffleArray(e){for(let n=e.length-1;n>0;n--){const t=Math.floor(Math.random()*(n+1));[e[n],e[t]]=[e[t],e[n]]}return e}renderWordContainer(e){e.forEach((e=>{console.log("внутри renderWordContainer");const n=document.createElement("div");n.textContent=e,n.classList.add("word-element"),n.draggable=!0;const t=Math.max(50,10*e.length);n.style.width=t+"px",n.addEventListener("click",this.handleWordCardClick.bind(this)),this.container.appendChild(n),n.addEventListener("dragstart",this.handleDragStart.bind(this)),n.addEventListener("dragover",this.handleDragOver.bind(this)),n.addEventListener("drop",this.handleDrop.bind(this))}))}handleDragStart(e){var n;this.draggedElement=e.target,this.draggedElement&&(this.draggedElement.classList.add("dragged"),null===(n=e.dataTransfer)||void 0===n||n.setData("text/plain","dragged"))}handleDragOver(e){e.preventDefault()}handleDrop(e){if(e.preventDefault(),this.draggedElement&&(this.draggedElement.classList.contains("word-element")||this.draggedElement.classList.contains("new-container-element"))){const n=e.target;if(n.classList.contains("new-container")){const e=this.newContainers.findIndex((e=>e.id===n.id));if(-1!==e){const n=document.createElement("div");if(n.textContent=this.draggedElement.textContent,n.classList.add("new-container-element"),this.newContainers[e].appendChild(n),this.draggedElement.textContent){const e=Math.max(50,10*this.draggedElement.textContent.length);n.style.width=e+"px",n.addEventListener("click",this.handleWordCardClick.bind(this))}this.draggedElement.remove(),this.checkOrder()}}else{const e=document.createElement("div");if(e.textContent=this.draggedElement.textContent,e.classList.add("word-element"),this.container.appendChild(e),this.draggedElement.textContent){const n=Math.max(50,10*this.draggedElement.textContent.length);e.style.width=n+"px",e.addEventListener("click",this.handleWordCardClick.bind(this))}this.draggedElement.remove(),this.checkOrder()}}else console.error("draggedElement is null")}handleWordCardClick(e){const n=e.target;(n.classList.contains("word-element")||n.classList.contains("new-container-element"))&&((n.parentElement===this.container?this.newContainers[this.textExampleIndex]:this.container).appendChild(n),n.classList.toggle("new-container-element"),n.classList.toggle("word-element"),n.addEventListener("dragstart",this.handleDragStart.bind(this)),n.addEventListener("dragover",this.handleDragOver.bind(this)),n.addEventListener("drop",this.handleDrop.bind(this))),this.checkOrder()}checkOrder(){const e=Array.from(this.newContainers[this.textExampleIndex].querySelectorAll(".new-container-element")).map((e=>{var n;return(null===(n=e.textContent)||void 0===n?void 0:n.trim())||""}));for(let n=0;n<this.words.length;n++)if(this.originalOrder[n]!==e[n])return void console.log("Does not match");this.continueButton.disabled=!1,console.log("🎉")}getTextExamplesForLevels(){const e={};return this.rounds.forEach((n=>{const t=n.levelData.id,r=n.words.map((e=>e.textExample));e[t]=r})),console.log(e),e}getTextExamplesByLevel(){return this.getTextExamplesForLevels()}}},99:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.default=class{constructor(e,n,t,r){this.input=document.createElement("input"),this.input.type=e,this.input.id=n,this.input.placeholder=t,this.input.required=r,this.errorMessage=document.createElement("div"),this.errorMessage.className="error-message"}getElement(){return this.input}getValue(){return this.input.value.trim()}validateEnglishAlphabet(){return/^[a-zA-Z\-]+$/.test(this.getValue())}validateFirstLetterUppercase(e){const n=this.getValue();return n.length>=e&&n[0]===n[0].toUpperCase()&&!("-"===n[0])}}},117:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.retrieveUserData=n.storeUserData=void 0,n.storeUserData=function(e,n){const t={firstName:e,surname:n};localStorage.setItem("userData",JSON.stringify(t))},n.retrieveUserData=function(){const e=localStorage.getItem("userData");return e?JSON.parse(e):null}},982:function(e,n,t){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const i=r(t(99)),a=t(618),o=t(117),s=r(t(15));n.default=class{constructor(e){this.GameData=e,this.form=document.createElement("form"),this.form.id="loginForm",this.firstNameField=new i.default("text","firstName","Your First Name",!0),this.surnameField=new i.default("text","surname","Your Surname",!0),this.form.appendChild(this.firstNameField.getElement()),this.form.appendChild(this.surnameField.getElement()),this.loginButton=document.createElement("button"),this.loginButton.type="submit",this.loginButton.textContent="Log in",this.form.appendChild(this.loginButton),document.body.appendChild(this.form),this.setupListeners();const n=(0,o.retrieveUserData)();n&&(this.hide(),new s.default(n,e).show())}setupListeners(){this.firstNameField.getElement().addEventListener("input",this.handleInput.bind(this)),this.surnameField.getElement().addEventListener("input",this.handleInput.bind(this)),this.form.addEventListener("submit",this.handleSubmit.bind(this))}handleInput(){this.removeErrorMessages(),this.loginButton.disabled=!1}handleSubmit(e){e.preventDefault();const n=(0,a.validateForm)(this.firstNameField,this.surnameField);if(this.displayErrorMessages(n),this.loginButton.disabled=Object.keys(n).length>0,0===n.firstName.length&&0===n.surname.length){const e={firstName:this.firstNameField.getValue(),surname:this.surnameField.getValue()};(0,o.storeUserData)(e.firstName,e.surname),this.clearInputFields(),this.hide(),new s.default(e,this.GameData).show()}}displayErrorMessages(e){this.removeErrorMessages();for(const n in e){const t="firstName"===n?this.firstNameField:this.surnameField;e[n].forEach((e=>{const n=document.createElement("div");n.className="error-message",n.textContent=e,t.getElement().after(n),t.getElement().classList.add("wrongInput")}))}}removeErrorMessages(){this.form.querySelectorAll(".error-message").forEach((e=>e.remove())),this.firstNameField.getElement().classList.remove("wrongInput"),this.surnameField.getElement().classList.remove("wrongInput")}clearInputFields(){this.firstNameField.getElement().value="",this.surnameField.getElement().value=""}show(){this.form.style.display="block"}hide(){this.form.style.display="none"}}},618:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.validateForm=void 0,n.validateForm=function(e,n){const t=e.getValue().trim(),r=n.getValue().trim(),i={firstName:[],surname:[]};return e.validateEnglishAlphabet()||i.firstName.push("First name must contain only English alphabet letters."),e.validateFirstLetterUppercase(1)||i.firstName.push("First name must start with an uppercase letter."),t.length<3&&i.firstName.push("First name should be 3 symbols or longer."),n.validateEnglishAlphabet()||i.surname.push("Surname must contain only English alphabet letters."),n.validateFirstLetterUppercase(1)||i.surname.push("Surname must start with an uppercase letter."),r.length<4&&i.surname.push("Surname should be 4 symbols or longer."),i}},156:function(e,n,t){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const i=r(t(982));t(505),t(137),t(277),(0,r(t(464)).default)().then((e=>{new i.default([e])})).catch((e=>{console.error("Error loading rounds data:",e)}))},650:(e,n,t)=>{e.exports=t.p+"b775133b48c427f5fa2e.jpg"}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var a=n[r]={id:r,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var i=r.length-1;i>-1&&(!e||!/^http(s?):/.test(e));)e=r[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,t(156)})();
//# sourceMappingURL=index.js.map