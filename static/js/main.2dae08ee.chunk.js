(this["webpackJsonpmarcodcellamare.github.io"]=this["webpackJsonpmarcodcellamare.github.io"]||[]).push([[0],{16:function(e){e.exports=JSON.parse('{"NAME":"Marco D. Cellamare","LOCALE":"en-GB","LOCALE_HTML":"en"}')},33:function(e){e.exports=JSON.parse('[{"type":"hate","title":"Comic Sans","link":"https://en.wikipedia.org/wiki/Comic_Sans"},{"type":"music","title":"7Peccati","link":"https://7peccati.tumblr.com"},{"type":"love","title":"Adidas","link":"https://www.adidas.com"},{"type":"love","title":"Amiga 500","link":"https://en.wikipedia.org/wiki/Amiga_500"},{"type":"love","title":"C=64","link":"https://en.wikipedia.org/wiki/Commodore_64"},{"type":"love","title":"MOS SID","link":"https://en.wikipedia.org/wiki/MOS_Technology_6581"},{"type":"love","title":"Bootstrap","link":"https://getbootstrap.com"},{"type":"love","title":"eBoy","link":"https://hello.eboy.com"},{"type":"play","title":"Maniac Mansion","link":"https://en.wikipedia.org/wiki/Maniac_Mansion"},{"type":"play","title":"Zak McKracken","link":"https://en.wikipedia.org/wiki/Zak_McKracken_and_the_Alien_Mindbenders"},{"type":"play","title":"Monkey Island","link":"https://en.wikipedia.org/wiki/Monkey_Island_(series)"},{"type":"love","title":"Nintendo","link":"https://www.nintendo.com"},{"type":"play","title":"Zelda","link":"https://www.zelda.com"},{"type":"play","title":"Mario","link":"https://mario.nintendo.com"},{"type":"love","title":"Zzap!","link":"https://www.zzap.it"},{"type":"music","title":"Zapp","link":"https://open.spotify.com/artist/396Kh0m4wGUvcMUULw71yi"},{"type":"music","title":"Chromeo","link":"https://open.spotify.com/artist/2mV8aJphiSHYJf43DxL7Gt"},{"type":"music","title":"Giorgio Moroder","link":"https://open.spotify.com/artist/6jU2Tt13MmXYk0ZBv1KmfO"},{"type":"love","title":"Foosball","link":"https://en.wikipedia.org/wiki/Table_football"}]')},43:function(e,t,a){var n={"./en-GB.json":44};function i(e){var t=c(e);return a(t)}function c(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=c,e.exports=i,i.id=43},44:function(e){e.exports=JSON.parse('{"NAV":{"DESIGNER":"Designer","DEVELOPER":"Developer","ABOUT":"About","CONTACTS":"Contacts"},"HOME":{"TITLE":"Hello world!"},"ABOUT":{"TITLE":"Hello, it\'s me"},"PAGE404":{"TITLE":"404"},"COM":{"I":"I"}}')},57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(24),s=a.n(c),o=a(11),l=a(12),r=a(14),p=a(13),u=a(19),j=a(16),d=a(68),h=a(69),m=a(43)("./"+j.LOCALE+".json"),b=a(1),O=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("header",{className:this.props.className,children:Object(b.jsxs)(d.a,{bg:"light",expand:"lg",className:"w-100",children:[Object(b.jsx)(d.a.Brand,{as:u.b,to:"/",children:j.NAME}),Object(b.jsx)(d.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(b.jsx)(d.a.Collapse,{id:"basic-navbar-nav",children:Object(b.jsxs)(h.a,{className:"mr-auto",children:[Object(b.jsx)(h.a.Link,{as:u.b,to:"/designer",activeClassName:"active",children:m.NAV.DESIGNER}),Object(b.jsx)(h.a.Link,{as:u.b,to:"/developer",activeClassName:"active",children:m.NAV.DEVELOPER}),Object(b.jsx)(h.a.Link,{as:u.b,to:"/about",activeClassName:"active",children:m.NAV.ABOUT}),Object(b.jsx)(h.a.Link,{as:u.b,to:"/contacts",activeClassName:"active",children:m.NAV.CONTACTS})]})})]})})}}]),a}(i.a.Component),v=a(65),k=a(66),f=a(67),y=a(61),x=a(62),N=a(63),w=a(64),C=a(33),g=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).wordBuild=function(){var e=0,t=n.word.split(""),a=setInterval((function(){var i=t.slice().splice(0,e);n.setState({word:i.join("")}),i.length>=t.length&&(clearInterval(a),setTimeout((function(){n.wordInit()}),2e3)),e++}),100)},n.word=!1,n.state={idx:!1,word:"",link:"",type:""},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsxs)("a",{href:this.state.link,target:"_blank",rel:"noreferrer",className:"love d-inline-block",children:[m.COM.I,Object(b.jsxs)("span",{className:"love-icons d-inline-block mx-1",children:[Object(b.jsx)(y.a,{className:"love"==this.state.type?"active":""}),Object(b.jsx)(x.a,{className:"hate"==this.state.type?"active":""}),Object(b.jsx)(N.a,{className:"music"==this.state.type?"active":""}),Object(b.jsx)(w.a,{className:"play"==this.state.type?"active":""})]}),this.state.word,Object(b.jsx)("span",{className:"love-cursor",children:"_"})]})}},{key:"componentDidMount",value:function(){this.wordInit()}},{key:"wordInit",value:function(){var e,t=this,a=!1;do{a=Math.floor(Math.random()*C.length)}while(a===this.state.idx);e=C[a],this.setState({idx:a,word:"",link:e.link,type:e.type}),this.word=e.title,setTimeout((function(){t.wordBuild()}),500)}}]),a}(i.a.Component),M=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("footer",{className:this.props.className,children:Object(b.jsx)(v.a,{fluid:!0,className:"py-3",children:Object(b.jsx)(k.a,{children:Object(b.jsx)(f.a,{children:Object(b.jsx)(g,{})})})})})}}]),a}(i.a.Component),E=a(23),T=a(8),A=a(71),L=a(70),I=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("div",{className:"article",children:Object(b.jsx)("div",{className:"page-header",children:Object(b.jsx)("h1",{children:m.HOME.TITLE})})})}},{key:"componentDidMount",value:function(){document.title=j.NAME}}]),a}(i.a.Component),_=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("div",{className:"article",children:m.ABOUT.TITLE})}},{key:"componentDidMount",value:function(){document.title="About - "+j.NAME}}]),a}(i.a.Component),D=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsx)("div",{className:"article",children:m.PAGE404.TITLE})}},{key:"componentDidMount",value:function(){document.title="404 - "+j.NAME}}]),a}(i.a.Component);var S=function(e){var t=Object(T.f)(),a=e.setClassName;return Object(n.useEffect)((function(){var e=t.pathname.replace(/\//g,"_");a(e)}),[t,a]),Object(b.jsx)(A.a,{component:null,children:Object(b.jsx)(L.a,{classNames:"fade",timeout:300,children:Object(b.jsxs)(T.c,{location:t,children:[Object(b.jsx)(T.a,{exact:!0,path:"/",component:I}),Object(b.jsx)(T.a,{exact:!0,path:"/designer",component:_}),Object(b.jsx)(T.a,{exact:!0,path:"/developer",component:_}),Object(b.jsx)(T.a,{exact:!0,path:"/about",component:_}),Object(b.jsx)(T.a,{exact:!0,path:"/contacts",component:_}),Object(b.jsx)(T.a,{path:"*",component:D})]})},t.pathname)})},B=function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={className:""},n.setClassName=n.setClassName.bind(Object(E.a)(n)),n}return Object(l.a)(a,[{key:"setClassName",value:function(e){this.setState({className:e})}},{key:"render",value:function(){return Object(b.jsx)("article",{className:this.props.className+(this.state.className?" "+this.state.className:""),children:Object(b.jsx)(S,{setClassName:this.setClassName})})}}]),a}(i.a.Component),U=(a(57),function(e){Object(r.a)(a,e);var t=Object(p.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"app d-flex flex-column",children:[Object(b.jsxs)(u.a,{children:[Object(b.jsx)(O,{className:"d-flex"}),Object(b.jsx)(B,{className:"d-flex"})]}),Object(b.jsx)(M,{className:"d-flex"})]})}},{key:"componentDidMount",value:function(e){document.documentElement.lang=j.LOCALE_HTML}}]),a}(i.a.Component)),G=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,72)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),i(e),c(e),s(e)}))};s.a.render(Object(b.jsx)(U,{}),document.getElementById("root")),G()}},[[58,1,2]]]);
//# sourceMappingURL=main.2dae08ee.chunk.js.map