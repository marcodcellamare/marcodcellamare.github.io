(this["webpackJsonpmarcodcellamare.github.io"]=this["webpackJsonpmarcodcellamare.github.io"]||[]).push([[0],{17:function(t){t.exports=JSON.parse('{"NAME":"Marco D. Cellamare","LOCALE":"en-GB","LOCALE_HTML":"en","FIREBASE":{"apiKey":"AIzaSyAilqFf5rRbgfnNcO00sBvuR1Hj8uiIK6k","authDomain":"marcodcellamare-github-io.firebaseapp.com","projectId":"marcodcellamare-github-io","storageBucket":"marcodcellamare-github-io.appspot.com","messagingSenderId":"210747835166","appId":"1:210747835166:web:cf8927b5747f07af0c7f0f","measurementId":"G-1MRGG9108E"}}')},40:function(t){t.exports=JSON.parse('[{"type":"hate","title":"Comic Sans","link":"https://en.wikipedia.org/wiki/Comic_Sans"},{"type":"hate","title":"Facebook","link":"https://www.facebook.com"},{"type":"hate","title":"Adobe Flash","link":"https://www.adobe.com/products/flashplayer/end-of-life.html"},{"type":"music","title":"7Peccati","link":"https://7peccati.tumblr.com"},{"type":"love","title":"Adidas","link":"https://www.adidas.com"},{"type":"love","title":"Amiga 500","link":"https://en.wikipedia.org/wiki/Amiga_500"},{"type":"love","title":"C=64","link":"https://en.wikipedia.org/wiki/Commodore_64"},{"type":"love","title":"MOS SID","link":"https://en.wikipedia.org/wiki/MOS_Technology_6581"},{"type":"love","title":"Bootstrap","link":"https://getbootstrap.com"},{"type":"love","title":"Hip Hop","link":"https://en.wikipedia.org/wiki/Hip_hop_music"},{"type":"love","title":"Native Instruments","link":"https://www.native-instruments.com"},{"type":"love","title":"Akai Professional","link":"https://www.akaipro.com"},{"type":"love","title":"FL Studio","link":"https://www.image-line.com"},{"type":"love","title":"eBoy","link":"https://hello.eboy.com"},{"type":"play","title":"Maniac Mansion","link":"https://en.wikipedia.org/wiki/Maniac_Mansion"},{"type":"play","title":"Zak McKracken","link":"https://en.wikipedia.org/wiki/Zak_McKracken_and_the_Alien_Mindbenders"},{"type":"play","title":"Woodruff and the Schnibble of Azimuth","link":"https://en.wikipedia.org/wiki/The_Bizarre_Adventures_of_Woodruff_and_the_Schnibble"},{"type":"play","title":"Monkey Island","link":"https://en.wikipedia.org/wiki/Monkey_Island_(series)"},{"type":"love","title":"Nintendo","link":"https://www.nintendo.com"},{"type":"play","title":"Zelda","link":"https://www.zelda.com"},{"type":"play","title":"Mario","link":"https://mario.nintendo.com"},{"type":"love","title":"Zzap!","link":"https://www.zzap.it"},{"type":"music","title":"Zapp","link":"https://open.spotify.com/artist/396Kh0m4wGUvcMUULw71yi"},{"type":"music","title":"Chromeo","link":"https://open.spotify.com/artist/2mV8aJphiSHYJf43DxL7Gt"},{"type":"music","title":"Giorgio Moroder","link":"https://open.spotify.com/artist/6jU2Tt13MmXYk0ZBv1KmfO"},{"type":"love","title":"Foosball","link":"https://en.wikipedia.org/wiki/Table_football"},{"type":"code","title":"React","link":"https://reactjs.org"},{"type":"code","title":"JavaScript","link":"https://www.javascript.com"},{"type":"code","title":"PHP","link":"https://www.php.net"},{"type":"code","title":"MySQL","link":"https://www.mysql.com/"}]')},52:function(t,e,a){var n={"./en-GB.json":53};function i(t){var e=s(t);return a(e)}function s(t){if(!a.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}i.keys=function(){return Object.keys(n)},i.resolve=s,t.exports=i,i.id=52},53:function(t){t.exports=JSON.parse('{"NAV":{"DESIGNER":"Designer","DEVELOPER":"Developer","ABOUT":"About","CONTACTS":"Contacts"},"HOME":{"TITLE":"Ciao","SUBTITLE":"I\'m Marco!","COUNTER_PREFIX":"Creative, Digital Designer and Full Stack Developer for ","COUNTER_SUFFIX":"."},"ABOUT":{"TITLE":"Hello, it\'s me"},"PAGE404":{"TITLE":"404"},"COM":{"I":"I","AND":"And","YEAR":"Year","YEARS":"Years","MONTH":"Month","MONTHS":"Months","DAY":"Day","DAYS":"Days","HOUR":"Hour","HOURS":"Hours","MINUTE":"Minute","MINUTES":"Minutes","SECOND":"Second","SECONDS":"Seconds"}}')},65:function(t,e,a){},66:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(28),o=a.n(s),c=a(12),r=a(13),l=a(15),p=a(14),u=a(22),h=a(17),d=a(32),m=a(37),O=(a(67),function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).app=!1,n.analytics=!1,Object(d.a)(n,n.Init())}return Object(r.a)(a,[{key:"Init",value:function(){return this.app=m.a.initializeApp(h.FIREBASE),this.analytics=m.a.analytics(),this}},{key:"LogEvent",value:function(t){this.analytics&&this.analytics.logEvent(t)}}]),a}(i.a.Component)),j=a(78),f=a(79),b=a(52)("./"+h.LOCALE+".json"),v=a(2),y=(i.a.Component,a(75)),k=a(76),w=a(77),N=a(70),x=a(71),C=a(72),M=a(73),E=a(74),S=a(40),g=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).WordBuild=function(){var t,e=0,a=n.word.split("");t=setInterval((function(){var i=a.slice().splice(0,e);n.setState({word:i.join("")}),i.length>=a.length&&(clearInterval(t),setTimeout((function(){t=setInterval((function(){n.hover||(clearInterval(t),n.WordInit())}),50)}),2e3)),e++}),100)},n.word=!1,n.hover=!1,n.state={idx:!1,word:"",link:"",type:""},n}return Object(r.a)(a,[{key:"render",value:function(){var t=this;return Object(v.jsxs)("a",{href:this.state.link,target:"_blank",rel:"noreferrer",className:"love d-inline-block",onMouseEnter:function(){return t.Hover()},onMouseLeave:function(){return t.Hover(!0)},children:[b.COM.I,Object(v.jsxs)("span",{className:"love-icons d-inline-block mx-2",children:[Object(v.jsx)(N.a,{className:"love"===this.state.type?"active":""}),Object(v.jsx)(x.a,{className:"hate"===this.state.type?"active":""}),Object(v.jsx)(C.a,{className:"music"===this.state.type?"active":""}),Object(v.jsx)(M.a,{className:"play"===this.state.type?"active":""}),Object(v.jsx)(E.a,{className:"code"===this.state.type?"active":""})]}),this.state.word,Object(v.jsx)("span",{className:"love-cursor",children:"_"})]})}},{key:"componentDidMount",value:function(){this.WordInit()}},{key:"Hover",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.hover=!t}},{key:"WordInit",value:function(){var t,e=this,a=!1;do{a=Math.floor(Math.random()*S.length)}while(a===this.state.idx);t=S[a],this.setState({idx:a,word:"",link:t.link,type:t.type}),this.word=t.title,setTimeout((function(){e.WordBuild()}),500)}}]),a}(i.a.Component),I=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsx)("footer",{className:this.props.className,children:Object(v.jsx)(y.a,{fluid:!0,className:"py-3",children:Object(v.jsxs)(k.a,{children:[Object(v.jsx)(w.a,{xs:8,children:Object(v.jsx)(g,{})}),Object(v.jsx)(w.a,{xs:4})]})})})}}]),a}(i.a.Component),T=a(27),A=a(10),L=a(81),D=a(80),_=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).date=n.props.date,n.now=!1,n.diff=!1,n.interval=!1,n.secs={years:31536e3,months:2592e3,days:86400,hours:3600,minutes:60,seconds:1},n.state={years:0,months:0,days:0,hours:0,minutes:0,seconds:0},n}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsxs)("p",{className:"counter"+(this.props.className?" "+this.props.className:""),children:[this.props.prefix?this.props.prefix:null,this.state.years>0?this.state.years+" "+(1===this.state.years?b.COM.YEAR:b.COM.YEARS).toLowerCase()+", ":null,this.state.months>0?this.state.months+" "+(1===this.state.months?b.COM.MONTH:b.COM.MONTHS).toLowerCase()+", ":null,this.state.days>0?this.state.days+" "+(1===this.state.days?b.COM.DAY:b.COM.DAYS).toLowerCase()+", ":null,this.state.hours>0?this.state.hours+" "+(1===this.state.hours?b.COM.HOUR:b.COM.HOURS).toLowerCase()+", ":null,this.state.minutes>0?this.state.minutes+" "+(1===this.state.minutes?b.COM.MINUTE:b.COM.MINUTES).toLowerCase()+" ":null,this.state.minutes>0?b.COM.AND.toLowerCase()+" ":null,this.state.seconds+" "+(1===this.state.seconds?b.COM.SECOND:b.COM.SECONDS).toLowerCase(),this.props.suffix?this.props.suffix:null]})}},{key:"componentDidMount",value:function(){this.CounterInit()}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"CounterInit",value:function(){var t=this;this.date=new Date(this.date).getTime(),this.now=!1,this.CounterUpdate(),this.interval=setInterval((function(){t.CounterUpdate()}),1e3)}},{key:"CounterUpdate",value:function(){var t=this;this.now=(new Date).getTime(),this.diff=Math.abs((this.now-this.date)/1e3);var e=this.diff,a={};Object.keys(this.secs).forEach((function(n,i){a[n]=Math.floor(e/t.secs[n]),e-=a[n]*t.secs[n]})),this.setState(a)}}]),a}(i.a.Component),U=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"article",children:Object(v.jsx)(y.a,{fluid:!0,className:"h-100",children:Object(v.jsx)(k.a,{className:"h-100",children:Object(v.jsxs)(w.a,{xs:!0,md:{span:6,offset:1},className:"align-self-center",children:[Object(v.jsx)("div",{className:"page-header",children:Object(v.jsxs)("h1",{className:"text-uppercase",children:[Object(v.jsx)("span",{className:"display-3",children:b.HOME.TITLE}),Object(v.jsx)("br",{}),b.HOME.SUBTITLE]})}),Object(v.jsx)(_,{date:"2002-08-01 09:00:00",tag:"p",prefix:b.HOME.COUNTER_PREFIX,suffix:b.HOME.COUNTER_SUFFIX})]})})})})}},{key:"componentDidMount",value:function(){document.title=h.NAME}}]),a}(i.a.Component),H=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"article",children:b.ABOUT.TITLE})}},{key:"componentDidMount",value:function(){document.title="About - "+h.NAME}}]),a}(i.a.Component),F=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(){return Object(c.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsx)("div",{className:"article",children:b.PAGE404.TITLE})}},{key:"componentDidMount",value:function(){document.title="404 - "+h.NAME}}]),a}(i.a.Component);var R=function(t){var e=Object(A.f)(),a=t.SetClassName;return Object(n.useEffect)((function(){var t=e.pathname.replace(/\//g,"_");a(t)}),[e,a]),Object(v.jsx)(L.a,{component:null,children:Object(v.jsx)(D.a,{classNames:"fade",timeout:300,children:Object(v.jsxs)(A.c,{location:e,children:[Object(v.jsx)(A.a,{exact:!0,path:"/",component:U}),Object(v.jsx)(A.a,{exact:!0,path:"/designer",component:H}),Object(v.jsx)(A.a,{exact:!0,path:"/developer",component:H}),Object(v.jsx)(A.a,{exact:!0,path:"/about",component:H}),Object(v.jsx)(A.a,{exact:!0,path:"/contacts",component:H}),Object(v.jsx)(A.a,{path:"*",component:F})]})},e.pathname)})},B=function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).state={className:""},n.SetClassName=n.SetClassName.bind(Object(T.a)(n)),n}return Object(r.a)(a,[{key:"SetClassName",value:function(t){this.setState({className:t})}},{key:"render",value:function(){return Object(v.jsx)("article",{className:this.props.className+(this.state.className?" "+this.state.className:""),children:Object(v.jsx)(R,{SetClassName:this.SetClassName})})}}]),a}(i.a.Component),Y=(a(65),function(t){Object(l.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(c.a)(this,a),(n=e.call(this,t)).Firebase=!1,n}return Object(r.a)(a,[{key:"render",value:function(){return Object(v.jsxs)("div",{className:"app d-flex flex-column",children:[Object(v.jsx)(u.a,{children:Object(v.jsx)(B,{className:"d-flex"})}),Object(v.jsx)(I,{className:"d-flex"})]})}},{key:"componentDidMount",value:function(){document.documentElement.lang=h.LOCALE_HTML,this.Firebase=new O,this.Firebase.LogEvent("test")}}]),a}(i.a.Component)),G=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,82)).then((function(e){var a=e.getCLS,n=e.getFID,i=e.getFCP,s=e.getLCP,o=e.getTTFB;a(t),n(t),i(t),s(t),o(t)}))};o.a.render(Object(v.jsx)(Y,{}),document.getElementById("root")),G()}},[[66,1,2]]]);
//# sourceMappingURL=main.bb9540ef.chunk.js.map