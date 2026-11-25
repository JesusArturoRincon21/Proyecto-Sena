/* ============ vistas ============ */
const VIEWS={},AFTER={};
VIEWS.inicio=()=>`<div class="stack">
 <section class="card hero"><h2>Yesid's Treasure · Oro Familiar</h2><p>Del material aurífero al oro refinado. Conoce nuestros procesos, consulta los productos y solicita servicios de compra, venta o refinación de oro.</p>
  <div class="row"><a class="btn gold" href="#/oro">Ver proceso de extracción</a><a class="btn" href="#/catalogo">Explorar productos</a></div></section>
 <section class="grid g4">
  <div class="card kpi"><div class="n">17</div><div class="l">Requerimientos funcionales</div><div class="small muted">Del documento · sin RF-13, 14 y 15</div></div>
  <div class="card kpi"><div class="n">9</div><div class="l">Requerimientos no funcionales</div><div class="small muted">RNF-01 a RNF-09 · Documento</div></div>
  <div class="card kpi"><div class="n">7</div><div class="l">Requerimientos adicionales</div><div class="small muted">RF-N01 a RF-N07 · Propuestos</div></div>
  <div class="card kpi"><div class="n">4</div><div class="l">Roles principales</div><div class="small muted">Cliente, Vendedor, Trabajador y Administrador</div></div></section>
 <h2 style="margin:0">Módulos de la plataforma</h2>
 <section class="grid g3">
  <div class="card pcard"><h3>Productos de oro</h3><p class="muted" style="margin:0">Consulta precios, quilates y existencias.</p><div><a class="btn dark" href="#/catalogo">Explorar módulo</a></div></div>
  <div class="card pcard"><h3>Servicios y solicitudes</h3><p class="muted" style="margin:0">Compra, venta y refinación de oro.</p><div><a class="btn dark" href="#/solicitar">Explorar módulo</a></div></div>
  <div class="card pcard"><h3>Operación minera</h3><p class="muted" style="margin:0">Producción y personal con acceso por rol.</p><div><a class="btn dark" href="#/login">Explorar módulo</a></div></div></section>
 <section class="callout"><b>33 requisitos en total = 17 RF + 9 RNF + 7 adicionales propuestos.</b><span class="small">Prototipo funcional · Datos de ejemplo en COP y gramos · Esquema previsto: sir_golden</span></section></div>`;

VIEWS.oro=()=>`<div class="stack">
 <section class="card"><h2>Flujo de trabajo estándar</h2><p class="muted">De la identificación de la zona al oro refinado.</p><ol class="steps">${[
 ["Identificación de la zona","Análisis geológico inicial y delimitación del área de trabajo."],["Extracción del material","Remoción de roca portadora con maquinaria y protocolos de seguridad."],
 ["Transporte a procesamiento","Traslado del mineral a las plantas de lavado, trituración y cribado."],["Separación y recuperación","Lavado y separación física para recuperar las partículas de oro."],
 ["Medición de pureza y quilataje","Pesaje en gramos y análisis técnico de la muestra recuperada."],["Refinación y registro","Registro del resultado de refinación y del oro fino obtenido."]
 ].map((s,i)=>`<li><span class="num">${i+1}</span><div><b>${s[0]}</b><div class="muted">${s[1]}</div></div></li>`).join("")}</ol></section>
 <section class="card"><h2>El quilataje expresa la proporción de oro puro</h2><p class="muted">24 quilates representan el oro de mayor pureza. Las aleaciones permiten ajustar resistencia y tonalidad. La pureza final debe confirmarse mediante ensayo técnico.</p>
  <div class="qgrid">${[[10,"Menor proporción de oro, mayor dureza"],[14,"Equilibrio entre dureza y contenido de oro"],[18,"Alta proporción de oro con buena resistencia"],[20,"Alta proporción de oro"],[22,"Oro de alta pureza"],[24,"Oro fino · resultado sujeto a ensayo"]].map(q=>`<div class="card q"><div class="k">${q[0]}k</div><b>${num(PUREZA[q[0]])} % de pureza</b><div class="muted">${q[1]}</div></div>`).join("")}</div></section>
 <section class="card"><h3>Calculadora de oro fino</h3><p class="muted small">Estimación informativa. La pureza final se confirma mediante ensayo.</p>
  <form id="qcalc" class="two" novalidate>${field("peso","Peso (g)",{type:"text",val:"20",ph:"Ej: 20,00"})}${field("k","Quilataje",{opts:Object.keys(PUREZA).map(k=>[k,k+"k"]),val:"18"})}</form>
  <div class="calc" id="qout" style="margin-top:14px"></div><div class="row" style="margin-top:14px"><a class="btn gold" href="#/solicitar?t=Compra%20de%20oro">Solicitar valoración de oro</a></div></section></div>`;
AFTER.oro=()=>{const f=$("#qcalc"),o=$("#qout");const u=()=>{const p=fl(f.peso.value),k=+f.k.value;if(!(p>0)){o.textContent="Introduce un peso mayor que 0.";return}o.textContent=`Oro fino estimado: ${num(p)} g × ${num(PUREZA[k])} % = ${num(p*PUREZA[k]/100)} g`};f.addEventListener("input",u);f.onsubmit=e=>e.preventDefault();u()};

