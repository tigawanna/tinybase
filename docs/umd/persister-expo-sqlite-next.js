var a,t;a=this,t=function(a,t){"use strict";const e=a=>typeof a,s="tinybase",n="",i=",",o=e(n),c=(a,t)=>a.repeat(t),r=Promise,l=clearInterval,y=a=>null==a,w=(a,t,e)=>y(a)?e?.():t(a),d=a=>e(a)==o,u=(a,t,e)=>a.slice(t,e),p=a=>a.length,E=async a=>r.all(a),f="_",v="_id",m=a=>`"${a.replace(/"/g,'""')}"`,A="SELECT",h=(a,t="")=>a.join(t),N=(a,t)=>a.map(t),T=a=>0==p(a),O=(a,t)=>a.filter(t),L=(a,...t)=>a.push(...t),C=(a,t)=>a?.has(t)??!1,R=a=>[...a?.values()??[]],S=(a,t)=>a?.delete(t),g=Object,b=a=>g.getPrototypeOf(a),x=g.keys,D=g.freeze,I=(a=[])=>g.fromEntries(a),P=(...a)=>g.assign({},...a),_=(a,t)=>N(g.entries(a),(([a,e])=>t(e,a))),q=a=>g.values(a),F=a=>p(x(a)),M=a=>(a=>!y(a)&&w(b(a),(a=>a==g.prototype||y(b(a))),(()=>!0)))(a)&&0==F(a),j=a=>new Map(a),B=a=>[...a?.keys()??[]],H=(a,t)=>a?.get(t),Y=(a,t)=>N([...a?.entries()??[]],(([a,e])=>t(e,a))),$=(a,t,e)=>y(e)?(S(a,t),a):a?.set(t,e),k=(a,t,e)=>(C(a,t)||$(a,t,e()),H(a,t)),G=(a,t,e,s=$)=>(_(t,((t,s)=>e(a,s,t))),((a,t)=>{((a,t)=>{a?.forEach(t)})(a,((a,e)=>t(e)))})(a,(e=>((a,t)=>!y(((a,t)=>w(a,(a=>a[t])))(a,t)))(t,e)?0:s(a,e))),a),J=a=>new Set(Array.isArray(a)||y(a)?a:[a]),U=(a,t)=>a?.add(t),W="TABLE",z="ALTER "+W,K="DELETE FROM",V=A+"*FROM",Q="FROM pragma_table_",X="WHERE",Z=(a,t,e,s)=>{const o=j();return[async()=>G(o,I(await E(N(await a("SELECT name "+Q+"list WHERE schema='main'AND(type='table'OR type='view')AND name IN("+ta(t)+")ORDER BY name",t),(async({name:t})=>[t,I(N(await a(A+" name,type "+Q+"info(?)",[t]),(({name:a,type:t})=>[a,t])))])))),((a,t,e)=>$(o,t,G(k(o,t,j),e,((a,t,e)=>{e!=H(a,t)&&$(a,t,e)}),((a,t)=>$(a,t))))),((a,t)=>$(o,t))),async(t,e)=>((a,t)=>!y(H(H(o,a),t)))(t,e)?I(O(N(await a(V+m(t)),(a=>{return[a[e],(t={...a},s=e,delete t[s],t)];var t,s})),(([a,t])=>!y(a)&&!M(t)))):{},async(t,e,c,r,l,w=!1)=>{const d=J();_(c??{},(a=>N(x(a??{}),(a=>U(d,a)))));const u=R(d);if(!w&&l&&T(u)&&C(o,t))return await a("DROP "+W+m(t)),void $(o,t);if(T(u)||C(o,t)){const s=H(o,t),i=J(B(s));await E([...N(u,(async e=>{S(i,e)||(await a(z+m(t)+"ADD"+m(e)),$(s,e,n))})),...!w&&r?N(R(i),(async n=>{n!=e&&(await a(z+m(t)+"DROP"+m(n)),$(s,n))})):[]])}else await a("CREATE "+W+m(t)+"("+m(e)+` PRIMARY KEY ON CONFLICT REPLACE${h(N(u,(a=>i+m(a))))});`),$(o,t,j([[e,n],...N(u,(a=>[a,n]))]));if(w)y(c)?await a(K+m(t)+X+" 1"):await E(_(c,(async(n,i)=>{y(n)?await a(K+m(t)+X+m(e)+"=?",[i]):T(u)||await aa(a,t,e,x(n),[i,...q(n)],s)})));else if(T(u))C(o,t)&&await a(K+m(t)+X+" 1");else{const n=O(B(H(o,t)),(a=>a!=e)),i=[],r=[];_(c??{},((a,t)=>{L(i,t,...N(n,(t=>a?.[t]))),L(r,t)})),await aa(a,t,e,n,i,s),await a(K+m(t)+X+m(e)+"NOT IN("+ta(r)+")",r)}},async t=>{let s;await a("BEGIN");try{s=await t()}catch(a){e?.(a)}return await a("END"),s}]},aa=async(a,t,e,s,o,r=!0)=>await a("INSERT "+(r?n:"OR REPLACE ")+"INTO"+m(t)+"("+m(e)+h(N(s,(a=>i+m(a))))+")VALUES"+u(c(`,(?${c(",?",p(s))})`,p(o)/(p(s)+1)),1)+(r?"ON CONFLICT("+m(e)+")DO UPDATE SET"+h(N(s,(a=>m(a)+"=excluded."+m(a))),i):n),N(o,(a=>a??null))),ta=a=>h(N(a,(()=>"?")),i),ea=JSON.parse,sa=j(),na=j(),ia=(a,t,e,s,n,i,[o,c]=[],r=[])=>{let l,d,u,p=0,E=0;k(sa,r,(()=>0)),k(na,r,(()=>[]));const f=async a=>(2!=p&&(p=1,await v.schedule((async()=>{await a(),p=0}))),v),v={load:async(e,s)=>await f((async()=>{try{a.setContent(await t())}catch{a.setContent([e,s])}})),startAutoLoad:async(e={},n={})=>(v.stopAutoLoad(),await v.load(e,n),E=1,u=s((async(e,s)=>{if(s){const t=s();await f((async()=>a.setTransactionChanges(t)))}else await f((async()=>{try{a.setContent(e?.()??await t())}catch(a){i?.(a)}}))})),v),stopAutoLoad:()=>(E&&(n(u),u=void 0,E=0),v),save:async t=>(1!=p&&(p=2,await v.schedule((async()=>{try{await e(a.getContent,t)}catch(a){i?.(a)}p=0}))),v),startAutoSave:async()=>(await v.stopAutoSave().save(),l=a.addDidFinishTransactionListener(((a,t)=>{const[e,s]=t();M(e)&&M(s)||v.save((()=>[e,s]))})),v),stopAutoSave:()=>(w(l,a.delListener),l=void 0,v),schedule:async(...a)=>(L(H(na,r),...a),await(async()=>{if(!H(sa,r)){for($(sa,r,1);!y((a=H(na,r),d=a.shift()));)try{await d()}catch(a){i?.(a)}$(sa,r,0)}var a})(),v),getStore:()=>a,destroy:()=>v.stopAutoLoad().stopAutoSave(),getStats:()=>({})};return o&&(v[o]=()=>c),D(v)},oa="store",ca=(a,t,e,s,n,[i],o,c,r,l)=>{const[y,w,d,u]=Z(t,o,n,l);return ia(a,(async()=>await u((async()=>(await y(),ea((await w(i,v))[f]?.[oa]??"null"))))),(async a=>await u((async()=>{var t;await y(),await d(i,v,{[f]:{[oa]:(t=a()??null,JSON.stringify(t,((a,t)=>t instanceof Map?g.fromEntries([...t]):t)))}},!0,!0)}))),e,s,n,[r,c],c)},ra=(a,t,e,s,n,[i,o,[c,r,l]],w,d,u,p)=>{const[m,A,h,N]=Z(t,w,n,p),T=async(a,t)=>await E(Y(o,(async([e,s,n,i],o)=>{const c=a[o];t&&void 0===c||await h(e,s,c,n,i,t)}))),L=async(a,t)=>r?await h(l,v,{[f]:a},!0,!0,t):null;return ia(a,(async()=>await N((async()=>{await m();const a=await(async()=>I(O(await E(Y(i,(async([a,t],e)=>[a,await A(e,t)]))),(a=>!M(a[1])))))(),t=await(async()=>c?(await A(l,v))[f]:{})();return M(a)&&y(t)?void 0:[a,t]}))),(async(a,t)=>await N((async()=>{if(await m(),y(t)){const[t,e]=a();await T(t),await L(e)}else{const[a,e]=t();await T(a,!0),await L(e,!0)}}))),e,s,n,[u,d],d)},la="json",ya="autoLoadIntervalSeconds",wa="rowIdColumnName",da="tableId",ua="tableName",pa={mode:la,[ya]:1},Ea={load:0,save:0,[ua]:s+"_values"},fa=(a,t,e,s)=>{const n=j();return _(a,((a,i)=>{const o=u(q(P(t,d(a)?{[e]:a}:a)),0,F(t));y(o[0])||s(i,o[0])||$(n,i,o)})),n},va="pragma ",ma="data_version",Aa="schema_version",ha=(a,t,e,n,i,o,c,r,y="getDb",w)=>{let p,E,f;const[m,h,N,T]=(a=>{const t=(a=>P(pa,d(a)?{storeTableName:a}:a??{}))(a),e=t[ya];if(t.mode==la){const{storeTableName:a=s}=t;return[1,e,[a],J(a)]}const{tables:{load:n={},save:i={}}={},values:o={}}=t,c=u(q(P(Ea,o)),0,F(Ea)),r=c[2],l=J(r);return[0,e,[fa(n,{[da]:null,[wa]:v},da,(a=>U(l,a)&&a==r)),fa(i,{[ua]:null,[wa]:v,deleteEmptyColumns:0,deleteEmptyTable:0},ua,((a,t)=>U(l,t)&&t==r)),c],l]})(t);return(m?ca:ra)(a,o?async(a,t)=>(o(a,t),await e(a,t)):e,(a=>{return[(t=async()=>{try{const t=(await e(va+ma))[0][ma],s=(await e(va+Aa))[0][Aa],n=(await e(A+" TOTAL_CHANGES() c"))[0].c;t==(p??=t)&&s==(E??=s)&&n==(f??=n)||(a(),p=t,E=s)}catch{}},s=h,t(),setInterval(t,1e3*s)),n((t=>T.has(t)?a():0))];var t,s}),(([a,t])=>{l(a),p=E=null,i(t)}),c,N,R(T),r,y,w)};a.createExpoSqliteNextPersister=(a,e,s,n,i)=>ha(a,s,(async(a,t=[])=>await e.getAllAsync(a,t)),(a=>t.addDatabaseChangeListener((({tableName:t})=>a(t)))),(a=>a.remove()),n,i,e)},"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("expo-sqlite/next")):"function"==typeof define&&define.amd?define(["exports","expo-sqlite/next"],t):t((a="undefined"!=typeof globalThis?globalThis:a||self).TinyBasePersisterExpoSqliteNext={},a["expo-sqlite/next"]);
