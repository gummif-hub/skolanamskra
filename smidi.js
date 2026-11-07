/* Sameiginleg föll fyrir tólið (index.html) og skólanámskrána (skolanamskra.html). */
var STIG=[[1,2,3,4],[5,6,7],[8,9,10]];
var stigOf=g=>g<=4?0:g<=7?1:2, endOf=g=>[4,7,10][stigOf(g)];
var PRIM=/^(íslenska$|stærðfr|enska|danska|náttúru|samfélagsfr|myndmennt|sjónlist|hönnun|textíl|skólaíþr|upplýsinga|heimilisfr|tónmennt|dans|leiklist)/i;
var SAMSETT=[['Listgreinar – lokaeinkunn í vitnisburði',[['Dans',.1],['Sviðslistir',.2],['Sjónlistir',.5],['Tónmennt',.2]]],['Verkgreinar – lokaeinkunn í vitnisburði',[['Heimilisfræði',.4],['Hönnun og smíði',.3],['Textílmennt',.3]]]];
function vaegiOf(grunn,akv,sid,flokkur,g){
  const k=`${sid}|${flokkur}|${endOf(g)}`; if(akv.vaegi&&akv.vaegi[k]!=null) return akv.vaegi[k];
  const s=grunn.svid.find(s=>s.id===sid); const f=s&&s.flokkar.find(f=>f.heiti===flokkur); return f?f.vaegi[String(endOf(g))]:null;
}
function txtOf(akv,n){
  const o=(akv.texti||{})[n.id]||{}; const L=v=>typeof v==='string'?v.split('\n').map(x=>x.trim()).filter(Boolean):v;
  return {vidf:o.vidf!=null?L(o.vidf):n.vidf,kh:o.kh!=null?o.kh:n.kh,kf:o.kf!=null?o.kf:n.kf,gogn:o.gogn!=null?L(o.gogn):n.gogn,mat:o.mat!=null?o.mat:n.mat};
}
function totKeys(grunn){return grunn.svid.reduce((a,s)=>a+[0,1,2].filter(st=>s.flokkar.some(f=>f.yfirheiti.some(y=>y.vidmid.some(v=>v.stig===st)))).length,0)}
function buildPub(grunn,akv){
  const nStad=Object.values(akv.stadfest||{}).filter(Boolean).length;
  const svid=grunn.svid.map(s=>({id:s.id,heiti:s.heiti,kafli:s.kafli,url:s.url,flokkar:s.flokkar.map(f=>({heiti:f.heiti,
    vaegi:Object.fromEntries([4,7,10].map(g=>[String(g),vaegiOf(grunn,akv,s.id,f.heiti,g)])),
    yfirheiti:f.yfirheiti.map(y=>({heiti:y.heiti,vidmid:y.vidmid.map(v=>({id:v.id,stig:v.stig,texti:v.texti}))}))}))}));
  const forg={}; Object.entries(akv.forgangur||{}).forEach(([k,v])=>{if(Object.keys(v).length)forg[k]=v});
  const namskrar=grunn.namskrar.map(n=>{const t=txtOf(akv,n);return {argangur:n.argangur,heiti:n.heiti,svid:n.svid,prim:PRIM.test(n.heiti),vidf:t.vidf,kh:t.kh,kf:t.kf,gogn:t.gogn,mat:t.mat}});
  return {samsett:SAMSETT,stillingar:{skoli:akv.stillingar.skoli,skolaar:akv.stillingar.skolaar,merki:akv.stillingar.merki},
    namsmat:akv.stillingar.namsmat||'',dags:new Date(akv.breytt||Date.now()).toLocaleDateString('is-IS'),drog:nStad<totKeys(grunn),svid,forg,namskrar};
}
