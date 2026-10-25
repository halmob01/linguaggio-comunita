'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {epica:D}=require('../epica-dati.js');
const {comunita:story}=require('../storia.js');
const art=require('../epica-arte.js');

const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8');
const arContext={};vm.runInNewContext(read('epica-ar.js'),arContext);
const AR=arContext.EpicaArabic;
const slides=D.chapters.flatMap(c=>c.slides);
const TRADITIONS=['gilgamesh','odissea','eneide','shahnameh','hilal'];
const KINDS=['text','idcard','values','check','epithet','ingredients','map','move1','move2','answers','network','move3','poem1','poem2'];

test('struttura: 6 capitoli, id univoci e tipi noti',()=>{
  assert.equal(D.chapters.length,6);
  assert.equal(new Set(slides.map(s=>s.id)).size,slides.length);
  for(const s of slides){assert.ok(KINDS.includes(s.kind),s.id);}
  assert.ok(slides.length>=50&&slides.length<=70,'numero di schermate: '+slides.length);
  assert.equal(D.traditions.length,5);
  assert.deepEqual(D.traditions.map(t=>t.id),TRADITIONS);
});

test('testi brevi: al massimo 320 caratteri di corpo per schermata',()=>{
  for(const s of slides){
    const body=(s.body||[]).join(' ');
    assert.ok(body.length<=320,`${s.id}: ${body.length} caratteri`);
    assert.ok((s.body||[]).length<=3,s.id);
  }
  for(const s of slides)if(s.keyword)assert.ok(s.keyword.term&&s.keyword.definition.length>10,s.id);
});

test('ogni tradizione: carta d’identità, due slide di storia, valori e verifica',()=>{
  for(const id of TRADITIONS){
    const mine=slides.filter(s=>s.tradition===id);
    assert.deepEqual(mine.map(s=>s.id),[`${id}_id`,`${id}_1`,`${id}_2`,`${id}_valori`,`${id}_check`],id);
    assert.deepEqual(mine.map(s=>s.kind),['idcard','text','text','values','check'],id);
    assert.equal(mine[0].rows.length,5);
    assert.deepEqual(mine[0].rows.map(r=>r[0]),['Popolo','Luogo','Quando','Come ci è arrivata','Eroe']);
    assert.ok(mine[3].values.length>=3&&mine[3].question&&mine[3].answer);
  }
});

test('verifiche e prima mossa: 3 opzioni, una sola corretta, feedback specifico, nessun indizio di lunghezza o posizione',()=>{
  const items=[];
  for(const s of slides.filter(x=>x.kind==='check'))items.push({id:s.id,options:s.options});
  for(const h of TRADITIONS)items.push({id:'m1_'+h,options:D.game.move1[h].options});
  assert.equal(items.length,10);
  const positions=[0,0,0];let longest=0;
  for(const it of items){
    assert.equal(it.options.length,3,it.id);
    assert.equal(it.options.filter(o=>o.correct).length,1,it.id);
    for(const o of it.options){assert.ok(o.label.length>10,it.id);assert.ok(o.feedback.length>=40,`${it.id}/${o.id} feedback troppo breve`);}
    const ci=it.options.findIndex(o=>o.correct);positions[ci]++;
    const lens=it.options.map(o=>o.label.length),max=Math.max(...lens);
    if(lens[ci]===max&&lens.filter(l=>l===max).length===1)longest++;
  }
  for(const n of positions)assert.ok(n>=2&&n<=5,'posizione corretta troppo sbilanciata: '+positions);
  assert.ok(longest<=4,'la risposta corretta è la più lunga in '+longest+' item su 10');
});

