'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const engine=require('../engine.js');
const {comunita:story}=require('../storia.js');
const art=require('../comunita-map.js');

const choicesByScene={
  patto:['aiuto','liberta','sicurezza'],
  mercato:['baratto','gettoni','registro'],
  acqua:['turni','bisogni','canale'],
  assemblea:['sorteggio','elezione','esperti'],
  nuovi_arrivi:['accoglienza','prova','confine'],
  promessa:['ascolto','sanzione','riparazione'],
  scuola:['scrittura','mestieri','racconti'],
  voce:['verifica','silenzio','assemblea_aperta'],
  statua:['eroi','targhe','spazio'],
  confine:['accordo','autonomia','rifiuto'],
  pericolo:['difesa','famiglie','aiuto_esterno'],
  racconto:['coraggio','cura','accordo'],
  ex_gettoni:['materiale','regola','conoscenti'],
  ex_conseguenze:['migliore','errore','compromessi'],
  ex_fatti:['fallimento','case','edifici'],
  ex_punti_vista:['anziano','selezione','dettagli']
};

function play(selections,checkRestore=true){
  let session=engine.newSession(story), count=0;
  while(session.phase!=='end'){
    assert.ok(count++<150,'nessuna progressione infinita');
    const scene=engine.currentScene(story,session);
    if(session.phase==='outcome'||scene.type==='narrative')session=engine.advance(story,session);
    else session=engine.select(story,session,selections[scene.id] || (scene.activity==='quiz' ? scene.choices.find(c=>c.correct===true).id : scene.choices[0].id));
    if(checkRestore){
      const restored=engine.restore(story,JSON.stringify(session));
      assert.ok(restored,'salvataggio ripristinabile');
      assert.equal(restored.phase,session.phase);
      assert.equal(restored.index,session.index);
    }
  }
  return session;
}

test('60 scene: simulazione, epiche comparate e miti contemporanei prima di Ettore',()=>{
  assert.equal(engine.validateStory(story),story);
  assert.equal(story.scenes.length,60);
  for(const id of ['epica_araba','epica_persiana','epica_sundiata','epica_libri','epica_trasmissione','miti_oggi','miti_vincitori','miti_algoritmi','miti_ponte','miti_conclusione'])assert.ok(story.scenes.some(x=>x.id===id),id);
  assert.ok(story.scenes.find(x=>x.id==='epica_sapere').text.includes('oralità'));
  assert.equal(story.scenes.find(x=>x.id==='epica_confronto_1').game.mode,'dilemma');
  assert.equal(story.scenes.find(x=>x.id==='epica_confronto_2').game.mode,'dilemma');
  assert.equal(story.scenes.find(x=>x.id==='epica_confronto_3').game.mode,'dilemma');
  assert.equal(story.scenes.filter(x=>x.game).length,7);
  assert.equal(story.scenes.find(x=>x.id==='imparato').type,'narrative');
  assert.equal(story.scenes.find(x=>x.id==='trasferimento').type,'reflection');
  assert.ok(story.scenes.find(x=>x.id==='imparato').text.includes('sociopoietica'));
  assert.ok(story.scenes.find(x=>x.id==='imparato').text.includes('punto di partenza'));
  assert.ok(story.scenes.find(x=>x.id==='imparato').text.includes('memoria collettiva'));
  assert.equal(story.scenes.filter(x=>x.type==='decision').length,11);
  assert.deepEqual(story.scenes.filter(x=>x.type==='decision').map(x=>x.id),['patto','mercato','acqua','assemblea','nuovi_arrivi','promessa','scuola','voce','statua','confine','pericolo']);
  assert.equal(story.scenes.filter(x=>x.activity==='quiz').length,4);
  assert.equal(story.scenes.at(-2).id,'miti_conclusione');
  assert.ok(story.scenes.findIndex(x=>x.id==='epica_sintesi')<story.scenes.findIndex(x=>x.id==='miti_oggi'));
  assert.equal(story.scenes.find(x=>x.id==='trasferimento').type,'reflection');
  assert.ok(story.scenes.findIndex(x=>x.id==='ex_punti_vista')<story.scenes.findIndex(x=>x.id==='epica_domanda'));
  assert.deepEqual(story.scenes.slice(0,5).map(x=>x.type),Array(5).fill('narrative'));
  assert.deepEqual(story.stats.map(x=>x.id),['fiducia','risorse','coesione']);
  assert.ok(story.scenes.at(-1).text.includes('Ettore'));
  assert.ok(story.scenes.find(x=>x.id==='sociopoietica').text.includes('sociopoietica'));
});