let CATF="Todas",CATQ="";
VIEWS.catalogo=()=>{
 const cats=["Todas",...new Set(S.productos.map(p=>p.cat))];
 const rows=S.productos.filter(p=>(CATF==="Todas"||p.cat===CATF)&&(!CATQ||(p.nombre+p.id+p.cat).toLowerCase().includes(CATQ.toLowerCase())));
 return`<div class="stack"><section class="card"><h2>Catálogo de productos</h2><p class="muted">Precios de ejemplo en pesos colombianos. Confirma disponibilidad y precio al solicitar.</p>
  <div class="row" style="margin:10px 0 14px"><div class="tabs" role="group" aria-label="Categorías">${cats.map(c=>`<button class="tab ${c===CATF?"on":""}" data-act="cat" data-v="${esc(c)}" aria-pressed="${c===CATF}">${esc(c)}</button>`).join("")}</div>
   <div class="f" style="min-width:200px;flex:1;max-width:280px"><label class="sr" for="bq">Buscar</label><input id="bq" type="search" placeholder="Buscar producto…" value="${esc(CATQ)}"></div></div>
  <div class="small muted">${rows.length} producto${rows.length===1?"":"s"} disponible${rows.length===1?"":"s"}</div>
  ${table(["Nombre","Categoría","Quilates","Precio","Stock",""],rows.map(p=>({cells:[`${esc(p.id)} · ${esc(p.nombre)}`,esc(p.cat),p.k+"k",cop(p.precio),p.stock>0?`${p.stock} unidades ${p.stock<=5?'<span class="badge b-warn">Pocas</span>':""}`:'<span class="badge b-bad">Agotado</span>',`<a class="btn sm gold" href="#/solicitar?t=Venta%20de%20oro&ref=${p.id}" ${p.stock>0?"":'aria-disabled="true"'}>Solicitar</a>`]})),{empty:"Ningún producto coincide con la búsqueda."})}</section></div>`};
AFTER.catalogo=()=>{const q=$("#bq");q&&q.addEventListener("input",()=>{CATQ=q.value;const p=q.selectionStart;rerender();const n=$("#bq");n.focus();n.setSelectionRange(p,p)})};

VIEWS.servicios=()=>`<div class="stack"><section class="grid g2">${SERVICIOS.map(s=>`<div class="card pcard"><h2>${s.n}</h2><p style="margin:0">${s.d}</p><b style="color:var(--goldink)">${s.p}</b><div><a class="btn gold" href="#/solicitar?t=${encodeURIComponent(s.n)}">Solicitar servicio</a></div></div>`).join("")}</section>
 <p class="muted small">Las cotizaciones se confirman después de revisar la solicitud. No se realizan cobros en este prototipo.</p></div>`;

VIEWS.galeria=()=>`<div class="gal">${[["Entorno","Entorno minero"],["Personal","Trabajadores en operación"],["Producción","Proceso de extracción"],["Comercial","Oro recuperado"]].map((c,i)=>`<figure><img src="${GAL[i]}" alt="${c[1]}" loading="lazy"><figcaption><small>${c[0]}</small><b>${c[1]}</b></figcaption></figure>`).join("")}</div>`;

/* ----- Solicitar ----- */
let SOLF={};
VIEWS.solicitar=()=>{
 const q=new URLSearchParams(location.hash.split("?")[1]||"");
 const tipo=q.get("t")||SOLF.t||"Compra de oro",ref=q.get("ref")||SOLF.ref||"";
 const me=SESSION&&SESSION.cl?cl(SESSION.cl):{};
 return`<div class="grid g2" style="align-items:start">
 <section class="card"><h2>Registrar solicitud</h2><p class="muted">Cada solicitud queda asociada a un cliente, un servicio y, si aplica, a sus productos.</p>
 <form id="sf" novalidate>
  ${field("srv","Servicio",{opts:SERVICIOS.map(s=>s.n),val:tipo})}
  <div class="two">${field("nombre","Nombre completo",{val:me.nombre||"",ph:"Nombre y apellidos"})}${field("doc","Documento",{val:me.doc||"",ph:"Solo números"})}</div>
  <div class="two">${field("correo","Correo electrónico",{type:"email",val:me.correo||"",ph:"nombre@correo.com"})}${field("tel","Teléfono",{type:"tel",val:me.tel||"",ph:"3001234567"})}</div>
  <div id="dyn"></div>
  ${field("obs","Observaciones",{type:"textarea",req:false,ph:"Detalles, fecha preferida…"})}
  <div class="row"><button class="btn gold" type="submit">Enviar solicitud</button><span class="muted small">Los campos con * son obligatorios.</span></div></form></section>
 <div class="stack"><section class="card"><h3>Seguimiento por radicado</h3><p class="muted small">Consulta el estado con tu número de solicitud (ej. SOL-042).</p>
  <form id="tf" class="row" novalidate style="display:flex"><div class="f" style="flex:1;min-width:160px"><label class="sr" for="rad">Radicado</label><input id="rad" placeholder="SOL-042" autocomplete="off"></div><button class="btn dark" type="submit">Consultar</button></form><div id="tres" style="margin-top:12px"></div></section>
 <section class="card"><h3>Contacto del proyecto</h3><p class="muted" style="margin:0">Atención para información de servicios, compra, venta y refinación de oro.</p>
  <p style="margin-bottom:0"><b>Oro Familiar · Yesid's Treasure</b><br><span class="muted">Lunes a viernes · 08:00 a 17:00 (horario de ejemplo)</span></p></section></div></div>`};
