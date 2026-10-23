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
    const m=content.match(/^(\s*)(.*?)(\s*)$/s);
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
    if(saved){$('resume').textContent=t(saved.phase==='end'?'Rivedi il tuo finale →':'Riprendi la tua comunità →');}
    window.scrollTo?.(0,0);
  }
  function start(){
    clear();dilemmaChoices={};saveDilemmas();
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
      return `<div class="ep-stat" aria-label="${esc(x.label)}: ${value} ${t('su 100')}">
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
    const localizedChoice=scene.choices?.find(c=>c.id===x.choiceId);
    const feedback=localizedChoice?.feedback||x.feedback;
    const why=localizedChoice?.why||x.why;
    const chosen=quiz?scene.choices.find(c=>c.id===x.choiceId):null;
    const correct=quiz?scene.choices.find(c=>c.correct===true):null;
    const gotIt=!!(chosen&&chosen.correct===true);
    return `<div class="eyebrow">${quiz?'Feedback formativo':scene.type==='reflection'?'Interpretazione':'Conseguenza della scelta'}</div>
      <h1>${quiz?(gotIt?'Hai individuato il punto':'Vediamo il ragionamento'):scene.type==='reflection'?'Una storia, più punti di vista':'Che cosa è cambiato?'}</h1>
      <p class="ep-lead">${esc(feedback)}</p>
      ${quiz&&!gotIt&&correct?`<div class="lc-context"><strong>La spiegazione da ricordare</strong><span>${esc(correct.label)}</span></div>`:''}
      ${x.changes.length?`<div class="ep-change-list">${x.changes.map(d=>`<div class="ep-change"><span>${esc(t(d.label))}</span><b class="${d.delta>0?'ep-up':'ep-down'}">${d.delta>0?'+':''}${d.delta}</b></div>`).join('')}</div>`:''}
      <div class="note"><b>Perché conta</b><p>${esc(why)}</p></div>
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
      <div class="note"><b>Che cosa ho imparato?</b><p>Il gioco ci ha insegnato che le decisioni collettive comportano compromessi e che la memoria sceglie eventi, protagonisti e valori. Con le epiche abbiamo scoperto che popoli diversi hanno trasmesso il sapere con racconti, oralità e scrittura, rispondendo in modi differenti a domande su morte, dovere, gloria e appartenenza. Infine, anche i miti di oggi costruiscono memorie: per ricostruire i fatti, però, bisogna confrontare le fonti e distinguere testimonianze e interpretazioni.</p></div>
      <div class="note"><b>La domanda per la prossima lezione</b><p>Quando una persona agisce, perché la sua storia può raccontare il destino di un’intera comunità?</p><p>Dopo aver confrontato epiche antiche, miti contemporanei e punti di vista diversi, conosceremo Ettore, il difensore di Troia.</p></div>
      <div class="row"><button class="btn" data-action="restart">Ricomincia</button>
      <button class="btn ghost" data-action="menu">Torna all'inizio</button></div>`;
  }
  function epicRecall(scene){
    const g=scene.game;if(!g?.reminders?.length)return '';
    const translated=language==='ar'?ar.scenes?.[scene.id]?.game:null;
    const reminders=translated?.reminders||g.reminders;
    const example=translated?.example||g.example;
    return '<div class="lc-epic-recall"><div class="lc-epic-recall-head"><span class="eyebrow">'+esc(t('Prima di giocare · ricorda le vicende'))+'</span><p>'+esc(t('Leggi gli episodi: ti serviranno per motivare le risposte.'))+'</p></div>'+
      '<div class="lc-recall-grid">'+reminders.map(x=>'<article class="lc-recall-card"><h3>'+esc(x.name)+'</h3><p>'+esc(x.text)+'</p></article>').join('')+'</div>'+
      (example?'<div class="lc-recall-example"><strong>'+esc(t('Un esempio ragionato'))+'</strong><p>'+esc(example)+'</p></div>':'')+'</div>';
  }
  const DILEMMA_STORE='linguaggio-comunita-dilemma-v1';
  function readDilemmas(){try{return JSON.parse(localStorage.getItem(DILEMMA_STORE)||'{}')||{};}catch(_){return {};}}
  let dilemmaChoices=readDilemmas();
  function saveDilemmas(){try{localStorage.setItem(DILEMMA_STORE,JSON.stringify(dilemmaChoices));}catch(_){}}
  function dilemma(scene){
    const g=scene.game,tr=language==='ar'?ar.scenes?.[scene.id]?.game:null;
    const saved=dilemmaChoices[scene.id],choice=g.choices.find(c=>c.id===saved),choiceIndex=g.choices.findIndex(c=>c.id===saved);
    const lc=tr?.choices?.[choiceIndex],actualChoice=g.choices.find(c=>c.id===g.canonicalChoice);
    const card=(c,n)=>'<button type="button" data-dilemma-choice="'+esc(c.id)+'" class="lc-dilemma-option" aria-pressed="'+(saved===c.id)+'" '+(saved?'disabled':'')+'><span class="lc-dilemma-option-index">'+String(n+1).padStart(2,'0')+'</span><span>'+esc(tr?.choices?.[n]?.label||c.label)+'</span><span aria-hidden="true" class="lc-dilemma-arrow">↗</span></button>';
    const bridges=g.bridges.map((b,n)=>'<article class="lc-bridge"><span class="lc-bridge-line" aria-hidden="true"></span><div class="lc-bridge-title"><span class="lc-bridge-hero">'+esc(tr?.hero||g.hero)+'</span><span class="lc-bridge-link" aria-hidden="true">↔</span><span class="lc-bridge-hero">'+esc(tr?.bridges?.[n]?.hero||b.hero)+'</span></div><div><strong>'+esc(t('In comune'))+'</strong><p>'+esc(tr?.bridges?.[n]?.common||b.common)+'</p></div><div><strong>'+esc(t('La differenza'))+'</strong><p>'+esc(tr?.bridges?.[n]?.difference||b.difference)+'</p></div></article>').join('');
    return '<section class="lc-game lc-dilemma" aria-label="'+esc(t('Il dilemma dell’eroe'))+'"><div class="lc-dilemma-mast"><span class="eyebrow">'+esc(t('IL DILEMMA DELL’EROE'))+'</span><span class="lc-dilemma-counter">'+String(g.number).padStart(2,'0')+' / 06</span></div><div class="lc-dilemma-hero"><div class="lc-dilemma-art" aria-hidden="true">'+art.markup(scene.art,session.values)+'</div><div class="lc-dilemma-intro"><span class="lc-dilemma-overline">'+esc(t('SEI TU A DECIDERE'))+'</span><h2>'+esc(scene.title)+'</h2><p>'+esc(tr?.setup||g.setup)+'</p></div></div><div class="lc-dilemma-task"><h3>'+esc(tr?.question||g.question)+'</h3><div class="lc-dilemma-choices">'+g.choices.map(card).join('')+'</div></div>'+
      (choice?'<div class="lc-dilemma-reveal" role="status"><span class="lc-dilemma-overline">'+esc(t('LA TUA SCELTA · CONSEGUENZA POSSIBILE'))+'</span><p>'+esc(lc?.hypothesis||choice.hypothesis)+'</p><div class="lc-dilemma-canon"><span class="lc-dilemma-overline">'+esc(t('NEL POEMA ACCADE QUESTO'))+'</span><p>'+esc(tr?.actual||g.actual)+'</p><p class="lc-dilemma-meaning">'+esc(tr?.explanation||g.explanation)+'</p></div><div class="lc-dilemma-bridges"><div class="lc-dilemma-bridges-head"><span class="lc-dilemma-overline">'+esc(t('COLLEGAMENTI COSTRUITI'))+'</span><h3>'+esc(t('Stesso problema, risposte differenti'))+'</h3><p>'+esc(t('Il confronto viene costruito dagli episodi: guarda il punto in comune e la differenza.'))+'</p></div><div class="lc-bridge-grid">'+bridges+'</div></div></div>':'')+
      '<div class="lc-dilemma-actions">'+(choice?'<button class="btn" type="button" data-action="next">'+esc(t('Prosegui →'))+'</button>':'<p class="lc-dilemma-hint">'+esc(t('Scegli una delle due possibilità per scoprire che cosa accade nel racconto.'))+'</p>')+'</div></section>';
  }
  document.addEventListener('click',event=>{
    const option=event.target.closest('[data-dilemma-choice]');if(!option||!session||previewIndex!==null)return;
    const scene=story.scenes[session.index];if(scene?.game?.mode!=='dilemma'||dilemmaChoices[scene.id])return;
    if(!scene.game.choices.some(c=>c.id===option.dataset.dilemmaChoice))return;
    dilemmaChoices[scene.id]=option.dataset.dilemmaChoice;saveDilemmas();prologue();
    $('prologue').querySelector('.lc-dilemma-reveal')?.scrollIntoView?.({behavior:'smooth',block:'start'});
  });
  function comparison(scene){
    const g=scene.game,translation=language==='ar'?ar.scenes?.[scene.id]?.game:null;
    const left=translation?.left||g.left,right=translation?.right||g.right;
    const answers=window.__lcGameAnswers||{};
    const state=answers[scene.id]||{};
    const row=(label,i)=>'<div class="lc-game-row"><strong>'+esc(label)+'</strong><select data-game-index="'+i+'" aria-label="'+esc(label)+'"><option value="">'+esc(t('Scegli un confronto'))+'</option>'+right.map((r,j)=>'<option value="'+j+'" '+(state[i]===String(j)?'selected':'')+'>'+esc(r)+'</option>').join('')+'</select></div>';
    const complete=left.every((_,i)=>state[i]!==undefined&&state[i]!=='');
    const correct=complete&&left.every((_,i)=>Number(state[i])===g.answer[i]);
    return '<section class="lc-game" aria-label="'+esc(t('Gioco di confronto'))+'"><div class="eyebrow">'+esc(t('Confronta le storie'))+'</div><h2>'+esc(scene.title)+'</h2><p>'+esc(scene.text)+'</p><div class="lc-game-grid">'+left.map(row).join('')+'</div>'+
    '<div class="row"><button class="btn" type="button" data-action="game-check" '+(!complete?'disabled':'')+'>'+esc(t('Verifica il confronto'))+'</button><button class="btn ghost" type="button" data-action="next">'+esc(t('Prosegui'))+'</button></div>'+
    (state.checked?'<div class="lc-game-feedback" role="status"><strong>'+esc(correct?t('Collegamenti verificati'):t('Rivediamo gli episodi'))+'</strong>'+
      ((translation?.feedback||g.feedback)?.length?'<div class="lc-feedback-examples">'+(translation?.feedback||g.feedback).map(x=>'<p>'+esc(x)+'</p>').join('')+'</div>':'<p>'+esc(correct?t('Confronto corretto. Le storie condividono temi, ma non gli stessi valori.'):t('Riprova: osserva le differenze tra i protagonisti e le fonti.'))+'</p>')+'</div>':'')+'</section>';
  }
  function prologue(){
    const isReview=previewIndex!==null,ix=isReview?previewIndex:session.index,scene=story.scenes[ix];
    const initially=ix<intro;
    const total=isReview||initially?intro:chapters;
    $('prologue').hidden=false;
    $('prologue').innerHTML=scene.game?(scene.game.mode==='dilemma'?dilemma(scene):comparison(scene)):translateUI(`<div class="pro-card" role="document">
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
  document.addEventListener('change',event=>{
    const input=event.target.closest('[data-game-index]');if(!input||!session)return;
    const scene=story.scenes[session.index];if(!scene?.game)return;
    window.__lcGameAnswers=window.__lcGameAnswers||{};
    const state=window.__lcGameAnswers[scene.id]||{};state[input.dataset.gameIndex]=input.value;state.checked=false;
    window.__lcGameAnswers[scene.id]=state;prologue();
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('[data-action="game-check"]')||!session)return;
    const scene=story.scenes[session.index];if(!scene?.game)return;
    window.__lcGameAnswers=window.__lcGameAnswers||{};
    window.__lcGameAnswers[scene.id]={...(window.__lcGameAnswers[scene.id]||{}),checked:true};prologue();
  });
  function render(){
    if(!session){showLanding();return;}
    $('landing').hidden=true;$('app').hidden=false;
    sceneProgress(session.index);
    const scene=engine.currentScene(story,session);
    $('map').innerHTML=art.markup(scene?.art||'ponte',session.values);
    $('hud').innerHTML=hud();
    $('chapterTag').textContent=t(scene?.id==='racconto'||scene?.id==='un_secolo'||scene?.id==='ponte'?'La memoria':'La comunità');
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
    const now=story.scenes[session.index];
    if(session.phase==='scene'&&now?.game?.mode==='dilemma'&&!dilemmaChoices[now.id])return;
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
