/* ============ estado ============ */
const KEY="yesids_treasure_v2";
function seed(){return{
 seq:{sol:42,cl:3,co:14,lot:2,pay:102,bon:89,pr:6,tr:3,gas:3,nov:2},
 clientes:[{id:"CL-001",nombre:"Laura Gómez Martínez",doc:"1098765432",correo:"laura.gomez@ejemplo.com",tel:"3105550198"},
  {id:"CL-002",nombre:"Andrés Pérez Rojas",doc:"1002456789",correo:"andres.perez@ejemplo.com",tel:"3115550142"},
  {id:"CL-003",nombre:"Camila Torres Díaz",doc:"1003567890",correo:"camila.torres@ejemplo.com",tel:"3125550177"}],
 productos:[["PR-001","Lingote 5 g","Lingotes",24,2150000,8],["PR-002","Lingote 10 g","Lingotes",24,4200000,5],["PR-003","Lingote 20 g","Lingotes",24,8300000,12],
  ["PR-004","Lingote 50 g","Lingotes",24,20500000,6],["PR-005","Oro en polvo 10 g","Oro en polvo",22,3850000,10],["PR-006","Barra 100 g","Barras",24,41000000,3]].map(a=>({id:a[0],nombre:a[1],cat:a[2],k:a[3],precio:a[4],stock:a[5]})),
 solicitudes:[
  {id:"SOL-042",cl:"CL-001",srv:"Venta de oro",fecha:"18/11/2026",estado:"Pendiente",ref:"PR-001",cant:2,obs:"2 unidades"},
  {id:"SOL-041",cl:"CL-001",srv:"Venta de oro",fecha:"18/11/2026",estado:"Pendiente",ref:"PR-003",obs:"1 unidad"},
  {id:"SOL-040",cl:"CL-002",srv:"Compra de oro",fecha:"17/11/2026",estado:"Finalizada",peso:20,k:18,obs:""},
  {id:"SOL-039",cl:"CL-003",srv:"Refinación",fecha:"16/11/2026",estado:"En proceso",peso:12,k:18,obs:""},
  {id:"SOL-038",cl:"CL-003",srv:"Compra de oro",fecha:"15/11/2026",estado:"Pendiente",peso:8,k:14,obs:"Material traído en persona"}],
 compras:[{id:"CO-014",sol:"SOL-040",cl:"CL-002",peso:20,k:18,pureza:75,valor:6000000,fecha:"17/11/2026",ref:{rec:14.8,pf:99.9,fecha:"18/11/2026"}}],
 lotes:[{id:"LOT-2026-01",g:124.5,k:24,proc:"Concentrado pesado",fecha:"18/11/2026"},{id:"LOT-2026-02",g:84.2,k:18,proc:"Filón de veta secundario",fecha:"17/11/2026"}],
 trab:[{id:"TR-001",nombre:"Carlos Mario Duarte",cargo:"Operario de lavado",dep:"Cribado",estado:"Activo",turno:"Diurno"},
  {id:"TR-002",nombre:"Diana Marcela Castro",cargo:"Vendedora autorizada",dep:"Comercial",estado:"Activo",turno:"Diurno"},
  {id:"TR-003",nombre:"Luis Fernando Yepes",cargo:"Supervisor técnico",dep:"Excavación",estado:"En descanso",turno:"Especial"}],
 asist:[{tr:"TR-001",fecha:today(),in:"06:02",out:""}],
 pagos:[{id:"PAY-102",tr:"TR-001",tipo:"Sueldo base",valor:1450000,fecha:"15/11/2026"},{id:"BON-089",tr:"TR-003",tipo:"Bono pureza oro",valor:350000,fecha:"17/11/2026"},{id:"PAY-101",tr:"TR-002",tipo:"Sueldo base",valor:1450000,fecha:"31/10/2026"}],
 presupuesto:45000000,
 gastos:[{id:"GA-001",c:"Combustible",d:"Combustible para transporte de mineral",v:1200000,fecha:"14/11/2026"},{id:"GA-002",c:"Herramientas",d:"Reposición de herramientas de excavación",v:850000,fecha:"12/11/2026"},{id:"GA-003",c:"Mantenimiento",d:"Mantenimiento de plantas de lavado",v:640000,fecha:"10/11/2026"}],
 nov:[{id:"NV-001",t:"Cambio preventivo de mallas de cribado en Zona Alfa",fecha:"17/11/2026"},{id:"NV-002",t:"Corte de energía programado en procesamiento",fecha:"10/11/2026"}]}}
let mem=null;
function load(){try{const s=localStorage.getItem(KEY);if(s)return JSON.parse(s)}catch(e){}return mem||seed()}
let S=load();
function save(){mem=S;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function nid(k,p,w=3){S.seq[k]++;return p+String(S.seq[k]).padStart(w,"0")}
let SESSION=null;try{SESSION=JSON.parse(sessionStorage.getItem("yt_session")||"null")}catch(e){}
function setSession(u){SESSION=u;try{u?sessionStorage.setItem("yt_session",JSON.stringify(u)):sessionStorage.removeItem("yt_session")}catch(e){}}
const USERS={cliente:{correo:"cliente@ejemplo.com",nombre:"Laura Gómez",cl:"CL-001",desc:"Consultar sus solicitudes y registrar compra, venta o refinación de oro."},
 vendedor:{correo:"vendedor@ejemplo.com",nombre:"Diana Castro",tr:"TR-002",desc:"Gestionar solicitudes, clientes, compras y refinación."},
 trabajador:{correo:"trabajador@ejemplo.com",nombre:"Carlos Duarte",tr:"TR-001",desc:"Registrar su jornada y la producción diaria de oro."},
 administrador:{correo:"admin@ejemplo.com",nombre:"Administración",desc:"Acceso completo: operación, personal, inventario y presupuesto."}};
const ROLE_LABEL={cliente:"Cliente",vendedor:"Vendedor",trabajador:"Trabajador",administrador:"Administrador"};