AFTER.solicitar=()=>{
 const f=$("#sf");const q=new URLSearchParams(location.hash.split("?")[1]||"");const ref0=q.get("ref")||"";
 const dyn=()=>{const s=f.srv.value;let h="";
  if(s==="Compra de oro"||s==="Refinación")h=`<div class="two">${field("peso",s==="Refinación"?"Peso del material (g)":"Peso bruto (g)",{val:"",ph:"Ej: 20,00"})}${field("k","Quilataje estimado",{opts:Object.keys(PUREZA).map(k=>[k,k+"k"]),val:"18"})}</div>`;
  else h=`<div class="two">${field("ref","Producto",{opts:S.productos.filter(p=>p.stock>0).map(p=>[p.id,`${p.id} · ${p.nombre} (${p.stock} disp.)`]),val:ref0})}${field("cant","Cantidad",{val:"1",type:"number",attrs:'min="1" step="1"'})}</div>`;
  $("#dyn").innerHTML=h};
 dyn();f.srv.addEventListener("change",dyn);
 f.onsubmit=e=>{e.preventDefault();const s=f.srv.value;
  const rules={nombre:v=>v.length<5?"Escribe nombre y apellido.":"",doc:R.doc,correo:R.email,tel:R.tel};
  if(f.peso)rules.peso=R.pos; if(f.cant)rules.cant=v=>{const n=+v;const p=prod(f.ref.value);return!Number.isInteger(n)||n<1?"Cantidad entera mínima 1.":(p&&n>p.stock?`Solo hay ${p.stock} disponibles.`:"")};
  if(!check(f,rules))return;
  let c=S.clientes.find(c=>c.doc===f.doc.value.trim());
  if(!c){c={id:nid("cl","CL-"),nombre:f.nombre.value.trim(),doc:f.doc.value.trim(),correo:f.correo.value.trim(),tel:f.tel.value.trim()};S.clientes.push(c)}
  const sol={id:nid("sol","SOL-"),cl:c.id,srv:s,fecha:today(),estado:"Pendiente",obs:f.obs.value.trim()};
  if(f.peso){sol.peso=fl(f.peso.value);sol.k=+f.k.value}
  if(f.ref){sol.ref=f.ref.value}
  if(f.cant){sol.cant=+f.cant.value}
  S.solicitudes.unshift(sol);save();SOLF={};
  modal(`<h2 style="margin:0 0 6px">Solicitud confirmada</h2><p class="muted">Guarda tu número de radicado para consultar el estado.</p>
   <div class="calc" style="font-size:22px;text-align:center">${sol.id}</div>
   <dl><dt>Cliente</dt><dd>${esc(c.nombre)} (${c.id})</dd><dt>Servicio</dt><dd>${esc(s)}</dd><dt>Estado</dt><dd>${stBadge("Pendiente")}</dd></dl>
   <div class="row"><button class="btn gold" data-close>Entendido</button></div>`);
  f.reset();dyn()};
 $("#tf").onsubmit=e=>{e.preventDefault();const id=$("#rad").value.trim().toUpperCase();const s=S.solicitudes.find(x=>x.id===id);
  $("#tres").innerHTML=!s?`<div class="callout" style="background:var(--badbg);color:var(--bad)">No encontramos la solicitud «${esc(id)||"—"}».</div>`:
  `<div><b>${s.id}</b> · ${esc(s.srv)} · ${s.fecha}</div><div class="tl">${ESTADOS.map((e,i)=>`<div class="${i<=ESTADOS.indexOf(s.estado)?"on":""}">${e}</div>`).join("")}</div>`}};

/* ----- Login ----- */
let LROL="cliente";
VIEWS.login=()=>{const u=USERS[LROL];return`<div class="stack" style="max-width:860px"><section class="card"><h2>Inicia sesión</h2><p class="muted">Selecciona tu rol para explorar su espacio. Acceso de demostración con datos de ejemplo.</p>
 <div class="tabs" role="group" aria-label="Rol" style="margin:12px 0 16px">${Object.keys(USERS).map(r=>`<button class="tab ${r===LROL?"on":""}" data-act="rol" data-v="${r}" aria-pressed="${r===LROL}">${ROLE_LABEL[r]}</button>`).join("")}</div>
 <form id="lf" novalidate><div class="two">${field("correo","Correo electrónico",{type:"email",val:u.correo,hint:"Introduce un correo con formato válido."})}${field("pass","Contraseña",{type:"password",val:"Oro12345",hint:"Mínimo 8 caracteres."})}</div>
 <div class="row"><button class="btn gold" type="submit">Entrar como ${ROLE_LABEL[LROL]}</button><button class="btn" type="button" data-act="badlogin">Probar credenciales inválidas</button></div>
 <p class="muted small" style="margin:0">Demostración: correo del rol elegido y cualquier contraseña de 8 o más caracteres. No compartas credenciales reales.</p></form></section>
 <section class="callout"><b>Acceso de ${ROLE_LABEL[LROL]}</b>${u.desc}</section></div>`};
AFTER.login=()=>{const f=$("#lf");f.onsubmit=e=>{e.preventDefault();
 if(!check(f,{correo:R.email,pass:v=>v.length<8?"Mínimo 8 caracteres.":""}))return;
 const u=USERS[LROL];if(f.correo.value.trim().toLowerCase()!==u.correo){setErr(f,"correo","Credenciales inválidas para el rol "+ROLE_LABEL[LROL]+".");toast("Acceso inválido: revisa el correo y el rol.",true);return}
 setSession({rol:LROL,nombre:u.nombre,cl:u.cl,tr:u.tr});toast("Bienvenido/a, "+u.nombre);const to=PENDING&&allowed(PENDING)?PENDING:defaultHome();PENDING=null;go(to)}};

/* ----- Cliente ----- */
VIEWS.cuenta=()=>{const me=SESSION.cl;const ss=S.solicitudes.filter(s=>s.cl===me);
 return`<div class="stack"><section class="card"><div class="row"><h2 style="margin:0;flex:1">Mis solicitudes</h2><a class="btn gold" href="#/solicitar">Nueva solicitud</a></div>
 ${table(["Solicitud","Servicio","Fecha","Estado"],ss.map(s=>({cells:[s.id,esc(s.srv),s.fecha,stBadge(s.estado)]})),{empty:"Aún no tienes solicitudes."})}</section></div>`};

