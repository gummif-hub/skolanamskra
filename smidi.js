/* Sameiginleg föll fyrir tólið (index.html) og skólanámskrána (skolanamskra.html). */
var STIG=[[1,2,3,4],[5,6,7],[8,9,10]];
var stigOf=g=>g<=4?0:g<=7?1:2, endOf=g=>[4,7,10][stigOf(g)];
var PRIM=/^(íslenska$|stærðfr|enska|danska|náttúru|samfélagsfr|myndmennt|sjónlist|hönnun|textíl|skólaíþr|upplýsinga|heimilisfr|tónmennt|dans|leiklist)/i;
var NAMSMAT10={
  heimild:'Drög að ákvæði til bráðabirgða í aðalnámskrá grunnskóla (2026–2027) og stuðningsefni MMS um talnakvarða og vægi flokka (sept. 2026)',
  frestur:'2027-01-10',
  kvardi:[['4','Hefur ekki náð tökum á viðmiðunum. Skólinn bregst við með aðlögun náms og auknum stuðningi og gerir sérstaka grein fyrir hæfni nemandans.'],
          ['5','Hefur að nokkru leyti náð tökum á viðmiðunum og þarf frekari þjálfun.'],
          ['6','Hefur að miklu leyti náð tökum á viðmiðunum en þarf enn stuðning við ákveðna þætti.'],
          ['7','Hefur náð tökum á viðmiðunum – hæfniviðmiðum flokksins er náð.'],
          ['8','Hefur náð viðmiðunum og sýnt að einhverju leyti hæfni umfram þau.'],
          ['9','Hefur náð viðmiðunum og sýnt að miklu leyti hæfni umfram þau.'],
          ['10','Framúrskarandi hæfni: sýnir hæfni sem er að langmestu leyti umfram viðmiðin.']],
  atridi:['Á skólaárinu er námsmat á talnakvarðanum 1–10. Einkunnir eru alltaf gefnar í heilum tölum.',
          'Einkunnir 1–3 eru ekki birtar nemendum og forsjáraðilum. Lægsta birta einkunn er 4, og þá bregst skólinn við með stuðningi.',
          'Einkunnir eru gefnar fyrir flokka hæfniviðmiða í hverju greinasviði, á hverju námstímabili. Þannig sést framvinda í hverjum flokki yfir skólaárið.',
          'Við brautskráningu er gefin einkunn á kvarðanum 4–10 fyrir hvern flokk. Hún byggir á heildstæðu faglegu mati út frá hæfniviðmiðum flokksins og fjölbreyttum matsgögnum, ekki eingöngu á meðaltali einstakra verkefna eða prófa.',
          'Lokaeinkunn greinasviðs er vegið meðaltal einkunna flokkanna samkvæmt vægi hér að neðan, námunduð að næstu heilu tölu.',
          'Í íslensku, ensku og stærðfræði er einkunnin 7 lágmarksviðmið til að hefja nám á 2. hæfniþrepi í framhaldsskóla.',
          'Gefnar eru tvær einkunnir fyrir list- og verkgreinar: ein fyrir listgreinar og ein fyrir verkgreinar.',
          'Matsviðmið 10. bekkjar í köflum 19–26 í aðalnámskrá eru ekki í notkun skólaárið 2026–2027.',
          'Nemendur sem stunda nám samkvæmt einstaklingsnámskrá fá einkunnir 4–10 miðað við matsviðmið einstaklingsnámskrárinnar (sbr. kafla 9.7 í aðalnámskrá).']};
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
  const namskrar=grunn.namskrar.map(n=>{const t=txtOf(akv,n);return {id:n.id,argangur:n.argangur,heiti:n.heiti,breytt:!!(akv.texti||{})[n.id],svid:n.svid,prim:PRIM.test(n.heiti),vidf:t.vidf,kh:t.kh,kf:t.kf,gogn:t.gogn,mat:t.mat}});
  return {samsett:SAMSETT,n10:NAMSMAT10,fyrirvari:akv.stillingar.fyrirvari!==false,stillingar:{skoli:akv.stillingar.skoli,skolaar:akv.stillingar.skolaar,merki:akv.stillingar.merki},
    namsmat:akv.stillingar.namsmat||'',dags:(d=>`${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`)(new Date(akv.breytt||Date.now())),drog:nStad<totKeys(grunn),svid,forg,namskrar};
}