test('mossa 2: ogni domanda valuta tutti gli eroi e ogni eroe compare in più domande',()=>{
  const qs=D.game.questions;
  assert.deepEqual(qs.map(q=>q.id),['A','B','C']);
  const strong=Object.fromEntries(TRADITIONS.map(h=>[h,0])),linked=Object.fromEntries(TRADITIONS.map(h=>[h,0]));
  for(const q of qs){
    assert.deepEqual(Object.keys(q.heroes).sort(),[...TRADITIONS].sort(),q.id);
    for(const h of TRADITIONS){
      const e=q.heroes[h];
      assert.ok(['forte','possibile','debole'].includes(e.level));assert.ok(e.feedback.length>=30,q.id+h);
      if(e.level==='forte')strong[h]++;
      if(e.level!=='debole')linked[h]++;
    }
    const forti=TRADITIONS.filter(h=>q.heroes[h].level==='forte');
    assert.ok(forti.length>=2,q.id);
    for(const h of forti){assert.ok(q.answers[h]?.answer.length>=25&&q.answers[h]?.value,q.id+h);}
    assert.deepEqual(Object.keys(q.answers).sort(),[...forti].sort(),'risposte diverse solo per gli eroi centrali');
    assert.ok(q.short.length<=18,'etichetta breve della rete: '+q.short);
  }
  for(const h of TRADITIONS){assert.ok(strong[h]>=1,h+' mai centrale');assert.ok(linked[h]>=2,h+' in meno di due domande');}
});

test('mossa 3: le situazioni coincidono con l’attività 1',()=>{
  const sceneOf=id=>story.scenes.find(s=>s.id===id);
  for(const [id,m] of Object.entries(D.game.move3)){
    const sc=sceneOf(id);assert.ok(sc,id);
    assert.equal(m.title,sc.title);
    assert.deepEqual(m.choices.map(c=>c.id),sc.choices.map(c=>c.id));
    assert.deepEqual(m.choices.map(c=>c.label),sc.choices.map(c=>c.label),id+' etichette diverse da storia.js');
    assert.ok(['A','B','C'].includes(m.closest));
    assert.deepEqual(Object.keys(m.comment),['A','B','C']);
    assert.ok(slides.some(s=>s.kind==='move3'&&s.scene===id));
  }
  const patto=sceneOf('patto');
  assert.deepEqual(D.patto.map(c=>c.id),patto.choices.map(c=>c.id));
  assert.deepEqual(D.patto.map(c=>c.label),patto.choices.map(c=>c.label));
  for(const [k,v] of Object.entries(D.game.poem.fromPatto)){assert.ok(patto.choices.some(c=>c.id===k));assert.ok(D.game.poem.values.some(x=>x.id===v));}
  for(const k of ['difesa','famiglie','aiuto_esterno','default'])assert.ok(D.game.poem.pericoloLines[k]);
});

test('nessuna anticipazione: Ettore compare solo nell’ultima schermata, in italiano e in arabo',()=>{
  const where=(obj,needle,trail=[])=>{
    const out=[];
    const walk=(v,p)=>{if(typeof v==='string'){if(v.includes(needle))out.push(p.join('.'));}else if(Array.isArray(v))v.forEach((x,i)=>walk(x,[...p,i]));else if(v&&typeof v==='object')for(const k of Object.keys(v))walk(v[k],[...p,k]);};
    walk(obj,trail);return out;
  };
  const it=where(D.chapters,'Ettore');
  assert.equal(it.length,1,'Ettore: '+it);assert.ok(it[0].startsWith('5.slides.1.'),it[0]);
  const ar=where(AR.slides,'هكتور');
  assert.equal(ar.length,1);assert.ok(ar[0].startsWith('c6_ettore'));
  assert.deepEqual(where(D.game,'Ettore'),[]);assert.deepEqual(where(AR.game,'هكتور'),[]);
  for(const bad of ['uccide Ettore','morte di Ettore','Achille uccide','uccisione di Ettore','Patroclo'])assert.deepEqual(where(D,bad),[],bad);
  assert.ok(!JSON.stringify(D).includes('Iliade')||where(D.chapters,'Iliade').every(p=>p.startsWith('5.')),'l’Iliade compare solo come anticipazione finale');
});

