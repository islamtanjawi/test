(()=>{'use strict';
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
const status=document.createElement('div');status.id='academyConnection';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.style.cssText='position:fixed;bottom:12px;inset-inline-start:12px;z-index:10000;padding:8px 12px;border-radius:10px;background:#334155;color:#fff;font:13px system-ui;box-shadow:0 3px 12px #0002;max-width:260px;display:none';
const refresh=()=>{const offline=!navigator.onLine;status.textContent=offline?'أنت غير متصل بالإنترنت — يمكنك استخدام المحتوى المحفوظ على الجهاز.':'';status.style.display=offline?'block':'none'};
const attach=()=>{document.body.appendChild(status);refresh()};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',attach,{once:true});else attach();window.addEventListener('online',refresh);window.addEventListener('offline',refresh);
})();
