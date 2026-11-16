/* Sameiginleg föll fyrir tólið (index.html) og skólanámskrána (skolanamskra.html). */
var STIG=[[1,2,3,4],[5,6,7],[8,9,10]];
var stigOf=g=>g<=4?0:g<=7?1:2, endOf=g=>[4,7,10][stigOf(g)];
var PRIM=/^(íslenska$|stærðfr|enska|danska|náttúru|samfélagsfr|myndmennt|sjónlist|hönnun|textíl|skólaíþr|upplýsinga|heimilisfr|tónmennt|dans|leiklist)/i;
var NAMSMAT10={
  heimild:'Breyting á aðalnámskrá grunnskóla: ákvæði til bráðabirgða um talnakvarða í námsmati við lok grunnskóla skólaárið 2026–2027, staðfest og birt í Stjórnartíðindum í nóvember 2026 (frétt mennta- og barnamálaráðuneytisins 13.11.2026), og stuðningsefni MMS',
  stadfest:true,
  frestur:'2027-01-31', frestur_texti:'31. janúar 2027', birting_texti:'fyrir brautskráningu vorið 2027', gildir_til:'1. júlí 2027',
  kvardi:[['4','Nemandi hefur ekki náð þeirri hæfni sem stefnt er að. Skólinn lýsir sérstaklega því sem nemandinn hefur náð tökum á.'],
          ['5','Nemandi er á leið að hæfninni. Með einkunnina 5 í íslensku, stærðfræði eða ensku tekur nemandi undirbúningsáfanga í greininni í framhaldsskóla.'],
          ['6','Nemandi er á leið að hæfninni. Með einkunnina 6 í íslensku, stærðfræði eða ensku tekur nemandi undirbúningsáfanga í greininni í framhaldsskóla.'],
          ['7','Nemandi hefur náð þeirri hæfni sem stefnt er að.'],
          ['8','Nemandi sýnir meiri dýpt, öryggi og sjálfstæði við að beita hæfninni.'],
          ['9','Nemandi sýnir mikla dýpt, öryggi og sjálfstæði við að beita hæfninni.'],
          ['10','Nemandi sýnir framúrskarandi hæfni og stöðuga frammistöðu. Hann vinnur af miklu öryggi og sjálfstæði og getur túlkað, metið og nýtt þekkingu sína við fjölbreyttar og krefjandi aðstæður. Ekki er gerð krafa um hæfni umfram þá sem krafist er í grunnskóla, né að nemandi ljúki framhaldsskólaáfanga.']],
  atridi:['Á skólaárinu er kvarðinn 1–10 notaður við námsmat, svo sem fyrir einstök verkefni og próf. Einkunn fyrir verkefni lýsir frammistöðu í því verkefni; t.d. merkir 7,5 að 75% árangri hafi verið náð.',
          'Einkunnir eru gefnar fyrir flokka hæfniviðmiða í hverju greinasviði, á hverju námstímabili. Þannig sést framvinda í hverjum flokki yfir skólaárið.',
          'Lokaeinkunn við brautskráningu er gefin á kvarðanum 4–10. Einkunnirnar 1–3 eru ekki notaðar í lokaeinkunn.',
          'Lokaeinkunn er heildstætt mat á þekkingu, leikni og hæfni nemandans yfir skólaárið, með hliðsjón af hæfniviðmiðum aðalnámskrár og fjölbreyttum matsgögnum. Hún er ekki einkunn fyrir eitt lokapróf.',
          'Lokaeinkunn greinasviðs er vegið meðaltal einkunna flokkanna samkvæmt vægi hér að neðan, námunduð að næstu heilu tölu.',
          'Einkunnin 7 merkir að nemandi hafi náð þeirri hæfni sem stefnt er að. Nemandi með 5 eða 6 í íslensku, stærðfræði eða ensku tekur undirbúningsáfanga í greininni í framhaldsskóla.',
          'Gefnar eru tvær einkunnir fyrir list- og verkgreinar: ein fyrir listgreinar og ein fyrir verkgreinar.',
          'Matsviðmið 10. bekkjar í köflum 19–26 í aðalnámskrá eru ekki í notkun skólaárið 2026–2027.',
          'Nemendur sem stunda nám samkvæmt einstaklingsnámskrá fá einkunnir 4–10 miðað við markmið einstaklingsnámskrárinnar (sbr. kafla 9.7 í aðalnámskrá).',
          'Ákvæðið gildir skólaárið 2026–2027, til 1. júlí 2027.']};
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
