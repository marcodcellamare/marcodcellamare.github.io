"use strict";(self.webpackChunkmarcodcellamare_github_io=self.webpackChunkmarcodcellamare_github_io||[]).push([[883],{969:(t,s,e)=>{e.d(s,{A:()=>l});var i=e(9950),o=e(8429),n=e(7732);const l=t=>{let s=(0,o.zy)();const[e,l]=(0,i.useState)({location:{}}),a=(0,i.cloneElement)(t.children,{location:e});return(0,i.useEffect)((()=>{s.page=s.pathname.substring(1).replaceAll("/","-"),n.Ay.send({hitType:"pageview",page:s.pathname,title:s.page}),l({...s})}),[s]),a}},9263:(t,s,e)=>{e.d(s,{A:()=>bt});var i=e(9950),o=e(8429),n=e(1219),l=e(6223),a=e(4414);i.Component;class r extends i.Component{constructor(t){super(t),this.state={years:0,months:0,days:0,hours:0,minutes:0,seconds:0,show:[],br:!1,postBr:[]},this.types=["years","months","days","hours","minutes","seconds"],this.seconds={years:31536e3,months:2592e3,days:86400,hours:3600,minutes:60,seconds:1},this.interval=!1,this.date=!1,this.now=!1,this.diff=!1,this.Init=this.Init.bind(this),this.Update=this.Update.bind(this)}componentDidMount(){this.Init()}componentWillUnmount(){clearInterval(this.interval)}Init(){this.date=new Date(this.props.since).getTime(),this.now=!1,this.interval=setInterval((()=>{this.Update()}),1e3),this.Update()}Update(){this.now=(new Date).getTime(),this.diff=Math.abs((this.now-this.date)/1e3);let t=this.diff,s={},e=[],i=this.props.br,o=!1,n=[];this.types.forEach(((l,a)=>{s[l]=Math.floor(t/this.seconds[l]),t-=s[l]*this.seconds[l],s[l]>0?(i&&(o||i!==l?o&&n.push(l):o=!0),e.push(l)):i&&!o&&i===l&&(i=!!this.types[a+1]&&this.types[a+1])})),this.setState((t=>({...t,...s,show:e,br:i,postBr:n})))}render(){return this.state.show.length>0?(0,a.jsxs)("p",{className:"counter"+(this.props.className?" "+this.props.className:""),children:[this.props.prefx?(0,a.jsx)("span",{className:"counter-item counter-prefx"+(this.props.classNamePreBr?" "+this.props.classNamePreBr:""),children:this.props.prefx+" "}):null,this.state.show.map(((t,s)=>(0,a.jsxs)(i.Fragment,{children:[(0,a.jsxs)("span",{className:"counter-item counter-count counter-count-"+s+" counter-count-"+t+(this.state.postBr.includes(t)?" counter-item-post"+(this.props.classNamePostBr?" "+this.props.classNamePostBr:""):" counter-item-pre"+(this.props.classNamePreBr?" "+this.props.classNamePreBr:"")),children:[(0,a.jsx)("span",{className:"counter-count-number",children:this.state[t]}),(0,a.jsx)("span",{className:"counter-count-text",children:" "+this.props.Locale.com[1===this.state[t]?t.slice(0,-1).toUpperCase():t.toUpperCase()].toLowerCase()}),(0,a.jsx)("span",{className:"counter-count-separator",children:s<this.state.show.length-2?", ":s===this.state.show.length-2?" "+this.props.Locale.com.AND.toLowerCase()+" ":this.props.suffx?null:"."})]}),this.state.br===t?(0,a.jsx)("br",{}):null]},s))),this.props.suffx?(0,a.jsxs)("span",{className:"counter-item counter-suffx"+(0===this.state.postBr.length?this.props.classNamePreBr?" "+this.props.classNamePreBr:"":this.props.classNamePostBr?" "+this.props.classNamePostBr:""),children:[" "+this.props.suffx.charAt(0).toLowerCase()+this.props.suffx.slice(1),"."]}):null]}):null}}const h=r;class c extends i.Component{constructor(t){super(t),this.state={left:0,top:0},this.ref=!1,this.onMouseMove=this.onMouseMove.bind(this)}componentDidMount(){document.addEventListener("mousemove",this.onMouseMove)}componentWillUnmount(){document.removeEventListener("mousemove",this.onMouseMove)}onMouseMove(t){this.ref&&this.setState((s=>({left:this.props.ratioX&&this.ref.getBoundingClientRect().top+this.ref.getBoundingClientRect().height>0&&this.ref.getBoundingClientRect().top<window.innerHeight?Math.round((this.ref.getBoundingClientRect().left+this.ref.getBoundingClientRect().width/2-t.pageX)/this.props.ratioX):s.left,top:this.props.ratioY&&this.ref.getBoundingClientRect().top+this.ref.getBoundingClientRect().height>0&&this.ref.getBoundingClientRect().top<window.innerHeight?Math.round((this.ref.getBoundingClientRect().top+this.ref.getBoundingClientRect().height/2-t.pageY)/this.props.ratioY):s.top})))}render(){return(0,a.jsx)("div",{ref:t=>this.ref=t,className:"floating"+(this.props.className?" "+this.props.className:""),children:this.props.children?i.cloneElement(this.props.children,{className:(this.props.children.props&&this.props.children.props.className?this.props.children.props.className:"")+(this.props.classNameChildren?" "+this.props.classNameChildren:""),style:{transform:(this.state.left?"translateX("+this.state.left+"px) ":"")+(this.state.top?"translateY("+this.state.top+"px) ":"")}}):null})}}const p=c;var d=e(2074),m=e(7732),u=e(5203),g=e(3293),x=e(8117),f=e(2146),b=e(1959),y=e(7909),v=e(7170),j=e(6455),N=e(7954),w=e(5854);e(5082);class L extends i.Component{constructor(t){super(t),this.state={navLink:!1,href:"",icon:"",title:""},this.onClick=this.onClick.bind(this),this.Init=this.Init.bind(this)}componentDidMount(){this.Init()}componentDidUpdate(t){t!==this.props&&this.Init()}onClick(){m.Ay.event({category:"Links",action:"click",label:this.state.title?this.state.title:this.state.type})}Init(){let t=!1,s={},e=!1,i=!1;if(this.props.url&&0===this.props.url.indexOf("INTERNAL::")){const t=this.props.url.replace("INTERNAL::","").split(".");i=this.props.Locale,t.forEach((t=>{i[t]&&(i=i[t])}))}else this.props.url&&0===this.props.url.indexOf("ROUTE::")?(i=this.props.url.replace("ROUTE::",""),t=!0):i=this.props.url;switch(this.props.type){case"link":e=(0,a.jsx)(u.A,{});break;case"download":e=(0,a.jsx)(g.A,{});break;default:e=(0,a.jsx)(x.A,{})}switch(this.props.type){case"phone":s={navLink:t,href:"tel:"+this.props.url,icon:(0,a.jsx)(f.A,{}),title:this.props.url};break;case"email":s={navLink:t,href:"mailto:"+this.props.url,icon:(0,a.jsx)(b.A,{}),title:this.props.url};break;case"portfolio":s={navLink:t,href:this.props.url,icon:(0,a.jsx)(y.A,{}),title:this.props.Locale.com[this.props.type.toUpperCase()]};break;case"linkedin":s={navLink:t,href:this.props.url,icon:(0,a.jsx)(v.A,{}),title:this.props.Locale.com[this.props.type.toUpperCase()]};break;case"github":s={navLink:t,href:this.props.url,icon:(0,a.jsx)(j.A,{}),title:this.props.Locale.com[this.props.type.toUpperCase()]};break;case"behance":s={navLink:t,href:this.props.url,icon:(0,a.jsx)(N.A,{}),title:this.props.Locale.com[this.props.type.toUpperCase()]};break;case"instagram":s={navLink:t,href:this.props.url,icon:(0,a.jsx)(w.A,{}),title:this.props.Locale.com[this.props.type.toUpperCase()]};break;default:s={navLink:t,href:i,icon:e,title:""}}this.setState(s)}render(){const t=this.state.navLink?d.k2:"a";return(0,a.jsxs)(t,{href:!this.state.navLink&&this.state.href?this.state.href:null,to:this.state.navLink&&this.state.href?this.state.href:null,title:this.state.title,className:"icon-link position-relative"+(this.props.className?" "+this.props.className:""),target:this.state.navLink?null:"_blank",rel:this.state.navLink?null:"noreferrer",onClick:this.onClick,children:[(0,a.jsx)("span",{className:"icon-link-icon"+(!this.props.iconOnly&&this.props.children?" lead me-2":""),children:this.state.icon}),this.props.iconOnly&&this.state.title?(0,a.jsx)("span",{className:"icon-link-title small position-absolute top-0 start-50 translate-middle pe-none text-nowrap fw-bold px-2 py-1 z-1"+(this.props.classNameTitle?" "+this.props.classNameTitle:""),children:this.state.title}):null,!this.props.iconOnly&&this.props.children?(0,a.jsx)("strong",{children:this.props.children}):null]})}}const T=L;var S=e(9208),C=e(5054),E=e(2282),k=e(6705),_=e(74),M=e(891),I=e(2070);e(6939);class B extends i.Component{constructor(t){super(t),this.state={show:!1,showLink:!1,k:!1,over:!1,type:"",title:"",titleTyping:"",link:""},this.timeoutStarted=!1,this.timeoutTyping=!1,this.timeoutTyped=!1,this.timeoutEnded=!1,this.timeoutLink=!1,this.intervalTyping=!1,this.status="",this.onTransitionEnd=this.onTransitionEnd.bind(this),this.onStart=this.onStart.bind(this),this.onStarted=this.onStarted.bind(this),this.onTyping=this.onTyping.bind(this),this.onTyped=this.onTyped.bind(this),this.onEnded=this.onEnded.bind(this),this.onHover=this.onHover.bind(this),this.onClick=this.onClick.bind(this),this.Icon=this.Icon.bind(this),this.Clear=this.Clear.bind(this)}componentDidMount(){this.onStart()}componentWillUnmount(){this.Clear()}onTransitionEnd(t){t.target.classList.contains("love-icon")&&"opacity"===t.propertyName&&(this.state.show||this.onEnded())}onStart(){let t;this.Clear(),this.status="start";do{t=Math.floor(Math.random()*I.length)}while(t===this.state.k);this.setState({showLink:!1,k:t,type:I[t].type,title:I[t].title,titleTyping:"",link:I[t].link},this.onStarted)}onStarted(){this.Clear(),this.status="started",this.timeoutStarted=setTimeout((()=>{this.setState({show:!0},(()=>{this.timeoutTyping=setTimeout(this.onTyping,500)}))}),100)}onTyping(){this.Clear(),this.status="typing";let t=[];this.intervalTyping=setInterval((()=>{const s=t.length>0&&10*Math.random()<3,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let i="";if(s){do{i=e.charAt(Math.floor(62*Math.random()))}while(i===this.state.title[t.length]);t.push(i)}else t.push(this.state.title[t.length]);t.length<=this.state.title.length?this.setState({titleTyping:t.join("")},(()=>{s&&t.pop()})):(this.Clear(),this.onTyped(!1))}),80)}onTyped(t){this.Clear(),this.status="typed",this.state.over||(this.timeoutTyped=setTimeout((()=>{this.setState({show:!1,titleTyping:""})}),t?500:3e3)),this.timeoutLink=setTimeout((()=>{this.setState({showLink:!0})}),10)}onEnded(){this.Clear(),this.status="ended",this.timeoutEnded=setTimeout((()=>{this.onStart()}),200)}onHover(t){this.setState({over:t},(()=>{"typed"===this.status&&(this.state.over?this.Clear():this.onTyped(!0))}))}onClick(t){m.Ay.event({category:"Love",action:"click",label:this.props.Locale.com.I+" "+this.props.Locale.com[this.state.type.toUpperCase()].toLowerCase()+" "+this.state.title})}Icon(){const t={title:this.props.Locale.com[this.state.type.toUpperCase()],className:"love-icon mx-2"};switch(this.state.type){case"hate":return(0,a.jsx)(S.A,{...t});case"music":return(0,a.jsx)(C.A,{...t});case"play":return(0,a.jsx)(E.A,{...t});case"code":return(0,a.jsx)(k.A,{...t});default:return(0,a.jsx)(_.A,{...t})}}Clear(){clearTimeout(this.timeoutStarted),clearTimeout(this.timeoutTyping),clearTimeout(this.timeoutTyped),clearTimeout(this.timeoutEnded),clearTimeout(this.timeoutLink),clearInterval(this.intervalTyping)}render(){return this.state.type&&this.props.Locale.com[this.state.type.toUpperCase()]?(0,a.jsxs)("div",{className:"love text-success fw-bold"+(this.state.show?" show":"")+(this.props.className?" "+this.props.className:""),onMouseEnter:()=>this.onHover(!0),onMouseLeave:()=>this.onHover(!1),onTransitionEnd:this.onTransitionEnd,title:this.props.Locale.com.I+" "+this.props.Locale.com[this.state.type.toUpperCase()].toLowerCase()+" "+this.state.title,children:[this.props.Locale.com.I,this.Icon(),this.state.titleTyping,(0,a.jsx)("span",{className:"love-cursor",children:"_"}),this.state.link&&this.state.titleTyping.length===this.state.title.length?(0,a.jsx)("a",{className:"love-link link-success link-underline-opacity-0"+(this.state.showLink?" show":""),href:this.state.link,target:"_blank",rel:"noreferrer",onClick:this.onClick,children:(0,a.jsx)(M.A,{})}):null]}):null}}const A=B;e(7918);class R extends i.Component{render(){return(0,a.jsx)(p,{className:"pager pager-"+(this.props.slide<=8?this.props.slide:"all")+" position-absolute top-0 bottom-0",ratioY:30,children:(0,a.jsxs)("div",{className:"pager-wrapper position-absolute start-0",children:[(0,a.jsx)("div",{className:"pager-polygon position-absolute top-50 start-0"}),this.props.slide>0?(0,a.jsx)("div",{className:"pager-title position-relative d-none d-md-block",children:(0,a.jsxs)("h2",{className:"h6 my-0 small lh-1 text-nowrap text-uppercase",children:[this.props.Locale.com.THE," ",this.props.Locale.com.PORTFOLIO.toLowerCase()," ",this.props.Locale.com.OF.toLowerCase(),(0,a.jsx)("br",{}),(0,a.jsx)("strong",{children:this.props.Locale.com.NAME})]})}):null]})})}}const U=R;e(2227);class H extends i.Component{constructor(t){super(t),this.state={show:!1},this.component="title",this.timeout=!1,this.onTransitionEnd=this.onTransitionEnd.bind(this),this.Show=this.Show.bind(this),this.Hide=this.Hide.bind(this)}componentDidMount(){this.Show()}componentWillUnmount(){clearTimeout(this.timeout)}onTransitionEnd(t){t.target.classList.contains(this.component)&&"opacity"===t.propertyName&&(t.target.classList.contains("show")?"function"===typeof this.props.onShown&&this.props.onShown(this.component):"function"===typeof this.props.onHidden&&this.props.onHidden(this.component))}Show(){clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.setState({show:!0},(()=>{"function"===typeof this.props.onShow&&this.props.onShow(this.component)}))}),100)}Hide(){clearTimeout(this.timeout),this.setState({show:!1},(()=>{"function"===typeof this.props.onHide&&this.props.onHide(this.component)}))}render(){return this.props.current.title?(0,a.jsx)("div",{className:"title small position-fixed top-50 end-0 translate-middle-y z-3 bg-success text-dark fw-bold px-3 py-1 pe-none text-truncate"+(this.state.show?" show":""),onTransitionEnd:this.onTransitionEnd,children:this.props.current.title}):null}}const O=H;e(7550);class D extends i.Component{constructor(t){super(t),this.ref=!1,this.spacer="mb-10 mb-md-15"}render(){return(0,a.jsx)("section",{ref:t=>this.ref=t,className:"d-flex overflow-hidden position-relative section-"+this.props.slide+" section-"+this.props._.theme,children:(0,a.jsxs)("div",{className:"container position-relative d-flex flex-grow-1 flex-row py-20 py-lg-40 py-xl-50",children:[(0,a.jsx)(U,{Locale:this.props.Locale,slide:this.props.slide}),(0,a.jsx)("div",{className:"row flex-grow-1 align-self-center",children:(0,a.jsxs)("div",{className:"col",children:[["cover"].includes(this.props._.layout)?(0,a.jsx)(Z,{Locale:this.props.Locale,language:this.props.language}):null,["cover"].includes(this.props._.layout)?null:(0,a.jsxs)("div",{className:"section-wrapper row flex-grow-1 position-relative",children:[!this.props._.layout||["left","right"].includes(this.props._.layout)?(0,a.jsx)("div",{className:"col-12 col-md-5 align-self-center mb-10 mb-sm-15 mb-md-0",children:(0,a.jsx)(it,{blob:this.props._.imageBlob,files:this.props._.images})}):null,(0,a.jsxs)("div",{className:"col-12 align-self-center position-relative z-1"+(!this.props._.layout||["left","right"].includes(this.props._.layout)?" col-md-7 pe-md-20 ":"")+(!this.props._.layout||["full"].includes(this.props._.layout)?" col-md-9 col-lg-8":"")+(!this.props._.layout||["left"].includes(this.props._.layout)?" order-md-first":""),children:[(0,a.jsx)(V,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,slide:this.props.slide,_:{TITLE:this.props._.TITLE,SUBTITLE:this.props._.SUBTITLE,TEXT:this.props._.TEXT}}),(0,a.jsx)(W,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,_:this.props._.btns}),(0,a.jsx)(rt,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,_:this.props._.periods}),(0,a.jsx)(nt,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,_:this.props._.lists}),(0,a.jsx)(J,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,_:this.props._.counters}),(0,a.jsx)(Y,{className:this.spacer,Locale:this.props.Locale,language:this.props.language,_:this.props._.brands})]})]})]})})]})})}}const P=D;var X=e(3317);e(1236);class z extends i.Component{render(){return this.props._&&this.props._.length>0?(0,a.jsx)("div",{className:"section-brands"+(this.props.className?" "+this.props.className:""),children:(0,a.jsx)("div",{className:"row g-0",children:this.props._.map(((t,s)=>(0,a.jsx)("div",{className:"col-4 col-sm-3 col-lg-2 d-flex align-items-center justify-content-center",children:(0,a.jsxs)("div",{className:"section-brands-logo",children:[(0,a.jsx)(X.A,{className:"w-100 h-100",logo:t.logo,title:t.NAME}),(0,a.jsx)("h3",{hidden:!0,children:t.NAME})]})},s)))})}):null}}const Y=z;class F extends i.Component{render(){return this.props._&&this.props._.length>0?(0,a.jsx)("div",{className:"section-btns"+(this.props.className?" "+this.props.className:""),children:this.props._.map(((t,s)=>(0,a.jsx)(T,{className:t.className,Locale:this.props.Locale,iconOnly:!1,type:t.type,url:t.url,children:t.TEXT},s)))}):null}}const W=F;class q extends i.Component{render(){return(0,a.jsxs)("div",{className:"section-content"+(this.props.className?" "+this.props.className:""),children:[this.props._.TITLE?0===this.props.slide?(0,a.jsx)("h1",{className:"display-2 fw-bold"+(this.props._.SUBTITLE||this.props._.TEXT?" mt-0 mb-5":" my-0"),dangerouslySetInnerHTML:{__html:this.props._.TITLE}}):(0,a.jsx)("h2",{className:"display-2 fw-bold"+(this.props._.SUBTITLE||this.props._.TEXT?" mt-0 mb-5":" my-0"),dangerouslySetInnerHTML:{__html:this.props._.TITLE}}):null,this.props._.SUBTITLE?(0,a.jsx)("p",{className:"lead"+(this.props._.TEXT?" mt-0 mb-5":" my-0"),dangerouslySetInnerHTML:{__html:this.props._.SUBTITLE}}):null,this.props._.TEXT?(0,a.jsx)("p",{className:"my-0",dangerouslySetInnerHTML:{__html:this.props._.TEXT}}):null]})}}const V=q;class G extends i.Component{render(){return this.props._&&this.props._.length>0?(0,a.jsx)("div",{className:"section-counters"+(this.props.className?" "+this.props.className:""),children:(0,a.jsx)("div",{className:"row",children:this.props._.map(((t,s)=>(0,a.jsxs)("div",{className:"col-12"+(t.colClassName?" "+t.colClassName:""),children:[t.TITLE?(0,a.jsx)("h3",{className:"mt-0 mb-3",children:t.TITLE}):null,(0,a.jsx)(h,{Locale:this.props.Locale,className:t.className,classNamePreBr:t.classNamePreBr,classNamePostBr:t.classNamePostBr,since:t.since,br:t.br,prefx:t.PREFX,suffx:t.SUFFX})]},s)))})}):null}}const J=G;var K=e(9146);class Q extends i.Component{render(){return(0,a.jsxs)("div",{className:"section-cover"+(this.props.className?" "+this.props.className:""),children:[(0,a.jsx)(p,{className:"position-absolute top-0 bottom-0 start-0 end-0 p-10 p-md-20",ratioX:130,ratioY:130,children:(0,a.jsx)("img",{src:"./images/marco-d-cellamare.webp",srcSet:"./images/marco-d-cellamare-sm.webp 800w, ./images/marco-d-cellamare.webp 1000w",sizes:"(max-width: 800px) 800w, 1000w",alt:this.props.Locale.com.NAME,className:"object-fit-contain w-100 h-100 opacity-70",fetchpriority:"high"})}),(0,a.jsxs)("div",{className:"row position-relative",children:[(0,a.jsx)("div",{className:"col-12 col-md-auto text-center text-md-end align-self-center mb-5 mb-md-0",children:(0,a.jsx)("h5",{className:"my-0 text-uppercase lh-1",children:this.props.Locale.com.THE})}),(0,a.jsx)(p,{className:"col-12 col-md-4 text-center align-self-center",classNameChildren:"w-80 w-sm-70 w-md-auto",ratioX:65,ratioY:65,children:(0,a.jsx)(K.h,{})}),(0,a.jsxs)("div",{className:"col-12 col-md text-center text-md-start align-self-center mt-5 mt-md-0",children:[(0,a.jsxs)("h5",{className:"mt-0 mb-1 text-uppercase lh-1",children:[this.props.Locale.com.OF.toLowerCase()," ",(0,a.jsx)("strong",{className:"text-success",children:this.props.Locale.com.NAME})]}),(0,a.jsx)("h6",{className:"small my-0 text-uppercase",children:this.props.Locale.com.ROLE})]})]})]})}}const Z=Q;var $=e(9589),tt=e.n($),st=e(7956);e(2748);class et extends i.Component{constructor(t){super(t),this.blob={base:"relaxed",relaxed:{min:6,max:9,interval:700},stressed:{min:9,max:10,interval:300}},this.state={mounted:!0,over:!1,blob:{shape:!1,width:0,height:0,status:this.blob.base,growth:{min:this.blob[this.blob.base].min,max:this.blob[this.blob.base].max},interval:this.blob[this.blob.base].interval}},this.interval=!1,this.timeout=!1,this.ref=!1,this.id=(0,st.A)(),this.onHover=this.onHover.bind(this),this.onResize=this.onResize.bind(this),this.Init=this.Init.bind(this),this.BlobShape=this.BlobShape.bind(this)}componentDidMount(){clearInterval(this.interval),clearTimeout(this.timeout),window.addEventListener("resize",this.onResize),window.dispatchEvent(new Event("resize")),this.Init()}componentWillUnmount(){clearInterval(this.interval),clearTimeout(this.timeout),window.removeEventListener("resize",this.onResize)}onHover(t){const s=t?"stressed":"relaxed";this.setState((e=>({over:t,blob:{...e.blob,status:s,growth:{min:this.blob[s].min,max:this.blob[s].max},interval:this.blob[s].interval}})),this.Init)}onResize(){clearTimeout(this.timeout),this.setState({mounted:!1},(()=>{let t=this.state.blob.width,s=this.state.blob.height;this.ref&&(t=Math.floor(this.ref.getBoundingClientRect().width),s=Math.floor(this.ref.getBoundingClientRect().height)),this.timeout=setTimeout((()=>{this.setState((e=>({mounted:!0,blob:{...e.blob,width:t,height:s}})))}),200)}))}Init(){clearInterval(this.interval),clearTimeout(this.timeout),this.BlobShape(),this.interval=setInterval((()=>{this.BlobShape()}),this.state.blob.interval)}BlobShape(){if(this.ref&&this.props.blob){const t=tt()({size:this.state.mounted?this.state.blob.width:1,growth:Math.round(Math.random()*(this.state.blob.growth.max-this.state.blob.growth.min)+this.state.blob.growth.min),edges:5,seed:null});this.setState((s=>({blob:{...s.blob,shape:t}})))}}render(){return this.props.files&&this.props.files.length>0?(0,a.jsx)("div",{ref:t=>this.ref=t,className:"section-images position-relative w-100"+(this.state.over?" hover":""),onMouseEnter:t=>this.onHover(!0),onMouseLeave:t=>this.onHover(!1),children:this.state.mounted?(0,a.jsxs)("div",{className:"section-images-wrapper",children:[this.props.blob&&this.state.blob.shape?(0,a.jsxs)("svg",{className:"section-images-clip position-absolute top-50 start-50 translate-middle",preserveAspectRatio:"none",style:{width:this.state.blob.width,height:this.state.blob.width},children:[(0,a.jsx)("path",{d:this.state.blob.shape.path}),(0,a.jsx)("clipPath",{id:this.id,children:(0,a.jsx)("path",{d:this.state.blob.shape.path})})]}):null,(0,a.jsx)("div",{className:"section-images-slide position-relative",style:this.props.blob&&this.state.blob.shape?{clipPath:"url(#"+this.id+")"}:null,children:this.props.files.map(((t,s)=>(0,a.jsx)("div",{className:"section-images-image",style:{width:this.state.blob.width,height:this.state.blob.width},children:(0,a.jsx)("img",{src:"./images/"+t.file,srcSet:"./images/"+t.fileSm+" 800w, ./images/"+t.file+" 1000w",sizes:"(max-width: 800px) 800w, 1000w",className:"object-fit-contain w-100 h-100",alt:t.file,loading:"lazy"})},s)))})]}):null}):null}}const it=et;class ot extends i.Component{render(){return this.props._&&this.props._.length>0?(0,a.jsx)("div",{className:"section-lists"+(this.props.className?" "+this.props.className:""),children:this.props._.map(((t,s)=>(0,a.jsxs)("div",{children:[t.TITLE?(0,a.jsx)("h3",{className:"h5 fw-bold",children:t.TITLE}):null,t.TEXT?(0,a.jsx)("p",{children:t.TEXT}):null,t._&&t._.length>0?(0,a.jsx)("ul",{className:"list-inline",children:t._.map(((t,s)=>(0,a.jsx)("li",{className:"list-inline-item",children:"object"===typeof t?t.TITLE:t},s)))}):null]},s)))}):null}}const nt=ot;var lt=e(704);e(3464);class at extends i.Component{constructor(t){super(t),this.types=["years","months"],this.seconds={years:31536e3,months:2592e3,days:86400,hours:3600,minutes:60,seconds:1},this.dateFormatter={yearsMonths:new Intl.DateTimeFormat(this.props.language,{year:"numeric",month:"numeric"}),years:new Intl.DateTimeFormat(this.props.language,{year:"numeric"})},this.Years=this.Years.bind(this)}Years(t,s){t=new Date(t),s="NOW"!==s?new Date(s):new Date;let e=Math.abs((s.getTime()-t.getTime())/1e3),i={},o=[];return this.types.forEach(((t,s)=>{i[t]=Math.floor(e/this.seconds[t]),i[t]&&o.push(i[t]+" "+(1!==i[t]?this.props.Locale.com[t.toUpperCase()]:this.props.Locale.com[t.slice(0,-1).toUpperCase()]).toLowerCase()),e-=i[t]*this.seconds[t]})),o.join(" "+this.props.Locale.com.AND.toLowerCase()+" ")}render(){return this.props._&&this.props._.length>0?(0,a.jsx)("div",{className:"section-periods"+(this.props.className?" "+this.props.className:""),children:this.props._.map(((t,s)=>(0,a.jsx)("div",{className:"section-period-"+s+" mb-5"+(t.highlight?" px-5 py-2 mx-n5 border border-2 border-dark":""),children:(0,a.jsxs)("div",{className:"row",children:[(0,a.jsxs)("div",{className:"col-12 col-md-5 col-lg-4 col-xl-3",children:[(0,a.jsx)("p",{className:"h6 d-inline d-md-block fw-bold my-0 me-2",children:this.dateFormatter[t.dates[0].length>4?"yearsMonths":"years"].format(new Date(t.dates[0]))+(t.dates[0].length>4&&t.dates[1]?" - "+("NOW"!==t.dates[1]?this.dateFormatter.yearsMonths.format(new Date(t.dates[1])):this.props.Locale.com[t.dates[1]]):"")}),t.dates[1]?(0,a.jsx)("p",{className:"small d-inline d-md-block my-0",children:this.Years(t.dates[0],t.dates[1])}):null]}),(0,a.jsxs)("div",{className:"col-12 col-md-7 col-lg-8 col-xl-9",children:[t.title?(0,a.jsx)("h3",{className:"h6 fw-bold my-0",children:t.title}):null,t.company?(0,a.jsxs)("p",{className:"my-0 fst-italic",children:[(0,a.jsx)(lt.A,{})," ",t.company]}):null,t.type||t.city||t.country?(0,a.jsxs)("ul",{className:"list-inline my-0 small",children:[t.type?(0,a.jsx)("li",{className:"list-inline-item fw-bold",children:t.type}):null,t.city?(0,a.jsx)("li",{className:"list-inline-item",children:t.city}):null,t.country?(0,a.jsxs)("li",{className:"list-inline-item",children:["(",t.country,")"]}):null]}):null]})]})},s)))}):null}}const rt=at;class ht extends i.Component{constructor(t){super(t),this.state={slides:{top:-1,center:-1}},this.ref={main:!1,slides:[]},this.timeoutScroll=!1,this.timeoutEnd=!1,this.scrollStart=!0,this.onScroll=this.onScroll.bind(this),this.onScrollStart=this.onScrollStart.bind(this),this.onScrollEnd=this.onScrollEnd.bind(this),this.Init=this.Init.bind(this),this.Clear=this.Clear.bind(this),this.Top=this.Top.bind(this),this.Center=this.Center.bind(this),this.Close=this.Close.bind(this)}componentDidMount(){this.Init()}componentDidUpdate(t){t!==this.props&&t.location.page!==this.props.location.page&&this.Init()}componentWillUnmount(){this.Clear()}onScroll(){this.Clear();let t=!1;this.onScrollStart(),this.ref.slides.forEach(((s,e)=>{s&&(this.Top(s.ref,e,!1),this.Center(s.ref,e,!1),t=this.Close(s.ref,e,t))})),"function"===typeof this.props.onScroll&&this.props.onScroll(this.state.slides),this.timeoutEnd=setTimeout((()=>{this.onScrollEnd(t)}),200)}onScrollStart(){this.scrollStart&&"function"===typeof this.props.onScrollStart&&this.props.onScrollStart(this.state.slides),this.scrollStart=!1}onScrollEnd(t){this.Clear(),!1!==t&&this.ref.main.scroll({top:Math.ceil(t.offsetTop),behavior:"smooth"}),"function"===typeof this.props.onScrollEnd&&this.props.onScrollEnd(this.state.slides,!1!==t),this.scrollStart=!0}Init(){this.Clear(),this.ref.main&&this.ref.slides.length>0&&this.ref.slides[0]&&this.ref.slides[0].ref&&(this.Top(this.ref.slides[0].ref,0,!0),this.Center(this.ref.slides[0].ref,0,!0),this.ref.main.scrollTo({top:0,behavior:"smooth"}))}Clear(){clearTimeout(this.timeoutScroll),clearTimeout(this.timeoutEnd)}Top(t,s,e){t&&Math.floor(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)>-Math.floor(this.ref.main.getBoundingClientRect().height)&&Math.floor(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)<=0&&this.setState((t=>{if("function"===typeof this.props.onSlide&&this.props.onSlide(s,e),t.slides.top!==s)return{slides:{...t.slides,top:s}}}))}Center(t,s,e){t&&Math.round(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)>=-Math.round(this.ref.main.getBoundingClientRect().height/2)&&Math.round(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)<Math.round(this.ref.main.getBoundingClientRect().height/2)&&this.setState((t=>{if("function"===typeof this.props.onSlideCenter&&this.props.onSlideCenter(s,e),t.slides.center!==s)return{slides:{...t.slides,center:s}}}))}Close(t,s,e){return t&&Math.round(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)>=-Math.round(this.ref.main.getBoundingClientRect().height/3)&&Math.round(t.getBoundingClientRect().top-this.ref.main.getBoundingClientRect().top)<Math.round(this.ref.main.getBoundingClientRect().height/3)&&Math.round(t.getBoundingClientRect().height)<=Math.round(this.ref.main.getBoundingClientRect().height)&&(e=t),e}render(){return(0,a.jsx)("main",{className:"flex-grow-1 position-relative",children:this.props.Locale.pages[this.props.current.page]&&this.props.Locale.pages[this.props.current.page].sections&&this.props.Locale.pages[this.props.current.page].sections.length>0?(0,a.jsx)("div",{className:"main-wrapper position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden overflow-y-auto",ref:t=>{t&&this.ref.main!==t&&(this.ref.main=t,this.Init())},onScroll:this.onScroll,children:this.props.Locale.pages[this.props.current.page].sections.map(((t,s)=>(0,a.jsx)(P,{ref:t=>{t&&this.ref.slides[s]!==t&&(this.ref.slides[s]=t,this.Init())},Locale:this.props.Locale,language:this.props.language,slide:s,_:t},s)))}):null})}}const ct=ht;e(7992);class pt extends i.Component{render(){return(0,a.jsx)("footer",{className:"bg-dark text-light py-5 py-md-10",children:(0,a.jsx)("div",{className:"container",children:(0,a.jsxs)("div",{className:"row gx-5 g-md-10 d-flex",children:[(0,a.jsx)("div",{className:"col-12 col-md align-self-center text-truncate",children:(0,a.jsx)(A,{className:"mb-3 my-md-0",Locale:this.props.Locale})}),Object.keys(this.props.Locale.info).map(((t,s)=>(0,a.jsx)("div",{className:"col-auto align-self-center",children:(0,a.jsxs)("ul",{className:"footer-links list-inline d-inline-block my-0",children:[(0,a.jsx)("li",{className:"list-inline-item",children:(0,a.jsx)("p",{className:"small fw-bold text-success mb-0",children:this.props.Locale.com[t.toUpperCase()]})}),Object.keys(this.props.Locale.info[t]).map(((s,e)=>(0,a.jsx)("li",{className:"list-inline-item",children:(0,a.jsx)(T,{className:"link-success",classNameTitle:"bg-danger text-dark",Locale:this.props.Locale,iconOnly:!0,type:s,url:this.props.Locale.info[t][s]})},e)))]})},s)))]})})})}}const dt=pt;e(2456);class mt extends i.Component{constructor(t){super(t),this.state={show:!1},this.component="nav",this.timeout=!1,this.onTransitionEnd=this.onTransitionEnd.bind(this),this.Show=this.Show.bind(this),this.Hide=this.Hide.bind(this)}componentDidMount(){this.Show()}componentWillUnmount(){clearTimeout(this.timeout)}onTransitionEnd(t){t.target.classList.contains(this.component)&&"opacity"===t.propertyName&&(t.target.classList.contains("show")?"function"===typeof this.props.onShown&&this.props.onShown(this.component):"function"===typeof this.props.onHidden&&this.props.onHidden(this.component))}Show(){clearTimeout(this.timeout),this.timeout=setTimeout((()=>{this.setState({show:!0},(()=>{"function"===typeof this.props.onShow&&this.props.onShow(this.component)}))}),100)}Hide(){clearTimeout(this.timeout),this.setState({show:!1},(()=>{"function"===typeof this.props.onHide&&this.props.onHide(this.component)}))}render(){return Object.keys(n.Ac).length>1?(0,a.jsx)("nav",{className:"nav d-flex position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden"+(this.state.show?" show":""),onTransitionEnd:this.onTransitionEnd,children:(0,a.jsx)("div",{className:"container d-flex flex-grow-1",children:(0,a.jsx)("div",{className:"row flex-grow-1 align-self-center",children:(0,a.jsx)("div",{className:"col",children:(0,a.jsx)("ul",{className:"nav-menu list-unstyled h1 display-2 fw-bold lh-1",children:Object.keys(n.Ac).map(((t,s)=>n.Ac[t].hide?null:(0,a.jsx)("li",{style:{transitionDelay:s/10+"s"},children:(0,a.jsx)(d.k2,{to:t,className:t=>{let{isActive:s}=t;return"d-block position-relative text-nowrap"+(s?" active":"")},onClick:()=>{this.Hide()},children:this.props.Locale.nav[t]})},s)))})})})})}):null}}const ut=mt;e(4754);class gt extends i.Component{render(){return(0,a.jsx)("button",{className:"nav-toggler position-fixed top-0 start-0 btn btn-link p-0 link-success link-underline-opacity-0 m-3 m-md-8"+(this.props.active?" active":""),onClick:this.props.onClick,children:(0,a.jsxs)("div",{className:"nav-toggler-icon",children:[(0,a.jsx)("span",{}),(0,a.jsx)("span",{}),(0,a.jsx)("span",{})]})})}}const xt=gt;e(9955);class ft extends i.Component{constructor(t){super(t),this.state={language:n.Nm,Locale:{},current:{page:"home",slide:0,theme:"",title:""},mounted:{title:!1,nav:!1}},this.ref={title:!1,nav:!1},this.html=document.documentElement,this.timeoutTitle=!1,this.Locale=new l.A,this.onScroll=this.onScroll.bind(this),this.onScrollStart=this.onScrollStart.bind(this),this.onScrollEnd=this.onScrollEnd.bind(this),this.onSlide=this.onSlide.bind(this),this.onSlideCenter=this.onSlideCenter.bind(this),this.Init=this.Init.bind(this),this.Theme=this.Theme.bind(this),this.Language=this.Language.bind(this),this.Mount=this.Mount.bind(this),this.Unmount=this.Unmount.bind(this),this.Element=this.Element.bind(this)}componentDidMount(){clearTimeout(this.timeoutTitle),this.Init()}componentDidUpdate(t){t.location!==this.props.location&&this.setState({current:{page:this.props.location.page,slide:0,theme:"",title:""}})}onScroll(t){}onScrollStart(t){clearTimeout(this.timeoutTitle),this.Mount("title",(()=>{this.ref.title&&this.state.current.title&&this.ref.title.Show()}))}onScrollEnd(t,s){clearTimeout(this.timeoutTitle),this.ref.title&&(this.timeoutTitle=setTimeout((()=>{this.ref.title.Hide()}),1e3))}onSlide(t,s){clearTimeout(this.timeoutTitle),this.state.Locale.pages[this.state.current.page]&&this.state.Locale.pages[this.state.current.page].sections&&this.setState((s=>({current:{...s.current,slide:t}})),(()=>{this.Theme(s)}))}onSlideCenter(t,s){this.state.Locale.pages[this.state.current.page]&&this.state.Locale.pages[this.state.current.page].sections&&this.setState((s=>({current:{...s.current,slide:t,theme:this.state.Locale.pages[this.state.current.page].sections[t].theme,title:this.state.Locale.pages[this.state.current.page].sections[t].SLIDE_TITLE}})),(()=>{this.Theme(s)}))}Init(){let t=[];Object.keys(n.Yj).forEach((s=>{n.Yj[s].state&&t.push({iso:s,...n.Yj[s]})})),t.sort(((t,s)=>t.LABEL.localeCompare(s.LABEL))),this.setState({languages:t,Locale:this.Locale},(()=>{this.Language()}))}Theme(t){this.html.classList="",this.state.current.theme&&this.html.classList.add(this.state.current.theme),t||this.html.classList.add("transition")}Language(){}Mount(t,s){s="function"===typeof s?s:()=>{},this.state.mounted.hasOwnProperty(t)&&this.setState((s=>({mounted:{...s.mounted,[t]:!0}})),s)}Unmount(t,s){s="function"===typeof s?s:()=>{},this.state.mounted.hasOwnProperty(t)&&this.setState((s=>({mounted:{...s.mounted,[t]:!1}})),s)}Element(){return(0,a.jsx)(ct,{Locale:this.state.Locale,language:this.state.language,location:this.props.location,current:this.state.current,onScroll:this.onScroll,onScrollStart:this.onScrollStart,onScrollEnd:this.onScrollEnd,onSlide:this.onSlide,onSlideCenter:this.onSlideCenter})}render(){return Object.keys(this.state.Locale).length>0?(0,a.jsxs)("div",{className:"app d-flex position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden",children:[(0,a.jsxs)("div",{className:"d-flex flex-column flex-grow-1",children:[(0,a.jsxs)(o.BV,{children:[(0,a.jsx)(o.qh,{path:"/",index:!0,element:(0,a.jsx)(o.C5,{to:Object.keys(n.Ac)[0],replace:!0})}),Object.keys(n.Ac).map(((t,s)=>(0,a.jsx)(o.qh,{path:t,element:this.Element(),children:n.Ac[t]._?n.Ac[t]._.map(((s,e)=>(0,a.jsx)(o.qh,{path:t+s,element:this.Element()},e))):null},s))),";",(0,a.jsx)(o.qh,{path:"*",element:(0,a.jsx)(o.C5,{to:Object.keys(n.Ac)[0],replace:!0})})]}),(0,a.jsx)(dt,{Locale:this.state.Locale,language:this.state.language})]}),this.state.mounted.title?(0,a.jsx)(O,{ref:t=>this.ref.title=t,Locale:this.state.Locale,language:this.state.language,current:this.state.current,onHidden:t=>{this.Unmount(t)}}):null,this.state.mounted.nav&&Object.keys(n.Ac).length>1?(0,a.jsx)(ut,{ref:t=>this.ref.nav=t,Locale:this.state.Locale,language:this.state.language,onHidden:t=>{this.Unmount(t)}}):null,Object.keys(n.Ac).length>1?(0,a.jsx)(xt,{active:!!this.state.mounted.nav,onClick:()=>{this.state.mounted.nav?this.ref.nav.Hide():this.Mount("nav")}}):null]}):null}}const bt=ft}}]);