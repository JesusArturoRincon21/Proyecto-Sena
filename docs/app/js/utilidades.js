"use strict";
/* ============ utilidades ============ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cop=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n||0);
const num=(n,d=2)=>new Intl.NumberFormat("es-CO",{minimumFractionDigits:d,maximumFractionDigits:d}).format(n);
const pad=n=>String(n).padStart(2,"0");
const today=()=>{const d=new Date();return pad(d.getDate())+"/"+pad(d.getMonth()+1)+"/"+d.getFullYear()};
const isoToEs=v=>v?v.split("-").reverse().join("/"):"";
const todayIso=()=>{const d=new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())};
const nowT=()=>{const d=new Date();return pad(d.getHours())+":"+pad(d.getMinutes())};
const PUREZA={10:41.67,14:58.33,18:75,20:83.33,22:91.67,24:99.9};
const SERVICIOS=[
 {n:"Compra de oro",d:"Valoración técnica de peso, quilates y pureza. Oferta sujeta a ensayo y aceptación.",p:"Sin costo de valoración"},
 {n:"Refinación",d:"Procesamiento de material aurífero y registro de gramos recuperados y pureza final.",p:"Desde $180.000 COP por lote"},
 {n:"Venta de oro",d:"Consulta de lingotes, oro en polvo y barras, con existencias y precios, antes de solicitar tu compra.",p:"Según producto seleccionado"}];
const ESTADOS=["Pendiente","En proceso","Finalizada"];
const ICON={
 home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
 flow:'<path d="M21 12a9 9 0 0 0-15-6.7L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15 6.7L21 16"/><path d="M16 16h5v5"/>',
 gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6z"/>',box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 tool:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4z"/>',
 img:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
 file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a7 7 0 0 1 4 7"/>',
 layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17.5l9 5 9-5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 dollar:'<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',check:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
 out:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>',pick:'<path d="M3 21 14 10M12 3c5 0 9 3 9 8l-4-1-2 2-3-3z"/>'};
const ico=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||""}</svg>`;
const GAL=["img/galeria-1.jpg","img/galeria-2.jpg","img/galeria-3.jpg","img/galeria-4.jpg","img/galeria-5.jpg","img/galeria-6.jpg"];
