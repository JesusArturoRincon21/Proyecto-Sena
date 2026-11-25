/* ============ eventos globales ============ */
document.addEventListener("click",e=>{const el=e.target.closest("[data-act]");if(!el)return;const a=el.dataset.act,v=el.dataset.v;
 if(a==="cat"){CATF=v;rerender()}
 else if(a==="rol"){LROL=v;rerender()}
 else if(a==="badlogin"){const f=$("#lf");f.correo.value="alguien@mal.com";f.pass.value="ClaveIncorrecta1";f.requestSubmit()}
 else if(a==="logout"){setSession(null);toast("Sesión cerrada");go("inicio")}
 else if(a==="solfil"){SOLFIL=v;rerender()}
 else if(a==="soldet")solDetail(v);
 else if(a==="solsave"){const s=S.solicitudes.find(x=>x.id===v),n=$("#nst").value;
   if(n==="Finalizada"&&s.estado!=="Finalizada"&&s.srv==="Venta de oro"&&s.ref){const p=prod(s.ref);if(p){if(p.stock<(s.cant||1)){toast("Stock insuficiente de "+p.nombre+" para finalizar la venta.",true);return}p.stock-=(s.cant||1)}}
   s.estado=n;save();closeModal();toast(s.id+" → "+n);rerender()}
 else if(a==="cldet")clDetail(v);
 else if(a==="stk"){const p=prod(v);p.stock=Math.max(0,p.stock+(+el.dataset.d));save();rerender()}
 else if(a==="prf"){PRF.k=v;rerender()}
 else if(a==="ptab"){PTAB=v;rerender()}
 else if(a==="marcar"){const code=($("#cod").value||"").trim().toUpperCase();if(!S.trab.some(t=>t.id===code)){toast("Código de trabajador no válido.",true);return}
   const hoy=S.asist.find(x=>x.tr===code&&x.fecha===today()&&!x.out);
   if(v==="in"){if(hoy){toast("Ya hay una entrada abierta hoy.",true);return}S.asist.push({tr:code,fecha:today(),in:nowT(),out:""});toast("Entrada registrada "+nowT())}
   else{if(!hoy){toast("No hay una entrada abierta para marcar salida.",true);return}hoy.out=nowT();toast("Salida registrada "+nowT())}
   save();rerender()}});
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches("tr.click"))e.target.click()});
route();
