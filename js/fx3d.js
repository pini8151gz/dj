(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var root=document.querySelector('link[href$="style.css"]').getAttribute('href').replace('css/style.css','');
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
// 1. 3D tilt on every real screenshot
function tilt(t){if(RM)return;var p=t.parentNode;p.classList.add('t3d-wrap');t.classList.add('t3d');
 var g=document.createElement('span');g.className='glare';if(getComputedStyle(t).position==='static')t.style.position='relative';t.appendChild(g);
 function mv(x,y){var r=t.getBoundingClientRect(),px=(x-r.left)/r.width,py=(y-r.top)/r.height;
  t.style.transform='rotateY('+((px-.5)*10)+'deg) rotateX('+((.5-py)*8)+'deg) scale(1.015)';t.style.setProperty('--gx',px*100+'%');t.style.setProperty('--gy',py*100+'%')}
 t.addEventListener('pointermove',function(e){mv(e.clientX,e.clientY)});
 t.addEventListener('pointerleave',function(){t.style.transform=''})}
document.querySelectorAll('img[src*="assets/real/"]').forEach(function(i){
 if(i.closest('.lab')||i.closest('.stack'))return;
 var t=i.closest('figure,.map,.shot')||i;
 if(t===i){var w=document.createElement('span');w.style.display='inline-block';w.style.maxWidth='100%';i.parentNode.insertBefore(w,i);w.appendChild(i);t=w}
 if(!t.dataset.t){t.dataset.t=1;tilt(t)}});
// 2. reveal-on-scroll
if('IntersectionObserver' in window&&!RM){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
 document.querySelectorAll('main>section,main>figure,main h2,.lab .card3').forEach(function(s){if(s.classList.contains('hero'))return;s.classList.add('rv');io.observe(s)})}
// 3. glossary flip cards
var dl=document.querySelector('body:not(.home) main dl');
if(dl){dl.classList.add('flip');dl.querySelectorAll(':scope>div').forEach(function(d){var w=document.createElement('div');w.className='in';while(d.firstChild)w.appendChild(d.firstChild);d.appendChild(w);d.tabIndex=0;
 d.addEventListener('click',function(){d.classList.toggle('f')});d.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();d.classList.toggle('f')}})});
 dl.insertAdjacentHTML('beforebegin','<p class="note">💡 לחץ (או הקש) על כרטיס כדי להפוך אותו ולראות את ההסבר.</p>')}