test('catalogo arabo: tutti i titoli presenti, senza modificare gli ID',()=>{
  const context={};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../ar.js'),'utf8'),context);
  const translated=context.ComunitaArabic;
  assert.ok(translated);
  for(const scene of story.scenes)assert.ok(translated.scenes[scene.id]?.title,scene.id);
  assert.equal(Object.keys(translated.scenes).length,story.scenes.length);
  for(const scene of story.scenes){
    const translation=translated.scenes[scene.id];
    assert.ok(translation.text?.trim(),`Testo arabo mancante: ${scene.id}`);
    for(const choice of scene.choices||[]){
      const ch=translation.choices?.[choice.id];
      for(const field of ['label','feedback','why'])assert.ok(ch?.[field]?.trim(),`${scene.id}/${choice.id}/${field}`);
    }
  }
});

test('ogni scelta ha feedback, e solo i quattro esercizi hanno una chiave di correzione',()=>{
  for(const scene of story.scenes.filter(x=>x.choices)){
    assert.equal(scene.choices.length,3);
    assert.equal(new Set(scene.choices.map(c=>c.id)).size,3);
    for(const choice of scene.choices){
      assert.ok(choice.feedback.length>20);
      assert.ok(choice.why.length>20);
      if(scene.activity==='quiz')assert.equal(typeof choice.correct,'boolean');
      else assert.equal(choice.correct,undefined);
    }
    if(scene.activity==='quiz')assert.equal(scene.choices.filter(c=>c.correct===true).length,1);
  }
});

test('tutte le 81 ramificazioni arrivano al finale, e restore regge ogni passaggio',()=>{
  let n=0;
  for(const p of choicesByScene.patto)
   for(const m of choicesByScene.mercato)
    for(const c of choicesByScene.pericolo)
     for(const r of choicesByScene.racconto){
       const x=play({patto:p,mercato:m,pericolo:c,racconto:r});
       assert.equal(x.decisions.length,17);
       for(const stat of story.stats)assert.ok(x.values[stat.id]>=0&&x.values[stat.id]<=100);
       n++;
     }
  assert.equal(n,81);
});

test('nessuna scelta duplicata o salto di turno',()=>{
  let s=engine.newSession(story);
  while(engine.currentScene(story,s).type==='narrative')s=engine.advance(story,s);
  assert.equal(engine.currentScene(story,s).id,'patto');
  assert.throws(()=>engine.advance(story,s));
  const after=engine.select(story,s,'aiuto');
  assert.throws(()=>engine.select(story,after,'sicurezza'));
});

test('le scelte producono delta differenti, anche quando la riflessione non usa punti',()=>{
 const base=engine.newSession(story);
 let session=base;
 while(engine.currentScene(story,session).type==='narrative')session=engine.advance(story,session);
 const a=engine.select(story,session,'aiuto');
 const b=engine.select(story,session,'liberta');
 assert.notDeepEqual({...a.values},{...b.values});
 const fin=play({patto:'aiuto',mercato:'baratto',pericolo:'difesa',racconto:'coraggio'});
 const memory=fin.decisions.find(x=>x.sceneId==='racconto');
 assert.ok(memory);
 assert.deepEqual(memory.changes,[]);
});

test('ripristino rifiuta modifiche arbitrarie agli indicatori',()=>{
 const session=play({patto:'aiuto',mercato:'baratto',pericolo:'difesa',racconto:'cura'});
 assert.equal(engine.restore(story,{...session,values:{...session.values,fiducia:100}}),null);
 assert.equal(engine.restore(story,{...session,storyId:'ettore'}),null);
});


