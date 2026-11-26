/* ============ rutas ============ */
const ALL=null;
const ROUTES={
 inicio:{t:"Yesid's Treasure · Plataforma de oro",rf:"RF-01 · Información general",ic:"home",n:"Inicio",g:"Público",r:ALL},
 oro:{t:"El oro: proceso y quilates",rf:"RF-02 · RF-16 · Del material aurífero al oro refinado",ic:"flow",n:"Proceso y quilates",g:"Público",r:ALL},
 catalogo:{t:"Catálogo",rf:"RF-03 · RF-04 · RF-19 · RF-20",ic:"box",n:"Productos de oro",g:"Público",r:ALL},
 servicios:{t:"Servicios",rf:"RF-05 · Servicios de Oro Familiar",ic:"tool",n:"Servicios",g:"Público",r:ALL},
 galeria:{t:"Galería",rf:"RF-17 · Nuestro entorno y procesos",ic:"img",n:"Galería",g:"Público",r:ALL},
 solicitar:{t:"Solicitar servicio",rf:"RF-06 · RF-07 · RF-08 · RF-09",ic:"mail",n:"Solicitar / Contacto",g:"Público",r:ALL},
 login:{t:"Iniciar sesión",rf:"RF-N01 · RNF-09 · Acceso por roles",ic:"lock",n:"Iniciar sesión",g:"Cuenta",r:"anon"},
 cuenta:{t:"Mi cuenta",rf:"RF-18 · Mis solicitudes",ic:"user",n:"Mi cuenta",g:"Mi espacio",r:["cliente"]},
 resumen:{t:"Resumen",rf:"Vista general de la operación",ic:"chart",n:"Resumen",g:"Administración",r:["vendedor","administrador","trabajador"]},
 solicitudes:{t:"Solicitudes",rf:"RF-07 · RF-08 · RF-09 · RF-18 · Consulta por estado",ic:"file",n:"Solicitudes",g:"Administración",r:["vendedor","administrador"]},
 clientes:{t:"Clientes",rf:"RF-06 · Información de clientes",ic:"users",n:"Clientes",g:"Administración",r:["vendedor","administrador"]},
 inventario:{t:"Inventario",rf:"RF-03 · RF-04 · RF-19 · RF-20",ic:"layers",n:"Inventario",g:"Administración",r:["vendedor","administrador"]},
 compras:{t:"Compras y refinación",rf:"RF-10 · RF-11 · RF-12",ic:"flow",n:"Compras y refinación",g:"Administración",r:["vendedor","administrador"]},
 produccion:{t:"Producción de oro",rf:"RF-N05 · Registro y consulta de producción",ic:"layers",n:"Producción",g:"Operación",r:["trabajador","administrador"]},
 jornada:{t:"Mi jornada",rf:"RF-N03 · Horario y asistencia",ic:"clock",n:"Mi jornada",g:"Operación",r:["trabajador"]},
 personal:{t:"Personal",rf:"RF-N02 · RF-N03 · RF-N04 · Trabajadores, horarios y pagos",ic:"users",n:"Personal",g:"Operación",r:["administrador"]},
 presupuesto:{t:"Presupuesto y novedades",rf:"RF-N06 · RF-N07 · Gastos y novedades operativas",ic:"brief",n:"Presupuesto",g:"Operación",r:["administrador"]},
 requisitos:{t:"Requisitos",rf:"Trazabilidad RF / RNF ↔ pantalla",ic:"check",n:"Requisitos",g:"Proyecto",r:ALL}
};
function allowed(r){const R_=ROUTES[r].r;if(R_===ALL)return true;if(R_==="anon")return!SESSION;return!!SESSION&&R_.includes(SESSION.rol)}
function nav(){
 let h=`<div class="brand"><div class="mono">YT</div><b>Yesid's Treasure</b></div><p class="tagline">Plataforma de oro · SENA 2026</p>`,g="";
 for(const[k,r]of Object.entries(ROUTES)){
  if(!allowed(k)&&!(k==="login"&&!SESSION))continue; if(k==="requisitos"&&false)continue;
  if(r.g!==g){g=r.g;h+=`<div class="grp">${g}</div>`}
  h+=`<a class="nav ${CUR===k?"on":""}" href="#/${k}" ${CUR===k?'aria-current="page"':""}>${ico(r.ic)}<span>${r.n}</span></a>`}
 if(SESSION)h+=`<button class="nav" data-act="logout">${ico("out")}<span>Cerrar sesión</span></button>`;
 h+=`<div class="sfoot">Yesid's Treasure · Proyecto SENA<br><b>sir_golden · Datos de ejemplo</b><br>17 RF + 9 RNF + 7 adicionales</div>`;
 $("#side").innerHTML=h}
function userChip(){$("#user").innerHTML=SESSION?`<span class="chip">${ico("user")}${esc(ROLE_LABEL[SESSION.rol])} · ${esc(SESSION.nombre)}</span>`:`<a class="chip" href="#/login">${ico("lock")}Iniciar sesión</a>`}
let CUR="inicio";
function route(){
 let r=(location.hash.replace(/^#\/?/,"").split("?")[0])||"inicio";
 if(!ROUTES[r])r="inicio";
 if(!allowed(r)){
  if(r==="login"&&SESSION){r=defaultHome()}
  else{ if(!SESSION){PENDING=r;r="login";toast("Acceso restringido: inicia sesión con un rol autorizado.",true)} else{toast("Tu rol no tiene acceso a esa sección.",true);r=defaultHome()}}
  history.replaceState(null,"","#/"+r)}
 CUR=r;const d=ROUTES[r];
 $("#ttl").textContent=d.t;$("#rf").textContent=d.rf;document.title=d.t+" · Yesid's Treasure";
 nav();userChip();$("#side").classList.remove("open");
 $("#app").innerHTML=VIEWS[r]();AFTER[r]&&AFTER[r]();
 scrollTo(0,0)}
let PENDING=null;
function defaultHome(){return{cliente:"cuenta",vendedor:"solicitudes",trabajador:"jornada",administrador:"resumen"}[SESSION.rol]}
addEventListener("hashchange",route);
$("#menu").onclick=()=>$("#side").classList.toggle("open");
function go(r){if(location.hash==="#/"+r)route();else location.hash="#/"+r}
function rerender(){const y=scrollY;$("#app").innerHTML=VIEWS[CUR]();AFTER[CUR]&&AFTER[CUR]();scrollTo(0,y)}
