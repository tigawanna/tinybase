"use strict";(()=>{var y="v5.3.0-beta.2";var E=document,x=()=>{I(),addEventListener("load",()=>{let t=p("#version");t.innerText=y,t.style.width=t.scrollWidth+"px"})},p=t=>E.querySelector(t),f=(t,o)=>t.querySelector(o),b=t=>E.getElementById(t),d=(t,o,l={},s)=>{let i=E.createElement(t);return Object.entries(l).forEach(h=>i.setAttribute(...h)),s!=null&&(i.innerText=s),o!=null?o.appendChild(i):i},v=(t,o,l)=>{let s=(t.className??"").split(" ");l(s,s.indexOf(o)),t.className=s.join(" ")},L=(t,o)=>v(t,o,(l,s)=>s==-1?l.push(o):null),N=(t,o)=>v(t,o,(l,s)=>s!=-1?l.splice(s,1):null),k=(t,o,l)=>v(t,o,(s,i)=>i!=-1?s.splice(i,1):s.push(o)&&l()),m="dark",T="light",M="auto",I=()=>{let t=matchMedia("(prefers-color-scheme: dark)"),o=()=>{let l=localStorage.getItem(m)??M;p("#dark")?.setAttribute("class",l),p("html").className=l==m||l==M&&t.matches?m:T};t.addEventListener("change",o),window.addEventListener("storage",l=>{l.storageArea==localStorage&&l.key==m&&o()}),addEventListener("load",()=>{p("#dark").addEventListener("click",()=>{let l=localStorage.getItem(m);localStorage.setItem(m,l==m?T:l==T?M:m),o()}),o()}),o()};x();addEventListener("load",()=>{let t=p("body > main > nav"),o=p("body > main > article");if(t==null||o==null)return;let l=()=>{let n=f(o,":scope iframe"),e=n?.parentElement;if(n==null||e==null)return;let r=e.insertBefore(d("form",null,{action:"https://codepen.io/pen/define",method:"post",target:"_blank"}),n);e.insertBefore(d("a",null,{id:"penEdit"},"Open this demo in CodePen"),n).onclick=()=>{r.childNodes.length==0?fetch("pen.json").then(g=>g.text()).then(g=>{d("input",r,{type:"hidden",name:"data",value:g}),r.submit()}):r.submit()}};l(),E.body.addEventListener("click",n=>{if(n.button!=0)return;let e=n.target;if(e.tagName=="SPAN"&&e.innerHTML==""&&e.parentElement?.tagName=="LI")return s(e.parentElement);for(;e.tagName!="A"&&e.parentElement!=null;)e=e.parentElement;let r=e.href;!n.metaKey&&!n.shiftKey&&r!=null&&r!=location.origin+"/"&&r.startsWith(location.origin+"/")&&!r.includes("#")&&(i(r),n.preventDefault(),history.pushState(null,"",r))}),window.onpopstate=function(n){i(location.href),n.preventDefault()};let s=n=>k(n,"open",()=>{let e=f(n,"a");e.href!=location.origin&&e.click()}),i=n=>{["?","#"].forEach(e=>{n.includes(e)&&(n=n.substring(0,n.indexOf(e)))}),fetch(`${n}nav.json`).then(e=>e.json()).then(e=>{N(f(t,"li.current"),"current"),h(e,f(t,"ul"))}),fetch(`${n}article.html`).then(e=>e.text()).then(e=>C(e))},h=({i:n,n:e,u:r,r:g,c:A,p:B,o:S,_:H},q)=>{let a=b(n);if(a==null){a=d("li",q,{id:n}),d("span",a);let c=d("a",a,{href:r});g?d("code",c,{},e):c.innerText=e,B&&L(a,"parent")}if(S&&L(a,"open"),H!=null){let c=f(a,"ul")??d("ul",a);H.forEach(u=>{h(u,c)})}if(A){L(a,"current"),E.title=`${e} | TinyBase`;let c=a.getBoundingClientRect(),u=t.getBoundingClientRect();c.top<u.top?t.scrollBy(0,c.top-u.top):c.bottom>u.bottom&&t.scrollBy(0,Math.min(c.bottom-u.bottom,c.top-u.top))}},C=n=>{o.innerHTML=n,o.scrollTo(0,0),l()}});})();