/* ----- Resumen ----- */
VIEWS.resumen=()=>{const pend=S.solicitudes.filter(s=>s.estado==="Pendiente").length,low=S.productos.filter(p=>p.stock<=5).length,g=S.lotes.reduce((a,l)=>a+l.g,0);
 const kp=[[pend,"Solicitudes pendientes"],[S.clientes.length,"Clientes registrados"],[low,"Productos con stock ≤ 5"],[num(g,1)+" g","Oro producido (lotes)"]];
 return`<div class="stack"><section class="grid g4">${kp.map(k=>`<div class="card kpi"><div class="n">${k[0]}</div><div class="l">${k[1]}</div></div>`).join("")}</section>
 ${SESSION.rol!=="trabajador"?`<section class="card"><h2>Solicitudes recientes</h2>${table(["Solicitud","Cliente","Servicio","Fecha","Estado"],S.solicitudes.slice(0,5).map(s=>({cells:[s.id,esc(cl(s.cl).nombre),esc(s.srv),s.fecha,stBadge(s.estado)]})))}<div class="row" style="margin-top:8px"><a class="btn dark" href="#/solicitudes">Ver todas</a></div></section>`:`<section class="callout"><b>Hola, ${esc(SESSION.nombre)}</b>Registra tu jornada en «Mi jornada» y la producción diaria en «Producción».</section>`}</div>`};

/* ----- Solicitudes ----- */
let SOLFIL="Todas";
VIEWS.solicitudes=()=>{const c=e=>S.solicitudes.filter(s=>s.estado===e).length;const rows=S.solicitudes.filter(s=>SOLFIL==="Todas"||s.estado===SOLFIL);
 return`<div class="stack"><section class="grid g3">${ESTADOS.map(e=>`<div class="card kpi"><div class="n">${c(e)}</div><div class="l">${e==="Pendiente"?"Pendientes":e==="En proceso"?"En proceso":"Finalizadas"}</div></div>`).join("")}</section>
 <section class="card"><div class="row"><h2 style="margin:0;flex:1">Solicitudes</h2><a class="btn gold" href="#/solicitar">Registrar solicitud</a></div><p class="muted">Consulta y seguimiento por estado. Haz clic en una fila para ver el detalle.</p>
 <div class="tabs" role="group" aria-label="Filtrar por estado" style="margin-bottom:10px">${["Todas",...ESTADOS].map(e=>`<button class="tab ${e===SOLFIL?"on":""}" data-act="solfil" data-v="${e}" aria-pressed="${e===SOLFIL}">${e} · ${e==="Todas"?S.solicitudes.length:c(e)}</button>`).join("")}</div>
 ${table(["Solicitud","Cliente","Servicio","Fecha","Estado"],rows.map(s=>({cls:"click",attr:`data-act="soldet" data-v="${s.id}" tabindex="0"`,cells:[s.id,esc(cl(s.cl).nombre),esc(s.srv),s.fecha,stBadge(s.estado)]})),{empty:"No hay solicitudes en este estado."})}</section></div>`};
function solDetail(id){const s=S.solicitudes.find(x=>x.id===id);if(!s)return;const c=cl(s.cl);const item=s.ref?prod(s.ref):null;
 modal(`<div class="row"><h2 style="margin:0;flex:1">${s.id} · ${esc(s.srv)}</h2>${stBadge(s.estado)}</div>
 <dl><dt>Cliente</dt><dd>${esc(c.nombre)} (${s.cl})</dd><dt>Contacto</dt><dd>${esc(c.correo||"")} · ${esc(c.tel||"")}</dd><dt>Fecha</dt><dd>${s.fecha}</dd>
 ${item?`<dt>Producto</dt><dd>${esc(item.id+" · "+item.nombre)}${s.cant?" × "+s.cant:""}</dd>`:""}
 ${s.peso?`<dt>Material</dt><dd>${num(s.peso)} g · ${s.k}k</dd>`:""}<dt>Observaciones</dt><dd>${esc(s.obs||"—")}</dd></dl>
 <div class="f"><label for="nst">Cambiar estado</label><select id="nst">${ESTADOS.map(e=>`<option ${e===s.estado?"selected":""}>${e}</option>`).join("")}</select></div>
 <div class="row" style="margin-top:14px"><button class="btn gold" data-act="solsave" data-v="${s.id}">Guardar estado</button><button class="btn" data-close>Cerrar</button></div>`)}

/* ----- Clientes ----- */
VIEWS.clientes=()=>`<div class="stack"><section class="card"><h2>Directorio de clientes</h2><p class="muted">La solicitud y la compra conservan el identificador del cliente.</p>
 ${table(["Cliente","Nombre completo","Documento","Correo electrónico"],S.clientes.map(c=>({cls:"click",attr:`data-act="cldet" data-v="${c.id}" tabindex="0"`,cells:[c.id,esc(c.nombre),esc(c.doc),esc(c.correo)]})))}</section>
 <div class="row"><a class="btn gold" href="#/solicitar">Registrar cliente y solicitud</a><a class="btn" href="#/solicitudes">Consultar solicitudes</a></div></div>`;
function clDetail(id){const c=cl(id);const ss=S.solicitudes.filter(s=>s.cl===id);
 modal(`<h2 style="margin:0">Ficha del cliente · ${id}</h2><dl><dt>Nombre</dt><dd>${esc(c.nombre)}</dd><dt>Documento</dt><dd>${esc(c.doc)}</dd><dt>Teléfono</dt><dd>${esc(c.tel||"—")}</dd><dt>Correo</dt><dd>${esc(c.correo)}</dd>
 <dt>Solicitudes</dt><dd>${ss.map(s=>s.id+" ("+s.estado+")").join(", ")||"—"}</dd></dl><button class="btn" data-close>Cerrar</button>`)}