// 4. home 3D lab
var home=document.body.classList.contains('home');var hero=document.querySelector('.hero');
if(home&&hero){var R=root+'assets/real/';
 var lab=el('<section class="lab" id="lab3d"><h2>🧪 מעבדת תלת-ממד: התוכנה שלך מפורקת לשכבות</h2>'+
 '<div class="card3"><h3>המסך מתפרק לשכבות <span class="tag">צילום אמיתי · VirtualDJ 2026</span></h3><p>לחץ על שכבה כדי לבודד אותה. לחץ שוב כדי להחזיר את המבט התלת-ממדי.</p><div class="stack"><div class="stage">'+
 [['browser.jpg','הספרייה (Browser)',0],['deckA.jpg','דק שמאל (A)',90],['mixer.jpg','המיקסר',180],['deckB.jpg','דק ימין (B)',270],['wave.jpg','גלי הקול',360]].map(function(l,i){return '<div class="ly" data-z="'+l[2]+'" style="top:'+(60+i*55)+'px;transform:translate(-50%,0) translateZ('+l[2]+'px)'+(l[0]==='mixer.jpg'?';width:min(300px,45%)':'')+'"><b>'+l[1]+'</b><img src="'+R+l[0]+'" alt="'+l[1]+'" loading="lazy"></div>'}).join('')+'</div></div></div>'+
 '<div class="lab-grid">'+
 '<div class="card3"><h3>הג׳וג של דק A מסתובב</h3><div class="vinyl"><div class="disc" role="img" aria-label="גלגל הג׳וג מהצילום"></div></div><p class="center"><button class="ghost" id="vp">▶ הפעל / עצור</button></p><p class="note">התמונה היא הג׳וג האמיתי מהמסך שלך. בתוכנה הוא מסתובב כשהשיר מתנגן.</p></div>'+
 '<div class="card3"><h3>SYNC פועם בקצב <span class="tag">65.93 BPM</span></h3><div class="syncbox"><img src="'+R+'deckA.jpg" alt="דק A עם כפתור SYNC" loading="lazy"><span class="fxring"></span></div><p class="note">הטבעת פועמת בקצב של השיר בדק A. SYNC מתאים את הקצב של הדק השני לקצב הזה.</p></div>'+
 '<div class="card3"><h3>הקרוספיידר: משמאל לימין</h3><div class="xfbar"><span id="xa">דק A</span><span id="xb">דק B</span></div><div class="xf" id="xf"><i></i></div><input type="range" id="xr" min="0" max="100" value="50" aria-label="קרוספיידר" style="width:100%"><p class="note">גרור את המחוון או צפה בהדגמה האוטומטית. השם החזק יותר הוא הדק שהקהל שומע. הידית והמסילה נחתכו מהצילום שלך.</p></div>'+
 '<div class="card3"><h3>כפתור מסתובב (GAIN / FX)</h3><div class="knobrow"><div class="knob" id="kn"></div><b id="kv">50%</b></div><input type="range" id="kr" min="0" max="100" value="50" aria-label="עוצמת הכפתור" style="width:100%"><p class="note">הכפתור לקוח מהמיקסר שלך. בתוכנה גוררים אותו עם העכבר למעלה או למטה.</p></div>'+
 '<div class="card3"><h3>לופ של 4 ביטים <span class="tag">המונה: שרטוט הסבר</span></h3><img src="'+R+'loopA.jpg" alt="אזור הלופ האמיתי" style="max-width:180px;display:block;margin:auto;border-radius:8px" loading="lazy"><div class="beats" id="bt"><i></i><i></i><i></i><i></i></div><p class="note">הקוביות לא חלק מהתוכנה. הן ממחישות איך 4 הביטים חוזרים שוב ושוב כשמפעילים לופ.</p></div>'+
 '</div><div class="card3"><h3>גל הקול זז, הקו הלבן הוא "עכשיו"</h3><div class="wavebox" aria-hidden="true"></div><p class="note">הגל נחתך מהצילום שלך ומוזז כדי להמחיש ניגון.</p></div></section>');
 var an=document.querySelector('.stats')||hero;an.insertAdjacentElement('afterend',lab);
 var st=lab.querySelector('.stack');st.querySelectorAll('.ly').forEach(function(l){l.addEventListener('click',function(){var on=l.classList.contains('on');st.querySelectorAll('.ly').forEach(function(x){x.classList.remove('on')});if(!on){l.classList.add('on');st.classList.add('flat')}else st.classList.remove('flat')})});
 if(!RM){var stg=st.querySelector('.stage');st.addEventListener('pointermove',function(e){if(st.classList.contains('flat'))return;var r=st.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5;stg.style.transform='rotateX(50deg) rotateZ('+(-6+px*14)+'deg) translateY(40px) scale(.85)'})}
 var v=lab.querySelector('.vinyl');if(!RM)v.classList.add('play');lab.querySelector('#vp').onclick=function(){v.classList.toggle('play')};
 var xf=lab.querySelector('#xf'),xr=lab.querySelector('#xr'),xa=lab.querySelector('#xa'),xb=lab.querySelector('#xb'),auto=!RM,t0=performance.now();
 function setX(p){xf.style.setProperty('--x',p);xa.style.opacity=Math.min(1,(1-p)*2)*.8+.2;xb.style.opacity=Math.min(1,p*2)*.8+.2;xr.value=p*100}
 xr.oninput=function(){auto=false;setX(xr.value/100)};setX(.5);
 var kn=lab.querySelector('#kn'),kr=lab.querySelector('#kr'),kv=lab.querySelector('#kv');kr.oninput=function(){var p=kr.value/100;kn.style.setProperty('--r',(p-.5)*270+'deg');kn.style.setProperty('--g',p);kv.textContent=kr.value+'%'};kr.oninput();
 var bt=lab.querySelectorAll('#bt i'),b=0;
 if(!RM){setInterval(function(){bt.forEach(function(x,i){x.classList.toggle('on',i===b)});b=(b+1)%4},910);
  (function loop(t){if(auto)setX(.5+.5*Math.sin((t-t0)/1400));requestAnimationFrame(loop)})(t0)}
}
})();
