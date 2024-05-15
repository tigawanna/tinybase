var a,t;a=this,t=function(a){"use strict";const t=a=>typeof a,e="tinybase",n="",s=",",i=t(n),r=(a,t)=>a.repeat(t),c=Promise,o=clearInterval,l=a=>null==a,y=(a,t,e)=>l(a)?e?.():t(a),w=a=>t(a)==i,d=a=>Array.isArray(a),u=(a,t,e)=>a.slice(t,e),E=a=>a.length,f=async a=>c.all(a),p=(a,t="")=>a.join(t),g=(a,t)=>a.map(t),v=a=>0==E(a),m=(a,t)=>a.filter(t),C=(a,...t)=>a.push(...t),T=(a,t)=>a?.has(t)??!1,h=a=>[...a?.values()??[]],A=(a,t)=>a?.delete(t),O=Object,b=a=>O.getPrototypeOf(a),N=O.entries,R=O.keys,S=O.freeze,L=(a=[])=>O.fromEntries(a),D=(...a)=>O.assign({},...a),I=(a,t)=>t in a,M=(a,t)=>g(N(a),(([a,e])=>t(e,a))),P=a=>O.values(a),$=a=>E(R(a)),_=a=>(a=>!l(a)&&y(b(a),(a=>a==O.prototype||l(b(a))),(()=>!0)))(a)&&0==$(a),F=a=>new Map(a),j=a=>[...a?.keys()??[]],x=(a,t)=>a?.get(t),B=(a,t)=>g([...a?.entries()??[]],(([a,e])=>t(e,a))),q=(a,t,e)=>l(e)?(A(a,t),a):a?.set(t,e),H=(a,t,e,n)=>(T(a,t)||q(a,t,e()),x(a,t)),J=(a,t,e,n=q)=>(M(t,((t,n)=>e(a,n,t))),((a,t)=>{((a,t)=>{a?.forEach(t)})(a,((a,e)=>t(e)))})(a,(e=>I(t,e)?0:n(a,e))),a),Y="_",k="_id",G=a=>`"${a.replace(/"/g,'""')}"`,U="SELECT",W=a=>new Set(d(a)||l(a)?a:[a]),z=(a,t)=>a?.add(t),K="TABLE",V="ALTER "+K,Q="DELETE FROM",X=U+"*FROM",Z="FROM pragma_table_",aa="WHERE",ta=(a,t,e,i)=>{const r=F();return[async()=>J(r,L(await f(g(await a("SELECT name "+Z+"list WHERE schema='main'AND(type='table'OR type='view')AND name IN("+na(t)+")ORDER BY name",t),(async({name:t})=>[t,L(g(await a(U+" name,type "+Z+"info(?)",[t]),(({name:a,type:t})=>[a,t])))])))),((a,t,e)=>q(r,t,J(H(r,t,F),e,((a,t,e)=>{e!=x(a,t)&&q(a,t,e)}),((a,t)=>q(a,t))))),((a,t)=>q(r,t))),async(t,e)=>((a,t)=>!l(x(x(r,a),t)))(t,e)?L(m(g(await a(X+G(t)),(a=>{return[a[e],(t={...a},n=e,delete t[n],t)];var t,n})),(([a,t])=>!l(a)&&!_(t)))):{},async(t,e,c,o,y,w=!1)=>{const d=W();M(c??{},(a=>g(R(a??{}),(a=>z(d,a)))));const u=h(d);if(!w&&y&&v(u)&&T(r,t))return await a("DROP "+K+G(t)),void q(r,t);if(v(u)||T(r,t)){const s=x(r,t),i=W(j(s));await f([...g(u,(async e=>{A(i,e)||(await a(V+G(t)+"ADD"+G(e)),q(s,e,n))})),...!w&&o?g(h(i),(async n=>{n!=e&&(await a(V+G(t)+"DROP"+G(n)),q(s,n))})):[]])}else await a("CREATE "+K+G(t)+"("+G(e)+` PRIMARY KEY ON CONFLICT REPLACE${p(g(u,(a=>s+G(a))))});`),q(r,t,F([[e,n],...g(u,(a=>[a,n]))]));if(w)l(c)?await a(Q+G(t)+aa+" 1"):await f(M(c,(async(n,s)=>{l(n)?await a(Q+G(t)+aa+G(e)+"=?",[s]):v(u)||await ea(a,t,e,R(n),[s,...P(n)],i)})));else if(v(u))T(r,t)&&await a(Q+G(t)+aa+" 1");else{const n=m(j(x(r,t)),(a=>a!=e)),s=[],o=[];M(c??{},((a,t)=>{C(s,t,...g(n,(t=>a?.[t]))),C(o,t)})),await ea(a,t,e,n,s,i),await a(Q+G(t)+aa+G(e)+"NOT IN("+na(o)+")",o)}},async t=>{let n;await a("BEGIN");try{n=await t()}catch(a){e?.(a)}return await a("END"),n}]},ea=async(a,t,e,i,c,o=!0)=>await a("INSERT "+(o?n:"OR REPLACE ")+"INTO"+G(t)+"("+G(e)+p(g(i,(a=>s+G(a))))+")VALUES"+u(r(`,(?${r(",?",E(i))})`,E(c)/(E(i)+1)),1)+(o?"ON CONFLICT("+G(e)+")DO UPDATE SET"+p(g(i,(a=>G(a)+"=excluded."+G(a))),s):n),g(c,(a=>a??null))),na=a=>p(g(a,(()=>"?")),s),sa=F(),ia=F(),ra=(a,t,e,n,s,i,r,c={},o=[])=>{let w,u,E,f=0;H(sa,o,(()=>0)),H(ia,o,(()=>[]));const[p,g,v,m,T]=((a=1,t)=>a>1&&"merge"in t?[1,t.getMergeableContent,t.getTransactionMergeableChanges,([[a],[t]])=>!_(a)||!_(t),t.setDefaultContent]:2!=a?[0,t.getContent,t.getTransactionChanges,([a,t])=>!_(a)||!_(t),t.setContent]:0)(r,a),h=t=>{(p&&d(t?.[0])?1===t?.[2]?a.applyMergeableChanges:a.setMergeableContent:1===t?.[2]?a.applyChanges:a.setContent)(t)},A=async a=>(2!=f&&(f=1,await R((async()=>{try{h(await t())}catch(t){i?.(t),a&&T(a)}f=0}))),L),O=()=>(u&&(s(u),u=void 0),L),b=async a=>(1!=f&&(f=2,await R((async()=>{try{await e(g,a)}catch(a){i?.(a)}f=0}))),L),N=()=>(y(E,a.delListener),E=void 0,L),R=async(...a)=>(C(x(ia,o),...a),await(async()=>{if(!x(sa,o)){for(q(sa,o,1);!l((a=x(ia,o),w=a.shift()));)try{await w()}catch(a){i?.(a)}q(sa,o,0)}var a})(),L),L={load:A,startAutoLoad:async a=>(await O().load(a),u=n((async(a,t)=>{t||a?2!=f&&(f=1,h(t??a),f=0):await A()})),L),stopAutoLoad:O,isAutoLoading:()=>!l(u),save:b,startAutoSave:async()=>(await N().save(),E=a.addDidFinishTransactionListener((()=>{const a=v();m(a)&&b(a)})),L),stopAutoSave:N,isAutoSaving:()=>!l(E),schedule:R,getStore:()=>a,destroy:()=>O().stopAutoSave(),getStats:()=>({}),...c};return S(L)},ca=(a,t,e,n,s,i,[r,c,o],l,y,w,d)=>{const[u,E,f,p]=ta(t,l,s,d);return ra(a,(async()=>await p((async()=>{return await u(),a=(await E(r,c))[Y]?.[o]??"null",JSON.parse(a,((a,t)=>"￼"===t?void 0:t));var a}))),(async a=>await p((async()=>{var t;await u(),await f(r,c,{[Y]:{[o]:(t=a()??null,JSON.stringify(t,((a,t)=>void 0===t?"￼":t)))}},!0,!0)}))),e,n,s,i,{[w]:()=>y},y)},oa=(a,t,e,n,s,i,[r,c,[o,y,w]],d,u,E,p)=>{const[g,v,C,T]=ta(t,d,s,p),h=async(a,t)=>await f(B(c,(async([e,n,s,i],r)=>{t&&!I(a,r)||await C(e,n,a[r],s,i,t)}))),A=async(a,t)=>y?await C(w,k,{[Y]:a},!0,!0,t):null;return ra(a,(async()=>await T((async()=>{await g();const a=await(async()=>L(m(await f(B(r,(async([a,t],e)=>[a,await v(e,t)]))),(a=>!_(a[1])))))(),t=await(async()=>o?(await v(w,k))[Y]:{})();return _(a)&&l(t)?void 0:[a,t]}))),(async(a,t)=>await T((async()=>{if(await g(),l(t)){const[t,e]=a();await h(t),await A(e)}else await h(t[0],!0),await A(t[1],!0)}))),e,n,s,i,{[E]:()=>u},u)},la="ColumnName",ya="store",wa="json",da=ya+"TableName",ua=ya+"Id"+la,Ea=ya+la,fa="autoLoadIntervalSeconds",pa="rowId"+la,ga="tableId",va="tableName",ma="deleteEmptyColumns",Ca="deleteEmptyTable",Ta={mode:wa,[fa]:1},ha={load:0,save:0,[va]:e+"_values"},Aa=(a,t,e,n,s)=>{const i=F();return M(a,((a,r)=>{const c=u(P(D(t,w(a)?{[e]:a}:a)),0,$(t));l(c[0])||n(r,c[0])||(s(r,c[0]),q(i,r,c))})),i},Oa="pragma_",ba="data_version",Na="schema_version";a.createElectricSqlPersister=(a,t,n,s,i)=>((a,t,n,s,i,r,c,l,y,d="getDb",E)=>{let f,p,g;const[v,m,C,A]=(a=>{const t=(a=>D(Ta,w(a)?{[da]:a}:a??{}))(a),n=t[fa];if(t.mode==wa){const a=t[da]??e;return[1,n,[a,t[ua]??k,t[Ea]??ya],W(a)]}const{tables:{load:s={},save:i={}}={},values:r={}}=t,c=u(P(D(ha,r)),0,$(ha)),o=c[2],l=W(o),y=W(o);return[0,n,[Aa(s,{[ga]:null,[pa]:k},ga,(a=>T(y,a)),(a=>z(l,a))),Aa(i,{[va]:null,[pa]:k,[ma]:0,[Ca]:0},va,((a,t)=>T(y,t)),((a,t)=>z(l,t))),c],l]})(t);return(v?ca:oa)(a,r?async(a,t)=>(r(a,t),await n(a,t)):n,(a=>{return[(t=async()=>{try{const[{d:t,s:e,c:s}]=await n(`SELECT ${ba} d,${Na} s,TOTAL_CHANGES() c FROM ${Oa}${ba} JOIN ${Oa}${Na}`);t==(f??=t)&&e==(p??=e)&&s==(g??=s)||(a(),f=t,p=e)}catch{}},e=m,t(),setInterval(t,1e3*e)),s((t=>A.has(t)?a():0))];var t,e}),(([a,t])=>{o(a),f=p=g=null,i(t)}),c,l,C,h(A),y,d,E)})(a,n,(async(a,e=[])=>await t.db.raw({sql:a,args:e})),(a=>t.notifier.subscribeToDataChanges((e=>{return n=({tablename:t})=>a(t),t.notifier.alias(e).forEach(n);var n}))),(a=>a()),s,i,1,t,"getElectricClient")},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((a="undefined"!=typeof globalThis?globalThis:a||self).TinyBasePersisterElectricSql={});