/* ----- Inventario ----- */
VIEWS.inventario=()=>{const tot=S.productos.reduce((a,p)=>a+p.stock,0),low=S.productos.filter(p=>p.stock<=5).length;const adm=SESSION.rol==="administrador"||SESSION.rol==="vendedor";
 return`<div class="stack"><section class="grid g3"><div class="card kpi"><div class="n">${S.productos.length}</div><div class="l">Productos</div></div><div class="card kpi"><div class="n">${tot}</div><div class="l">Unidades disponibles</div></div><div class="card kpi"><div class="n">${low}</div><div class="l">Productos con stock ≤ 5</div></div></section>
 <section class="card"><h2>Inventario de productos</h2><p class="muted">Existencias de ejemplo. Ajusta el stock con − y +.</p>
 ${table(["Producto","Categoría","Quilates","Precio COP","Stock"],S.productos.map(p=>({cells:[esc(p.id+" · "+p.nombre),esc(p.cat),p.k+"k",cop(p.precio),`<span class="row" style="gap:6px;flex-wrap:nowrap"><button class="btn sm" data-act="stk" data-v="${p.id}" data-d="-1" aria-label="Restar una unidad a ${esc(p.nombre)}">−</button><b style="min-width:26px;text-align:center">${p.stock}</b><button class="btn sm" data-act="stk" data-v="${p.id}" data-d="1" aria-label="Sumar una unidad a ${esc(p.nombre)}">+</button>${p.stock<=5?'<span class="badge b-warn">Bajo</span>':""}</span>`]})))}</section>
 <section class="card"><h3>Agregar producto</h3><form id="pf" novalidate><div class="two">${field("nombre","Nombre",{ph:"Ej: Lingote 1 oz"})}${field("cat","Categoría",{ph:"Ej: Lingotes"})}</div>
 <div class="two">${field("k","Quilates",{opts:Object.keys(PUREZA).map(k=>[k,k+"k"]),val:"18"})}${field("precio","Precio (COP)",{ph:"Ej: 1500000"})}</div>${field("stock","Stock inicial",{val:"1",type:"number",attrs:'min="0" step="1"'})}
 <div><button class="btn gold" type="submit">Agregar al inventario</button></div></form></section></div>`};
AFTER.inventario=()=>{const f=$("#pf");f.onsubmit=e=>{e.preventDefault();if(!check(f,{nombre:R.req,cat:R.req,precio:R.pos,stock:v=>(!/^\d+$/.test(v)?"Número entero ≥ 0.":"")}))return;
 const p={id:nid("pr","PR-"),nombre:f.nombre.value.trim(),cat:f.cat.value.trim(),k:+f.k.value,precio:Math.round(fl(f.precio.value)),stock:+f.stock.value};S.productos.push(p);save();toast(p.id+" agregado al inventario");rerender()}};

/* ----- Compras y refinación ----- */
VIEWS.compras=()=>{const libres=S.solicitudes.filter(s=>s.srv==="Compra de oro"&&!S.compras.some(c=>c.sol===s.id));const sinref=S.compras.filter(c=>!c.ref);
 return`<div class="stack"><div class="grid g2" style="align-items:start">
 <section class="card"><h2>Registrar compra de oro</h2><p class="muted">RF-10 · RF-11 · asociada a una solicitud de compra.</p>
 ${libres.length?`<form id="cf" novalidate>${field("sol","Solicitud de compra",{opts:libres.map(s=>[s.id,`${s.id} · ${cl(s.cl).nombre}`])})}
  ${field("peso","Peso bruto (g)",{hint:"Debe ser mayor que 0.",val:""})}<div class="two">${field("k","Quilataje",{opts:Object.keys(PUREZA).map(k=>[k,k+"k"]),val:"18",hint:"Entre 10k y 24k."})}${field("pur","Pureza (%)",{val:"75",hint:"Mayor que 0 y hasta 100."})}</div>
  ${field("valor","Valor acordado (COP)",{ph:"Ej: 6000000"})}<div class="calc" id="cc">Oro fino teórico: —</div><div><button class="btn gold" type="submit">Guardar compra</button></div></form>`
 :`<div class="nodata">No hay solicitudes de «Compra de oro» pendientes de registrar. Crea una desde «Solicitar servicio».</div>`}</section>
 <section class="card"><h2>Resultado de refinación</h2><p class="muted">RF-12 · asociado a una compra.</p>
 ${sinref.length?`<form id="rff" novalidate>${field("co","Compra",{opts:sinref.map(c=>[c.id,`${c.id} · ${num(c.peso)} g · ${c.k}k`])})}${field("rec","Oro recuperado (g)",{hint:"No debe superar el peso de entrada."})}${field("pf","Pureza final (%)",{val:"99,90",hint:"Resultado confirmado mediante ensayo."})}
  ${field("fecha","Fecha del proceso",{type:"date",val:todayIso()})}<div class="calc" id="rc">Oro fino recuperado: —</div><div><button class="btn gold" type="submit">Guardar resultado</button></div></form>`
 :`<div class="nodata">Todas las compras ya tienen resultado de refinación.</div>`}</section></div>
 <section class="card"><h2>Compras registradas</h2>${table(["Compra","Solicitud","Cliente","Material","Valor","Refinación"],S.compras.map(c=>{const t=c.peso*c.pureza/100;let r="<span class='badge b-warn'>Pendiente</span>";if(c.ref){const fino=c.ref.rec*c.ref.pf/100;r=`${num(fino,4)} g fino · ${num(fino/t*100)} % recuperación · pérdida ${num(t-fino,4)} g`}return{cells:[c.id,c.sol,esc(cl(c.cl).nombre),`${num(c.peso)} g · ${c.k}k · ${num(c.pureza)} %`,cop(c.valor),r]}}),{empty:"Aún no hay compras."})}</section></div>`};
