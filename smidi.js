/* Sameiginleg föll fyrir tólið (index.html) og skólanámskrána (skolanamskra.html). */
var STIG=[[1,2,3,4],[5,6,7],[8,9,10]];
var stigOf=g=>g<=4?0:g<=7?1:2, endOf=g=>[4,7,10][stigOf(g)];
var PRIM=/^(íslenska$|stærðfr|enska|danska|náttúru|samfélagsfr|myndmennt|sjónlist|hönnun|textíl|skólaíþr|upplýsinga|heimilisfr|tónmennt|dans|leiklist)/i;
var NAMSMAT10={
  heimild:'Ákvæði til bráðabirgða í aðalnámskrá grunnskóla um einkunnagjöf í 10. bekk og vitnisburð við brautskráningu skólaárið 2026–2027 (staðfest og birt í Stjórnartíðindum í nóvember 2026)',
  stadfest:true,
  frestur:'2027-01-31', frestur_texti:'31. janúar 2027', birting_texti:'fyrir brautskráningu úr 10. bekk vorið 2027', gildir_til:'1. júlí 2027',
  kvardi:[['4','Hæfniviðmiðum flokksins hefur ekki verið náð. Skólinn gerir sérstaklega grein fyrir hæfni nemandans.'],
          ['5','Stigvaxandi hæfni á leið að því að hæfniviðmiðum flokksins sé náð.'],
          ['6','Stigvaxandi hæfni á leið að því að hæfniviðmiðum flokksins sé náð.'],
          ['7','Hæfniviðmiðum flokksins hefur verið náð.'],
          ['8','Stigvaxandi dýpt, öryggi, sjálfstæði og beiting þeirrar hæfni sem hæfniviðmið flokksins ná yfir.'],
          ['9','Stigvaxandi dýpt, öryggi, sjálfstæði og beiting þeirrar hæfni sem hæfniviðmið flokksins ná yfir.'],
          ['10','Framúrskarandi hæfni og stöðug frammistaða þar sem nemandi sýnir mikið öryggi og sjálfstæði. Nemandi getur túlkað, metið og hagnýtt þekkingu sína og leikni á markvissan, gagnrýninn og skapandi hátt, stutt mál sitt með skýrum rökum og beitt hæfni sinni með sveigjanlegum og ábyrgum hætti við fjölbreyttar og krefjandi aðstæður.']],
  atridi:['Á skólaárinu er talnakvarðinn 1–10 notaður við námsmat, svo sem fyrir einstök verkefni og próf. Einkunn fyrir verkefni lýsir frammistöðu í því verkefni; t.d. getur 7,5 merkt 75% árangur.',
          'Einkunnir eru gefnar fyrir flokka hæfniviðmiða í hverju greinasviði, á hverju námstímabili. Þannig sést framvinda í hverjum flokki yfir skólaárið.',
          'Við brautskráningu er gefin einkunn á kvarðanum 4–10 fyrir flokka hæfniviðmiða allra greinasviða, að jafnaði ein einkunn fyrir hvern flokk.',
          'Einkunn byggist á heildstæðu faglegu mati á þekkingu, leikni og hæfni nemandans með hliðsjón af hæfniviðmiðum flokksins og fjölbreyttum matsgögnum. Hún ákvarðast ekki eingöngu af reiknuðu meðaltali einstakra verkefna eða prófa.',
          'Lokaeinkunn greinasviðs er vegið meðaltal einkunna flokkanna samkvæmt vægi hér að neðan, námunduð að næstu heilu tölu. Lokaeinkunn er mat á hæfni eftir heilt skólaár, ekki einkunn fyrir eitt lokapróf.',
          'Nemendur sem fá 7–10 í íslensku, ensku og stærðfræði búa að jafnaði yfir hæfni til að hefja nám í þeim greinum á öðru hæfniþrepi í framhaldsskóla. Að öðru leyti fer um tengsl við hæfniþrep framhaldsskóla samkvæmt kafla 9.5 í aðalnámskrá.',
          'Gefnar eru tvær einkunnir vegna list- og verkgreina: ein fyrir listgreinar og önnur fyrir verkgreinar (sbr. kafla 21.4).',
          'Matsviðmið 10. bekkjar í köflum 19–26 í aðalnámskrá eru ekki í notkun skólaárið 2026–2027.',
          'Um námsmat nemenda sem stunda nám samkvæmt einstaklingsnámskrá fer samkvæmt kafla 9.7 í aðalnámskrá. Vitnisburður lýsir námsframvindu og stöðu gagnvart hæfniviðmiðum einstaklingsnámskrárinnar.',
          'Ákvæðið gildir fyrir skólaárið 2026–2027.']};
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