/* Traduzione araba */
function leaves(v,p=[],out=[]){
  if(typeof v==='string')out.push(p.join('.'));
  else if(Array.isArray(v))v.forEach((x,i)=>leaves(x,[...p,i],out));
  else if(v&&typeof v==='object')for(const k of Object.keys(v))leaves(v[k],[...p,k],out);
  return out;
}
const get=(o,p)=>p.split('.').reduce((a,k)=>a==null?a:a[k],o);
const TEXT_FIELDS=['title','body','lead','keyword','rows','note','values','question','answer','options','cards','legend','feedback'];

test('arabo: ogni testo di ogni schermata ha la sua traduzione e la stessa struttura',()=>{
  for(const s of slides){
    const tr=AR.slides[s.id];
    const hasText=TEXT_FIELDS.some(f=>s[f]!==undefined);
    if(['move1','move2','answers','move3'].includes(s.kind)){assert.equal(tr,undefined,s.id+': i testi del gioco stanno in game');continue;}
    if(!hasText)continue;
    assert.ok(tr,'manca la traduzione di '+s.id);
    for(const f of TEXT_FIELDS){
      if(s[f]===undefined)continue;
      assert.ok(tr[f]!==undefined,`${s.id}.${f}`);
      const a=leaves(s[f],[f]).filter(p=>!/\.(id|correct)$/.test(p)&&!/^options\.\d+\.(id|correct)$/.test(p));
      const b=leaves(tr[f],[f]);
      // le opzioni delle verifiche portano solo label/feedback; gli id restano dall'italiano
      const aText=a.filter(p=>!/\.id$/.test(p));
      assert.deepEqual(b.sort(),aText.sort(),`${s.id}.${f}: struttura diversa`);
      for(const p of b){assert.ok(String(get(tr,p)).trim().length>0,`${s.id}.${p}`);assert.ok(/[؀-ۿ]/.test(get(tr,p))||/^[\d\s.,·()]+$/.test(get(tr,p)),`${s.id}.${p} senza caratteri arabi`);}
    }
  }
  for(const c of D.chapters)assert.ok(/[؀-ۿ]/.test(AR.chapters[c.id]),c.id);
  for(const t of D.traditions)for(const k of ['name','place','hero'])assert.ok(/[؀-ۿ]/.test(AR.traditions[t.id][k]),t.id+k);
});

test('arabo: gioco, domande, proemio e patto tradotti per intero',()=>{
  const g=D.game,a=AR.game;
  for(const h of TRADITIONS){
    assert.ok(a.move1[h].moment.length>20);
    assert.equal(a.move1[h].options.length,3);
    a.move1[h].options.forEach((o,i)=>{assert.ok(o.label&&o.feedback.length>20);assert.equal(o.correct,undefined);});
  }
  g.questions.forEach((q,i)=>{
    const t=a.questions[i];assert.ok(t.short&&t.text);
    for(const h of TRADITIONS)assert.ok(t.heroes[h].feedback.length>15,q.id+h);
    for(const h of Object.keys(q.answers)){assert.ok(t.answers[h].answer&&t.answers[h].value,q.id+h);}
    assert.deepEqual(Object.keys(t.answers).sort(),Object.keys(q.answers).sort());
  });
  for(const k of ['forte','possibile','debole'])assert.ok(a.levels[k]);
  for(const [id,m] of Object.entries(g.move3)){
    const t=a.move3[id];assert.ok(t.title&&t.eyebrow&&t.heroes);assert.equal(t.choices.length,m.choices.length);
    for(const k of ['A','B','C'])assert.ok(t.comment[k].length>20,id+k);
  }
  assert.equal(a.poem.values.length,g.poem.values.length);assert.equal(a.poem.epithets.length,g.poem.epithets.length);
  for(const k of Object.keys(g.poem.pericoloLines))assert.ok(a.poem.pericoloLines[k]);
  for(const k of ['opening','mid','closing'])assert.ok(a.poem.lines[k]);
  assert.equal(AR.patto.length,D.patto.length);
  // coerenza con le etichette arabe già presenti nell'attività 1
  const arA1={};vm.runInNewContext(read('ar.js'),arA1);
  const sc=arA1.ComunitaArabic.scenes;
  D.patto.forEach((c,i)=>assert.equal(AR.patto[i].label,sc.patto.choices[c.id].label));
  for(const [id,m] of Object.entries(g.move3))m.choices.forEach((c,i)=>assert.equal(a.move3[id].choices[i].label,sc[id].choices[c.id].label,id+c.id));
});