AFTER.compras=()=>{
 const f=$("#cf");if(f){const u=()=>{const p=fl(f.peso.value),pu=fl(f.pur.value);$("#cc").textContent=p>0&&pu>0?`Oro fino teórico: ${num(p)} × ${num(pu)} % = ${num(p*pu/100)} g`:"Oro fino teórico: —"};
  f.k.addEventListener("change",()=>{f.pur.value=String(PUREZA[f.k.value]).replace(".",",");u()});f.addEventListener("input",u);
  const fillSol=()=>{const s=S.solicitudes.find(x=>x.id===f.sol.value);if(s&&s.peso){f.peso.value=String(s.peso).replace(".",",");f.k.value=String(s.k);f.pur.value=String(PUREZA[s.k]).replace(".",",")}u()};f.sol.addEventListener("change",fillSol);fillSol();
  f.onsubmit=e=>{e.preventDefault();if(!check(f,{peso:R.pos,pur:R.pct,valor:R.pos}))return;const s=S.solicitudes.find(x=>x.id===f.sol.value);
   const c={id:nid("co","CO-"),sol:s.id,cl:s.cl,peso:fl(f.peso.value),k:+f.k.value,pureza:fl(f.pur.value),valor:Math.round(fl(f.valor.value)),fecha:today(),ref:null};S.compras.push(c);if(s.estado==="Pendiente")s.estado="En proceso";save();toast(c.id+" registrada");rerender()}}
 const g=$("#rff");if(g){const u=()=>{const c=S.compras.find(x=>x.id===g.co.value),r=fl(g.rec.value),p=fl(g.pf.value);if(!c||!(r>0)||!(p>0)){$("#rc").textContent="Oro fino recuperado: —";return}const t=c.peso*c.pureza/100,fi=r*p/100;$("#rc").innerHTML=`Oro fino recuperado: ${num(fi,4)} g<br>Recuperación de fino: ${num(fi/t*100)} %<br>Pérdida de fino: ${num(t-fi,4)} g`};g.addEventListener("input",u);
  g.onsubmit=e=>{e.preventDefault();const c=S.compras.find(x=>x.id===g.co.value);if(!check(g,{rec:v=>{const n=fl(v);return R.pos(v)||(n>c.peso?"No debe superar el peso de entrada ("+num(c.peso)+" g).":"")},pf:R.pct,fecha:R.req}))return;
   c.ref={rec:fl(g.rec.value),pf:fl(g.pf.value),fecha:isoToEs(g.fecha.value)};const s=S.solicitudes.find(x=>x.id===c.sol);if(s)s.estado="Finalizada";save();toast("Refinación registrada para "+c.id);rerender()}}};

/* ----- Producción ----- */
let PRF={k:"Todos",desde:""};
VIEWS.produccion=()=>{const rows=S.lotes.filter(l=>(PRF.k==="Todos"||String(l.k)===PRF.k));const tot=rows.reduce((a,l)=>a+l.g,0);
 return`<div class="stack"><div class="grid g2" style="align-items:start"><section class="card"><h2>Registrar producción diaria</h2><p class="muted">Introduce los datos del mineral concentrado tras el lavado físico.</p>
 <form id="lf2" novalidate>${field("g","Masa en gramos (g)",{ph:"Escribe los gramos…"})}<div class="two">${field("k","Pureza estimada (quilataje)",{opts:Object.keys(PUREZA).map(k=>[k,k+" quilates"]),val:"24"})}${field("fecha","Fecha",{type:"date",val:todayIso()})}</div>${field("proc","Procedencia",{ph:"Ej: Concentrado pesado"})}
 <div><button class="btn gold" type="submit">Guardar registro oficial</button></div></form></section>
 <section class="card"><h2>Historial de producción</h2><p class="muted">Filtra por quilataje.</p><div class="tabs" role="group" aria-label="Filtrar por quilataje" style="margin-bottom:10px">${["Todos","24","18","14"].map(k=>`<button class="tab ${PRF.k===k?"on":""}" data-act="prf" data-v="${k}" aria-pressed="${PRF.k===k}">${k==="Todos"?"Todos":k+"k"}</button>`).join("")}</div>
 <div class="calc" style="margin-bottom:8px">${rows.length} lote${rows.length===1?"":"s"} · ${num(tot,1)} g en total</div>
 ${table(["Lote","Gramos","Pureza","Procedencia","Fecha"],rows.map(l=>({cells:[l.id,num(l.g,1)+" g",l.k+"K",esc(l.proc),l.fecha]})),{empty:"Sin lotes para este filtro."})}</section></div></div>`};
AFTER.produccion=()=>{const f=$("#lf2");f.onsubmit=e=>{e.preventDefault();if(!check(f,{g:R.pos,proc:R.req,fecha:R.req}))return;
 const n=S.lotes.length+1;const l={id:"LOT-"+new Date().getFullYear()+"-"+pad(n),g:fl(f.g.value),k:+f.k.value,proc:f.proc.value.trim(),fecha:isoToEs(f.fecha.value)};S.lotes.unshift(l);save();toast(l.id+" guardado");rerender()}};

/* ----- Jornada (trabajador) ----- */
VIEWS.jornada=()=>{const me=SESSION.tr,t=trab(me),mine=S.asist.filter(a=>a.tr===me);const open=mine.find(a=>a.fecha===today()&&!a.out);
 return`<div class="stack"><div class="grid g2" style="align-items:start"><section class="card"><h2>Registrar asistencia diaria</h2><p class="muted">Bitácora de entradas y salidas del operario (verificación biométrica simulada).</p>
 <form id="af" novalidate>${field("cod","Código del trabajador",{val:me,ph:"Ej: TR-001"})}<div class="row"><button class="btn gold" type="button" data-act="marcar" data-v="in">Marcar entrada</button><button class="btn dark" type="button" data-act="marcar" data-v="out">Marcar salida</button></div></form>
 <p class="muted small" style="margin-bottom:0">${open?"Entrada registrada hoy a las "+open.in+". Falta marcar salida.":"Aún no has marcado entrada hoy."}</p></section>
 <section class="card"><h2>Mi turno</h2><dl><dt>Trabajador</dt><dd>${esc(t.nombre)}</dd><dt>Cargo</dt><dd>${esc(t.cargo||"—")}</dd><dt>Departamento</dt><dd>${esc(t.dep||"—")}</dd><dt>Turno</dt><dd>${esc(t.turno||"—")}</dd></dl></section></div>
 <section class="card"><h2>Mis registros</h2>${table(["Fecha","Entrada","Salida"],mine.slice().reverse().map(a=>({cells:[a.fecha,a.in||"—",a.out||"—"]})),{empty:"Sin registros."})}</section></div>`};

