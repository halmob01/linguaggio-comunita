/* Collegamento UI al motore narrativo importato da epica-romanzo. */
(function mountCommunityApp() {
  'use strict';
  const engine=window.EpicaEngine, story=window.ComunitaStories.comunita, art=window.ComunitaMap;
  const STORAGE='linguaggio-comunita-session-v1', $=id=>document.getElementById(id);
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let session=null, previewIndex=null;
  const originalStory=JSON.parse(JSON.stringify(story));
  const originalLanding=document.getElementById('landing').innerHTML;
  const languageKey='linguaggio-comunita-language';
  let language='it';
  try{language=localStorage.getItem(languageKey)==='ar'?'ar':'it';}catch(_){}
  const ar=window.ComunitaArabic||{ui:{},scenes:{}};
  const t=value=>language==='ar'?(ar.ui?.[value]||value):value;
  function translateUI(html){return language==='ar'?html.replace(/>([^<>]+)</g,(all,content)=>{
    const m=content.match(/^(\\s*)(.*?)(\\s*)$/s);
    return '>'+m[1]+t(m[2])+m[3]+'<';
  }):html;}
  function localizeStory(){
    story.title=originalStory.title;story.subtitle=originalStory.subtitle;story.insight=originalStory.insight;
    story.stats.forEach((stat,i)=>{stat.label=language==='ar'?(ar.ui?.[originalStory.stats[i].label]||originalStory.stats[i].label):originalStory.stats[i].label;});
    story.scenes.forEach((scene,i)=>{
      const src=originalStory.scenes[i],tr=language==='ar'?ar.scenes?.[src.id]:null;
      scene.title=tr?.title||src.title;scene.text=tr?.text||src.text;
      scene.choices?.forEach((choice,j)=>{const orig=src.choices[j],translated=tr?.choices?.[orig.id];
        choice.label=translated?.label||orig.label;choice.feedback=translated?.feedback||orig.feedback;choice.why=translated?.why||orig.why;
      });
    });
    document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
    document.body.classList.toggle('lc-ar',language==='ar');
    const toggle=document.getElementById('langToggle');toggle.textContent=language==='ar'?'Italiano':'عربي';toggle.setAttribute('aria-pressed',String(language==='ar'));
    document.getElementById('landing').innerHTML=translateUI(originalLanding);
  }
  document.getElementById('langToggle').addEventListener('click',()=>{
    language=language==='it'?'ar':'it';try{localStorage.setItem(languageKey,language);}catch(_){}
    localizeStory();if(session)render();else showLanding();
  });
  localizeStory();
  engine.validateStory(story);
  const chapters=story.scenes.length, intro=5;
  const decisionCount=story.scenes.filter(x=>x.type==='decision').length;
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(session));}catch(_){}}
  function load(){try{return engine.restore(story,localStorage.getItem(STORAGE));}catch(_){return null;}}
  function clear(){try{localStorage.removeItem(STORAGE);}catch(_){}}
  function labelFor(sceneId,choiceId){
    const scene=story.scenes.find(x=>x.id===sceneId);
    return scene?.choices?.find(x=>x.id===choiceId)?.label||'';
  }
  function selected(id){
    if(!session) return null;
    return session.decisions.find(d=>d.sceneId===id)||null;
  }
  function sceneProgress(index) {
    $('progress').innerHTML=Array.from({length:chapters},(_,i)=>`<i class="${i<index?'done':i===index?'now':''}"></i>`).join('');
  }
  function showLanding(){
    previewIndex=null;session=null;
    $('app').hidden=true;$('prologue').hidden=true;$('landing').hidden=false;
    $('landingArt').innerHTML=art.markup('villaggio');
    const saved=load();
    $('resume').hidden=!saved;
    if(saved){$('resume').textContent=saved.phase==='end'?'Rivedi il tuo finale →':'Riprendi la tua comunità →';}
    window.scrollTo?.(0,0);
  }
  function start(){
    clear();
    session=engine.newSession(story);previewIndex=null;
    save();render();
  }
  function resume(){
    session=load();previewIndex=null;
    if(session) render();else showLanding();
  }
  function hud(){
    const change=Object.fromEntries((session.phase==='outcome'?session.last?.changes:[]||[]).map(x=>[x.id,x.delta]));
    return story.stats.map(x=>{
      const value=session.values[x.id],delta=change[x.id]||0;
      return `<div class="ep-stat" aria-label="${esc(x.label)}: ${value} su 100">
       <div class="ep-stat-head"><span>${esc(x.label)}</span><span><b>${value}</b>${delta?` <em class="${delta<0?'ep-down':'ep-up'}">${delta>0?'+':''}${delta}</em>`:''}</span></div>
       <div class="ep-meter"><div style="width:${value}%"></div></div></div>`;
    }).join('');
  }
  function context(scene){
    if(scene.id==='mercato'&&selected('patto'))return `<div class="lc-context"><strong>Il vostro primo patto:</strong> ${esc(labelFor('patto',selected('patto').choiceId))}</div>`;
    if(scene.type==='decision'&&scene.id!=='patto'&&scene.id!=='mercato'){
      const previous=story.scenes.slice(0,session.index).filter(x=>x.type==='decision').at(-1);
      const last=previous&&selected(previous.id);
      if(last)return `<div class="lc-context"><strong>La decisione precedente:</strong> ${esc(labelFor(previous.id,last.choiceId))}</div>`;
    }
    if(scene.id==='pericolo'){
      const deal=selected('mercato');
      return `<div class="lc-context"><strong>La vostra comunità finora:</strong> ${esc(labelFor('patto',selected('patto')?.choiceId))} ${deal?'<span>Ora dovete affrontare qualcosa che non avevate previsto.</span>':''}</div>`;
    }
    if(scene.id==='racconto'&&selected('pericolo'))return `<div class="lc-context"><strong>La scelta che avete preso:</strong> ${esc(labelFor('pericolo',selected('pericolo').choiceId))}</div>`;
    if(scene.id==='ex_conseguenze'){
      const crisis=selected('pericolo');
      const changes=crisis?.changes || [];
      return `<div class="lc-context"><strong>La tua decisione durante la crisi:</strong> ${esc(labelFor('pericolo',crisis?.choiceId))}
        <span>${changes.map(x=>esc(x.label)+' '+(x.delta>0?'+':'')+x.delta).join(' · ') || 'Nessuna variazione'}</span></div>`;
    }
    return '';
  }
  function decision(scene){
    return `<div class="eyebrow">${scene.activity==='quiz'?'Esercizio di riflessione · senza voto':scene.type==='reflection'?(scene.id.startsWith('epica_')?'Confronta le tradizioni':scene.id.startsWith('miti_')?'Chi racconta la storia?':'La memoria collettiva'):'Esperimento · scegli e osserva'}</div>
      <h1>${esc(scene.title)}</h1><p class="ep-lead">${esc(scene.text)}</p>
      ${context(scene)}
      <div class="ep-choices">${scene.choices.map((ch,i)=>`<button type="button" class="opt ep-choice" data-choice="${esc(ch.id)}">
      <span class="k">${String.fromCharCode(65+i)}</span><span>${esc(ch.label)}</span></button>`).join('')}</div>
      <div class="ep-help">${scene.activity==='quiz'?'Scegli la spiegazione più convincente. Leggerai subito il perché, anche se sbagli.':scene.type==='reflection'?'Non c’è una risposta unica. Un racconto mette in primo piano qualcosa e ne lascia fuori qualcos’altro.':'Non devi indovinare la risposta giusta: osserva costi e conseguenze.'}</div>
      <button type="button" class="btn ghost ep-small" data-action="review">Rivedi il prologo</button>`;
  }
  function outcome(){
    const x=session.last,scene=story.scenes[session.index],quiz=scene.activity==='quiz';
    const chosen=quiz?scene.choices.find(c=>c.id===x.choiceId):null;
    const correct=quiz?scene.choices.find(c=>c.correct===true):null;
    const gotIt=!!(chosen&&chosen.correct===true);
    return `<div class="eyebrow">${quiz?'Feedback formativo':scene.type==='reflection'?'Interpretazione':'Conseguenza della scelta'}</div>
      <h1>${quiz?(gotIt?'Hai individuato il punto':'Vediamo il ragionamento'):scene.type==='reflection'?'Una storia, più punti di vista':'Che cosa è cambiato?'}</h1>
      <p class="ep-lead">${esc(x.feedback)}</p>
      ${quiz&&!gotIt&&correct?`<div class="lc-context"><strong>La spiegazione da ricordare</strong><span>${esc(correct.label)}</span></div>`:''}
      ${x.changes.length?`<div class="ep-change-list">${x.changes.map(d=>`<div class="ep-change"><span>${esc(d.label)}</span><b class="${d.delta>0?'ep-up':'ep-down'}">${d.delta>0?'+':''}${d.delta}</b></div>`).join('')}</div>`:''}
      <div class="note"><b>Perché conta</b><p>${esc(x.why)}</p></div>
      <button class="btn" type="button" data-action="next">Continua →</button>`;
  }
  function ending(){
    const recap=engine.recap(story,session);
    const crisis=selected('pericolo'), memory=selected('racconto');
    return `<div class="eyebrow">Fine del percorso · dalla comunità all'epica</div>
      <h1>Il mondo che abbiamo inventato</h1>
      <p class="ep-lead">Le vostre regole hanno organizzato la vita comune. Poi avete vissuto una crisi e scelto che cosa raccontare alle generazioni successive.</p>
      <div class="lc-summary">
        <div><span>Il vostro patto</span><strong>${esc(labelFor('patto',selected('patto')?.choiceId))}</strong></div>
        <div><span>La scelta nella crisi</span><strong>${esc(labelFor('pericolo',crisis?.choiceId))}</strong></div>
        <div><span>La storia tramandata</span><strong>${esc(labelFor('racconto',memory?.choiceId))}</strong></div>
      </div>
      <h3>Le conseguenze della vostra simulazione</h3>
      <div class="ep-change-list">${recap.values.map(v=>`<div class="ep-change"><span>${esc(v.label)}</span><b>${v.before} → ${v.after}</b></div>`).join('')}</div>
      <p class="ep-notice">Hai affrontato ${decisionCount} decisioni collettive e collegato il gioco alla tua scuola. I quattro esercizi, i confronti epici e la battaglia del ponte ti hanno aiutato a ragionare: non danno un voto e non cambiano gli indicatori.</p>
      <div class="note"><b>Che cosa ho imparato?</b><p>Prima sapevamo già che il linguaggio costruisce accordi e realtà condivise. Oggi abbiamo imparato tre cose nuove: 1. Le decisioni collettive richiedono compromessi fra bisogni diversi. 2. La memoria di una comunità seleziona alcuni eventi e ne dimentica altri. 3. Ogni racconto sceglie protagonisti, valori e punti di vista.</p></div>
      <div class="note"><b>La domanda per la prossima lezione</b><p>Quando una persona agisce, perché la sua storia può raccontare il destino di un’intera comunità?</p><p>Dopo aver confrontato epiche antiche, miti contemporanei e punti di vista diversi, conosceremo Ettore, il difensore di Troia.</p></div>
      <div class="row"><button class="btn" data-action="restart">Ricomincia</button>
      <button class="btn ghost" data-action="menu">Torna all'inizio</button></div>`;
  }
  function prologue(){
    const isReview=previewIndex!==null,ix=isReview?previewIndex:session.index,scene=story.scenes[ix];
    const initially=ix<intro;
    const total=isReview||initially?intro:chapters;
    $('prologue').hidden=false;
    $('prologue').innerHTML=translateUI(`<div class="pro-card" role="document">
      <div class="pro-art pro-in">${art.markup(scene.art,session.values)}</div>
      <div class="pro-body">
        <div class="pro-top"><div class="eyebrow">${isReview?'Ripasso':initially?'Dalle lezioni precedenti':scene.id.startsWith('epica_')?'Le grandi tradizioni epiche':scene.id.startsWith('miti_')?'I miti di oggi':'Racconto'} · ${initially||isReview?ix+1:ix+1}/${total}</div>
          <button class="pill" data-action="${isReview?'close-review':'menu'}" aria-label="${isReview?'Chiudi il ripasso':'Torna all’inizio'}">${isReview?'Chiudi':'Esci'}</button></div>
        <h2 class="pro-title">${esc(scene.title)}</h2>
        <p class="pro-text">${esc(scene.text)}</p>
        <div class="pro-dots" aria-hidden="true">${Array.from({length:total},(_,i)=>`<i class="${i<ix?'done':i===ix?'now':''}"></i>`).join('')}</div>
        <div class="row"><button class="btn" data-action="${isReview?(ix===intro-1?'close-review':'review-next'):'next'}">${isReview&&ix===intro-1?'Torna al gioco':'Avanti →'}</button>
        ${!isReview&&initially?'<button class="btn ghost" data-action="skip">Salta il richiamo</button>':''}</div>
      </div></div>`);
    $('prologue').querySelector('.btn')?.focus({preventScroll:true});
  }
  function render(){
    if(!session){showLanding();return;}
    $('landing').hidden=true;$('app').hidden=false;
    sceneProgress(session.index);
    const scene=engine.currentScene(story,session);
    $('map').innerHTML=art.markup(scene?.art||'ponte',session.values);
    $('hud').innerHTML=hud();
    $('chapterTag').textContent=scene?.id==='racconto'||scene?.id==='un_secolo'||scene?.id==='ponte'?'La memoria':'La comunità';
    $('turnTag').textContent=`${session.index+1} / ${chapters}`;
    if(session.phase==='end'){
      $('prologue').hidden=true;$('panel').innerHTML=ending();
    }else if(previewIndex!==null||(session.phase==='scene'&&scene?.type==='narrative')){
      $('panel').innerHTML='<p class="ep-lead">Segui le card illustrate.</p>';prologue();
    }else{
      $('prologue').hidden=true;
      $('panel').innerHTML=translateUI(session.phase==='outcome'?outcome():decision(scene));
      $('panel').setAttribute('aria-live','polite');
      $('panel').querySelector('button')?.focus({preventScroll:true});
    }
    if($('prologue').hidden)window.scrollTo?.(0,0);
  }
  function next(){
    if(!session||previewIndex!==null)return;
    try{session=engine.advance(story,session);save();render();}catch(e){console.error('Avanzamento bloccato',e);}
  }
  function skip(){
    if(!session||session.phase!=='scene'||session.index>=intro)return;
    while(session.index<intro&&session.phase==='scene'&&engine.currentScene(story,session)?.type==='narrative')session=engine.advance(story,session);
    save();render();
  }
  document.addEventListener('click',event=>{
    const ch=event.target.closest('[data-choice]');
    if(ch&&session&&session.phase==='scene'&&previewIndex===null){
      try{session=engine.select(story,session,ch.dataset.choice);save();render();}catch(e){console.error('Scelta non valida',e);}
      return;
    }
    const b=event.target.closest('[data-action]');if(!b)return;
    switch(b.dataset.action){
      case 'start':start();break;
      case 'resume':resume();break;
      case 'next':next();break;
      case 'skip':skip();break;
      case 'menu':showLanding();break;
      case 'restart':start();break;
      case 'review':previewIndex=0;render();break;
      case 'review-next':previewIndex=Math.min(intro-1,previewIndex+1);render();break;
      case 'close-review':previewIndex=null;render();break;
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='ArrowRight'||event.repeat||event.altKey||event.ctrlKey||event.metaKey||$('prologue').hidden)return;
    if(previewIndex!==null){previewIndex=previewIndex>=intro-1?null:previewIndex+1;render();}
    else next();
  });
  showLanding();
})();
