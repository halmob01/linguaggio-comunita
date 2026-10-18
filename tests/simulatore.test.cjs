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
  pericolo:['difesa','famiglie','aiuto_esterno'],
  racconto:['coraggio','cura','accordo']
};

function play(selections,checkRestore=true){
  let session=engine.newSession(story), count=0;
  while(session.phase!=='end'){
    assert.ok(count++<50,'nessuna progressione infinita');
    const scene=engine.currentScene(story,session);
    if(session.phase==='outcome'||scene.type==='narrative')session=engine.advance(story,session);
    else session=engine.select(story,session,selections[scene.id]);
    if(checkRestore){
      const restored=engine.restore(story,JSON.stringify(session));
      assert.ok(restored,'salvataggio ripristinabile');
      assert.equal(restored.phase,session.phase);
      assert.equal(restored.index,session.index);
    }
  }
  return session;
}

test('11 scene: 5 card iniziali, 3 decisioni, memoria e ponte verso Ettore',()=>{
  assert.equal(engine.validateStory(story),story);
  assert.equal(story.scenes.length,11);
  assert.deepEqual(story.scenes.slice(0,5).map(x=>x.type),Array(5).fill('narrative'));
  assert.deepEqual(story.stats.map(x=>x.id),['fiducia','risorse','coesione']);
  assert.ok(story.scenes.at(-1).text.includes('Ettore'));
  assert.ok(story.scenes.find(x=>x.id==='sociopoietica').text.includes('sociopoietica'));
});

test('ogni scelta ha feedback, interpretazione e nessun esercizio premia una morale predefinita',()=>{
  for(const scene of story.scenes.filter(x=>x.choices)){
    assert.equal(scene.choices.length,3);
    assert.equal(new Set(scene.choices.map(c=>c.id)).size,3);
    for(const choice of scene.choices){
      assert.ok(choice.feedback.length>20);
      assert.ok(choice.why.length>20);
      assert.equal(choice.correct,undefined);
    }
  }
});

test('tutte le 81 ramificazioni arrivano al finale, e restore regge ogni passaggio',()=>{
  let n=0;
  for(const p of choicesByScene.patto)
   for(const m of choicesByScene.mercato)
    for(const c of choicesByScene.pericolo)
     for(const r of choicesByScene.racconto){
       const x=play({patto:p,mercato:m,pericolo:c,racconto:r});
       assert.equal(x.decisions.length,4);
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
 assert.deepEqual(scripts,['engine.js','storia.js','comunita-map.js','comunita-app.js']);
 for(const f of scripts)assert.ok(fs.existsSync(f));
 for(const f of scripts)new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});
 const app=fs.readFileSync('comunita-app.js','utf8');
 assert.ok(app.includes('linguaggio-comunita-session-v1'));
 assert.ok(app.includes("selected('pericolo')"));
 assert.ok(!app.includes('epica-romanzo-session-v1'));
});
