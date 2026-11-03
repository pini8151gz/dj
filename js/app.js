const N=28;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const K='vdj-done';let D=[];try{D=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){}
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function save(){try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}upd()}
function upd(){$$('[data-l]').forEach(e=>e.classList.toggle('isdone',D.includes(+e.dataset.l)));
const p=Math.round(D.length/N*100);$('#pt').textContent=D.length+'/'+N;$('#pb').style.width=p+'%';const pc=$('#pct');if(pc)pc.textContent=p+'%';
$$('.ring').forEach(r=>{const ids=r.dataset.ch.split(',').map(Number),d=ids.filter(x=>D.includes(x)).length,f=d/ids.length,C=2*Math.PI*18;const c=$('.rf',r);c.style.strokeDasharray=C;c.style.strokeDashoffset=C*(1-f);$('.rt',r).textContent=Math.round(f*100)+'%'});
const b=$('#done');if(b){const d=D.includes(+b.dataset.l);b.textContent=d?'הושלם ✓ (לחץ לביטול)':'סמן שיעור כהושלם ✓';b.classList.toggle('isdone',d)}
const c=$('#cont');if(c){for(let i=1;i<=N;i++)if(!D.includes(i)){c.href='lesson-'+String(i).padStart(2,'0')+'.html';if(D.length)c.textContent='המשך משיעור '+i+' ←';break}}}
const db=$('#done');if(db)db.onclick=()=>{const n=+db.dataset.l;D=D.includes(n)?D.filter(x=>x!=n):[...D,n];save()};
const r=$('#reset');if(r)r.onclick=()=>{if(confirm('לאפס?')){D=[];save()}};
$('#menu').onclick=()=>{const o=document.body.classList.toggle('nav');$('#menu').setAttribute('aria-expanded',o)};
function reveal(q,i){const c=+q.dataset.c;$$('.opt',q).forEach(o=>{o.disabled=true;const k=+o.dataset.i;if(k==c)o.classList.add('ok');else if(k==i)o.classList.add('bad')});const f=$('.fb',q);f.textContent=(i==null?'':(i==c?'✔ נכון! ':'✘ לא בדיוק. '))+(f.dataset.ex||'')}
$$('.q').forEach(q=>$$('.opt',q).forEach(o=>o.onclick=()=>reveal(q,+o.dataset.i)));
const sa=$('#showall');if(sa)sa.onclick=()=>$$('.q').forEach(q=>reveal(q,null));
const gs=$('#gs');if(gs)gs.oninput=()=>{let n=0;$$('.gl>div').forEach(d=>{const m=d.textContent.toLowerCase().includes(gs.value.toLowerCase());d.style.display=m?'':'none';n+=m});$('#gcount').textContent=n?n+' מונחים':'לא נמצאו מונחים'};
// visibility-aware animation loop
function loop(el,fn){let on=true,vis=false,t0=null,acc=0,last=null;const io=new IntersectionObserver(e=>{vis=e[0].isIntersecting});io.observe(el);
function f(t){if(last==null)last=t;const dt=(t-last)/1000;last=t;if(on&&vis)acc+=dt;fn(acc,dt,on&&vis);requestAnimationFrame(f)}requestAnimationFrame(f);
return{get on(){return on},set on(v){on=v},reset(){acc=0}}}
function toggleBtn(b,L,lbl){b.onclick=()=>{L.on=!L.on;b.setAttribute('aria-pressed',L.on);b.textContent=L.on?'⏸ עצור':'▶ הפעל'}; if(RM){L.on=false;b.setAttribute('aria-pressed',false);b.textContent='▶ הפעל'}}
const NS='http://www.w3.org/2000/svg';
// BPM
$$('[data-demo=bpm]').forEach(d=>{const svg=$('.bpm-svg',d),g=$('.bpm-lines',svg),hd=$('.bpm-head',svg),R=$('.bpm-r',d),V=$('.bpm-v',d),M=$('.bpm-ms',d),dots=$$('.beatdots i',d);
for(let i=0;i<16;i++){const l=document.createElementNS(NS,'rect');const x=20+i*37.5;l.setAttribute('x',x);l.setAttribute('y',i%4?45:30);l.setAttribute('width',i%4?2:4);l.setAttribute('height',i%4?60:90);l.setAttribute('fill',i%4?'#5a648c':'#ff4fa0');g.appendChild(l)}
let bpm=124;const set=v=>{bpm=+v;R.value=bpm;V.textContent=bpm;M.textContent='ביט כל '+Math.round(60000/bpm)+' מילישניות · תיבה של 4 ביטים = '+(240/bpm).toFixed(2)+' שניות';$$('.genre',d.parentNode).forEach(x=>x.classList.toggle('on',+x.dataset.bpm==bpm))};set(124);R.oninput=()=>set(R.value);
$$('.genre',d.parentNode).forEach(b=>b.onclick=()=>set(b.dataset.bpm));
let beats=0;const L=loop(d,(t,dt,run)=>{if(run)beats+=dt*bpm/60;const p=beats%16;hd.setAttribute('x',20+p*37.5);const bi=Math.floor(beats)%4,fr=beats%1;dots.forEach((x,i)=>{x.classList.toggle('on',i==bi&&fr<.35);x.classList.toggle('one',i==0)})});toggleBtn($('.bpm-play',d),L)});
// EQ
$$('[data-demo=eq]').forEach(d=>{const v=$('.eq-viz',d),B=32,bars=[];for(let i=0;i<B;i++){const b=document.createElement('i');b.style.background=i<11?'#36d6ff':i<22?'#ffd166':'#ff4fa0';v.appendChild(b);bars.push(b)}
const S=$$('input',d);const base=bars.map((_,i)=>.55+.35*Math.sin(i*.7)*Math.cos(i*.23));
let t=0;function draw(){const g=S.map(s=>+s.value/50);bars.forEach((b,i)=>{const band=i<11?0:i<22?1:2;const w=RM?0:.18*Math.sin(t*6+i*1.3);b.style.height=Math.max(3,Math.min(100,(base[i]+w)*55*g[band]))+'%'})}
S.forEach(s=>s.oninput=draw);$('.eq-kill',d).onclick=()=>{S[0].value=0;S[1].value=50;S[2].value=50;draw()};
if(RM)draw();else loop(d,(tt,dt,run)=>{if(run){t+=dt;draw()}});draw()});
// Crossfader
$$('[data-demo=xf]').forEach(d=>{const R=$('.xf-r',d),A=$('.ma i',d),Bm=$('.mb i',d),As=$('.ma span',d),Bs=$('.mb span',d);let anim=null;
const set=()=>{const x=+R.value;const a=Math.min(100,(100-x)*2),b=Math.min(100,x*2);A.style.height=a+'%';Bm.style.height=b+'%';As.textContent=Math.round(a)+'%';Bs.textContent=Math.round(b)+'%'};R.oninput=()=>{anim=null;set()};set();
$('.xf-auto',d).onclick=()=>{const to=+R.value<50?100:0,from=+R.value,T=RM?0:8000,s=performance.now();anim=s;(function f(n){if(anim!==s)return;const p=T?Math.min(1,(n-s)/T):1;R.value=from+(to-from)*p;set();if(p<1)requestAnimationFrame(f)})(s)}});
// Phrasing
$$('[data-demo=phr]').forEach(d=>{const P=$('.phr',d),O=$('.phr-o',d),cells=[];for(let bar=0;bar<8;bar++){const b=document.createElement('div');b.className='pbar'+((bar+1)%2==0?' m8':'')+((bar+1)%4==0?' m16':'')+(bar==7?' m32':'');b.innerHTML='<span class="pl">'+(bar+1)+'</span>';for(let k=0;k<4;k++){const c=document.createElement('i');b.appendChild(c);cells.push(c)}P.appendChild(b)}
const bars=$$('.pbar',P);let beats=0;const show=()=>{const bt=Math.floor(beats)%32;cells.forEach((c,i)=>{c.classList.toggle('on',i==bt);c.classList.toggle('past',i<bt)});bars.forEach((b,i)=>b.classList.toggle('cur',i==Math.floor(bt/4)));
O.textContent='ביט '+(bt+1)+' מתוך 32 · תיבה '+(Math.floor(bt/4)+1)+' · '+(bt<8?'8 הביטים הראשונים':bt<16?'סוף ה-16 הראשונים מתקרב':bt<24?'החצי השני של הפרייז':'סוף הפרייז, רגע טוב למעבר!')};
const L=loop(d,(t,dt,run)=>{if(run)beats+=dt*124/60;show()});toggleBtn($('.phr-play',d),L);show()});
// Camelot
const CAMN={};$$('[data-demo=cam] .ck').forEach(g=>CAMN[g.dataset.k]=g.dataset.n);
$$('[data-demo=cam]').forEach(d=>{const ks=$$('.ck',d),O=$('.cam-o',d);function pick(k){const n=parseInt(k),l=k.slice(-1),o=l=='A'?'B':'A',m=x=>((x-1+12)%12)+1;const ok=[m(n-1)+l,m(n+1)+l,n+o];
ks.forEach(g=>{g.classList.toggle('sel',g.dataset.k==k);g.classList.toggle('ok',ok.includes(g.dataset.k));g.classList.toggle('dim',g.dataset.k!=k&&!ok.includes(g.dataset.k))});
const f=x=>'<bdi><b>'+x+'</b> ('+CAMN[x]+')</bdi>';O.innerHTML=f(k)+' תואם ל: '+ok.map(f).join(' · ')}
ks.forEach(g=>{g.onclick=()=>pick(g.dataset.k);g.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();pick(g.dataset.k)}}});pick('8A')});
// Waveform + cue
$$('[data-demo=wave]').forEach(d=>{const svg=$('.wv',d),g=$('.wv-bars',svg),hd=$('.wv-head',svg),cu=$('.wv-cue',svg),cl=$('.wv-cl',svg),O=$('.wv-o',d),PB=$('.wv-play',d),CB=$('.wv-cuebtn',d);
const W=640,nb=160,DUR=32;for(let i=0;i<nb;i++){const sec=i/nb*DUR,beat=(i%5==0)?1:0,intro=sec<6?.45:1,br=(sec>18&&sec<22)?.35:1;const h=Math.max(6,(18+30*Math.abs(Math.sin(i*1.7))+beat*30)*intro*br);const r=document.createElementNS(NS,'rect');r.setAttribute('x',i*4);r.setAttribute('width',3);r.setAttribute('y',60-h/2);r.setAttribute('height',h);r.setAttribute('fill',beat?'#ff4fa0':'#36d6ff');g.appendChild(r)}
let pos=0,cue=0,play=false,hold=false;const fmt=s=>s.toFixed(1)+' שנ\'';
function ui(){hd.setAttribute('x',pos/DUR*W);cu.setAttribute('x',cue/DUR*W);cl.setAttribute('x',Math.min(cue/DUR*W+6,600));PB.textContent=play?'⏸ Pause':'▶ Play';O.textContent='מיקום: '+fmt(pos)+' · Cue ב-'+fmt(cue)+(hold?' · מנגן כל עוד מחזיקים':'')}
PB.onclick=()=>{play=!play;ui()};
let downAt=0,tm=null;CB.onpointerdown=e=>{e.preventDefault();downAt=performance.now();if(play){play=false;pos=cue}else if(Math.abs(pos-cue)<.05){tm=setTimeout(()=>{hold=true;ui()},250)}else{cue=pos}ui()};
const up=()=>{clearTimeout(tm);if(hold){hold=false;pos=cue}ui()};CB.onpointerup=up;CB.onpointerleave=up;CB.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();if(play){play=false;pos=cue}else cue=pos;ui()}};
svg.onclick=e=>{const b=svg.getBoundingClientRect();pos=Math.max(0,Math.min(DUR,(e.clientX-b.left)/b.width*DUR));ui()};
loop(d,(t,dt,run)=>{if((play||hold)&&run){pos+=dt;if(pos>=DUR){pos=DUR;play=false}ui()}});ui()});
// Hero video
const hv=$('.hero-v');if(hv){const srcs=hv.dataset.srcs.split(','),tg=$('.vtog');let k=0,user=!RM;
const setT=()=>{const p=!hv.paused;tg.textContent=p?'❚❚':'▶\uFE0E';tg.setAttribute('aria-label',p?'עצור את סרטון הרקע':'הפעל את סרטון הרקע');tg.setAttribute('aria-pressed',!p)};
hv.addEventListener('ended',()=>{k=(k+1)%srcs.length;hv.src=srcs[k];hv.poster=srcs[k].replace('.mp4','.jpg');if(user)hv.play().catch(()=>{})});
hv.addEventListener('play',setT);hv.addEventListener('pause',setT);hv.muted=true;
if(user)hv.play().catch(()=>setT());setT();tg.onclick=()=>{if(hv.paused){user=true;hv.play().catch(()=>{})}else{user=false;hv.pause()}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)hv.pause();else if(user)hv.play().catch(()=>{})})}
upd();