/* ----- Personal (admin) ----- */
const TURNOS={Diurno:"06:00 - 14:00 · Lunes a viernes · Operación estándar de lavado y pesaje.",Tarde:"14:00 - 22:00 · Lunes a viernes · Procesamiento, mantenimiento y seguridad.",Especial:"08:00 - 16:00 · Fines de semana · Turno técnico rotativo."};
let PTAB="trab";
VIEWS.personal=()=>{const tabs=[["trab","Trabajadores"],["hor","Horarios y asistencia"],["pag","Pagos y bonificaciones"]];
 let body="";
 if(PTAB==="trab")body=`<section class="card"><h2>Personal de la mina</h2>${table(["Código","Nombre","Cargo","Departamento","Estado"],S.trab.map(t=>({cells:[t.id,esc(t.nombre),esc(t.cargo),esc(t.dep),stBadge(t.estado)]})))}</section>
  <section class="card"><h3>Registrar trabajador</h3><form id="tf2" novalidate><div class="two">${field("nombre","Nombre completo",{})}${field("cargo","Cargo",{ph:"Ej: Operario de lavado"})}</div><div class="two">${field("dep","Departamento",{ph:"Ej: Cribado"})}${field("turno","Turno",{opts:Object.keys(TURNOS)})}</div><div><button class="btn gold" type="submit">Dar de alta</button></div></form></section>`;
 if(PTAB==="hor")body=`<div class="grid g2" style="align-items:start"><section class="card"><h2>Horarios de trabajo</h2><div class="stack" style="gap:10px">${Object.entries(TURNOS).map(([k,v])=>`<div class="card" style="padding:14px 16px;background:var(--field)"><b>${k}</b><div class="muted">${v}</div><div class="small" style="margin-top:6px">${S.trab.filter(t=>t.turno===k).map(t=>esc(t.nombre)).join(", ")||"Sin asignados"}</div></div>`).join("")}</div></section>
  <section class="card"><h2>Asignar turno</h2><form id="hf" novalidate>${field("tr","Trabajador",{opts:S.trab.map(t=>[t.id,t.nombre])})}${field("turno","Turno",{opts:Object.keys(TURNOS)})}<div><button class="btn gold" type="submit">Asignar</button></div></form></section></div>
  <section class="card"><h2>Asistencia registrada</h2>${table(["Trabajador","Fecha","Entrada","Salida"],S.asist.slice().reverse().map(a=>({cells:[esc(a.tr+" · "+trab(a.tr).nombre),a.fecha,a.in||"—",a.out||"—"]})),{empty:"Sin registros."})}</section>`;
 if(PTAB==="pag")body=`<div class="grid g2" style="align-items:start"><section class="card"><h2>Registrar pago o bono</h2><form id="pgf" novalidate>${field("tr","Trabajador",{opts:S.trab.map(t=>[t.id,t.nombre])})}${field("tipo","Concepto",{opts:["Sueldo base","Bono pureza oro","Horas extra"]})}${field("valor","Valor (COP)",{val:"1450000"})}<div><button class="btn gold" type="submit">Registrar</button></div></form></section>
  <section class="card"><h2>Erogaciones registradas</h2><p class="muted">Total: <b>${cop(S.pagos.reduce((a,p)=>a+p.valor,0))}</b></p>${table(["Código","Trabajador","Concepto","Valor","Fecha"],S.pagos.map(p=>({cells:[p.id,esc(trab(p.tr).nombre),esc(p.tipo),`<b style="color:var(--goldink)">${cop(p.valor)}</b>`,p.fecha]})))}</section></div>`;
 return`<div class="stack"><div class="tabs" role="tablist">${tabs.map(t=>`<button class="tab ${PTAB===t[0]?"on":""}" role="tab" aria-selected="${PTAB===t[0]}" data-act="ptab" data-v="${t[0]}">${t[1]}</button>`).join("")}</div>${body}</div>`};
AFTER.personal=()=>{
 let f=$("#tf2");if(f)f.onsubmit=e=>{e.preventDefault();const f=e.target;if(!check(f,{nombre:v=>v.length<5?"Escribe nombre y apellido.":"",cargo:R.req,dep:R.req}))return;const t={id:nid("tr","TR-"),nombre:f.nombre.value.trim(),cargo:f.cargo.value.trim(),dep:f.dep.value.trim(),estado:"Activo",turno:f.turno.value};S.trab.push(t);save();toast(t.id+" registrado");rerender()};
 f=$("#hf");if(f)f.onsubmit=e=>{e.preventDefault();const f=e.target;trab(f.tr.value).turno=f.turno.value;save();toast("Turno asignado");rerender()};
 f=$("#pgf");if(f)f.onsubmit=e=>{e.preventDefault();const f=e.target;if(!check(f,{valor:R.pos}))return;const b=f.tipo.value.startsWith("Bono");S.pagos.unshift({id:b?nid("bon","BON-"):nid("pay","PAY-"),tr:f.tr.value,tipo:f.tipo.value,valor:Math.round(fl(f.valor.value)),fecha:today()});save();toast("Pago registrado");rerender()}};

