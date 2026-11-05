(()=>{'use strict';
const PREFIXES=['deutsch-'];
const allowed=k=>typeof k==='string'&&k.length<=100&&/^deutsch-[a-z0-9-]+$/i.test(k)&&PREFIXES.some(p=>k.startsWith(p));
const msg=s=>{document.getElementById('message').textContent=s};
document.getElementById('export').addEventListener('click',()=>{
 const records={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(allowed(k))records[k]=localStorage.getItem(k)}
 const payload={format:'deutsch-academy-backup',version:1,created:new Date().toISOString(),records};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='deutsch-progress-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);msg('تم تجهيز النسخة الاحتياطية.');
});

const preview=document.getElementById('preview');
document.getElementById('file').addEventListener('change',async e=>{
 preview.textContent='';const file=e.target.files&&e.target.files[0];if(!file)return;
 if(file.size>2_000_000){preview.textContent='حجم الملف يتجاوز الحد المسموح.';return}
 try{const d=JSON.parse(await file.text());if(d.format!=='deutsch-academy-backup'||d.version!==1||!d.records||Array.isArray(d.records)||typeof d.records!=='object')throw Error();
 const entries=Object.entries(d.records);if(entries.length>100||entries.some(([k,v])=>!allowed(k)||typeof v!=='string'||v.length>500000))throw Error();
 for(const [k,v] of entries){try{JSON.parse(v)}catch(e){throw Error()}}
 const missing=entries.filter(([k])=>localStorage.getItem(k)===null).length;
 preview.textContent=`النسخة تحتوي على ${entries.length} مجموعة بيانات؛ ${missing} جديدة للاستعادة، و${entries.length-missing} موجودة بالفعل ولن تُستبدل.`;
 }catch(e){preview.textContent='تعذرت قراءة معلومات النسخة. تحقق من اختيار ملف صادر عن الأكاديمية.'}
});

document.getElementById('import').addEventListener('click',async()=>{
 const file=document.getElementById('file').files[0];if(!file){msg('اختر ملف JSON أولاً.');return}if(file.size>2_000_000){msg('الملف كبير جداً (الحد 2 ميغابايت).');return}
 try{const data=JSON.parse(await file.text());if(data.format!=='deutsch-academy-backup'||data.version!==1||!data.records||Array.isArray(data.records)||typeof data.records!=='object')throw Error('صيغة غير مدعومة');
 const entries=Object.entries(data.records);if(entries.length>100||entries.some(([k,v])=>!allowed(k)||typeof v!=='string'||v.length>500000))throw Error('بيانات غير صالحة');
 for(const [k,v] of entries){try{JSON.parse(v)}catch(e){throw Error('ملف النسخة يحتوي بيانات تالفة: '+k)}}
 if(!confirm('سيتم استعادة البيانات غير الموجودة حالياً فقط. هل تريد المتابعة؟'))return;
 // Validate the entire backup before writing anything. Existing keys are never overwritten.
 const missing=entries.filter(([k])=>localStorage.getItem(k)===null);
 for(const [k,v] of missing){try{JSON.parse(v)}catch(e){throw Error('ملف النسخة يحتوي بيانات تالفة: '+k)}}
 const written=[];
 try{for(const [k,v] of missing){localStorage.setItem(k,v);written.push(k)}}
 catch(e){for(const k of written)localStorage.removeItem(k);throw Error('مساحة التخزين غير كافية، وتم التراجع عن الاستعادة الجزئية')}
 msg('تمت استعادة '+written.length+' مجموعة بيانات جديدة دون استبدال أي بيانات موجودة. أعد تحميل الصفحات الأخرى لرؤية التقدم.');
 }catch(e){msg('تعذرت الاستعادة: '+e.message)}
});
})();
