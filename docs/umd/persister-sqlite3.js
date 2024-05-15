var a,t;a=this,t=function(a){"use strict";const t=a=>typeof a,e="tinybase",n="",s=",",i=t(n),r=(a,t)=>a.repeat(t),o=Promise,c=clearInterval,l=a=>null==a,y=(a,t,e)=>l(a)?e?.():t(a),w=a=>t(a)==i,u=a=>Array.isArray(a),d=(a,t,e)=>a.slice(t,e),E=a=>a.length,f=async a=>o.all(a),p=(a,t="")=>a.join(t),v=(a,t)=>a.map(t),g=a=>0==E(a),m=(a,t)=>a.filter(t),T=(a,...t)=>a.push(...t),h=(a,t)=>a?.has(t)??!1,C=a=>[...a?.values()??[]],A=(a,t)=>a?.delete(t),O=Object,N=a=>O.getPrototypeOf(a),R=O.entries,S=O.keys,L=O.freeze,b=(a=[])=>O.fromEntries(a),I=(...a)=>O.assign({},...a),D=(a,t)=>t in a,M=(a,t)=>v(R(a),(([a,e])=>t(e,a))),P=a=>O.values(a),$=a=>E(S(a)),_=a=>(a=>!l(a)&&y(N(a),(a=>a==O.prototype||l(N(a))),(()=>!0)))(a)&&0==$(a),F=a=>new Map(a),j=a=>[...a?.keys()??[]],x=(a,t)=>a?.get(t),B=(a,t)=>v([...a?.entries()??[]],(([a,e])=>t(e,a))),H=(a,t,e)=>l(e)?(A(a,t),a):a?.set(t,e),J=(a,t,e,n)=>(h(a,t)||H(a,t,e()),x(a,t)),Y=(a,t,e,n=H)=>(M(t,((t,n)=>e(a,n,t))),((a,t)=>{((a,t)=>{a?.forEach(t)})(a,((a,e)=>t(e)))})(a,(e=>D(t,e)?0:n(a,e))),a),k="_",q="_id",G=a=>`"${a.replace(/"/g,'""')}"`,U="SELECT",W=a=>new Set(u(a)||l(a)?a:[a]),z=(a,t)=>a?.add(t),K="TABLE",V="ALTER "+K,Q="DELETE FROM",X=U+"*FROM",Z="FROM pragma_table_",aa="WHERE",ta=(a,t,e,i)=>{const r=F();return[async()=>Y(r,b(await f(v(await a("SELECT name "+Z+"list WHERE schema='main'AND(type='table'OR type='view')AND name IN("+na(t)+")ORDER BY name",t),(async({name:t})=>[t,b(v(await a(U+" name,type "+Z+"info(?)",[t]),(({name:a,type:t})=>[a,t])))])))),((a,t,e)=>H(r,t,Y(J(r,t,F),e,((a,t,e)=>{e!=x(a,t)&&H(a,t,e)}),((a,t)=>H(a,t))))),((a,t)=>H(r,t))),async(t,e)=>((a,t)=>!l(x(x(r,a),t)))(t,e)?b(m(v(await a(X+G(t)),(a=>{return[a[e],(t={...a},n=e,delete t[n],t)];var t,n})),(([a,t])=>!l(a)&&!_(t)))):{},async(t,e,o,c,y,w=!1)=>{const u=W();M(o??{},(a=>v(S(a??{}),(a=>z(u,a)))));const d=C(u);if(!w&&y&&g(d)&&h(r,t))return await a("DROP "+K+G(t)),void H(r,t);if(g(d)||h(r,t)){const s=x(r,t),i=W(j(s));await f([...v(d,(async e=>{A(i,e)||(await a(V+G(t)+"ADD"+G(e)),H(s,e,n))})),...!w&&c?v(C(i),(async n=>{n!=e&&(await a(V+G(t)+"DROP"+G(n)),H(s,n))})):[]])}else await a("CREATE "+K+G(t)+"("+G(e)+` PRIMARY KEY ON CONFLICT REPLACE${p(v(d,(a=>s+G(a))))});`),H(r,t,F([[e,n],...v(d,(a=>[a,n]))]));if(w)l(o)?await a(Q+G(t)+aa+" 1"):await f(M(o,(async(n,s)=>{l(n)?await a(Q+G(t)+aa+G(e)+"=?",[s]):g(d)||await ea(a,t,e,S(n),[s,...P(n)],i)})));else if(g(d))h(r,t)&&await a(Q+G(t)+aa+" 1");else{const n=m(j(x(r,t)),(a=>a!=e)),s=[],c=[];M(o??{},((a,t)=>{T(s,t,...v(n,(t=>a?.[t]))),T(c,t)})),await ea(a,t,e,n,s,i),await a(Q+G(t)+aa+G(e)+"NOT IN("+na(c)+")",c)}},async t=>{let n;await a("BEGIN");try{n=await t()}catch(a){e?.(a)}return await a("END"),n}]},ea=async(a,t,e,i,o,c=!0)=>await a("INSERT "+(c?n:"OR REPLACE ")+"INTO"+G(t)+"("+G(e)+p(v(i,(a=>s+G(a))))+")VALUES"+d(r(`,(?${r(",?",E(i))})`,E(o)/(E(i)+1)),1)+(c?"ON CONFLICT("+G(e)+")DO UPDATE SET"+p(v(i,(a=>G(a)+"=excluded."+G(a))),s):n),v(o,(a=>a??null))),na=a=>p(v(a,(()=>"?")),s),sa=F(),ia=F(),ra=(a,t,e,n,s,i,r,o={},c=[])=>{let w,d,E,f=0;J(sa,c,(()=>0)),J(ia,c,(()=>[]));const[p,v,g,m,h]=((a=1,t)=>a>1&&"merge"in t?[1,t.getMergeableContent,t.getTransactionMergeableChanges,([[a],[t]])=>!_(a)||!_(t),t.setDefaultContent]:2!=a?[0,t.getContent,t.getTransactionChanges,([a,t])=>!_(a)||!_(t),t.setContent]:0)(r,a),C=t=>{(p&&u(t?.[0])?1===t?.[2]?a.applyMergeableChanges:a.setMergeableContent:1===t?.[2]?a.applyChanges:a.setContent)(t)},A=async a=>(2!=f&&(f=1,await S((async()=>{try{C(await t())}catch(t){i?.(t),a&&h(a)}f=0}))),b),O=()=>(d&&(s(d),d=void 0),b),N=async a=>(1!=f&&(f=2,await S((async()=>{try{await e(v,a)}catch(a){i?.(a)}f=0}))),b),R=()=>(y(E,a.delListener),E=void 0,b),S=async(...a)=>(T(x(ia,c),...a),await(async()=>{if(!x(sa,c)){for(H(sa,c,1);!l((a=x(ia,c),w=a.shift()));)try{await w()}catch(a){i?.(a)}H(sa,c,0)}var a})(),b),b={load:A,startAutoLoad:async a=>(await O().load(a),d=n((async(a,t)=>{t||a?2!=f&&(f=1,C(t??a),f=0):await A()})),b),stopAutoLoad:O,isAutoLoading:()=>!l(d),save:N,startAutoSave:async()=>(await R().save(),E=a.addDidFinishTransactionListener((()=>{const a=g();m(a)&&N(a)})),b),stopAutoSave:R,isAutoSaving:()=>!l(E),schedule:S,getStore:()=>a,destroy:()=>O().stopAutoSave(),getStats:()=>({}),...o};return L(b)},oa=(a,t,e,n,s,i,[r,o,c],l,y,w,u)=>{const[d,E,f,p]=ta(t,l,s,u);return ra(a,(async()=>await p((async()=>{return await d(),a=(await E(r,o))[k]?.[c]??"null",JSON.parse(a,((a,t)=>"￼"===t?void 0:t));var a}))),(async a=>await p((async()=>{var t;await d(),await f(r,o,{[k]:{[c]:(t=a()??null,JSON.stringify(t,((a,t)=>void 0===t?"￼":t)))}},!0,!0)}))),e,n,s,i,{[w]:()=>y},y)},ca=(a,t,e,n,s,i,[r,o,[c,y,w]],u,d,E,p)=>{const[v,g,T,h]=ta(t,u,s,p),C=async(a,t)=>await f(B(o,(async([e,n,s,i],r)=>{t&&!D(a,r)||await T(e,n,a[r],s,i,t)}))),A=async(a,t)=>y?await T(w,q,{[k]:a},!0,!0,t):null;return ra(a,(async()=>await h((async()=>{await v();const a=await(async()=>b(m(await f(B(r,(async([a,t],e)=>[a,await g(e,t)]))),(a=>!_(a[1])))))(),t=await(async()=>c?(await g(w,q))[k]:{})();return _(a)&&l(t)?void 0:[a,t]}))),(async(a,t)=>await h((async()=>{if(await v(),l(t)){const[t,e]=a();await C(t),await A(e)}else await C(t[0],!0),await A(t[1],!0)}))),e,n,s,i,{[E]:()=>d},d)},la="ColumnName",ya="store",wa="json",ua=ya+"TableName",da=ya+"Id"+la,Ea=ya+la,fa="autoLoadIntervalSeconds",pa="rowId"+la,va="tableId",ga="tableName",ma="deleteEmptyColumns",Ta="deleteEmptyTable",ha={mode:wa,[fa]:1},Ca={load:0,save:0,[ga]:e+"_values"},Aa=(a,t,e,n,s)=>{const i=F();return M(a,((a,r)=>{const o=d(P(I(t,w(a)?{[e]:a}:a)),0,$(t));l(o[0])||n(r,o[0])||(s(r,o[0]),H(i,r,o))})),i},Oa="pragma_",Na="data_version",Ra="schema_version",Sa="change";a.createSqlite3Persister=(a,t,n,s,i)=>((a,t,n,s,i,r,o,l,y,u="getDb",E)=>{let f,p,v;const[g,m,T,A]=(a=>{const t=(a=>I(ha,w(a)?{[ua]:a}:a??{}))(a),n=t[fa];if(t.mode==wa){const a=t[ua]??e;return[1,n,[a,t[da]??q,t[Ea]??ya],W(a)]}const{tables:{load:s={},save:i={}}={},values:r={}}=t,o=d(P(I(Ca,r)),0,$(Ca)),c=o[2],l=W(c),y=W(c);return[0,n,[Aa(s,{[va]:null,[pa]:q},va,(a=>h(y,a)),(a=>z(l,a))),Aa(i,{[ga]:null,[pa]:q,[ma]:0,[Ta]:0},ga,((a,t)=>h(y,t)),((a,t)=>z(l,t))),o],l]})(t);return(g?oa:ca)(a,r?async(a,t)=>(r(a,t),await n(a,t)):n,(a=>{return[(t=async()=>{try{const[{d:t,s:e,c:s}]=await n(`SELECT ${Na} d,${Ra} s,TOTAL_CHANGES() c FROM ${Oa}${Na} JOIN ${Oa}${Ra}`);t==(f??=t)&&e==(p??=e)&&s==(v??=s)||(a(),f=t,p=e)}catch{}},e=m,t(),setInterval(t,1e3*e)),s((t=>A.has(t)?a():0))];var t,e}),(([a,t])=>{c(a),f=p=v=null,i(t)}),o,l,T,C(A),y,u,E)})(a,n,(async(a,e=[])=>{return await(n=(n,s)=>t.all(a,e,((a,t)=>a?s(a):n(t))),new o(n));var n}),(a=>{const e=(t,e,n)=>a(n);return t.on(Sa,e),e}),(a=>t.off(Sa,a)),s,i,3,t)},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((a="undefined"!=typeof globalThis?globalThis:a||self).TinyBasePersisterSqlite3={});
