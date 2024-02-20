var e,t;e=this,t=function(e){"use strict";const t=e=>typeof e,s="",n=t(s),a=t(!0),l=t(0),o=t(t),r="type",i="default",c="Has",d="Ids",u="Table",h=u+"s",g=u+d,f="Row",T=f+"Count",b=f+d,C="Cell",p=C+d,v="Value",V=v+"s",y=v+d,S=e=>s+e,m=(e,t)=>e.startsWith(t),w=(e,t)=>e.endsWith(t),R=(e,t=0)=>e.charCodeAt(t),I=isFinite,L=e=>null==e,M=(e,t,s)=>L(e)?s?.():t(e),J=e=>e==n||e==a,E=e=>t(e)==o,H=(e,t,s)=>e.slice(t,s),x=e=>e.length,P=(e,t)=>e.forEach(t),F=(e,t)=>e.map(t),O=(e,...t)=>e.push(...t),z=Object,A=e=>z.getPrototypeOf(e),W=z.entries,j=z.keys,k=z.isFrozen,D=z.freeze,N=e=>!L(e)&&M(A(e),(e=>e==z.prototype||L(A(e))),(()=>!0)),B=(e,t)=>t in e,$=(e,t)=>(delete e[t],e),q=(e,t)=>P(W(e),(([e,s])=>t(s,e))),G=(e,t)=>F(W(e),(([e,s])=>t(s,e))),K=e=>N(e)&&0==(e=>x(j(e)))(e),Q=e=>e?.size??0,U=(e,t)=>e?.has(t)??!1,X=e=>L(e)||0==Q(e),Y=e=>e.clear(),Z=(e,t)=>e?.forEach(t),_=(e,t)=>e?.delete(t),ee=e=>new Map(e),te=e=>[...e?.keys()??[]],se=(e,t)=>e?.get(t),ne=(e,t)=>Z(e,((e,s)=>t(s,e))),ae=(e,t,s)=>L(s)?(_(e,t),e):e?.set(t,s),le=(e,t,s)=>(U(e,t)||ae(e,t,s()),se(e,t)),oe=(e,t,s,n=ae)=>(G(t,((t,n)=>s(e,n,t))),ne(e,(s=>B(t,s)?0:n(e,s))),e),re=(e,t,s)=>{const n={};return Z(e,((e,a)=>{const l=t?t(e,a):e;!s?.(l,e)&&(n[a]=l)})),n},ie=(e,t,s)=>re(e,(e=>re(e,t,s)),K),ce=(e,t,s)=>re(e,(e=>ie(e,t,s)),K),de=(e,t)=>{const s=ee();return Z(e,((e,n)=>s.set(n,t?.(e)??e))),s},ue=e=>de(e,de),he=e=>de(e,ue),ge=(e,t,s,n,a=0)=>M((s?le:se)(e,t[a],a>x(t)-2?s:ee),(l=>{if(a>x(t)-2)return n?.(l)&&ae(e,t[a]),l;const o=ge(l,t,s,n,a+1);return X(l)&&ae(e,t[a]),o})),fe=()=>[s,void 0],Te=()=>[s,ee()],be=([e,t],s)=>[e,s(t,e)],Ce=(e,t)=>be(e,(e=>re(e,t))),pe=(e,t,s,n)=>q(e,((e,a)=>ve(e,le(t,a,Te),s[a]=((e=[])=>z.fromEntries(e))(),n))),ve=([e,t],s,n,a)=>{e>s[0]&&(s[0]=e),a(t,s[1],n)},Ve=(e,t,s)=>q(e,(([e,n],a)=>{const l=le(t,a,fe);e>l[0]&&(l[0]=e,l[1]=s[a]=n)})),ye=e=>new Set(Array.isArray(e)||L(e)?e:[e]),Se=(e,t)=>e?.add(t),me=/^\d+$/,we=()=>{const e=[];let t=0;return[n=>(n?e.shift():null)??s+t++,t=>{me.test(t)&&x(e)<1e3&&O(e,t)}]},Re=e=>[e,e],Ie=()=>[ee(),ee()],Le=e=>[...e],Me=([e,t])=>e===t,Je=e=>{const s=t(e);return J(s)||s==l&&I(e)?s:void 0},Ee=(e,t,s,n,a)=>L(a)?e.delCell(t,s,n,!0):e.setCell(t,s,n,a),He=(e,t,s)=>L(s)?e.delValue(t):e.setValue(t,s),xe=e=>JSON.stringify(e,((e,t)=>t instanceof Map?z.fromEntries([...t]):t)),Pe=JSON.parse,Fe=(e,t,s)=>L(e)||!N(e)||K(e)||k(e)?(s?.(),!1):(G(e,((s,n)=>{t(s,n)||$(e,n)})),!K(e)),Oe=(e,t,s)=>ae(e,t,se(e,t)==-s?void 0:s),ze=()=>{let e,t,n,a=!1,o=!1,d=!1,m=!1,w=0;const R=ee(),I=ee(),z=ee(),A=ee(),W=ee(),j=ee(),k=ee(),N=ee(),q=ee(),fe=ee(),Te=ee(),be=ee(),Ce=ee(),pe=ee(),ve=ye(),Ve=ee(),me=ee(),Ae=ee(),We=ee(),je=Ie(),ke=Ie(),De=Ie(),Ne=Ie(),Be=Ie(),$e=Ie(),qe=Ie(),Ge=Ie(),Ke=Ie(),Qe=Ie(),Ue=Ie(),Xe=Ie(),Ye=Ie(),Ze=Ie(),_e=Ie(),et=Ie(),tt=Ie(),st=Ie(),nt=Ie(),at=Ie(),lt=Ie(),ot=Ie(),rt=ee(),it=Ie(),[ct,dt,ut,ht]=(e=>{let t;const[n,a]=we(),l=ee();return[(e,a,o,r=[],i=(()=>[]))=>{t??=xs;const c=n(1);return ae(l,c,[e,a,o,r,i]),Se(ge(a,o??[s],ye),c),c},(e,n,...a)=>P(((e,t=[s])=>{const n=[],a=(e,s)=>s==x(t)?O(n,e):null===t[s]?Z(e,(e=>a(e,s+1))):P([t[s],null],(t=>a(se(e,t),s+1)));return a(e,0),n})(e,n),(e=>Z(e,(e=>se(l,e)[0](t,...n??[],...a))))),e=>M(se(l,e),(([,t,n])=>(ge(t,n??[s],void 0,(t=>(_(t,e),X(t)?1:0))),ae(l,e),a(e),n))),e=>M(se(l,e),(([e,,s=[],n,a])=>{const l=(...o)=>{const r=x(o);r==x(s)?e(t,...o,...a(o)):L(s[r])?P(n[r]?.(...o)??[],(e=>l(...o,e))):l(...o,s[r])};l()}))]})(),gt=e=>{if(!Fe(e,((e,t)=>[r,i].includes(t))))return!1;const t=e[r];return!(!J(t)&&t!=l||(Je(e[i])!=t&&$(e,i),0))},ft=(t,s)=>(!e||U(Te,s)||$t(s))&&Fe(t,((e,t)=>Tt(s,t,e)),(()=>$t(s))),Tt=(e,t,s,n)=>Fe(n?s:vt(s,e,t),((n,a)=>M(bt(e,t,a,n),(e=>(s[a]=e,!0)),(()=>!1))),(()=>$t(e,t))),bt=(t,s,n,a)=>e?M(se(se(Te,t),n),(e=>Je(a)!=e[r]?$t(t,s,n,a,e[i]):a),(()=>$t(t,s,n,a))):L(Je(a))?$t(t,s,n,a):a,Ct=(e,t)=>Fe(t?e:Vt(e),((t,s)=>M(pt(s,t),(t=>(e[s]=t,!0)),(()=>!1))),(()=>qt())),pt=(e,s)=>t?M(se(Ce,e),(t=>Je(s)!=t[r]?qt(e,s,t[i]):s),(()=>qt(e,s))):L(Je(s))?qt(e,s):s,vt=(e,t,s)=>(M(se(be,t),(([n,a])=>{Z(n,((t,s)=>{B(e,s)||(e[s]=t)})),Z(a,(n=>{B(e,n)||$t(t,s,n)}))})),e),Vt=e=>(t&&(Z(pe,((t,s)=>{B(e,s)||(e[s]=t)})),Z(ve,(t=>{B(e,t)||qt(t)}))),e),yt=e=>oe(Te,e,((e,t,s)=>{const n=ee(),a=ye();oe(le(Te,t,ee),s,((e,t,s)=>{ae(e,t,s),M(s[i],(e=>ae(n,t,e)),(()=>Se(a,t)))})),ae(be,t,[n,a])}),((e,t)=>{ae(Te,t),ae(be,t)})),St=e=>oe(Ce,e,((e,t,s)=>{ae(Ce,t,s),M(s[i],(e=>ae(pe,t,e)),(()=>Se(ve,t)))}),((e,t)=>{ae(Ce,t),ae(pe,t),_(ve,t)})),mt=e=>K(e)?ms():ps(e),wt=e=>oe(Ae,e,((e,t,s)=>Rt(t,s)),((e,t)=>Ft(t))),Rt=(e,t)=>oe(le(Ae,e,(()=>(Wt(e,1),ae(Ve,e,we()),ae(me,e,ee()),ee()))),t,((t,s,n)=>It(e,t,s,n)),((t,s)=>Ot(e,t,s))),It=(e,t,s,n,a)=>oe(le(t,s,(()=>(jt(e,s,1),ee()))),n,((t,n,a)=>Lt(e,s,t,n,a)),((n,l)=>zt(e,t,s,n,l,a))),Lt=(e,t,s,n,a)=>{U(s,n)||kt(e,t,n,1);const l=se(s,n);a!==l&&(Dt(e,t,n,l,a),ae(s,n,a))},Mt=(e,t,s,n,a)=>M(se(t,s),(t=>Lt(e,s,t,n,a)),(()=>It(e,t,s,vt({[n]:a},e,s)))),Jt=e=>K(e)?Is():vs(e),Et=e=>oe(We,e,((e,t,s)=>Ht(t,s)),((e,t)=>At(t))),Ht=(e,t)=>{U(We,e)||Nt(e,1);const s=se(We,e);t!==s&&(Bt(e,s,t),ae(We,e,t))},xt=(e,t)=>{const[s]=se(Ve,e),n=s(t);return U(se(Ae,e),n)?xt(e,t):n},Pt=e=>se(Ae,e)??Rt(e,{}),Ft=e=>Rt(e,{}),Ot=(e,t,s)=>{const[,n]=se(Ve,e);n(s),It(e,t,s,{},!0)},zt=(e,t,s,n,a,l)=>{const o=se(se(be,e)?.[0],a);if(!L(o)&&!l)return Lt(e,s,n,a,o);const r=t=>{Dt(e,s,t,se(n,t)),kt(e,s,t,-1),ae(n,t)};L(o)?r(a):ne(n,r),X(n)&&(jt(e,s,-1),X(ae(t,s))&&(Wt(e,-1),ae(Ae,e),ae(Ve,e),ae(me,e)))},At=e=>{const t=se(pe,e);if(!L(t))return Ht(e,t);Bt(e,se(We,e)),Nt(e,-1),ae(We,e)},Wt=(e,t)=>Oe(R,e,t),jt=(e,t,s)=>Oe(le(A,e,ee),t,s)&&ae(z,e,le(z,e,(()=>0))+s),kt=(e,t,s,n)=>{const a=se(me,e),l=se(a,s)??0;(0==l&&1==n||1==l&&-1==n)&&Oe(le(I,e,ee),s,n),ae(a,s,l!=-n?l+n:null),Oe(le(le(W,e,ee),t,ee),s,n)},Dt=(e,t,s,n,a)=>le(le(le(j,e,ee),t,ee),s,(()=>[n,0]))[1]=a,Nt=(e,t)=>Oe(k,e,t),Bt=(e,t,s)=>le(N,e,(()=>[t,0]))[1]=s,$t=(e,t,s,n,a)=>(O(le(le(le(q,e,ee),t,ee),s,(()=>[])),n),a),qt=(e,t,s)=>(O(le(fe,e,(()=>[])),t),s),Gt=(e,t,s)=>M(se(se(se(j,e),t),s),(([e,t])=>[!0,e,t]),(()=>[!1,...Re(rs(e,t,s))])),Kt=e=>M(se(N,e),(([e,t])=>[!0,e,t]),(()=>[!1,...Re(ds(e))])),Qt=e=>X(q)||X(et[e])?0:Z(e?he(q):q,((t,s)=>Z(t,((t,n)=>Z(t,((t,a)=>dt(et[e],[s,n,a],t))))))),Ut=e=>X(fe)||X(tt[e])?0:Z(e?de(fe):fe,((t,s)=>dt(tt[e],[s],t))),Xt=(e,t,s,n)=>{if(!X(e))return dt(t,n,(()=>re(e))),ne(e,((e,t)=>dt(s,[...n??[],e],1==t))),1},Yt=e=>{const t=us();t!=d&&dt(je[e],void 0,t);const s=X(Qe[e]),n=X(Ye[e])&&X(Ze[e])&&X(Ke[e])&&X(Ue[e])&&X($e[e])&&X(qe[e])&&X(Ge[e])&&s&&X(De[e])&&X(Ne[e]),a=X(_e[e])&&X(Xe[e])&&X(Be[e])&&X(ke[e]);if(!n||!a){const t=e?[de(R),ue(I),de(z),ue(A),he(W),he(j)]:[R,I,z,A,W,j];if(!n){Xt(t[0],De[e],Ne[e]),Z(t[1],((t,s)=>Xt(t,$e[e],qe[e],[s]))),Z(t[2],((t,s)=>{0!=t&&dt(Ge[e],[s],ns(s))}));const n=ye();Z(t[3],((t,a)=>{Xt(t,Ke[e],Ue[e],[a])&&!s&&(dt(Qe[e],[a,null]),Se(n,a))})),s||Z(t[5],((t,s)=>{if(!U(n,s)){const n=ye();Z(t,(e=>Z(e,(([t,s],a)=>s!==t?Se(n,a):_(e,a))))),Z(n,(t=>dt(Qe[e],[s,t])))}})),Z(t[4],((t,s)=>Z(t,((t,n)=>Xt(t,Ye[e],Ze[e],[s,n])))))}if(!a){let s;Z(t[5],((t,n)=>{let a;Z(t,((t,l)=>{let o;Z(t,(([t,r],i)=>{r!==t&&(dt(_e[e],[n,l,i],r,t,Gt),s=a=o=1)})),o&&dt(Xe[e],[n,l],Gt)})),a&&dt(Be[e],[n],Gt)})),s&&dt(ke[e],void 0,Gt)}}},Zt=e=>{const t=bs();t!=m&&dt(st[e],void 0,t);const s=X(at[e])&&X(lt[e]),n=X(ot[e])&&X(nt[e]);if(!s||!n){const t=e?[de(k),de(N)]:[k,N];if(s||Xt(t[0],at[e],lt[e]),!n){let s;Z(t[1],(([t,n],a)=>{n!==t&&(dt(ot[e],[a],n,t,Kt),s=1)})),s&&dt(nt[e],void 0,Kt)}}},_t=(e,...t)=>(Js((()=>e(...F(t,S)))),xs),es=()=>ce(Ae),ts=()=>te(Ae),ss=e=>te(se(me,S(e))),ns=e=>Q(se(Ae,S(e))),as=e=>te(se(Ae,S(e))),ls=(e,t,s,n=0,a)=>{return F(H((o=se(Ae,S(e)),r=(e,s)=>[L(t)?s:se(e,S(t)),s],l=([e],[t])=>((e??0)<(t??0)?-1:1)*(s?-1:1),F([...o?.entries()??[]],(([e,t])=>r(t,e))).sort(l)),n,L(a)?a:n+a),(([,e])=>e));var l,o,r},os=(e,t)=>te(se(se(Ae,S(e)),S(t))),rs=(e,t,s)=>se(se(se(Ae,S(e)),S(t)),S(s)),is=()=>re(We),cs=()=>te(We),ds=e=>se(We,S(e)),us=()=>!X(Ae),hs=e=>U(Ae,S(e)),gs=(e,t)=>U(se(me,S(e)),S(t)),fs=(e,t)=>U(se(Ae,S(e)),S(t)),Ts=(e,t,s)=>U(se(se(Ae,S(e)),S(t)),S(s)),bs=()=>!X(We),Cs=e=>U(We,S(e)),ps=e=>_t((()=>(e=>Fe(e,ft,$t))(e)?wt(e):0)),vs=e=>_t((()=>Ct(e)?Et(e):0)),Vs=e=>{try{mt(Pe(e))}catch{}return xs},ys=t=>_t((()=>{if((e=Fe(t,(e=>Fe(e,gt))))&&(yt(t),!X(Ae))){const e=es();ms(),ps(e)}})),Ss=e=>_t((()=>{if(t=(e=>Fe(e,gt))(e)){const s=is();Ms(),Is(),t=!0,St(e),vs(s)}})),ms=()=>_t((()=>wt({}))),ws=e=>_t((e=>U(Ae,e)?Ft(e):0),e),Rs=(e,t)=>_t(((e,t)=>M(se(Ae,e),(s=>U(s,t)?Ot(e,s,t):0))),e,t),Is=()=>_t((()=>Et({}))),Ls=()=>_t((()=>{yt({}),e=!1})),Ms=()=>_t((()=>{St({}),t=!1})),Js=(e,t)=>{if(-1!=w){Es();const s=e();return Hs(t),s}},Es=()=>(-1!=w&&w++,1==w&&dt(rt,void 0),xs),Hs=e=>(w>0&&(w--,0==w&&(a=!X(j),o=!X(N),w=1,Qt(1),a&&Yt(1),Ut(1),o&&Zt(1),e?.(xs)&&(Z(j,((e,t)=>Z(e,((e,s)=>Z(e,(([e],n)=>Ee(xs,t,s,n,e))))))),Z(N,(([e],t)=>He(xs,t,e))),a=o=!1),dt(it[0],void 0),w=-1,Qt(0),a&&Yt(0),Ut(0),o&&Zt(0),n?.(xs),dt(it[1],void 0),w=0,a=o=!1,d=us(),m=bs(),P([R,I,z,A,W,j,q,k,N,fe],Y))),xs),xs={getContent:()=>[es(),is()],getTables:es,getTableIds:ts,getTable:e=>ie(se(Ae,S(e))),getTableCellIds:ss,getRowCount:ns,getRowIds:as,getSortedRowIds:ls,getRow:(e,t)=>re(se(se(Ae,S(e)),S(t))),getCellIds:os,getCell:rs,getValues:is,getValueIds:cs,getValue:ds,hasTables:us,hasTable:hs,hasTableCell:gs,hasRow:fs,hasCell:Ts,hasValues:bs,hasValue:Cs,getTablesJson:()=>xe(Ae),getValuesJson:()=>xe(We),getJson:()=>xe([Ae,We]),getTablesSchemaJson:()=>xe(Te),getValuesSchemaJson:()=>xe(Ce),getSchemaJson:()=>xe([Te,Ce]),hasTablesSchema:()=>e,hasValuesSchema:()=>t,setContent:([e,t])=>_t((()=>{(K(e)?ms:ps)(e),(K(t)?Is:vs)(t)})),setTables:ps,setTable:(e,t)=>_t((e=>ft(t,e)?Rt(e,t):0),e),setRow:(e,t,s)=>_t(((e,t)=>Tt(e,t,s)?It(e,Pt(e),t,s):0),e,t),addRow:(e,t,s=!0)=>Js((()=>{let n;return Tt(e,n,t)&&(e=S(e),It(e,Pt(e),n=xt(e,s?1:0),t)),n})),setPartialRow:(e,t,s)=>_t(((e,t)=>{if(Tt(e,t,s,1)){const n=Pt(e);G(s,((s,a)=>Mt(e,n,t,a,s)))}}),e,t),setCell:(e,t,s,n)=>_t(((e,t,s)=>M(bt(e,t,s,E(n)?n(rs(e,t,s)):n),(n=>Mt(e,Pt(e),t,s,n)))),e,t,s),setValues:vs,setPartialValues:e=>_t((()=>Ct(e,1)?G(e,((e,t)=>Ht(t,e))):0)),setValue:(e,t)=>_t((e=>M(pt(e,E(t)?t(ds(e)):t),(t=>Ht(e,t)))),e),applyChanges:e=>_t((()=>{G(e[0],((e,t)=>L(e)?ws(t):G(e,((e,s)=>L(e)?Rs(t,s):G(e,((e,n)=>Ee(xs,t,s,n,e))))))),G(e[1],((e,t)=>He(xs,t,e)))})),setTablesJson:Vs,setValuesJson:e=>{try{Jt(Pe(e))}catch{}return xs},setJson:e=>_t((()=>{try{const[t,s]=Pe(e);mt(t),Jt(s)}catch{Vs(e)}})),setTablesSchema:ys,setValuesSchema:Ss,setSchema:(e,t)=>_t((()=>{ys(e),Ss(t)})),delTables:ms,delTable:ws,delRow:Rs,delCell:(e,t,s,n)=>_t(((e,t,s)=>M(se(Ae,e),(a=>M(se(a,t),(l=>U(l,s)?zt(e,a,t,l,s,n):0))))),e,t,s),delValues:Is,delValue:e=>_t((e=>U(We,e)?At(e):0),e),delTablesSchema:Ls,delValuesSchema:Ms,delSchema:()=>_t((()=>{Ls(),Ms()})),transaction:Js,startTransaction:Es,getTransactionChanges:()=>[re(j,((e,t)=>-1===se(R,t)?void 0:re(e,((e,s)=>-1===se(se(A,t),s)?void 0:re(e,(([,e])=>e),((e,t)=>Me(t)))),K)),K),re(N,(([,e])=>e),((e,t)=>Me(t)))],getTransactionLog:()=>[a,o,ce(j,Le,Me),ce(q),re(N,Le,Me),re(fe),re(R),ie(A),ce(W),re(k)],finishTransaction:Hs,forEachTable:e=>Z(Ae,((t,s)=>e(s,(e=>Z(t,((t,s)=>e(s,(e=>ne(t,e))))))))),forEachTableCell:(e,t)=>ne(se(me,S(e)),t),forEachRow:(e,t)=>Z(se(Ae,S(e)),((e,s)=>t(s,(t=>ne(e,t))))),forEachCell:(e,t,s)=>ne(se(se(Ae,S(e)),S(t)),s),forEachValue:e=>ne(We,e),addSortedRowIdsListener:(e,t,s,n,a,l,o)=>{let r=ls(e,t,s,n,a);return ct((()=>{const o=ls(e,t,s,n,a);var i,c,d;c=r,x(i=o)===x(c)&&(d=(e,t)=>c[t]===e,i.every(d))||(r=o,l(xs,e,t,s,n,a,r))}),Qe[o?1:0],[e,t],[ts])},addStartTransactionListener:e=>ct(e,rt),addWillFinishTransactionListener:e=>ct(e,it[0]),addDidFinishTransactionListener:e=>ct(e,it[1]),callListener:e=>(ht(e),xs),delListener:e=>(ut(e),xs),getListenerStats:()=>({}),createStore:ze,addListener:ct,callListeners:dt,addPostTransactionListener:e=>{n=e}};return G({[c+h]:[0,je,[],()=>[us()]],[h]:[0,ke],[g]:[0,De],[c+u]:[1,Ne,[ts],e=>[hs(...e)]],[u]:[1,Be,[ts]],[u+p]:[1,$e,[ts]],[c+u+C]:[2,qe,[ts,ss],e=>[gs(...e)]],[T]:[1,Ge,[ts]],[b]:[1,Ke,[ts]],[c+f]:[2,Ue,[ts,as],e=>[fs(...e)]],[f]:[2,Xe,[ts,as]],[p]:[2,Ye,[ts,as]],[c+C]:[3,Ze,[ts,as,os],e=>[Ts(...e)]],[C]:[3,_e,[ts,as,os],e=>Re(rs(...e))],InvalidCell:[3,et],[c+V]:[0,st,[],()=>[bs()]],[V]:[0,nt],[y]:[0,at],[c+v]:[1,lt,[cs],e=>[Cs(...e)]],[v]:[1,ot,[cs],e=>Re(ds(e[0]))],InvalidValue:[1,tt]},(([e,t,s,n],a)=>{xs["add"+a+"Listener"]=(...a)=>ct(a[e],t[a[e+1]?1:0],e>0?H(a,0,e):void 0,s,n)})),D(xs)},Ae=2**36,We=2**30,je=2**24,ke=2**18,De=4096,Ne=64,Be=e=>String.fromCharCode(48+(63&e)),$e=(e,t)=>R(e,t)-48,qe={HasTable:1,Table:1,TableCellIds:1,HasTableCell:2,RowCount:1,RowIds:1,SortedRowIds:5,HasRow:2,Row:2,CellIds:2,HasCell:3,Cell:3,HasValue:1,Value:1,InvalidCell:3,InvalidValue:1},Ge=()=>[s,[Te(),Te()]];e.createMergeableStore=e=>{let t=1,s=Ge();const[n,a]=(e=>{let t=0,s=0;const n=(a=(e,t)=>(e<<5)+e^R(t),((e,t="",s)=>e.split(t,s))(e).reduce(a,5381)>>>0);var a;const l=e=>{const n=t,[a,l]=L(e)?[0,0]:[$e(o=e,0)*Ae+$e(o,1)*We+$e(o,2)*je+$e(o,3)*ke+$e(o,4)*De+$e(o,5)*Ne+$e(o,6),$e(o,7)*ke+$e(o,8)*De+$e(o,9)*Ne+$e(o,10),$e(o,11)*je+$e(o,12)*ke+$e(o,13)*De+$e(o,14)*Ne+$e(o,15)];var o;t=Math.max(n,a,Date.now()),s=t==n?t==a?Math.max(s,l):s:t==a?l:-1};return[()=>{return l(),a=++s,o=n,Be((e=t)/Ae)+Be(e/We)+Be(e/je)+Be(e/ke)+Be(e/De)+Be(e/Ne)+Be(e)+Be(a/ke)+Be(a/De)+Be(a/Ne)+Be(a)+Be(o/je)+Be(o/ke)+Be(o/De)+Be(o/Ne)+Be(o);var e,a,o},l]})(e),l=ze(),o=e=>{const s=t;t=0,e(),t=s},r=e=>{const t=[{},{}];return a(e[0]),ve(e,s,t,(([e,t],[s,n],[a,l])=>{ve(e,s,a,((e,t,s)=>pe(e,t,s,((e,t,s)=>pe(e,t,s,Ve))))),ve(t,n,l,Ve)})),o((()=>l.applyChanges(t))),i},i={getMergeableContent:()=>be(s,(([e,t])=>[Ce(e,(e=>Ce(e,(e=>Ce(e,Le))))),Ce(t,Le)])),setMergeableContent:e=>(o((()=>l.transaction((()=>{l.delTables().delValues(),s=Ge()})))),r(e),i),applyMergeableChanges:r,merge:e=>{const t=i.getMergeableContent(),s=e.getMergeableContent();return e.applyMergeableChanges(t),r(s)}};return l.addPostTransactionListener((()=>{if(t){const e=n(),[t,a,o,,r]=l.getTransactionLog(),[i,c]=s[1];s[0]=e,t&&(i[0]=e,G(o,((t,s)=>{const n=le(i[1],s,fe),a=n[1]??=ee();n[0]=e,G(t,((t,s)=>{const n=le(a,s,fe),l=n[1]??=ee();n[0]=e,G(t,(([,t],s)=>ae(l,s,[e,t])))}))}))),a&&(c[0]=e,G(r,(([,t],s)=>{ae(c[1],s,[e,t])})))}})),G(l,((e,t)=>i[t]=m(t,"set")||m(t,"del")||m(t,"apply")||w(t,"Transaction")||"callListener"==t?(...t)=>(e(...t),i):m(t,"add")&&w(t,"Listener")?(...s)=>{const n=qe[H(t,3,-8)]??0,a=s[n];return s[n]=(e,...t)=>a(i,...t),e(...s)}:e)),D(i)}},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TinyBaseMergeableStore={});