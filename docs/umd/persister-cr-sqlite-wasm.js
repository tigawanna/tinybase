var a,t;a=this,t=function(a){"use strict";const t=a=>typeof a,e="tinybase",n="",s=",",i=t(n),r=(a,t)=>a.repeat(t),o=Promise,c=clearInterval,l=a=>null==a,y=(a,t,e)=>l(a)?e?.():t(a),w=a=>t(a)==i,d=a=>Array.isArray(a),u=(a,t,e)=>a.slice(t,e),E=a=>a.length,p=async a=>o.all(a),f=(a,t="")=>a.join(t),v=(a,t)=>a.map(t),g=a=>0==E(a),m=(a,t)=>a.filter(t),C=(a,...t)=>a.push(...t),T=(a,t)=>a?.has(t)??!1,O=a=>[...a?.values()??[]],h=(a,t)=>a?.delete(t),A=Object,N=a=>A.getPrototypeOf(a),R=A.entries,S=A.keys,L=A.freeze,b=(a=[])=>A.fromEntries(a),I=(...a)=>A.assign({},...a),D=(a,t)=>t in a,M=(a,t)=>v(R(a),(([a,e])=>t(e,a))),P=a=>A.values(a),$=a=>E(S(a)),_=a=>(a=>!l(a)&&y(N(a),(a=>a==A.prototype||l(N(a))),(()=>!0)))(a)&&0==$(a),F=a=>new Map(a),x=a=>[...a?.keys()??[]],j=(a,t)=>a?.get(t),B=(a,t)=>v([...a?.entries()??[]],(([a,e])=>t(e,a))),W=(a,t,e)=>l(e)?(h(a,t),a):a?.set(t,e),H=(a,t,e,n)=>(T(a,t)||W(a,t,e()),j(a,t)),J=(a,t,e,n=W)=>(M(t,((t,n)=>e(a,n,t))),((a,t)=>{((a,t)=>{a?.forEach(t)})(a,((a,e)=>t(e)))})(a,(e=>D(t,e)?0:n(a,e))),a),U="_",Y="_id",k=a=>`"${a.replace(/"/g,'""')}"`,q="SELECT",G=a=>new Set(d(a)||l(a)?a:[a]),z=(a,t)=>a?.add(t),K="TABLE",V="ALTER "+K,Q="DELETE FROM",X=q+"*FROM",Z="FROM pragma_table_",aa="WHERE",ta=(a,t,e,i)=>{const r=F();return[async()=>J(r,b(await p(v(await a("SELECT name "+Z+"list WHERE schema='main'AND(type='table'OR type='view')AND name IN("+na(t)+")ORDER BY name",t),(async({name:t})=>[t,b(v(await a(q+" name,type "+Z+"info(?)",[t]),(({name:a,type:t})=>[a,t])))])))),((a,t,e)=>W(r,t,J(H(r,t,F),e,((a,t,e)=>{e!=j(a,t)&&W(a,t,e)}),((a,t)=>W(a,t))))),((a,t)=>W(r,t))),async(t,e)=>((a,t)=>!l(j(j(r,a),t)))(t,e)?b(m(v(await a(X+k(t)),(a=>{return[a[e],(t={...a},n=e,delete t[n],t)];var t,n})),(([a,t])=>!l(a)&&!_(t)))):{},async(t,e,o,c,y,w=!1)=>{const d=G();M(o??{},(a=>v(S(a??{}),(a=>z(d,a)))));const u=O(d);if(!w&&y&&g(u)&&T(r,t))return await a("DROP "+K+k(t)),void W(r,t);if(g(u)||T(r,t)){const s=j(r,t),i=G(x(s));await p([...v(u,(async e=>{h(i,e)||(await a(V+k(t)+"ADD"+k(e)),W(s,e,n))})),...!w&&c?v(O(i),(async n=>{n!=e&&(await a(V+k(t)+"DROP"+k(n)),W(s,n))})):[]])}else await a("CREATE "+K+k(t)+"("+k(e)+` PRIMARY KEY ON CONFLICT REPLACE${f(v(u,(a=>s+k(a))))});`),W(r,t,F([[e,n],...v(u,(a=>[a,n]))]));if(w)l(o)?await a(Q+k(t)+aa+" 1"):await p(M(o,(async(n,s)=>{l(n)?await a(Q+k(t)+aa+k(e)+"=?",[s]):g(u)||await ea(a,t,e,S(n),[s,...P(n)],i)})));else if(g(u))T(r,t)&&await a(Q+k(t)+aa+" 1");else{const n=m(x(j(r,t)),(a=>a!=e)),s=[],c=[];M(o??{},((a,t)=>{C(s,t,...v(n,(t=>a?.[t]))),C(c,t)})),await ea(a,t,e,n,s,i),await a(Q+k(t)+aa+k(e)+"NOT IN("+na(c)+")",c)}},async t=>{let n;await a("BEGIN");try{n=await t()}catch(a){e?.(a)}return await a("END"),n}]},ea=async(a,t,e,i,o,c=!0)=>await a("INSERT "+(c?n:"OR REPLACE ")+"INTO"+k(t)+"("+k(e)+f(v(i,(a=>s+k(a))))+")VALUES"+u(r(`,(?${r(",?",E(i))})`,E(o)/(E(i)+1)),1)+(c?"ON CONFLICT("+k(e)+")DO UPDATE SET"+f(v(i,(a=>k(a)+"=excluded."+k(a))),s):n),v(o,(a=>a??null))),na=a=>f(v(a,(()=>"?")),s),sa=F(),ia=F(),ra=(a,t,e,n,s,i,r,o={},c=[])=>{let w,u,E,p=0;H(sa,c,(()=>0)),H(ia,c,(()=>[]));const[f,v,g,m,T]=((a=1,t)=>a>1&&"merge"in t?[1,t.getMergeableContent,t.getTransactionMergeableChanges,([[a],[t]])=>!_(a)||!_(t),t.setDefaultContent]:2!=a?[0,t.getContent,t.getTransactionChanges,([a,t])=>!_(a)||!_(t),t.setContent]:0)(r,a),O=t=>{(f&&d(t?.[0])?1===t?.[2]?a.applyMergeableChanges:a.setMergeableContent:1===t?.[2]?a.applyChanges:a.setContent)(t)},h=async a=>(2!=p&&(p=1,await S((async()=>{try{O(await t())}catch(t){i?.(t),a&&T(a)}p=0}))),b),A=()=>(u&&(s(u),u=void 0),b),N=async a=>(1!=p&&(p=2,await S((async()=>{try{await e(v,a)}catch(a){i?.(a)}p=0}))),b),R=()=>(y(E,a.delListener),E=void 0,b),S=async(...a)=>(C(j(ia,c),...a),await(async()=>{if(!j(sa,c)){for(W(sa,c,1);!l((a=j(ia,c),w=a.shift()));)try{await w()}catch(a){i?.(a)}W(sa,c,0)}var a})(),b),b={load:h,startAutoLoad:async a=>(await A().load(a),u=n((async(a,t)=>{t||a?2!=p&&(p=1,O(t??a),p=0):await h()})),b),stopAutoLoad:A,isAutoLoading:()=>!l(u),save:N,startAutoSave:async()=>(await R().save(),E=a.addDidFinishTransactionListener((()=>{const a=g();m(a)&&N(a)})),b),stopAutoSave:R,isAutoSaving:()=>!l(E),schedule:S,getStore:()=>a,destroy:()=>A().stopAutoSave(),getStats:()=>({}),...o};return L(b)},oa=(a,t,e,n,s,i,[r,o,c],l,y,w,d)=>{const[u,E,p,f]=ta(t,l,s,d);return ra(a,(async()=>await f((async()=>{return await u(),a=(await E(r,o))[U]?.[c]??"null",JSON.parse(a,((a,t)=>"￼"===t?void 0:t));var a}))),(async a=>await f((async()=>{var t;await u(),await p(r,o,{[U]:{[c]:(t=a()??null,JSON.stringify(t,((a,t)=>void 0===t?"￼":t)))}},!0,!0)}))),e,n,s,i,{[w]:()=>y},y)},ca=(a,t,e,n,s,i,[r,o,[c,y,w]],d,u,E,f)=>{const[v,g,C,T]=ta(t,d,s,f),O=async(a,t)=>await p(B(o,(async([e,n,s,i],r)=>{t&&!D(a,r)||await C(e,n,a[r],s,i,t)}))),h=async(a,t)=>y?await C(w,Y,{[U]:a},!0,!0,t):null;return ra(a,(async()=>await T((async()=>{await v();const a=await(async()=>b(m(await p(B(r,(async([a,t],e)=>[a,await g(e,t)]))),(a=>!_(a[1])))))(),t=await(async()=>c?(await g(w,Y))[U]:{})();return _(a)&&l(t)?void 0:[a,t]}))),(async(a,t)=>await T((async()=>{if(await v(),l(t)){const[t,e]=a();await O(t),await h(e)}else await O(t[0],!0),await h(t[1],!0)}))),e,n,s,i,{[E]:()=>u},u)},la="ColumnName",ya="store",wa="json",da=ya+"TableName",ua=ya+"Id"+la,Ea=ya+la,pa="autoLoadIntervalSeconds",fa="rowId"+la,va="tableId",ga="tableName",ma="deleteEmptyColumns",Ca="deleteEmptyTable",Ta={mode:wa,[pa]:1},Oa={load:0,save:0,[ga]:e+"_values"},ha=(a,t,e,n,s)=>{const i=F();return M(a,((a,r)=>{const o=u(P(I(t,w(a)?{[e]:a}:a)),0,$(t));l(o[0])||n(r,o[0])||(s(r,o[0]),W(i,r,o))})),i},Aa="pragma_",Na="data_version",Ra="schema_version";a.createCrSqliteWasmPersister=(a,t,n,s,i)=>((a,t,n,s,i,r,o,l,y,d="getDb",E)=>{let p,f,v;const[g,m,C,h]=(a=>{const t=(a=>I(Ta,w(a)?{[da]:a}:a??{}))(a),n=t[pa];if(t.mode==wa){const a=t[da]??e;return[1,n,[a,t[ua]??Y,t[Ea]??ya],G(a)]}const{tables:{load:s={},save:i={}}={},values:r={}}=t,o=u(P(I(Oa,r)),0,$(Oa)),c=o[2],l=G(c),y=G(c);return[0,n,[ha(s,{[va]:null,[fa]:Y},va,(a=>T(y,a)),(a=>z(l,a))),ha(i,{[ga]:null,[fa]:Y,[ma]:0,[Ca]:0},ga,((a,t)=>T(y,t)),((a,t)=>z(l,t))),o],l]})(t);return(g?oa:ca)(a,r?async(a,t)=>(r(a,t),await n(a,t)):n,(a=>{return[(t=async()=>{try{const[{d:t,s:e,c:s}]=await n(`SELECT ${Na} d,${Ra} s,TOTAL_CHANGES() c FROM ${Aa}${Na} JOIN ${Aa}${Ra}`);t==(p??=t)&&e==(f??=e)&&s==(v??=s)||(a(),p=t,f=e)}catch{}},e=m,t(),setInterval(t,1e3*e)),s((t=>h.has(t)?a():0))];var t,e}),(([a,t])=>{c(a),p=f=v=null,i(t)}),o,l,C,O(h),y,d,E)})(a,n,(async(a,e=[])=>await t.execO(a,e)),(a=>t.onUpdate(((t,e,n)=>a(n)))),(a=>a()),s,i,1,t)},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((a="undefined"!=typeof globalThis?globalThis:a||self).TinyBasePersisterCrSqliteWasm={});