test('tutte le 81 combinazioni di risposte agli esercizi avanzano e si ripristinano',()=>{
 const base={patto:'aiuto',mercato:'registro',pericolo:'famiglie',racconto:'cura'};
 let n=0;
 for(const a of choicesByScene.ex_gettoni)
  for(const b of choicesByScene.ex_conseguenze)
   for(const c of choicesByScene.ex_fatti)
    for(const d of choicesByScene.ex_punti_vista){
      const choices={...base,ex_gettoni:a,ex_conseguenze:b,ex_fatti:c,ex_punti_vista:d};
      const end=play(choices);
      assert.equal(end.phase,'end');
      assert.equal(end.decisions.length,17);
      assert.equal(end.decisions.filter(x=>x.sceneId.startsWith('ex_')).length,4);
      n++;
    }
 assert.equal(n,81);
});

test('audit strutturale dei quattro esercizi: una risposta esatta, distrattori e assenza di pattern di lunghezza',()=>{
 const items=story.scenes.filter(x=>x.activity==='quiz');
 assert.equal(items.length,4);
 const positions=items.map(x=>x.choices.findIndex(c=>c.correct));
 assert.deepEqual(positions,[1,2,0,1]);
 let uniqueLongest=0;
 for(const q of items){
  assert.equal(q.type,'reflection');
  assert.equal(q.choices.length,3);
  assert.ok(q.objective.length>15);
  assert.ok(q.text.length>30);
  assert.equal(q.choices.filter(c=>c.correct).length,1);
  const correct=q.choices.find(c=>c.correct).label.length;
  const lengths=q.choices.map(c=>c.label.length);
  if(correct===Math.max(...lengths)&&lengths.filter(n=>n===correct).length===1)uniqueLongest++;
  assert.ok(q.choices.every(c=>c.feedback.length>35&&c.why.length>35));
  assert.ok(q.choices.every(c=>!c.effects||Object.keys(c.effects).length===0));
 }
 assert.equal(uniqueLongest,0);
 const all=play({patto:'liberta',mercato:'baratto',pericolo:'difesa',racconto:'coraggio',
  ex_gettoni:'materiale',ex_conseguenze:'errore',ex_fatti:'case',ex_punti_vista:'dettagli'});
 assert.equal(all.decisions.filter(x=>x.sceneId.startsWith('ex_')).every(x=>x.changes.length===0),true);
});

test('le chiavi corrette restano nei dati e non appaiono nella schermata della domanda',()=>{
 const app=fs.readFileSync('comunita-app.js','utf8');
 assert.ok(app.includes("scene.activity==='quiz'"));
 assert.ok(app.includes("correct===true"));
 assert.ok(app.includes('quiz&&!gotIt'));
 assert.ok(app.includes("scene.id==='ex_conseguenze'"));
});

test('illustrazioni SVG valide per ogni scena, anche ai limiti',()=>{
 for(const scene of story.scenes){
   for(const value of [0,60,100]){
     const svg=art.markup(scene.art,{fiducia:value,risorse:value,coesione:value});
     assert.ok(svg.startsWith('<svg'));
     assert.ok(svg.includes('</svg>'));
     assert.ok(svg.includes('viewBox="0 0 480 270"'));
     assert.ok(!svg.includes('undefined'));
     assert.ok(!svg.includes('NaN'));
   }
 }
});

test('pagina e script caricati nell’ordine e senza riferimenti a dati di altre applicazioni',()=>{
 const html=fs.readFileSync('index.html','utf8');
 const scripts=Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g),m=>m[1]);
 assert.deepEqual(scripts,['engine.js','storia.js','comunita-map.js','ar.js','comunita-app.js']);
 for(const f of scripts)assert.ok(fs.existsSync(f));
 for(const f of scripts)new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});
 const app=fs.readFileSync('comunita-app.js','utf8');
 assert.ok(app.includes('linguaggio-comunita-session-v1'));
 assert.ok(app.includes("selected('pericolo')"));
 assert.ok(!app.includes('epica-romanzo-session-v1'));
});


