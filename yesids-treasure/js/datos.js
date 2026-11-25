/* ============ helpers de datos ============ */
const cl=id=>S.clientes.find(c=>c.id===id)||{nombre:"—"};
const prod=id=>S.productos.find(p=>p.id===id);
const trab=id=>S.trab.find(t=>t.id===id)||{nombre:"—"};
const stBadge=e=>`<span class="badge ${{Pendiente:"b-warn","En proceso":"b-info",Finalizada:"b-ok",Activo:"b-ok","En descanso":"b-gray"}[e]||"b-gray"}">${esc(e)}</span>`;
function table(cols,rows,opt={}){
 if(!rows.length)return`<div class="nodata">${opt.empty||"Sin registros."}</div>`;
 return`<div class="tw"><table><thead><tr>${cols.map(c=>`<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr ${r.attr||""} class="${r.cls||""}">${r.cells.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
function toast(m,bad){const t=document.createElement("div");t.className="t"+(bad?" bad":"");t.textContent=m;$("#toast").append(t);while($("#toast").children.length>3)$("#toast").firstChild.remove();setTimeout(()=>t.remove(),3800)}
function modal(html){$("#mbox").innerHTML=html;$("#modal").classList.add("on");const b=$("#mbox [data-close]");b&&b.focus()}
function closeModal(){$("#modal").classList.remove("on")}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal"||e.target.closest("[data-close]"))closeModal()});
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
/* validación */
function field(id,label,{type="text",ph="",hint="",val="",opts,req=true,attrs=""}={}){
 const inner=opts?`<select id="${id}" name="${id}" ${attrs}>${opts.map(o=>{const[v,t]=Array.isArray(o)?o:[o,o];return`<option value="${esc(v)}" ${String(v)===String(val)?"selected":""}>${esc(t)}</option>`}).join("")}</select>`
 :type==="textarea"?`<textarea id="${id}" name="${id}" rows="3" placeholder="${esc(ph)}" ${attrs}>${esc(val)}</textarea>`
 :`<input id="${id}" name="${id}" type="${type}" placeholder="${esc(ph)}" value="${esc(val)}" ${attrs}>`;
 return`<div class="f" data-f="${id}"><label for="${id}">${label}${req?" *":""}</label>${inner}${hint?`<span class="h">${hint}</span>`:""}<span class="e" aria-live="polite"></span></div>`}
function setErr(form,id,msg){const f=$(`[data-f="${id}"]`,form);if(!f)return;f.classList.toggle("err",!!msg);$(".e",f).textContent=msg||""}
function check(form,rules){let ok=true,first=null;for(const[id,fn]of Object.entries(rules)){const el=form.elements[id];if(!el)continue;const m=fn(el.value.trim(),el);setErr(form,id,m);if(m){ok=false;first=first||el}}first&&first.focus();return ok}
const R={req:v=>v?"":"Este campo es obligatorio.",
 email:v=>!v?"Este campo es obligatorio.":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?"":"Introduce un correo con formato válido.",
 tel:v=>!v?"Este campo es obligatorio.":/^\d{7,10}$/.test(v.replace(/\s/g,""))?"":"Teléfono de 7 a 10 dígitos.",
 doc:v=>!v?"Este campo es obligatorio.":/^\d{6,12}$/.test(v)?"":"Documento de 6 a 12 dígitos.",
 pos:v=>{const n=parseFloat(String(v).replace(",","."));return!v?"Este campo es obligatorio.":(isNaN(n)||n<=0)?"Debe ser mayor que 0.":""},
 pct:v=>{const n=parseFloat(String(v).replace(",","."));return!v?"Este campo es obligatorio.":(isNaN(n)||n<=0||n>100)?"Mayor que 0 y hasta 100.":""}};
const fl=v=>parseFloat(String(v).replace(",","."));
