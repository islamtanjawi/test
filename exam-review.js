(()=>{'use strict';
const KEY='deutsch-exam-errors-v1',root=document.getElementById('examReviewRoot');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let log={};try{const data=JSON.parse(localStorage.getItem(KEY)||'{}');if(data&&typeof data==='object'&&!Array.isArray(data))log=data}catch(e){}
let level='all',status='pending',practice=null,feedback='';
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(log));return true}catch(e){return false}};
function render(){
const all=Object.entries(log),shown=all.filter(([id,x])=>(level==='all'||x.level===level)&&(status==='all'||(status==='pending'?!x.reviewed:!!x.reviewed)));
let h=`<section class="hero-card"><h1>مراجعة أخطاء امتحانات Goethe</h1><p>تُسجل أخطاء القراءة والاستماع الموضوعية بعد إنهاء المحاكاة. الكتابة والتحدث يحتاجان تقييماً بشرياً.</p><p>الأسئلة المسجلة: ${all.length} · غير المراجعة: ${all.filter(([id,x])=>!x.reviewed).length}</p></section>`;
if(practice){const x=log[practice];if(!x){practice=null;return render()}
h+=`<section class="verb-detail"><h2>إعادة التدريب · ${esc(x.level)} · ${esc(x.skill)}</h2><p dir="ltr">${esc(x.source)}</p><h3 dir="ltr">${esc(x.question)}</h3>${Array.isArray(x.options)&&x.options.length?`<div class="quiz-options">${x.options.map((o,i)=>`<button data-answer="${i}" ${feedback?'disabled':''}>${esc(o)}</button>`).join('')}</div>`:'<p>هذا السؤال من نسخة سابقة؛ خياراته غير محفوظة. يمكنك مراجعة الإجابة الصحيحة.</p>'}${feedback?`<div class="scenario" role="status"><strong>${feedback==='correct'?'✓ إجابة صحيحة':'✗ حاول مراجعة القاعدة'}</strong><p>الإجابة الصحيحة: ${esc(x.correct)}</p><p>${esc(x.explanation)}</p></div>`:''}<div class="day-actions"><button id="back">العودة إلى الأخطاء</button></div></section>`;
}else{h+=`<section class="verb-detail"><label>المستوى <select id="levelFilter"><option value="all">الكل</option>${['A1','A2','B1'].map(l=>`<option value="${l}">${l}</option>`).join('')}</select></label> <label>الحالة <select id="statusFilter"><option value="pending">غير المراجعة</option><option value="all">الكل</option><option value="done">تمت مراجعتها</option></select></label><div>${shown.length?shown.map(([id,x])=>`<article class="scenario"><strong>${esc(x.level)} · ${esc(x.skill)} · ${Number(x.count)||1} خطأ</strong><p dir="ltr">${esc(x.question)}</p><p>الإجابة الصحيحة: <strong dir="ltr">${esc(x.correct)}</strong></p><p>${esc(x.explanation)}</p>${Array.isArray(x.options)?`<button data-practice="${esc(id)}">تدرب مرة أخرى</button>`:''} <button data-review="${esc(id)}" aria-pressed="${!!x.reviewed}">${x.reviewed?'إعادة للمراجعة':'✓ راجعت السؤال'}</button></article>`).join(''):'<p>لا توجد أخطاء مطابقة لهذا الاختيار.</p>'}</div></section>`}
root.innerHTML=h;if(!practice){root.querySelector('#levelFilter').value=level;root.querySelector('#statusFilter').value=status}}
root.addEventListener('change',e=>{if(e.target.id==='levelFilter')level=e.target.value;if(e.target.id==='statusFilter')status=e.target.value;render()});
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
if(b.id==='back'){practice=null;feedback='';render();return}
if(b.dataset.practice!==undefined){practice=b.dataset.practice;feedback='';render();return}
if(b.dataset.answer!==undefined&&practice&&!feedback){const x=log[practice],i=Number(b.dataset.answer);feedback=i===Number(x.correctIndex)?'correct':'wrong';if(feedback==='correct'){x.reviewed=true;x.lastReviewed=new Date().toISOString();if(!save())alert('تعذر حفظ التقدم')}render();return}
if(b.dataset.review!==undefined){const x=log[b.dataset.review];if(!x)return;x.reviewed=!x.reviewed;if(!save())alert('تعذر حفظ التقدم');render()}});
render();})();