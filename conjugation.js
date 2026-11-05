/* German verb practice: uses the existing 1,350-verb curriculum. */
(()=>{'use strict';
const M=window.DATA.months,PER=15,KEY='deutsch-conjugation-v1',PROGRESS='deutsch-progress-v1';
const pron=['ich','du','er/sie/es','wir','ihr','sie/Sie'];
const irregular={
sein:['bin','bist','ist','sind','seid','sind'],haben:['habe','hast','hat','haben','habt','haben'],werden:['werde','wirst','wird','werden','werdet','werden'],wissen:['weiß','weißt','weiß','wissen','wisst','wissen'],
können:['kann','kannst','kann','können','könnt','können'],müssen:['muss','musst','muss','müssen','müsst','müssen'],wollen:['will','willst','will','wollen','wollt','wollen'],dürfen:['darf','darfst','darf','dürfen','dürft','dürfen'],sollen:['soll','sollst','soll','sollen','sollt','sollen'],mögen:['mag','magst','mag','mögen','mögt','mögen'],
gehen:['gehe','gehst','geht','gehen','geht','gehen'],stehen:['stehe','stehst','steht','stehen','steht','stehen'],rufen:['rufe','rufst','ruft','rufen','ruft','rufen'],kommen:['komme','kommst','kommt','kommen','kommt','kommen'],sehen:['sehe','siehst','sieht','sehen','seht','sehen'],lesen:['lese','liest','liest','lesen','lest','lesen'],sprechen:['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],essen:['esse','isst','isst','essen','esst','essen'],nehmen:['nehme','nimmst','nimmt','nehmen','nehmt','nehmen'],geben:['gebe','gibst','gibt','geben','gebt','geben'],fahren:['fahre','fährst','fährt','fahren','fahrt','fahren'],schlafen:['schlafe','schläfst','schläft','schlafen','schlaft','schlafen'],laufen:['laufe','läufst','läuft','laufen','lauft','laufen'],halten:['halte','hältst','hält','halten','haltet','halten'],tragen:['trage','trägst','trägt','tragen','tragt','tragen'],fallen:['falle','fällst','fällt','fallen','fallt','fallen'],waschen:['wasche','wäschst','wäscht','waschen','wascht','waschen'],treffen:['treffe','triffst','trifft','treffen','trefft','treffen'],helfen:['helfe','hilfst','hilft','helfen','helft','helfen'],vergessen:['vergesse','vergisst','vergisst','vergessen','vergesst','vergessen'],brechen:['breche','brichst','bricht','brechen','brecht','brechen'],werfen:['werfe','wirfst','wirft','werfen','werft','werfen'],sterben:['sterbe','stirbst','stirbt','sterben','sterbt','sterben'],empfehlen:['empfehle','empfiehlst','empfiehlt','empfehlen','empfehlt','empfehlen'],stehlen:['stehle','stiehlst','stiehlt','stehlen','stehlt','stehlen'],lassen:['lasse','lässt','lässt','lassen','lasst','lassen'],heißen:['heiße','heißt','heißt','heißen','heißt','heißen'],tun:['tue','tust','tut','tun','tut','tun'],bringen:['bringe','bringst','bringt','bringen','bringt','bringen'],denken:['denke','denkst','denkt','denken','denkt','denken'],kennen:['kenne','kennst','kennt','kennen','kennt','kennen'],nennen:['nenne','nennst','nennt','nennen','nennt','nennen'],rennen:['renne','rennst','rennt','rennen','rennt','rennen'],brennen:['brenne','brennst','brennt','brennen','brennt','brennen'],
};
// Verified high-frequency stem-changing and separable verbs (six-person Präsens).
const verifiedPresent={
'anfangen':['fange an','fängst an','fängt an','fangen an','fangt an','fangen an'],
'einladen':['lade ein','lädst ein','lädt ein','laden ein','ladet ein','laden ein'],
'mitnehmen':['nehme mit','nimmst mit','nimmt mit','nehmen mit','nehmt mit','nehmen mit'],
'aussehen':['sehe aus','siehst aus','sieht aus','sehen aus','seht aus','sehen aus'],
'aufwachen':['wache auf','wachst auf','wacht auf','wachen auf','wacht auf','wachen auf'],
'mitbringen':['bringe mit','bringst mit','bringt mit','bringen mit','bringt mit','bringen mit'],
'ankommen':['komme an','kommst an','kommt an','kommen an','kommt an','kommen an'],
'ausgehen':['gehe aus','gehst aus','geht aus','gehen aus','geht aus','gehen aus'],
'zurückkommen':['komme zurück','kommst zurück','kommt zurück','kommen zurück','kommt zurück','kommen zurück'],
'antworten':['antworte','antwortest','antwortet','antworten','antwortet','antworten'],
'bezahlen':['bezahle','bezahlst','bezahlt','bezahlen','bezahlt','bezahlen'],
'erzählen':['erzähle','erzählst','erzählt','erzählen','erzählt','erzählen'],
'besuchen':['besuche','besuchst','besucht','besuchen','besucht','besuchen'],
'verstehen':['verstehe','verstehst','versteht','verstehen','versteht','verstehen'],
'verkaufen':['verkaufe','verkaufst','verkauft','verkaufen','verkauft','verkaufen'],
'einkaufen':['kaufe ein','kaufst ein','kauft ein','kaufen ein','kauft ein','kaufen ein'],
'aufräumen':['räume auf','räumst auf','räumt auf','räumen auf','räumt auf','räumen auf'],
'zumachen':['mache zu','machst zu','macht zu','machen zu','macht zu','machen zu'],
'abholen':['hole ab','holst ab','holt ab','holen ab','holt ab','holen ab'],
'aufmachen':['mache auf','machst auf','macht auf','machen auf','macht auf','machen auf'],
'vorbereiten':['bereite vor','bereitest vor','bereitet vor','bereiten vor','bereitet vor','bereiten vor'],
'vorstellen':['stelle vor','stellst vor','stellt vor','stellen vor','stellt vor','stellen vor'],
'aufstehen':['stehe auf','stehst auf','steht auf','stehen auf','steht auf','stehen auf'],
'anrufen':['rufe an','rufst an','ruft an','rufen an','ruft an','rufen an'],
'beginnen':['beginne','beginnst','beginnt','beginnen','beginnt','beginnen'],
'finden':['finde','findest','findet','finden','findet','finden'],
'trinken':['trinke','trinkst','trinkt','trinken','trinkt','trinken'],
'schreiben':['schreibe','schreibst','schreibt','schreiben','schreibt','schreiben'],
'bleiben':['bleibe','bleibst','bleibt','bleiben','bleibt','bleiben'],
'schwimmen':['schwimme','schwimmst','schwimmt','schwimmen','schwimmt','schwimmen'],
'singen':['singe','singst','singt','singen','singt','singen'],
'springen':['springe','springst','springt','springen','springt','springen'],
'fliegen':['fliege','fliegst','fliegt','fliegen','fliegt','fliegen'],
'ziehen':['ziehe','ziehst','zieht','ziehen','zieht','ziehen'],
'gewinnen':['gewinne','gewinnst','gewinnt','gewinnen','gewinnt','gewinnen'],
'verlieren':['verliere','verlierst','verliert','verlieren','verliert','verlieren'],
'schließen':['schließe','schließt','schließt','schließen','schließt','schließen'],
'bitten':['bitte','bittest','bittet','bitten','bittet','bitten'],
'bieten':['biete','bietest','bietet','bieten','bietet','bieten'],
'sitzen':['sitze','sitzt','sitzt','sitzen','sitzt','sitzen'],
'liegen':['liege','liegst','liegt','liegen','liegt','liegen']
};
const past={sein:['war','gewesen','sein'],haben:['hatte','gehabt','haben'],werden:['wurde','geworden','sein'],gehen:['ging','gegangen','sein'],kommen:['kam','gekommen','sein'],sehen:['sah','gesehen','haben'],lesen:['las','gelesen','haben'],sprechen:['sprach','gesprochen','haben'],essen:['aß','gegessen','haben'],nehmen:['nahm','genommen','haben'],geben:['gab','gegeben','haben'],fahren:['fuhr','gefahren','sein'],schlafen:['schlief','geschlafen','haben'],laufen:['lief','gelaufen','sein'],wissen:['wusste','gewusst','haben'],können:['konnte','gekonnt','haben'],müssen:['musste','gemusst','haben'],wollen:['wollte','gewollt','haben'],dürfen:['durfte','gedurft','haben'],sollen:['sollte','gesollt','haben'],mögen:['mochte','gemocht','haben'],machen:['machte','gemacht','haben'],lernen:['lernte','gelernt','haben'],arbeiten:['arbeitete','gearbeitet','haben'],spielen:['spielte','gespielt','haben'],kaufen:['kaufte','gekauft','haben'],trinken:['trank','getrunken','haben'],schreiben:['schrieb','geschrieben','haben'],finden:['fand','gefunden','haben'],bleiben:['blieb','geblieben','sein'],denken:['dachte','gedacht','haben'],bringen:['brachte','gebracht','haben'],kennen:['kannte','gekannt','haben'],nennen:['nannte','genannt','haben'],stehen:['stand','gestanden','haben'],sitzen:['saß','gesessen','haben'],liegen:['lag','gelegen','haben'],helfen:['half','geholfen','haben'],treffen:['traf','getroffen','haben'],vergessen:['vergaß','vergessen','haben'],halten:['hielt','gehalten','haben'],tragen:['trug','getragen','haben'],lassen:['ließ','gelassen','haben'],beginnen:['begann','begonnen','haben'],gewinnen:['gewann','gewonnen','haben'],verlieren:['verlor','verloren','haben'],entscheiden:['entschied','entschieden','haben'],verstehen:['verstand','verstanden','haben'],bekommen:['bekam','bekommen','haben'],anrufen:['rief an','angerufen','haben'],aufstehen:['stand auf','aufgestanden','sein'],einkaufen:['kaufte ein','eingekauft','haben'],anfangen:['fing an','angefangen','haben'],einladen:['lud ein','eingeladen','haben'],mitnehmen:['nahm mit','mitgenommen','haben'],aussehen:['sah aus','ausgesehen','haben'],aufwachen:['wachte auf','aufgewacht','sein'],mitbringen:['brachte mit','mitgebracht','haben'],ankommen:['kam an','angekommen','sein'],ausgehen:['ging aus','ausgegangen','sein'],zurückkommen:['kam zurück','zurückgekommen','sein']};
let state={done:{},errors:{},scores:{}};try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==='object')state={...state,...s,done:s.done&&typeof s.done==='object'&&!Array.isArray(s.done)?s.done:{},errors:s.errors&&typeof s.errors==='object'&&!Array.isArray(s.errors)?s.errors:{},scores:s.scores&&typeof s.scores==='object'&&!Array.isArray(s.scores)?s.scores:{}}}catch(e){}
let vocab={};try{vocab=JSON.parse(localStorage.getItem(PROGRESS))||{}}catch(e){}
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
const levelDone=m=>Array.from({length:30},(_,i)=>i+1).every(d=>state.done[`${m}-${d}`]===true);
const levelOpen=m=>m===0||levelDone(m-1);
const dayOpen=(m,d)=>levelOpen(m)&&(d===1||state.done[`${m}-${d-1}`]===true);
let m=0,d=1,selected=0,quiz=null;
function speak(t){if(!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=.84;speechSynthesis.cancel();speechSynthesis.speak(u)}
function baseWord(w){return w.replace(/^sich\s+/,'').trim()}
const reflexiveForm=(form,i)=>{const parts=form.split(' '),pronoun=['mich','dich','sich','uns','euch','sich'][i];parts.splice(1,0,pronoun);return parts.join(' ')};
function simpleForm(w){if(irregular[w])return irregular[w];if(/\s/.test(w))return null;let root=w.endsWith('en')?w.slice(0,-2):w.endsWith('n')?w.slice(0,-1):null;if(!root)return null;
// Restrict generated tables to regular patterns; stem-vowel and prefix irregularities are explicitly marked for review.
const changed=/^(be|ge|er|ver|zer|ent|emp|miss)/.test(w);const suspect=/(?:fahren|tragen|schlafen|laufen|fallen|halten|waschen|fangen|lassen|raten|laden|graben|stoßen|treten|essen|lesen|sehen|sprechen|nehmen|geben|helfen|treffen|werfen|brechen|sterben|stehlen|empfehlen|vergessen|messen|treffen|gelten|werden|wissen|tun|ziehen|fliegen|schließen|schießen|gießen|genießen|verlieren|frieren|biegen|bieten|bitten|bleiben|schreiben|steigen|schweigen|singen|springen|trinken|schwimmen|finden|binden|gewinnen|beginnen|denken|bringen|kennen|nennen|rennen|brennen|senden|wenden|stehen|sitzen|liegen)/.test(w);
if(suspect||changed&&/(?:nehmen|geben|sehen|stehen|kommen|fahren|finden|halten|lassen|ziehen|treten|fallen|laufen|brechen|sprechen|schreiben|bringen|denken)/.test(w))return null;
let e=/(?:[td]|chn|ffn|gn|tm|dm)$/.test(root)?'e':'';let du=/[sxzß]$/.test(root)?'t':'st';if(w.endsWith('eln')){const stem=w.slice(0,-1);return [w.slice(0,-3)+'le',stem+'st',stem+'t',w,stem+'t',w]};if(w.endsWith('ern'))return [root+'e',root+'st',root+'t',w,root+'t',w];return [root+'e',root+e+du,root+e+'t',w,root+e+'t',w]}
function present(w){const reflex=/^sich\s+/.test(w),v=baseWord(w);if(verifiedPresent[v]){const f=verifiedPresent[v];return reflex?f.map(reflexiveForm):f;}const prefix=v.match(/^(zurück|zusammen|weiter|fest|fort|her|hin|los|mit|nach|vor|weg|bei|ein|auf|aus|ab|an|zu)(.+)$/);let f=prefix?null:simpleForm(v);if(prefix){const stem=prefix[2];
// A prefix-like spelling alone does not prove separability (e.g. antworten, besuchen).
// Generate only when the base verb is independently attested in our irregular list.
const core=irregular[stem]||null;
if(core)f=core.map(x=>x+' '+prefix[1]);}if(!f)return null;return reflex?f.map(reflexiveForm):f}
function pastInfo(w){return past[baseWord(w)]||null}
function info(m,d){return M[m].verbs.slice((d-1)*PER,d*PER)}
function title(){return `<div class="hero-card"><span class="eyebrow">VERBKONJUGATION · A1—B1</span><h1>الصرف والتحويل</h1><p>15 فعلاً يومياً · 30 يوماً لكل مستوى · تعلّم، استمع، اختبر نفسك، وافتح اليوم التالي.</p><div class="mini-stats"><span>📚 1350 مدخلاً للتعلّم</span><span>📆 90 يوماً</span><span>✓ ${Object.keys(state.done).filter(k=>/^[012]-(?:[1-9]|[12]\d|30)$/.test(k)&&state.done[k]===true).length} يوماً مكتملة</span></div></div>`}
function levels(){return `<div class="levels">${M.map((x,i)=>`<button data-level="${i}" class="level-card ${m===i?'active':''} ${levelOpen(i)?'':'locked'}"><strong>${x.level}</strong><span>450 مدخلاً · 30 يوماً</span><small>${levelOpen(i)?levelDone(i)?'✓ مكتمل':'متاح':'🔒 أكمل المستوى السابق'}</small></button>`).join('')}</div>`}
function days(){return `<h2>أيام مستوى ${M[m].level}</h2><div class="days">${Array.from({length:30},(_,i)=>{const n=i+1,open=dayOpen(m,n),done=state.done[`${m}-${n}`]===true;return `<button data-day="${n}" class="day ${d===n?'active':''} ${done?'completed':''} ${open?'':'locked'}" aria-label="اليوم ${n}${open?'':' مغلق'}">${open?(done?'✓ ':''):'🔒 '}${n}</button>`}).join('')}</div>`}
function verbCard(w,i){return `<button data-verb="${i}" class="verb-item ${i===selected?'selected':''}"><span class="verb-number">${i+1}</span><span><strong dir="ltr">${esc(w[0])}</strong><small>${esc(w[1])}</small></span><span>›</span></button>`}
function table(heading,rows){return `<section class="tense"><h3>${heading}</h3><div class="table-scroll"><table><thead><tr><th>الضمير</th><th>التصريف</th><th>استمع</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td dir="ltr">${pron[i]}</td><td dir="ltr"><b>${esc(r)}</b></td><td><button data-speak="${esc(pron[i].split('/')[0]+' '+r)}" aria-label="استمع">🔊</button></td></tr>`).join('')}</tbody></table></div></section>`}
function detail(w){const verb=w[0],f=present(verb),p=pastInfo(verb),level=M[m].level;let h=`<div class="detail-head"><div><span class="eyebrow">${level} · فعل ${selected+1} من 15</span><h2 dir="ltr">${esc(verb)}</h2><p>${esc(w[1])}</p></div><button data-speak="${esc(verb)}" class="speak">🔊 استمع</button></div>`;
if(f){h+=table('Präsens — المضارع',f);if(!verifiedPresent[baseWord(verb)]&&!irregular[baseWord(verb)])h+='<p class="hint">هذه الصيغ مولّدة وفق قواعد الأفعال المنتظمة؛ يُنصح بالتحقق من الأفعال الأقل شيوعاً عبر القاموس أدناه.</p>'}else h+=`<div class="notice"><strong>تصريف يحتاج إلى مراجعة خاصة</strong><p>هذا الفعل قد يكون شاذاً أو منفصلاً أو انعكاسياً. لا نعرض تصريفاً آلياً غير مؤكّد. استمع إلى المصدر وراجعه في قاموس تصريف موثوق.</p><a href="https://www.verbformen.com/conjugation/?w=${encodeURIComponent(baseWord(verb))}" target="_blank" rel="noopener noreferrer">فتح جدول التصريف في Verbformen ↗</a></div>`;
if(level!=='A1'){if(p){h+=`<section class="tense"><h3>Perfekt — الماضي المركب</h3><p dir="ltr"><strong>ich ${p[2]==='sein'?'bin':'habe'} ${/^sich\s+/.test(verb)?'mich ':''}${esc(p[1])}</strong></p><p>الفعل المساعد: ${p[2]==='sein'?'sein':'haben'} · Partizip II: <b dir="ltr">${esc(p[1])}</b></p></section>`}else h+=`<p class="hint">للحصول على Perfekt الصحيح لهذا الفعل، افتح القاموس المرتبط أعلاه أو رابط التحقق أدناه.</p>`}
if(level==='B1'&&p){h+=`<section class="tense"><h3>Präteritum — الماضي البسيط</h3><p dir="ltr"><strong>ich ${/^sich\s+/.test(verb)?'mich ':''}${esc(p[0])}</strong></p><p>هذه صيغة المتكلم، وليست جدولاً كاملاً لجميع الضمائر.</p></section>`}
h+=`<div class="detail-footer"><a href="https://www.verbformen.com/conjugation/?w=${encodeURIComponent(baseWord(verb))}" target="_blank" rel="noopener noreferrer">📖 جميع الصيغ الموثقة</a><button data-speak="${esc(verb)}">🔊 النطق</button></div>`;return h}
function dayView(){const arr=info(m,d);return `<div class="day-heading"><div><h2>اليوم ${d} · ${M[m].level}</h2><p>اختر فعلاً لتظهر تفاصيله وتصريفاته المناسبة لمستواك.</p></div><span>${arr.length}/15 فعلاً</span></div><div class="learning-layout"><div class="verb-list">${arr.map(verbCard).join('')}</div><article class="verb-detail">${detail(arr[selected])}</article></div><div class="day-actions"><button class="primary" id="beginQuiz">🧠 اختبار أفعال اليوم</button><span>الاختبار يجمع بين معاني الأفعال والتصريفات المتاحة بعد التحقق؛ النجاح 12 من 15 لفتح اليوم التالي.</span></div>`}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function makeQuestion(w,i){
 const forms=present(w[0]);
 // Only ask conjugation when the present-tense table is explicitly supported.
 // Distinct wrong forms are taken from the same verified table; never invent forms.
 if(forms){
  const indices=shuffle([0,1,2,3,4,5]);
  for(const person of indices){
   const correct=forms[person];
   const distractors=[...new Set(forms.filter(x=>x!==correct))];
   if(distractors.length>=2){
    const options=shuffle([correct,...shuffle(distractors).slice(0,3)]);
    return {w,i,kind:'form',person,correct,options};
   }
  }
 }
 const alternatives=[...new Set(M[m].verbs.filter(x=>x[0]!==w[0]&&x[1]!==w[1]).map(x=>x[1]))];
 return {w,i,kind:'meaning',correct:w[1],options:shuffle([w[1],...shuffle(alternatives).slice(0,3)])};
}
function completeQuiz(){
 if(!quiz||quiz.index!==quiz.items.length-1||quiz.answer===null||quiz.saved)return;
 quiz.saved=true;
 const k=`${m}-${d}`;
 const old=Number(state.scores[k]);state.scores[k]=Math.max(Number.isFinite(old)?old:0,quiz.score);
 if(quiz.score>=Math.ceil(quiz.items.length*.8)){state.done[k]=true;window.UI?.play('win')}
 save();
}
function startQuiz(){if(!dayOpen(m,d)){lockNotice('اليوم مقفل');return}const a=info(m,d);quiz={items:shuffle(a.map((w,i)=>makeQuestion(w,i))),index:0,score:0,errors:[],answer:null,saved:false};render()}
function quizView(){const q=quiz;if(q.index>=q.items.length){const required=Math.ceil(q.items.length*.8),pass=q.score>=required;return `<div class="quiz-panel"><span class="eyebrow">نتيجة الاختبار</span><h2>${pass?'🎉 أحسنت!':'🌱 واصل المراجعة'}</h2><div class="score">${q.score}/${q.items.length}</div><p>${pass?'اجتزت اختبار اليوم. تم حفظ نجاحك وفتح المرحلة التالية تلقائياً. اضغط العودة للمتابعة.':'تحتاج إلى ${required} إجابة صحيحة على الأقل. راجع الأفعال وحاول مجدداً.'}</p>${q.errors.length?`<h3>أفعال للمراجعة</h3><div class="error-list">${q.errors.map(w=>`<span dir="ltr">${esc(w[0])} — ${esc(w[1])}</span>`).join('')}</div>`:''}<button id="endQuiz" class="primary">العودة إلى الأفعال</button></div>`}
const item=q.items[q.index],w=item.w,form=item.kind==='form';return `<div class="quiz-panel"><span class="eyebrow">اختبار اليوم ${d} · ${M[m].level}</span><h2>${form?'اختر التصريف الصحيح في المضارع':'ما معنى هذا الفعل؟'}</h2><div class="quiz-progress">السؤال ${q.index+1} من ${q.items.length} · النتيجة ${q.score}</div><div class="progress-track"><i style="width:${q.index/q.items.length*100}%"></i></div><h2 dir="ltr" class="quiz-word">${esc(w[0])}</h2>${form?`<p dir="ltr" class="quiz-pronoun">${esc(pron[item.person])} ______</p>`:''}<div class="quiz-options">${item.options.map((o,i)=>`<button data-answer="${i}" ${q.answer!==null?'disabled':''} class="${q.answer!==null?(o===item.correct?'right':q.answer===i?'wrong':''):''}" ${form?'dir="ltr"':''}>${esc(o)}</button>`).join('')}</div>${q.answer!==null?`<div class="feedback ${item.options[q.answer]===item.correct?'good':'bad'}">${item.options[q.answer]===item.correct?'إجابة صحيحة!':'الإجابة الصحيحة: '+esc(item.correct)}${form?`<p dir="ltr">${esc(pron[item.person].split('/')[0]+' '+item.correct)}</p>`:''}</div><button id="nextQuestion" class="primary">${q.index===q.items.length-1?'عرض النتيجة':'السؤال التالي ←'}</button>`:''}</div>`}
function render(){if(!levelOpen(m)){m=0;d=1;quiz=null}if(!dayOpen(m,d)){d=1;quiz=null}selected=Math.min(selected,14);$('root').innerHTML=title()+levels()+days()+(quiz?quizView():dayView())+'<p class="footnote">تُحفظ نتائج الصرف والتحويل في هذا المتصفح. لا تُحذف بيانات الكلمات والدروس الموجودة.</p>'}
function lockNotice(t){if(window.UI){UI.play('lock');UI.toast(t)}else alert(t)}
$('root').addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;
if(b.dataset.level!==undefined){const i=Number(b.dataset.level);if(!Number.isInteger(i)||i<0||i>=M.length)return;if(!levelOpen(i)){lockNotice('🔒 أكمل أيام المستوى السابق أولاً.');return}m=i;d=1;selected=0;quiz=null;render();return}
if(b.dataset.day!==undefined){const n=Number(b.dataset.day);if(!Number.isInteger(n)||n<1||n>30)return;if(!dayOpen(m,n)){lockNotice('🔒 أكمل اختبار اليوم السابق أولاً.');return}d=n;selected=0;quiz=null;render();return}
if(b.dataset.verb!==undefined){const i=Number(b.dataset.verb);if(!Number.isInteger(i)||i<0||i>=info(m,d).length)return;selected=i;render();if(window.innerWidth<750)document.querySelector('.verb-detail')?.scrollIntoView({behavior:'smooth',block:'start'});return}
if(b.dataset.speak!==undefined){speak(b.dataset.speak);return}
if(b.id==='beginQuiz'){startQuiz();return}
if(b.dataset.answer!==undefined&&quiz&&quiz.answer===null){const item=quiz.items[quiz.index],w=item.w;const chosen=Number(b.dataset.answer);if(!Number.isInteger(chosen)||chosen<0||chosen>=item.options.length)return;quiz.answer=chosen;if(item.options[quiz.answer]===item.correct){quiz.score++;window.UI?.play('ok')}else{quiz.errors.push(w);state.errors[w[0]]=(state.errors[w[0]]||0)+1;window.UI?.play('bad')}if(quiz.index===quiz.items.length-1)completeQuiz();else save();render();return}
if(b.id==='nextQuestion'&&quiz&&quiz.answer!==null){quiz.index=Math.min(quiz.items.length,quiz.index+1);quiz.answer=null;render();return}
if(b.id==='endQuiz'){quiz=null;render();return}
});
render();
})();