test('arabo: tutte le stringhe dell’interfaccia usate da epica-app.js hanno una traduzione',()=>{
  const src=read('epica-app.js');
  const used=new Set();
  for(const m of src.matchAll(/\bt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)){
    for(const q of m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g))used.add(q[1].replace(/\\'/g,"'"));
  }
  used.add(D.title);
  assert.ok(used.size>30,'estrazione delle stringhe: '+used.size);
  const missing=[...used].filter(s=>!(s in AR.ui)&&!['Navigazione'].includes(s)||(!(s in AR.ui)));
  assert.deepEqual(missing,[],'stringhe senza traduzione');
});

test('illustrazioni: ogni immagine usata esiste e produce SVG valido',()=>{
  const keys=new Set(slides.map(s=>s.art).filter(Boolean));
  for(const t of D.traditions)keys.add(t.emblem);
  keys.add('racconto');
  for(const k of keys){
    const svg=art.markup(k);
    assert.ok(svg.startsWith('<svg')&&svg.endsWith('</svg>'),k);
    assert.ok(!svg.includes('undefined')&&!svg.includes('NaN'),k);
    assert.ok(svg.includes('viewBox="0 0 480 270"'),k);
  }
  const names=Object.fromEntries(D.traditions.map(t=>[t.id,t.name])),places=Object.fromEntries(D.traditions.map(t=>[t.id,t.place]));
  for(const o of [{labels:{names,places}},{labels:{names,places},highlight:'hilal'},{compact:true,highlight:'odissea',labels:{names,places}}]){
    const svg=art.markup('mappa',o);assert.ok(svg.includes('<svg')&&!svg.includes('undefined')&&!svg.includes('NaN'));
    for(const t of D.traditions)assert.ok(svg.includes(places[t.id])||o.compact);
  }
  const net=art.markup('rete',{heroes:D.traditions.map(t=>({id:t.id,name:t.hero})),questions:D.game.questions.map(q=>({id:q.id,short:q.short,levels:Object.fromEntries(Object.entries(q.heroes).map(([h,v])=>[h,v.level]))}))});
  assert.ok(!net.includes('undefined')&&!net.includes('NaN'));
  assert.equal((net.match(/stroke-dasharray/g)||[]).length,D.game.questions.flatMap(q=>Object.values(q.heroes)).filter(h=>h.level==='possibile').length);
});

test('pagina e script nell’ordine giusto; l’attività 2 non scrive i dati dell’attività 1',()=>{
  const html=read('epica.html');
  const scripts=Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g),m=>m[1]);
  assert.deepEqual(scripts,['epica-dati.js','epica-arte.js','epica-ar.js','epica-app.js']);
  for(const f of scripts){assert.ok(fs.existsSync(path.join(__dirname,'..',f)));new vm.Script(read(f),{filename:f});}
  assert.ok(html.includes('href="epica.css"'));assert.ok(fs.existsSync(path.join(__dirname,'..','epica.css')));
  const app=read('epica-app.js');
  const writes=[...app.matchAll(/setItem\(([^,]+),/g)].map(m=>m[1].trim());
  assert.ok(writes.length>=2);
  for(const w of writes)assert.ok(['KEY','LANGKEY'].includes(w),'scrittura su una chiave inattesa: '+w);
  assert.ok(app.includes("'linguaggio-epica-session-v1'"));
  assert.ok(!/removeItem\((?!KEY)/.test(app));
  const a1=read('comunita-app.js');
  assert.ok(a1.includes("linguaggio-comunita-session-v2"));assert.ok(!a1.includes('linguaggio-epica'));
});

/* Prova dell'interfaccia con un DOM minimo: percorre tutta l'attività in italiano e in arabo */
function boot({lang='it',store={}}={}){
  const handlers={};
  const classes=new Set();
  const root={innerHTML:'',_h:{},addEventListener(t,f){this._h[t]=f;},querySelector(){return null;},querySelectorAll(){return [];}};
  const storage={...store};
  const win={
    scrollY:0,scrollTo(){},
    EpicaDati:{epica:D},EpicaArte:art,EpicaArabic:AR
  };
  const doc={
    getElementById:id=>id==='root'?root:null,
    addEventListener(t,f){handlers[t]=f;},
    activeElement:null,
    documentElement:{lang:'',dir:''},
    title:'',
    body:{classList:{toggle:(c,on)=>on?classes.add(c):classes.delete(c)}}
  };
  const ls={getItem:k=>(k in storage?storage[k]:null),setItem:(k,v)=>{storage[k]=String(v);},removeItem:k=>{delete storage[k];}};
  if(lang==='ar')storage['linguaggio-comunita-language']='ar';
  const ctx=vm.createContext({window:win,document:doc,localStorage:ls,console});
  ctx.window=win;
  vm.runInContext(read('epica-app.js'),ctx,{filename:'epica-app.js'});
  const click=(attrs)=>{
    const btn={dataset:attrs,disabled:false,closest(sel){return sel==='[data-act]'?btn:null;}};
    root._h.click({target:btn});
  };
  return {root,storage,click,classes,doc,key:(k)=>handlers.keydown({key:k})};
}
const attr=(html,name)=>[...html.matchAll(new RegExp(`<button[^>]*data-act="${name}"([^>]*)>`,'g'))].map(m=>{
  const o={act:name};for(const a of m[1].matchAll(/data-([a-z0-9-]+)="([^"]*)"/g))o[a[1]]=a[2];o._disabled=/\sdisabled(\s|$)/.test(m[1]);return o;});
const dset=o=>{const {_disabled,...rest}=o;return rest;};

function walk(env){
  const seen=[];
  env.click({act:'start'});
  for(let guard=0;guard<200;guard++){
    const html=env.root.innerHTML;
    const kind=(html.match(/data-kind="([^"]+)"/)||[])[1];
    const id=JSON.parse(env.storage['linguaggio-epica-session-v1']).slide;
    seen.push(id);
    assert.ok(html.includes('id="ev-title"'),id);
    assert.ok(!html.includes('undefined')&&!html.includes('NaN')&&!html.includes('[object'),id+' contiene un valore non definito');
    const next=attr(html,'next')[0];
    // all'inizio una schermata interattiva è bloccata
    if(['check','move1','move2','move3','epithet'].includes(kind))assert.ok(next._disabled,`${id}: si deve rispondere prima di proseguire`);
    if(kind==='check'||kind==='move1'){
      const picks=attr(html,'pick').filter(o=>!o._disabled);assert.equal(picks.length,3,id);
      env.click(dset(picks[0]));
      let h=env.root.innerHTML;
      assert.ok(!attr(h,'next')[0]._disabled,id+': dopo il primo tentativo si può proseguire');
      for(let k=0;k<3&&!h.includes('is-right');k++){const rest=attr(h,'pick').filter(o=>!o._disabled);env.click(dset(rest[0]));h=env.root.innerHTML;}
      assert.ok(h.includes('is-right'),id+': la risposta corretta si raggiunge');
      assert.ok(attr(h,'pick').every(o=>o._disabled),id+': dopo la risposta esatta le opzioni sono bloccate');
    }else if(kind==='epithet'){env.click(dset(attr(html,'epithet')[0]));}
    else if(kind==='move2'){
      const chips=attr(html,'m2toggle');assert.equal(chips.length,5);
      assert.ok(attr(html,'m2check')[0]._disabled,'Controlla è disattivato senza scelte');
      env.click(dset(chips[0]));env.click(dset(chips[2]));env.click(dset(attr(env.root.innerHTML,'m2check')[0]));
      const h=env.root.innerHTML;
      assert.equal((h.match(/class="lv-/g)||[]).length,5,id);
      assert.ok(h.includes('Lo hai scelto')||h.includes('اخترته'));
    }else if(kind==='move3'){
      const opts=attr(html,'m3pick');assert.equal(opts.length,3);env.click(dset(opts[1]));
      assert.ok(env.root.innerHTML.includes(env.lang==='ar'?'الأقرب':'La più vicina'));
    }else if(kind==='poem1'){
      const vals=attr(html,'pvalue');env.click(dset(vals[3]));env.click(dset(attr(env.root.innerHTML,'pepi')[0]));
    }
    const nx=attr(env.root.innerHTML,'next')[0];
    if(!nx){assert.ok(attr(env.root.innerHTML,'home').length===1,id);break;}
    assert.ok(!nx._disabled,id+': avanti non disponibile');
    env.click({act:'next'});
  }
  return seen;
}

test('interfaccia in italiano: percorso completo, blocchi e salvataggio',()=>{
  const env=boot();env.lang='it';
  assert.ok(env.root.innerHTML.includes('ev-landing'));
  const seen=walk(env);
  assert.deepEqual(seen,slides.map(s=>s.id));
  assert.ok(env.root.innerHTML.includes('Ettore'));
  const saved=JSON.parse(env.storage['linguaggio-epica-session-v1']);
  assert.equal(saved.slide,'c6_ettore');
  assert.equal(Object.keys(saved.seen).length,6);
  assert.ok(!('linguaggio-comunita-session-v2' in env.storage),'non scrive i dati dell’attività 1');
});

test('interfaccia in arabo: percorso completo, RTL e frecce invertite',()=>{
  const env=boot({lang:'ar'});env.lang='ar';
  assert.equal(env.doc.documentElement.dir,'rtl');assert.ok(env.classes.has('ev-ar'));
  const seen=walk(env);
  assert.deepEqual(seen,slides.map(s=>s.id));
  assert.ok(env.root.innerHTML.includes('هكتور'));
  assert.ok(env.root.innerHTML.includes('رجوع'));
});

test('mossa 3 e proemio leggono le scelte dell’attività 1 senza modificarle',()=>{
  const a1={decisions:[{sceneId:'patto',choiceId:'liberta'},{sceneId:'nuovi_arrivi',choiceId:'prova'},{sceneId:'statua',choiceId:'targhe'},{sceneId:'pericolo',choiceId:'famiglie'},{sceneId:'x',choiceId:'y'}]};
  const raw=JSON.stringify(a1);
  const env=boot({store:{'linguaggio-comunita-session-v2':raw}});
  const goto=id=>{const s=JSON.parse(env.storage['linguaggio-epica-session-v1']||'{}');return s;};
  // porta l'utente alla mossa 3 saltando per capitoli
  env.click({act:'start'});
  env.click({act:'chapters'});env.click({act:'goto',ch:'3'});
  let st=JSON.parse(env.storage['linguaggio-epica-session-v1']);
  const flat=slides.map(s=>s.id);
  // avanza fino a m3_pericolo con le stesse regole di walk
  let guard=0;
  while(JSON.parse(env.storage['linguaggio-epica-session-v1']).slide!=='m3_pericolo'&&guard++<80){
    const html=env.root.innerHTML,kind=(html.match(/data-kind="([^"]+)"/)||[])[1];
    if(kind==='check'||kind==='move1'){let h=html;while(!h.includes('is-right')){env.click(dset(attr(h,'pick').filter(o=>!o._disabled)[0]));h=env.root.innerHTML;}}
    if(kind==='move2'){env.click(dset(attr(html,'m2toggle')[0]));env.click(dset(attr(env.root.innerHTML,'m2check')[0]));}
    env.click({act:'next'});
  }
  assert.equal(JSON.parse(env.storage['linguaggio-epica-session-v1']).slide,'m3_pericolo');
  assert.ok(env.root.innerHTML.includes('Date priorità a mettere al sicuro le famiglie.'),'mostra la scelta fatta nella crisi');
  env.click({act:'m3pick',scene:'pericolo',q:'C'});env.click({act:'next'});
  assert.ok(env.root.innerHTML.includes('Proponete un periodo di lavoro'));
  env.click({act:'m3pick',scene:'nuovi_arrivi',q:'B'});env.click({act:'next'});
  assert.ok(env.root.innerHTML.includes('Raccontate sia i successi'));
  env.click({act:'m3pick',scene:'statua',q:'A'});env.click({act:'next'});
  // proemio: il valore del patto è preselezionato (libertà) e la riga sulla crisi riprende la scelta
  assert.ok(env.root.innerHTML.includes('Abbiamo preselezionato'));
  env.click({act:'pepi',opt:'mura'});env.click({act:'next'});
  const h=env.root.innerHTML;
  assert.ok(h.includes('dalle mura salde')&&h.includes('la libertà.')&&h.includes('Prima di tutto misero in salvo le famiglie.'),h);
  assert.equal(env.storage['linguaggio-comunita-session-v2'],raw,'i dati dell’attività 1 restano intatti');
});

test('senza dati dell’attività 1 la mossa 3 e il proemio funzionano lo stesso',()=>{
  const env=boot({store:{'linguaggio-comunita-session-v2':'{non json'}});
  env.click({act:'start'});env.click({act:'chapters'});env.click({act:'goto',ch:'3'});
  let guard=0;
  while(JSON.parse(env.storage['linguaggio-epica-session-v1']).slide!=='m3_pericolo'&&guard++<80){
    const html=env.root.innerHTML,kind=(html.match(/data-kind="([^"]+)"/)||[])[1];
    if(kind==='check'||kind==='move1'){let h=html;while(!h.includes('is-right')){env.click(dset(attr(h,'pick').filter(o=>!o._disabled)[0]));h=env.root.innerHTML;}}
    if(kind==='move2'){env.click(dset(attr(html,'m2toggle')[0]));env.click(dset(attr(env.root.innerHTML,'m2check')[0]));}
    env.click({act:'next'});
  }
  assert.ok(env.root.innerHTML.includes('Se hai giocato all’attività 1 su questo telefono'));
  env.click({act:'m3pick',scene:'pericolo',q:'A'});env.click({act:'next'});
  env.click({act:'m3pick',scene:'nuovi_arrivi',q:'A'});env.click({act:'next'});
  env.click({act:'m3pick',scene:'statua',q:'A'});env.click({act:'next'});
  assert.ok(attr(env.root.innerHTML,'next')[0]._disabled,'serve scegliere valore ed epiteto');
  env.click({act:'pvalue',opt:'astuzia'});env.click({act:'pepi',opt:'voci'});env.click({act:'next'});
  assert.ok(env.root.innerHTML.includes('l’astuzia.')&&env.root.innerHTML.includes('Il pericolo arrivò'));
});

test('ripresa: una sessione salvata si riapre e uno stato corrotto viene ignorato',()=>{
  const env=boot();env.click({act:'start'});env.click({act:'chapters'});env.click({act:'goto',ch:'2'});
  const saved=env.storage['linguaggio-epica-session-v1'];
  const again=boot({store:{'linguaggio-epica-session-v1':saved}});
  assert.ok(again.root.innerHTML.includes('data-act="resume"'));
  again.click({act:'resume'});assert.ok(again.root.innerHTML.includes('ev-slide'));
  const broken=boot({store:{'linguaggio-epica-session-v1':JSON.stringify({v:1,slide:'non_esiste'})}});
  assert.ok(!broken.root.innerHTML.includes('data-act="resume"'));
  const junk=boot({store:{'linguaggio-epica-session-v1':'%%%'}});
  assert.ok(junk.root.innerHTML.includes('data-act="start"'));
});