test('sei dilemmi narrativi con confronti automatici, italiano e arabo completi',()=>{
 const context={};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../ar.js'),'utf8'),context);
 const games=story.scenes.filter(x=>x.game);
 const dilemmas=games.filter(x=>x.game.mode==='dilemma');
 assert.equal(games.length,7);
 assert.equal(dilemmas.length,6);
 assert.equal(story.scenes.find(x=>x.id==='miti_ponte').game.mode,'sources');
 assert.deepEqual(dilemmas.map(x=>x.game.hero),['Achille','Gilgamesh','Odisseo','Enea','Arjuna','Rama']);
 const ids=new Set();
 for(const [i,scene] of dilemmas.entries()){
  const g=scene.game,tr=context.ComunitaArabic.scenes[scene.id]?.game;
  assert.equal(scene.type,'narrative',scene.id);
  assert.equal(g.number,i+1,scene.id);
  assert.ok(g.setup.length>100&&g.question.length>30,scene.id);
  assert.ok(g.actual.length>130&&g.explanation.length>100,scene.id);
  assert.ok(tr?.hero&&tr?.setup.length>40&&tr?.question.length>15,scene.id+' localizzazione mancante');
  assert.ok(tr.actual.length>40&&tr.explanation.length>40);
  assert.equal(g.choices.length,2);
  assert.equal(tr.choices.length,2);
  assert.ok(g.choices.some(c=>c.id===g.canonicalChoice));
  assert.equal(g.bridges.length,2);
  assert.equal(tr.bridges.length,2);
  for(const [j,choice] of g.choices.entries()){
   assert.ok(choice.label.length>15&&choice.hypothesis.length>70,scene.id);
   assert.equal(tr.choices[j].id,choice.id);
   assert.ok(tr.choices[j].label.length>10&&tr.choices[j].hypothesis.length>25);
  }
  for(const [j,b] of g.bridges.entries()){
   assert.notEqual(b.hero,g.hero);
   assert.ok(b.common.length>60&&b.difference.length>60,scene.id);
   assert.ok(tr.bridges[j].hero&&tr.bridges[j].common.length>20&&tr.bridges[j].difference.length>20);
  }
  ids.add(scene.id);
 }
 assert.equal(ids.size,6);
});
test('il dilemma obbliga a scegliere, mostra le conseguenze e lascia i progressi invariati',()=>{
 const app=fs.readFileSync('comunita-app.js','utf8');
 const css=fs.readFileSync('comunita.css','utf8');
 assert.ok(app.includes('function dilemma(scene)'));
 assert.ok(app.includes("scene.game.mode==='dilemma'?dilemma(scene):comparison(scene)"));
 assert.ok(app.includes('if(session.phase===\'scene\'&&now?.game?.mode===\'dilemma\'&&!dilemmaChoices[now.id])return;'));
 assert.ok(app.includes('data-dilemma-choice'));
 assert.ok(app.includes('DILEMMA_STORE'));
 assert.ok(app.includes('lc-dilemma-reveal'));
 assert.ok(app.includes('lc-bridge-grid'));
 assert.ok(css.includes('@media(max-width:600px)'));
 const a=play({patto:'aiuto',mercato:'baratto',pericolo:'difesa',racconto:'cura'});
 assert.equal(a.phase,'end');
});

test('rewind torna alla schermata precedente senza rifare il percorso né alterare gli indicatori',()=>{
 let s=engine.newSession(story),states=[JSON.parse(JSON.stringify(s))];
 while(s.phase!=='end'){
  const scene=engine.currentScene(story,s);
  s=(s.phase==='outcome'||scene.type==='narrative')?engine.advance(story,s):engine.select(story,s,scene.choices[0].id);
  states.push(JSON.parse(JSON.stringify(s)));
 }
 for(let i=1;i<states.length;i++){
  const actual=engine.rewind(story,states[i]);
  assert.ok(actual);
  assert.ok(engine.restore(story,JSON.stringify(actual)));
  if(states[i].phase==='outcome'){
   assert.equal(actual.index,states[i].index);
   assert.equal(actual.phase,'scene');
  }else if(states[i].phase==='scene'){
   assert.equal(actual.index,states[i].index-1);
  }else{
   assert.equal(actual.index,states[i].index);
   assert.equal(actual.phase,'scene');
  }
  assert.ok(actual.decisions.length<=states[i].decisions.length);
 }
 assert.deepEqual(engine.rewind(story,states[0]),states[0]);
 const app=fs.readFileSync('comunita-app.js','utf8');
 assert.ok(app.includes('function back()'));
 assert.ok(app.includes("case 'back':back()"));
 assert.ok(app.includes("delete dilemmaChoices[scene.id]"));
});