/* ----- Presupuesto ----- */
VIEWS.presupuesto=()=>{const ga=S.gastos.reduce((a,g)=>a+g.v,0),pa=S.pagos.reduce((a,p)=>a+p.valor,0),disp=S.presupuesto-ga-pa;
 return`<div class="stack"><section class="grid g3"><div class="card kpi"><div class="n" style="font-size:24px">${cop(S.presupuesto)}</div><div class="l">Presupuesto general</div></div><div class="card kpi"><div class="n" style="font-size:24px">${cop(ga+pa)}</div><div class="l">Gastos y nómina</div></div><div class="card kpi"><div class="n" style="font-size:24px;color:${disp<0?"var(--bad)":"var(--ok)"}">${cop(disp)}</div><div class="l">Fondos disponibles</div></div></section>
 <div class="grid g2" style="align-items:start"><section class="card"><h2>Registro de gastos</h2><p class="muted">Egresos por combustible, herramientas y mantenimiento de maquinaria.</p>${table(["Concepto","Detalle","Valor","Fecha"],S.gastos.map(g=>({cells:[esc(g.c),esc(g.d),cop(g.v),g.fecha]})))}
  <form id="gf" novalidate style="margin-top:12px"><div class="two">${field("c","Concepto",{opts:["Combustible","Herramientas","Mantenimiento","Otros"]})}${field("v","Valor (COP)",{ph:"Ej: 300000"})}</div>${field("d","Detalle",{ph:"Descripción breve"})}<div><button class="btn gold" type="submit">Añadir gasto</button></div></form></section>
 <section class="card"><h2>Novedades operativas</h2><p class="muted">Reportes del estado técnico de la mina.</p><div class="stack" style="gap:8px">${S.nov.map(n=>`<div class="callout" style="background:var(--badbg);color:var(--bad)"><b style="font-weight:600">${esc(n.t)}</b><span class="small">${n.fecha}</span></div>`).join("")}</div>
  <form id="nf" novalidate style="margin-top:12px">${field("t","Nueva novedad",{ph:"Ej: Falla en banda transportadora"})}<div><button class="btn dark" type="submit">Reportar</button></div></form></section></div></div>`};
AFTER.presupuesto=()=>{let f=$("#gf");f.onsubmit=e=>{e.preventDefault();const f=e.target;if(!check(f,{v:R.pos,d:R.req}))return;S.gastos.unshift({id:nid("gas","GA-"),c:f.c.value,d:f.d.value.trim(),v:Math.round(fl(f.v.value)),fecha:today()});save();toast("Gasto registrado");rerender()};
 f=$("#nf");f.onsubmit=e=>{e.preventDefault();const f=e.target;if(!check(f,{t:R.req}))return;S.nov.unshift({id:nid("nov","NV-"),t:f.t.value.trim(),fecha:today()});save();toast("Novedad reportada");rerender()}};

/* ----- Requisitos ----- */
const RF=[["RF-01","Consultar información general de Oro Familiar.","inicio"],["RF-02","Mostrar información sobre los procesos relacionados con el oro.","oro"],["RF-03","Consultar los productos disponibles.","catalogo"],["RF-04","Mostrar nombre, categoría, quilates, precio y stock de los productos.","catalogo"],["RF-05","Consultar los servicios ofrecidos.","servicios"],["RF-06","Registrar información de los clientes.","solicitar"],["RF-07","Registrar solicitudes realizadas por los clientes.","solicitar"],["RF-08","Relacionar cada solicitud con un cliente y un servicio.","solicitar"],["RF-09","Registrar los productos asociados a una solicitud.","solicitar"],["RF-10","Registrar compras de oro asociadas a una solicitud.","compras"],["RF-11","Almacenar quilataje, peso y pureza del oro comprado.","compras"],["RF-12","Registrar el resultado de los procesos de refinación.","compras"],["RF-16","Consultar las etapas del proceso de transformación del oro.","oro"],["RF-17","Consultar las imágenes almacenadas en la galería.","galeria"],["RF-18","Consultar solicitudes según su estado.","solicitudes"],["RF-19","Consultar productos según su categoría.","catalogo"],["RF-20","Consultar precios, productos y existencias.","inventario"],
 ["RF-N01","Acceso por roles (Cliente, Vendedor, Trabajador, Administrador).","login"],["RF-N02","Registrar y consultar trabajadores.","personal"],["RF-N03","Horarios y asistencia diaria.","jornada"],["RF-N04","Pagos y bonificaciones del personal.","personal"],["RF-N05","Registro y consulta de producción de oro.","produccion"],["RF-N06","Presupuesto y registro de gastos.","presupuesto"],["RF-N07","Novedades operativas de la mina.","presupuesto"]];
const RNF=[["RNF-01","Interfaz clara y fácil de utilizar.","Navegación única y formularios guiados"],["RNF-02","Adaptable a computadores, tabletas y móviles.","Diseño responsive con menú desplegable"],["RNF-03","Información organizada y consistente.","Un solo estado de datos compartido"],["RNF-04","Integridad referencial mediante claves foráneas.","Cliente, servicio, producto y compra enlazados por código (en el prototipo; se implementa en MySQL)"],["RNF-05","Formularios con validación de datos.","Validación en línea con mensajes"],["RNF-06","Identidad visual de Oro Familiar.","Paleta oscuro y dorado"],["RNF-07","Consultas eficientes.","Filtros por estado, categoría y quilataje"],["RNF-08","Estructura que facilite ampliaciones.","Módulos por rol y datos de ejemplo separados"],["RNF-09","Protección de información administrativa.","Rutas restringidas por rol (simulado)"]];
VIEWS.requisitos=()=>`<div class="stack"><section class="card"><h2>Requerimientos funcionales</h2><p class="muted">Cada requisito enlaza con la pantalla donde se puede probar.</p>${table(["Código","Requerimiento","Pantalla"],RF.map(r=>({cells:[r[0]+(r[0].includes("N")?' <span class="badge b-info">Propuesto</span>':""),esc(r[1]),allowed(r[2])?`<a href="#/${r[2]}">${ROUTES[r[2]].n}</a>`:`${ROUTES[r[2]].n} <span class="muted small">(requiere rol)</span>`]})))}</section>
 <section class="card"><h2>Requerimientos no funcionales</h2>${table(["Código","Requerimiento","Cómo se cubre en el prototipo"],RNF.map(r=>({cells:[r[0],esc(r[1]),esc(r[2])]})))}</section></div>`;
