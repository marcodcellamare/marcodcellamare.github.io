/*! For license information please see 441.6ab321bc.js.LICENSE.txt */
"use strict";(self.webpackChunkmarcodcellamare_github_io=self.webpackChunkmarcodcellamare_github_io||[]).push([[441],{2074:(e,t,r)=>{var n,o;r.d(t,{I9:()=>v,k2:()=>g});var a=r(9950),i=r(7119),u=r(8429),l=r(1018);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function c(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);const f=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],p=["aria-current","caseSensitive","className","end","style","to","unstable_viewTransition","children"];try{window.__reactRouterVersion="6"}catch(E){}const d=a.createContext({isTransitioning:!1});new Map;const h=(n||(n=r.t(a,2))).startTransition;(o||(o=r.t(i,2))).flushSync,(n||(n=r.t(a,2))).useId;function v(e){let{basename:t,children:r,future:n,window:o}=e,i=a.useRef();null==i.current&&(i.current=(0,l.TM)({window:o,v5Compat:!0}));let s=i.current,[c,f]=a.useState({action:s.action,location:s.location}),{v7_startTransition:p}=n||{},d=a.useCallback((e=>{p&&h?h((()=>f(e))):f(e)}),[f,p]);return a.useLayoutEffect((()=>s.listen(d)),[s,d]),a.createElement(u.Ix,{basename:t,children:r,location:c.location,navigationType:c.action,navigator:s,future:n})}const m="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement,y=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,b=a.forwardRef((function(e,t){let r,{onClick:n,relative:o,reloadDocument:i,replace:p,state:d,target:h,to:v,preventScrollReset:b,unstable_viewTransition:g}=e,_=c(e,f),{basename:S}=a.useContext(u.jb),C=!1;if("string"===typeof v&&y.test(v)&&(r=v,m))try{let e=new URL(window.location.href),t=v.startsWith("//")?new URL(e.protocol+v):new URL(v),r=(0,l.pb)(t.pathname,S);t.origin===e.origin&&null!=r?v=r+t.search+t.hash:C=!0}catch(E){}let R=(0,u.$P)(v,{relative:o}),w=function(e,t){let{target:r,replace:n,state:o,preventScrollReset:i,relative:s,unstable_viewTransition:c}=void 0===t?{}:t,f=(0,u.Zp)(),p=(0,u.zy)(),d=(0,u.x$)(e,{relative:s});return a.useCallback((t=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(t,r)){t.preventDefault();let r=void 0!==n?n:(0,l.AO)(p)===(0,l.AO)(d);f(e,{replace:r,state:o,preventScrollReset:i,relative:s,unstable_viewTransition:c})}}),[p,f,d,n,o,r,e,i,s,c])}(v,{replace:p,state:d,target:h,preventScrollReset:b,relative:o,unstable_viewTransition:g});return a.createElement("a",s({},_,{href:r||R,onClick:C||i?n:function(e){n&&n(e),e.defaultPrevented||w(e)},ref:t,target:h}))}));const g=a.forwardRef((function(e,t){let{"aria-current":r="page",caseSensitive:n=!1,className:o="",end:i=!1,style:f,to:h,unstable_viewTransition:v,children:m}=e,y=c(e,p),g=(0,u.x$)(h,{relative:y.relative}),S=(0,u.zy)(),E=a.useContext(u.Rq),{navigator:R,basename:w}=a.useContext(u.jb),x=null!=E&&function(e,t){void 0===t&&(t={});let r=a.useContext(d);null==r&&(0,l.Oi)(!1);let{basename:n}=C(_.useViewTransitionState),o=(0,u.x$)(e,{relative:t.relative});if(!r.isTransitioning)return!1;let i=(0,l.pb)(r.currentLocation.pathname,n)||r.currentLocation.pathname,s=(0,l.pb)(r.nextLocation.pathname,n)||r.nextLocation.pathname;return null!=(0,l.B6)(o.pathname,s)||null!=(0,l.B6)(o.pathname,i)}(g)&&!0===v,O=R.encodeLocation?R.encodeLocation(g).pathname:g.pathname,k=S.pathname,P=E&&E.navigation&&E.navigation.location?E.navigation.location.pathname:null;n||(k=k.toLowerCase(),P=P?P.toLowerCase():null,O=O.toLowerCase()),P&&w&&(P=(0,l.pb)(P,w)||P);const U="/"!==O&&O.endsWith("/")?O.length-1:O.length;let j,T=k===O||!i&&k.startsWith(O)&&"/"===k.charAt(U),$=null!=P&&(P===O||!i&&P.startsWith(O)&&"/"===P.charAt(O.length)),L={isActive:T,isPending:$,isTransitioning:x},D=T?r:void 0;j="function"===typeof o?o(L):[o,T?"active":null,$?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let N="function"===typeof f?f(L):f;return a.createElement(b,s({},y,{"aria-current":D,className:j,ref:t,style:N,to:h,unstable_viewTransition:v}),"function"===typeof m?m(L):m)}));var _,S;function C(e){let t=a.useContext(u.sp);return t||(0,l.Oi)(!1),t}(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(_||(_={})),function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"}(S||(S={}))},8429:(e,t,r)=>{var n;r.d(t,{$P:()=>d,BV:()=>L,C5:()=>j,Ix:()=>$,Rq:()=>l,Zp:()=>y,jb:()=>s,qh:()=>T,sp:()=>u,x$:()=>b,zy:()=>v});var o=r(9950),a=r(1018);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(this,arguments)}const u=o.createContext(null);const l=o.createContext(null);const s=o.createContext(null);const c=o.createContext(null);const f=o.createContext({outlet:null,matches:[],isDataRoute:!1});const p=o.createContext(null);function d(e,t){let{relative:r}=void 0===t?{}:t;h()||(0,a.Oi)(!1);let{basename:n,navigator:i}=o.useContext(s),{hash:u,pathname:l,search:c}=b(e,{relative:r}),f=l;return"/"!==n&&(f="/"===l?n:(0,a.HS)([n,l])),i.createHref({pathname:f,search:c,hash:u})}function h(){return null!=o.useContext(c)}function v(){return h()||(0,a.Oi)(!1),o.useContext(c).location}function m(e){o.useContext(s).static||o.useLayoutEffect(e)}function y(){let{isDataRoute:e}=o.useContext(f);return e?function(){let{router:e}=O(w.UseNavigateStable),t=P(x.UseNavigateStable),r=o.useRef(!1);return m((()=>{r.current=!0})),o.useCallback((function(n,o){void 0===o&&(o={}),r.current&&("number"===typeof n?e.navigate(n):e.navigate(n,i({fromRouteId:t},o)))}),[e,t])}():function(){h()||(0,a.Oi)(!1);let e=o.useContext(u),{basename:t,future:r,navigator:n}=o.useContext(s),{matches:i}=o.useContext(f),{pathname:l}=v(),c=JSON.stringify((0,a.yD)(i,r.v7_relativeSplatPath)),p=o.useRef(!1);return m((()=>{p.current=!0})),o.useCallback((function(r,o){if(void 0===o&&(o={}),!p.current)return;if("number"===typeof r)return void n.go(r);let i=(0,a.Gh)(r,JSON.parse(c),l,"path"===o.relative);null==e&&"/"!==t&&(i.pathname="/"===i.pathname?t:(0,a.HS)([t,i.pathname])),(o.replace?n.replace:n.push)(i,o.state,o)}),[t,n,c,l,e])}()}function b(e,t){let{relative:r}=void 0===t?{}:t,{future:n}=o.useContext(s),{matches:i}=o.useContext(f),{pathname:u}=v(),l=JSON.stringify((0,a.yD)(i,n.v7_relativeSplatPath));return o.useMemo((()=>(0,a.Gh)(e,JSON.parse(l),u,"path"===r)),[e,l,u,r])}function g(e,t,r,n){h()||(0,a.Oi)(!1);let{navigator:u}=o.useContext(s),{matches:l}=o.useContext(f),p=l[l.length-1],d=p?p.params:{},m=(p&&p.pathname,p?p.pathnameBase:"/");p&&p.route;let y,b=v();if(t){var g;let e="string"===typeof t?(0,a.Rr)(t):t;"/"===m||(null==(g=e.pathname)?void 0:g.startsWith(m))||(0,a.Oi)(!1),y=e}else y=b;let _=y.pathname||"/",S=_;if("/"!==m){let e=m.replace(/^\//,"").split("/");S="/"+_.replace(/^\//,"").split("/").slice(e.length).join("/")}let C=(0,a.ue)(e,{pathname:S});let E=R(C&&C.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:(0,a.HS)([m,u.encodeLocation?u.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?m:(0,a.HS)([m,u.encodeLocation?u.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),l,r,n);return t&&E?o.createElement(c.Provider,{value:{location:i({pathname:"/",search:"",hash:"",state:null,key:"default"},y),navigationType:a.rc.Pop}},E):E}function _(){let e=function(){var e;let t=o.useContext(p),r=k(x.UseRouteError),n=P(x.UseRouteError);if(void 0!==t)return t;return null==(e=r.errors)?void 0:e[n]}(),t=(0,a.pX)(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:n};return o.createElement(o.Fragment,null,o.createElement("h2",null,"Unexpected Application Error!"),o.createElement("h3",{style:{fontStyle:"italic"}},t),r?o.createElement("pre",{style:i},r):null,null)}const S=o.createElement(_,null);class C extends o.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return void 0!==this.state.error?o.createElement(f.Provider,{value:this.props.routeContext},o.createElement(p.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function E(e){let{routeContext:t,match:r,children:n}=e,a=o.useContext(u);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),o.createElement(f.Provider,{value:t},n)}function R(e,t,r,n){var i;if(void 0===t&&(t=[]),void 0===r&&(r=null),void 0===n&&(n=null),null==e){var u;if(null==(u=r)||!u.errors)return null;e=r.matches}let l=e,s=null==(i=r)?void 0:i.errors;if(null!=s){let e=l.findIndex((e=>e.route.id&&void 0!==(null==s?void 0:s[e.route.id])));e>=0||(0,a.Oi)(!1),l=l.slice(0,Math.min(l.length,e+1))}let c=!1,f=-1;if(r&&n&&n.v7_partialHydration)for(let o=0;o<l.length;o++){let e=l[o];if((e.route.HydrateFallback||e.route.hydrateFallbackElement)&&(f=o),e.route.id){let{loaderData:t,errors:n}=r,o=e.route.loader&&void 0===t[e.route.id]&&(!n||void 0===n[e.route.id]);if(e.route.lazy||o){c=!0,l=f>=0?l.slice(0,f+1):[l[0]];break}}}return l.reduceRight(((e,n,a)=>{let i,u=!1,p=null,d=null;var h;r&&(i=s&&n.route.id?s[n.route.id]:void 0,p=n.route.errorElement||S,c&&(f<0&&0===a?(h="route-fallback",!1||U[h]||(U[h]=!0),u=!0,d=null):f===a&&(u=!0,d=n.route.hydrateFallbackElement||null)));let v=t.concat(l.slice(0,a+1)),m=()=>{let t;return t=i?p:u?d:n.route.Component?o.createElement(n.route.Component,null):n.route.element?n.route.element:e,o.createElement(E,{match:n,routeContext:{outlet:e,matches:v,isDataRoute:null!=r},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||0===a)?o.createElement(C,{location:r.location,revalidation:r.revalidation,component:p,error:i,children:m(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):m()}),null)}var w=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(w||{}),x=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(x||{});function O(e){let t=o.useContext(u);return t||(0,a.Oi)(!1),t}function k(e){let t=o.useContext(l);return t||(0,a.Oi)(!1),t}function P(e){let t=function(e){let t=o.useContext(f);return t||(0,a.Oi)(!1),t}(),r=t.matches[t.matches.length-1];return r.route.id||(0,a.Oi)(!1),r.route.id}const U={};(n||(n=r.t(o,2))).startTransition;function j(e){let{to:t,replace:r,state:n,relative:i}=e;h()||(0,a.Oi)(!1);let{future:u,static:l}=o.useContext(s),{matches:c}=o.useContext(f),{pathname:p}=v(),d=y(),m=(0,a.Gh)(t,(0,a.yD)(c,u.v7_relativeSplatPath),p,"path"===i),b=JSON.stringify(m);return o.useEffect((()=>d(JSON.parse(b),{replace:r,state:n,relative:i})),[d,b,i,r,n]),null}function T(e){(0,a.Oi)(!1)}function $(e){let{basename:t="/",children:r=null,location:n,navigationType:u=a.rc.Pop,navigator:l,static:f=!1,future:p}=e;h()&&(0,a.Oi)(!1);let d=t.replace(/^\/*/,"/"),v=o.useMemo((()=>({basename:d,navigator:l,static:f,future:i({v7_relativeSplatPath:!1},p)})),[d,p,l,f]);"string"===typeof n&&(n=(0,a.Rr)(n));let{pathname:m="/",search:y="",hash:b="",state:g=null,key:_="default"}=n,S=o.useMemo((()=>{let e=(0,a.pb)(m,d);return null==e?null:{location:{pathname:e,search:y,hash:b,state:g,key:_},navigationType:u}}),[d,m,y,b,g,_,u]);return null==S?null:o.createElement(s.Provider,{value:v},o.createElement(c.Provider,{children:r,value:S}))}function L(e){let{children:t,location:r}=e;return g(D(t),r)}new Promise((()=>{}));o.Component;function D(e,t){void 0===t&&(t=[]);let r=[];return o.Children.forEach(e,((e,n)=>{if(!o.isValidElement(e))return;let i=[...t,n];if(e.type===o.Fragment)return void r.push.apply(r,D(e.props.children,i));e.type!==T&&(0,a.Oi)(!1),e.props.index&&e.props.children&&(0,a.Oi)(!1);let u={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(u.children=D(e.props.children,i)),r.push(u)})),r}},2654:(e,t,r)=>{var n=r(9950),o=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var n,a={},s=null,c=null;for(n in void 0!==r&&(s=""+r),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)i.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===a[n]&&(a[n]=t[n]);return{$$typeof:o,type:e,key:s,ref:c,props:a,_owner:u.current}}t.jsx=s,t.jsxs=s},2049:(e,t)=>{var r=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),l=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),d=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,m={};function y(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||h}function b(){}function g(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||h}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=y.prototype;var _=g.prototype=new b;_.constructor=g,v(_,y.prototype),_.isPureReactComponent=!0;var S=Array.isArray,C=Object.prototype.hasOwnProperty,E={current:null},R={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var o,a={},i=null,u=null;if(null!=t)for(o in void 0!==t.ref&&(u=t.ref),void 0!==t.key&&(i=""+t.key),t)C.call(t,o)&&!R.hasOwnProperty(o)&&(a[o]=t[o]);var l=arguments.length-2;if(1===l)a.children=n;else if(1<l){for(var s=Array(l),c=0;c<l;c++)s[c]=arguments[c+2];a.children=s}if(e&&e.defaultProps)for(o in l=e.defaultProps)void 0===a[o]&&(a[o]=l[o]);return{$$typeof:r,type:e,key:i,ref:u,props:a,_owner:E.current}}function x(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}var O=/\/+/g;function k(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function P(e,t,o,a,i){var u=typeof e;"undefined"!==u&&"boolean"!==u||(e=null);var l=!1;if(null===e)l=!0;else switch(u){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case r:case n:l=!0}}if(l)return i=i(l=e),e=""===a?"."+k(l,0):a,S(i)?(o="",null!=e&&(o=e.replace(O,"$&/")+"/"),P(i,t,o,"",(function(e){return e}))):null!=i&&(x(i)&&(i=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,o+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(O,"$&/")+"/")+e)),t.push(i)),1;if(l=0,a=""===a?".":a+":",S(e))for(var s=0;s<e.length;s++){var c=a+k(u=e[s],s);l+=P(u,t,o,c,i)}else if(c=function(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"===typeof c)for(e=c.call(e),s=0;!(u=e.next()).done;)l+=P(u=u.value,t,o,c=a+k(u,s++),i);else if("object"===u)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function U(e,t,r){if(null==e)return e;var n=[],o=0;return P(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function j(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var T={current:null},$={transition:null},L={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:$,ReactCurrentOwner:E};function D(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:U,forEach:function(e,t,r){U(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return U(e,(function(){t++})),t},toArray:function(e){return U(e,(function(e){return e}))||[]},only:function(e){if(!x(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=y,t.Fragment=o,t.Profiler=i,t.PureComponent=g,t.StrictMode=a,t.Suspense=c,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,t.act=D,t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=v({},e.props),a=e.key,i=e.ref,u=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,u=E.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)C.call(t,s)&&!R.hasOwnProperty(s)&&(o[s]=void 0===t[s]&&void 0!==l?l[s]:t[s])}var s=arguments.length-2;if(1===s)o.children=n;else if(1<s){l=Array(s);for(var c=0;c<s;c++)l[c]=arguments[c+2];o.children=l}return{$$typeof:r,type:e.type,key:a,ref:i,props:o,_owner:u}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:u,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:s,render:e}},t.isValidElement=x,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:j}},t.memo=function(e,t){return{$$typeof:f,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=$.transition;$.transition={};try{e()}finally{$.transition=t}},t.unstable_act=D,t.useCallback=function(e,t){return T.current.useCallback(e,t)},t.useContext=function(e){return T.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return T.current.useDeferredValue(e)},t.useEffect=function(e,t){return T.current.useEffect(e,t)},t.useId=function(){return T.current.useId()},t.useImperativeHandle=function(e,t,r){return T.current.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return T.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return T.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return T.current.useMemo(e,t)},t.useReducer=function(e,t,r){return T.current.useReducer(e,t,r)},t.useRef=function(e){return T.current.useRef(e)},t.useState=function(e){return T.current.useState(e)},t.useSyncExternalStore=function(e,t,r){return T.current.useSyncExternalStore(e,t,r)},t.useTransition=function(){return T.current.useTransition()},t.version="18.3.1"}}]);