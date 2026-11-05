/* واجهة مشتركة: الوضع الداكن، الأصوات، التنبيهات. تعمل في كل الصفحات. */
(function(){'use strict';
const K='deutsch-ui';let S={theme:null,muted:false,vol:.6};
try{Object.assign(S,JSON.parse(localStorage.getItem(K))||{})}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const root=document.documentElement;
const sysDark=()=>!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
const eff=()=>S.theme||(sysDark()?'dark':'light');
function applyTheme(){S.theme?root.setAttribute('data-theme',S.theme):root.removeAttribute('data-theme');const m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',eff()==='dark'?'#101b1d':'#0f766e')}
let ctx;
function ac(){if(!ctx){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ctx=new A()}if(ctx.state==='suspended')ctx.resume();return ctx}
function tone(f,t0,d,type,g){const c=ac();if(!c)return;const o=c.createOscillator(),v=c.createGain(),t=c.currentTime+t0,a=Math.max(g*S.vol,.0002);o.type=type;o.frequency.value=f;v.gain.setValueAtTime(.0001,t);v.gain.exponentialRampToValueAtTime(a,t+.012);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(c.destination);o.start(t);o.stop(t+d+.03)}
const SND={click:()=>tone(900,0,.04,'sine',.07),ok:()=>{tone(523.25,0,.14,'sine',.2);tone(659.25,.1,.2,'sine',.2)},bad:()=>{tone(233,0,.16,'triangle',.22);tone(174.6,.12,.24,'triangle',.22)},win:()=>[523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,i*.1,.24,'sine',.2)),lock:()=>tone(196,0,.15,'sine',.18)};
function play(n){if(S.muted||S.vol<=0)return;try{SND[n]&&SND[n]()}catch(e){}}
let tt;function toast(msg){let el=document.getElementById('uiToast');if(!el){el=document.createElement('div');el.id='uiToast';el.className='ui-toast';el.setAttribute('role','status');document.body.appendChild(el)}el.textContent=msg;el.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('show'),3600)}
const css=document.createElement('style');
css.textContent='.ui-dock{position:fixed;bottom:14px;left:14px;z-index:60;display:flex;align-items:center;gap:6px;background:var(--card,var(--paper,#fff));border:1px solid var(--line,#dce5e2);border-radius:999px;padding:5px 8px;box-shadow:0 6px 22px rgba(0,0,0,.14)}.ui-dock button{border:0;background:transparent;font-size:1.15rem;cursor:pointer;width:36px;height:36px;border-radius:50%;color:inherit}.ui-dock button:hover{background:var(--acc2,var(--accent-soft,#e2f4ef))}.ui-dock input[type=range]{width:70px;accent-color:var(--acc,var(--accent,#0f766e))}.ui-toast{position:fixed;bottom:76px;left:50%;transform:translate(-50%,20px);max-width:min(92vw,520px);background:var(--ink,#172b2d);color:var(--bg,#fff);padding:12px 18px;border-radius:14px;font-weight:600;line-height:1.7;opacity:0;pointer-events:none;transition:.25s;z-index:70;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,.25)}.ui-toast.show{opacity:1;transform:translate(-50%,0)}body{padding-bottom:78px}@media(max-width:480px){.ui-dock input[type=range]{width:54px}}';
document.head.appendChild(css);
applyTheme();
function dock(){
 const d=document.createElement('div');d.className='ui-dock';d.setAttribute('role','group');d.setAttribute('aria-label','المظهر والصوت');
 d.innerHTML='<button id="uiTheme" type="button"></button><button id="uiMute" type="button"></button><input id="uiVol" type="range" min="0" max="100" aria-label="مستوى الصوت">';
 document.body.appendChild(d);
 const th=d.querySelector('#uiTheme'),mu=d.querySelector('#uiMute'),vo=d.querySelector('#uiVol');
 const refresh=()=>{th.textContent=eff()==='dark'?'☀️':'🌙';th.title=th.ariaLabel=eff()==='dark'?'الوضع الفاتح':'الوضع الداكن';mu.textContent=S.muted?'🔇':'🔊';mu.title=mu.ariaLabel=S.muted?'تشغيل الصوت':'كتم الصوت';vo.value=Math.round(S.vol*100);vo.disabled=S.muted};
 th.onclick=()=>{S.theme=eff()==='dark'?'light':'dark';save();applyTheme();refresh()};
 mu.onclick=()=>{S.muted=!S.muted;save();refresh();if(!S.muted)play('ok')};
 vo.oninput=()=>{S.vol=vo.value/100;save()};vo.onchange=()=>play('click');
 if(window.matchMedia)try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(!S.theme){applyTheme();refresh()}})}catch(e){}
 refresh()}
let last=0;
document.addEventListener('pointerdown',e=>{last=Date.now();if(e.target.closest&&e.target.closest('button,a,summary,[role=button]')&&!e.target.closest('#uiMute'))play('click')},true);
const GOOD='.feedback.good,.exercise-feedback.show.good',BAD='.feedback.bad,.exercise-feedback.show.bad';
function scan(n){if(n.nodeType!==1)return[0,0];const g=(n.matches(GOOD)?1:0)+n.querySelectorAll(GOOD).length,b=(n.matches(BAD)?1:0)+n.querySelectorAll(BAD).length;return[g,b]}
function watch(){new MutationObserver(ms=>{if(Date.now()-last>700)return;let g=0,b=0;ms.forEach(m=>{const ns=m.type==='childList'?m.addedNodes:[m.target];ns.forEach(n=>{const r=scan(n);g+=r[0];b+=r[1]})});if(g||b)play(b>g?'bad':'ok')}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
function init(){dock();watch()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
window.UI={play,toast};
})();
