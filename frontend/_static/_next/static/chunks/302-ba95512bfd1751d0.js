"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[302],{4302:function(e,t,n){n.r(t);var o=n(5893),i=n(948),r=n(2734),a=n(9226),s=n(7739),l=n(9661),d=n(5861),c=n(8396),h=n(6720),x=n(2293),p=n(155),g=n(7533),u=n(8462),m=n(6113),j=n(796),w=n(9953),k=n(1964),b=n.n(k),f=n(7294),v=n(5518),Z=n(1163),y=n(5210);let M=(0,i.ZP)("main",{shouldForwardProp:e=>"open"!==e})(e=>{let{theme:t,open:n}=e;return{...t.typography.mainContent,...!n&&{borderBottomLeftRadius:0,borderBottomRightRadius:0,transition:t.transitions.create("margin",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),[t.breakpoints.up("md")]:{marginLeft:-260,width:"calc(100% - ".concat(280,"px)")},[t.breakpoints.down("md")]:{marginLeft:"20px",width:"calc(100% - ".concat(280,"px)"),padding:"16px"},[t.breakpoints.down("sm")]:{marginLeft:"10px",width:"calc(100% - ".concat(280,"px)"),padding:"16px",marginRight:"10px"}},...n&&{transition:t.transitions.create("margin",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen}),marginLeft:0,borderBottomLeftRadius:0,borderBottomRightRadius:0,width:"calc(100% - ".concat(280,"px)"),[t.breakpoints.down("md")]:{marginLeft:"20px"},[t.breakpoints.down("sm")]:{marginLeft:"10px"}}}}),L=e=>{let{handleLeftDrawerToggle:t,data:n}=e,i=(0,r.Z)();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(a.Z,{sx:{width:228,display:"flex",[i.breakpoints.down("md")]:{width:"auto"}},children:[(0,o.jsx)(s.Z,{sx:{borderRadius:"12px",overflow:"hidden"},children:(0,o.jsx)(l.Z,{variant:"rounded",sx:{...i.typography.commonAvatar,...i.typography.mediumAvatar,transition:"all .2s ease-in-out",background:i.palette.secondary.light,color:i.palette.secondary.dark,"&:hover":{background:i.palette.secondary.dark,color:i.palette.secondary.light}},onClick:()=>t(!n),color:"inherit",children:(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-menu-2",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[(0,o.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,o.jsx)("path",{d:"M4 6l16 0"}),(0,o.jsx)("path",{d:"M4 12l16 0"}),(0,o.jsx)("path",{d:"M4 18l16 0"})]})})}),(0,o.jsx)(a.Z,{sx:{display:{xs:"flex",md:"flex"},flexGrow:1,alignItems:"center",marginLeft:"20px"},children:(0,o.jsx)(d.Z,{component:"h1",children:"Tanwish Institute"})})]}),(0,o.jsx)(a.Z,{sx:{flexGrow:1}}),(0,o.jsx)(a.Z,{sx:{flexGrow:1}})]})};t.default=e=>{let{children:t}=e,n=(0,Z.useRouter)();f.useEffect(()=>(Object.fromEntries(new URLSearchParams(document.cookie.replace(/; /g,"&"))).token||n.push("/login"),()=>{}),[]);let[i,s]=f.useState(!0),l=(0,r.Z)();(0,c.Z)(l.breakpoints.down("md"));let k=(0,c.Z)(l.breakpoints.up("md"));return(0,o.jsxs)(a.Z,{sx:{display:"flex"},children:[(0,o.jsx)(h.ZP,{}),(0,o.jsx)(x.Z,{enableColorOnDark:!0,position:"fixed",color:"inherit",elevation:0,sx:{bgcolor:l.palette.background.default,transition:i?l.transitions.create("width"):"none"},children:(0,o.jsx)(p.Z,{children:(0,o.jsx)(L,{handleLeftDrawerToggle:s,data:i})})}),(0,o.jsx)(a.Z,{component:"nav",sx:{flexShrink:{md:0},width:k?280:"auto"},"aria-label":"mailbox folders",children:(0,o.jsxs)(g.ZP,{variant:k?"persistent":"temporary",anchor:"left",open:i,onClose:()=>s(e=>!e),sx:{"& .MuiDrawer-paper":{width:280,background:l.palette.background.default,color:l.palette.text.primary,borderRight:"none",[l.breakpoints.up("md")]:{top:"88px"}}},ModalProps:{keepMounted:!0},color:"inherit",children:[(0,o.jsx)(a.Z,{sx:{display:{xs:"block",md:"none"}},children:(0,o.jsx)(a.Z,{sx:{display:"flex",p:2,mx:"auto"},children:(0,o.jsx)(d.Z,{component:"h1",sx:{fontWeight:"bold"},children:"Tanwish Institute"})})}),(0,o.jsx)(v.I3,{children:(0,o.jsx)(b(),{component:"div",style:{height:k?"calc(100vh - 88px)":"calc(100vh - 56px)",paddingLeft:"16px",paddingRight:"16px"},children:(0,o.jsx)(u.Z,{children:[{title:"Dashboard",route:"/user",icon:()=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-dashboard",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[(0,o.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,o.jsx)("path",{d:"M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}),(0,o.jsx)("path",{d:"M13.45 11.55l2.05 -2.05"}),(0,o.jsx)("path",{d:"M6.4 20a9 9 0 1 1 11.2 0z"})]})},{title:"Logout",route:"/login",icon:()=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-logout",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"#2c3e50",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[(0,o.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,o.jsx)("path",{d:"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"}),(0,o.jsx)("path",{d:"M7 12h14l-3 -3m0 6l3 -3"})]})}].map((e,t)=>(0,o.jsxs)(m.Z,{onClick:async()=>{"/login"==e.route&&(await fetch(y.J+"/log-out",{method:"PUT",credentials:"include"}),localStorage.clear()),n.push(e.route)},sx:{borderRadius:"".concat(20,"px"),mb:.5,alignItems:"flex-start",backgroundColor:"inherit",py:1.25,pl:"".concat(24,"px")},children:[(0,o.jsx)(j.Z,{sx:{my:"auto",minWidth:36},children:(0,o.jsx)(e.icon,{})}),(0,o.jsx)(w.Z,{primary:(0,o.jsx)(d.Z,{variant:"body1",color:"inherit",children:e.title})})]}))})})}),(0,o.jsx)(v.$,{children:(0,o.jsx)(a.Z,{sx:{px:2},children:(0,o.jsx)(b(),{component:"div",style:{height:k?"calc(100vh - 88px)":"calc(100vh - 56px)",paddingLeft:"16px",paddingRight:"16px"},children:(0,o.jsx)(u.Z,{children:[{title:"Dashboard",route:"/users",icon:()=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-dashboard",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[(0,o.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,o.jsx)("path",{d:"M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}),(0,o.jsx)("path",{d:"M13.45 11.55l2.05 -2.05"}),(0,o.jsx)("path",{d:"M6.4 20a9 9 0 1 1 11.2 0z"})]})},{title:"Logout",route:"/login",icon:()=>(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-logout",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"#2c3e50",fill:"none","stroke-linecap":"round","stroke-linejoin":"round",children:[(0,o.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),(0,o.jsx)("path",{d:"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"}),(0,o.jsx)("path",{d:"M7 12h14l-3 -3m0 6l3 -3"})]})}].map((e,t)=>(0,o.jsxs)(m.Z,{onClick:async()=>{"/login"==e.route&&(await fetch(y.J+"/log-out",{method:"PUT",credentials:"include"}),localStorage.clear()),n.push(e.route)},sx:{borderRadius:"".concat(20,"px"),mb:.5,alignItems:"flex-start",gap:"20px",backgroundColor:"inherit",py:1.25,pl:"".concat(24,"px")},children:[(0,o.jsx)(j.Z,{sx:{my:"auto",minWidth:36},children:(0,o.jsx)(e.icon,{})}),(0,o.jsx)(w.Z,{sx:{marginLeft:"20px"},primary:(0,o.jsx)(d.Z,{variant:"body1",color:"inherit",children:e.title})})]}))})})})})]})}),(0,o.jsx)(M,{theme:l,open:i,children:t})]})}}}]);