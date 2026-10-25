/* Attività 2 — Le voci dell'epica: navigazione a slide, verifiche, gioco delle grandi domande e proemio. */
(function mountEpicApp(){
  'use strict';
  const D=window.EpicaDati.epica, ART=window.EpicaArte, AR=window.EpicaArabic||{};
  const root=document.getElementById('root');
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const KEY='linguaggio-epica-session-v1', LANGKEY='linguaggio-comunita-language';
  const A1KEYS=['linguaggio-comunita-session-v2','linguaggio-comunita-session-v1'];
  let lang='it';
  try{lang=localStorage.getItem(LANGKEY)==='ar'?'ar':'it';}catch(_){}
  const t=s=>lang==='ar'?(AR.ui?.[s]||s):s;
  const arrow=dir=>(dir==='back')===(lang!=='ar')?'←':'→';

  /* Traduzione: si sovrappongono solo i campi testuali, per posizione; gli id non si traducono. */
  function merge(base,over){
    if(over===undefined||over===null)return base;
    if(typeof base==='string')return typeof over==='string'&&over.trim()?over:base;
    if(Array.isArray(base))return base.map((b,i)=>merge(b,over[i]));
    if(base&&typeof base==='object'){const o={...base};for(const k of Object.keys(base))o[k]=merge(base[k],over[k]);return o;}
    return base;
  }
  let L=null, flat=[], byId={}, trad={};
  function build(){
    const A=lang==='ar'?AR:{};
    const traditions=D.traditions.map(x=>merge(x,A.traditions?.[x.id]));
    const chapters=D.chapters.map(c=>({...c,title:(lang==='ar'&&A.chapters?.[c.id])||c.title,slides:c.slides.map(s=>merge(s,A.slides?.[s.id]))}));
    L={traditions,chapters,game:merge(D.game,A.game),patto:merge(D.patto,A.patto)};
    flat=chapters.flatMap((c,ci)=>c.slides.map((s,i)=>({...s,ci,i,n:c.slides.length})));
    byId=Object.fromEntries(flat.map((s,i)=>[s.id,i]));
    trad=Object.fromEntries(traditions.map(x=>[x.id,x]));
  }

  /* Stato locale */
  const fresh=()=>({v:1,slide:null,seen:{},tries:{},epithet:null,m2:{},m3:{},poem:{}});
  let st=fresh(), view='landing', drawer=false, jumped=false;
  function load(){
    try{const s=JSON.parse(localStorage.getItem(KEY));
      if(s&&s.v===1&&typeof s.slide==='string'&&byId[s.slide]!==undefined)return {...fresh(),...s};}catch(_){}
    return null;
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(_){}}
  function clearSave(){try{localStorage.removeItem(KEY);}catch(_){}}

  /* Scelte dell'attività 1, lette senza mai scriverle */
  function readA1(){
    for(const key of A1KEYS){
      try{
        const s=JSON.parse(localStorage.getItem(key));
        if(s&&Array.isArray(s.decisions)){
          const out={};
          for(const d of s.decisions)if(d&&typeof d.sceneId==='string'&&typeof d.choiceId==='string')out[d.sceneId]=d.choiceId;
          return out;
        }
      }catch(_){}
    }
    return {};
  }
  function a1Choice(sceneId){
    const id=readA1()[sceneId];
    const list=sceneId==='patto'?L.patto:L.game.move3[sceneId]?.choices;
    return id&&list?list.find(c=>c.id===id)||null:null;
  }

  /* Elementi comuni */
  const heroName=id=>trad[id]?.hero||id;
  const accentOf=id=>trad[id]?.accent||'#146b78';
  const letter=i=>String.fromCharCode(65+i);
  const p=list=>(list||[]).map(x=>`<p>${esc(x)}</p>`).join('');
  const keyword=k=>k?`<aside class="ev-keyword"><span class="ev-keyword-tag">${esc(t('Parola chiave'))}</span><strong>${esc(k.term)}</strong><span>${esc(k.definition)}</span></aside>`:'';
  const names=()=>Object.fromEntries(L.traditions.map(x=>[x.id,x.name]));
  const places=()=>Object.fromEntries(L.traditions.map(x=>[x.id,x.place]));
  function artFor(s){
    if(s.kind==='idcard')return ART.markup('mappa',{highlight:s.tradition,compact:true,labels:{names:names(),places:places()}});
    if(s.kind==='map')return ART.markup('mappa',{labels:{names:names(),places:places(),troia:t('Troia'),start:t('4000 anni fa'),end:t('oggi')}});
    if(s.kind==='network')return ART.markup('rete',{heroes:L.traditions.map(x=>({id:x.id,name:x.hero})),questions:L.game.questions.map(q=>({id:q.id,short:q.short,levels:Object.fromEntries(Object.entries(q.heroes).map(([h,v])=>[h,v.level]))}))});
    const tr=s.tradition||s.hero;
    if(s.art)return ART.markup(s.art);
    if(tr&&trad[tr])return ART.markup(trad[tr].emblem);
    return ART.markup('racconto');
  }
  function optionButtons(slideId,options,tries,solved){
    return `<div class="ev-opts" role="group">${options.map((o,i)=>{
      const was=tries.includes(o.id);
      const cls=was?(o.correct?'is-right':'is-wrong'):'';
      const dis=was||solved?'disabled':'';
      return `<button type="button" class="ev-opt ${cls}" data-act="pick" data-slide="${esc(slideId)}" data-opt="${esc(o.id)}" ${dis}><span class="k">${letter(i)}</span><span>${esc(o.label)}</span></button>`;
    }).join('')}</div>`;
  }
  function feedbackFor(options,tries){
    const last=options.find(o=>o.id===tries.at(-1));
    if(!last)return '';
    const point=last.correct?`<p class="ev-point ${tries.length===1?'yes':'no'}">${esc(t(tries.length===1?'Primo tentativo: +1 punto':'Trovata dopo alcuni tentativi: nessun punto, ma ora conosci la ragione.'))}</p>`:'';
    return `<div class="ev-feedback ${last.correct?'ok':'again'}" role="status"><strong>${esc(t(last.correct?'Hai individuato il punto':'Non ancora'))}</strong><p>${esc(last.feedback)}</p>${point}${last.correct?'':`<p class="ev-hint">${esc(t('Scegli un’altra risposta.'))}</p>`}</div>`;
  }
  const cleanTries=(id,options)=>(st.tries[id]||[]).filter(x=>options.some(o=>o.id===x));
  /* Punteggio personale: un punto per ogni domanda verificabile risolta al primo tentativo */
  function scoreItems(){
    return flat.filter(s=>s.kind==='check'||s.kind==='move1').map(s=>{
      const options=s.kind==='move1'?L.game.move1[s.hero].options:s.options;
      const tries=cleanTries(s.id,options);
      const state=!tries.length?'none':options.find(o=>o.id===tries[0]).correct?'first':'late';
      return {id:s.id,tradition:s.tradition||s.hero,kind:s.kind,state};
    });
  }

  /* Renderer per tipo di slide: restituiscono {html, ok} */
  const R={
    text(s){return {ok:true,html:(s.lead?`<p class="ev-lead">${esc(s.lead)}</p>`:'')+p(s.body).replace(/^/,'')+keyword(s.keyword)};},
    idcard(s){
      return {ok:true,html:`<dl class="ev-card">${s.rows.map(r=>`<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl>${s.note?`<p class="ev-note">${esc(s.note)}</p>`:''}${keyword(s.keyword)}`};
    },
    values(s){
      return {ok:true,html:`<ul class="ev-values">${s.values.map(v=>`<li><strong>${esc(v.name)}</strong><span>${esc(v.line)}</span></li>`).join('')}</ul>
        <div class="ev-question"><span>${esc(t('La domanda di questa storia'))}</span><strong>${esc(s.question)}</strong></div>
        <div class="ev-answer-box"><span>${esc(t('Una possibile risposta'))}</span><p>${esc(s.answer)}</p></div>${s.note?`<p class="ev-note">${esc(s.note)}</p>`:''}${keyword(s.keyword)}`};
    },
    check(s){
      const tries=cleanTries(s.id,s.options), solved=tries.some(x=>s.options.find(o=>o.id===x)?.correct);
      return {ok:tries.length>0,html:`<h2 class="ev-q">${esc(s.question)}</h2>${optionButtons(s.id,s.options,tries,solved)}${feedbackFor(s.options,tries)}`};
    },
    move1(s){
      const m=L.game.move1[s.hero], tries=cleanTries(s.id,m.options), solved=tries.some(x=>m.options.find(o=>o.id===x)?.correct);
      return {ok:tries.length>0,html:`<div class="ev-moment"><span>${esc(heroName(s.hero))}</span><p>${esc(m.moment)}</p></div><h2 class="ev-q">${esc(t('Quale grande domanda c’è sotto questa storia?'))}</h2>${optionButtons(s.id,m.options,tries,solved)}${feedbackFor(m.options,tries)}${solved?`<p class="ev-rule">${esc(t('La vicenda è il come; la domanda è il perché quella storia veniva raccontata.'))}</p>`:''}`};
    },
    epithet(s){
      const picked=s.options.find(o=>o.id===st.epithet);
      return {ok:!!picked,html:`<p class="ev-lead">${esc(s.body[0])}</p><div class="ev-chips" role="group">${s.options.map(o=>`<button type="button" class="ev-chip" aria-pressed="${st.epithet===o.id}" data-act="epithet" data-opt="${esc(o.id)}">${esc(o.label)}</button>`).join('')}</div>${picked?`<div class="ev-feedback ok" role="status"><p>${esc(s.feedback)}</p></div>`:''}`};
    },
    ingredients(s){
      return {ok:true,html:`${p(s.body)}<div class="ev-ingredients">${s.cards.map((c,i)=>`<div><span class="ev-num">${i+1}</span><strong>${esc(c.name)}</strong><span>${esc(c.line)}</span></div>`).join('')}</div>`};
    },
    map(s){return {ok:true,html:p(s.body)};},
    score(s){
      const items=scoreItems(), n=items.filter(x=>x.state==='first').length, m=items.length, open=items.filter(x=>x.state==='none').length;
      const msg=n>=8?s.messages.high:n>=5?s.messages.mid:s.messages.low;
      const mark=x=>`<i class="ev-dot ${x.state}" role="img" aria-label="${esc(t(x.kind==='check'?'Verifica':'Domanda'))}: ${esc(t(x.state==='first'?'Primo tentativo':x.state==='late'?'Più tentativi':'Non affrontata'))}"></i>`;
      const rows=L.traditions.map(tr=>`<li style="--c:${tr.accent}"><strong>${esc(tr.name)}</strong><span>${items.filter(x=>x.tradition===tr.id).sort((a,b)=>a.kind==='check'?1:-1).map(mark).join('')}</span></li>`).join('');
      return {ok:true,html:`<div class="ev-score"><strong>${n}</strong><span>/ ${m}</span></div><p class="ev-lead">${esc(s.summary.replace('{n}',n).replace('{m}',m))}</p><ul class="ev-score-rows">${rows}</ul><div class="ev-legend"><span><i class="ev-dot first"></i>${esc(t('Primo tentativo'))}</span><span><i class="ev-dot late"></i>${esc(t('Più tentativi'))}</span><span><i class="ev-dot none"></i>${esc(t('Non affrontata'))}</span></div><p>${esc(msg)}</p>${open?`<p class="ev-hint">${esc(t('Alcune domande non sono state affrontate: puoi tornarci dall’indice dei capitoli.'))}</p>`:''}<p class="ev-note">${esc(s.note)}</p>`};
    },
    move2(s){
      const q=L.game.questions.find(x=>x.id===s.q), state=st.m2[s.q]||{sel:[],done:false};
      const sel=(state.sel||[]).filter(h=>q.heroes[h]);
      const chips=L.traditions.map(x=>`<button type="button" class="ev-chip hero" style="--c:${x.accent}" aria-pressed="${sel.includes(x.id)}" data-act="m2toggle" data-q="${s.q}" data-hero="${x.id}" ${state.done?'disabled':''}>${esc(x.hero)}</button>`).join('');
      let result='';
      if(state.done){
        result=`<ul class="ev-rows">${L.traditions.map(x=>{const h=q.heroes[x.id];return `<li class="lv-${h.level}" style="--c:${x.accent}"><div class="ev-row-head"><strong>${esc(x.hero)}</strong><span class="ev-badge">${esc(L.game.levels[h.level])}</span><span class="ev-you">${esc(t(sel.includes(x.id)?'Lo hai scelto':'Non lo hai scelto'))}</span></div><p>${esc(h.feedback)}</p></li>`;}).join('')}</ul>`;
      }
      return {ok:!!state.done,html:`<div class="ev-bigq"><span>${esc(q.id)}</span><strong>${esc(q.text)}</strong></div><p class="ev-lead">${esc(t('Tocca tutti gli eroi che secondo te affrontano questa domanda.'))}</p><div class="ev-chips" role="group">${chips}</div>${state.done?'':`<button type="button" class="btn" data-act="m2check" data-q="${s.q}" ${sel.length?'':'disabled'}>${esc(t('Controlla'))}</button>`}${result}`};
    },
    answers(s){
      const q=L.game.questions.find(x=>x.id===s.q);
      return {ok:true,html:`<div class="ev-bigq"><span>${esc(q.id)}</span><strong>${esc(q.text)}</strong></div><div class="ev-answers">${L.traditions.filter(x=>q.answers[x.id]).map(x=>{const a=q.answers[x.id];return `<div style="--c:${x.accent}"><strong>${esc(x.hero)}</strong><p>${esc(a.answer)}</p><span>${esc(t('Valore'))}: ${esc(a.value)}</span></div>`;}).join('')}</div>`};
    },
    network(s){
      return {ok:true,html:`${p(s.body)}<div class="ev-legend"><span><i class="solid"></i>${esc(s.legend[0])}</span><span><i class="dash"></i>${esc(s.legend[1])}</span></div>`};
    },
    move3(s){
      const sc=L.game.move3[s.scene], mine=a1Choice(s.scene), picked=st.m3[s.scene];
      const qs=L.game.questions;
      const buttons=qs.map((q,i)=>`<button type="button" class="ev-opt ${picked===q.id?'is-picked':''}" data-act="m3pick" data-scene="${esc(s.scene)}" data-q="${q.id}" ${picked?'disabled':''}><span class="k">${q.id}</span><span>${esc(q.text)}</span></button>`).join('');
      let out='';
      if(picked&&sc.comment[picked]){
        const closest=qs.find(q=>q.id===sc.closest);
        out=`<div class="ev-feedback ok" role="status"><p>${esc(sc.comment[picked])}</p><p><strong>${esc(t('La più vicina'))}:</strong> ${esc(sc.closest)} · ${esc(closest.text)}</p><p class="ev-hint">${esc(t('Eroi collegati'))}: ${esc(sc.heroes)}</p></div>`;
      }
      return {ok:!!picked,html:`<p class="ev-lead">${esc(mine?t('Questa è la scelta che hai fatto nell’attività 1:'):t('Nell’attività 1 ti sei trovato davanti a questa situazione.'))}</p>${mine?`<div class="ev-mine">${esc(mine.label)}</div>`:`<div class="ev-mine none">${esc(t('Se hai giocato all’attività 1 su questo telefono, qui vedresti la tua scelta.'))}</div>`}<h2 class="ev-q">${esc(t('A quale grande domanda somiglia di più?'))}</h2><div class="ev-opts" role="group">${buttons}</div>${out}`};
    },
    poem1(s){
      const pm=L.game.poem, a1=readA1().patto, pre=pm.fromPatto[a1];
      const value=st.poem.value||null, epi=st.poem.epithet||null;
      const shownValue=value||pre||null;
      return {ok:!!(shownValue&&epi),html:`${p(s.body)}${pre&&!value?`<p class="ev-note">${esc(t('Abbiamo preselezionato il valore del tuo primo patto. Puoi cambiarlo.'))}</p>`:''}
        <h2 class="ev-q">${esc(t('Il valore al centro'))}</h2><div class="ev-chips" role="group">${pm.values.map(v=>`<button type="button" class="ev-chip" aria-pressed="${shownValue===v.id}" data-act="pvalue" data-opt="${v.id}">${esc(v.name)}</button>`).join('')}</div>
        <h2 class="ev-q">${esc(t('L’epiteto della città'))}</h2><div class="ev-chips" role="group">${pm.epithets.map(e=>`<button type="button" class="ev-chip" aria-pressed="${epi===e.id}" data-act="pepi" data-opt="${e.id}">${esc(e.label)}</button>`).join('')}</div>`};
    },
    poem2(s){
      const pm=L.game.poem, pre=pm.fromPatto[readA1().patto];
      const v=pm.values.find(x=>x.id===(st.poem.value||pre))||pm.values[0], e=pm.epithets.find(x=>x.id===st.poem.epithet)||pm.epithets[0];
      const danger=readA1().pericolo, line=pm.pericoloLines[danger]||pm.pericoloLines.default;
      return {ok:true,html:`<blockquote class="ev-poem"><p>${esc(pm.lines.opening)} ${esc(e.label)}${esc(pm.lines.mid)} ${esc(v.phrase)}.</p><p>${esc(line)}</p><p>${esc(pm.lines.closing)}</p></blockquote><p class="ev-note">${esc(s.note)}</p>`};
    }
  };

  /* Schermate */
  function topbar(){
    return `<header class="ev-top"><a class="pill" href="index.html">${arrow('back')} ${esc(t('Attività 1'))}</a><div class="ev-top-r"><button class="pill" type="button" data-act="chapters">${esc(t('Capitoli'))}</button><button class="pill" type="button" data-act="lang" aria-pressed="${lang==='ar'}" aria-label="Cambia lingua / تغيير اللغة">${lang==='ar'?'Italiano':'عربي'}</button></div></header>`;
  }
  function progress(index){
    return `<div class="ev-progress" role="progressbar" aria-valuemin="1" aria-valuemax="${flat.length}" aria-valuenow="${index+1}" aria-label="${esc(t('Avanzamento'))}">${L.chapters.map((c,ci)=>{
      const first=flat.findIndex(x=>x.ci===ci), n=c.slides.length;
      const done=Math.max(0,Math.min(n,index-first+(index>=first?1:0)));
      return `<i style="flex:${n}" class="${index<first?'':done>=n?'done':'now'}"><b style="width:${index<first?0:Math.round(done/n*100)}%"></b></i>`;
    }).join('')}</div>`;
  }
  function renderLanding(){
    const saved=load(), first=flat[0];
    const at=saved?flat[byId[saved.slide]]:null;
    root.innerHTML=`${topbar()}
      <section class="ev-landing">
        <div class="ev-cover" aria-hidden="true">${ART.markup('racconto')}</div>
        <div class="ev-landing-text">
          <span class="eyebrow">${esc(t('Attività 2 · Lezione interattiva'))}</span>
          <h1 class="ev-title" id="ev-title" tabindex="-1">${esc(t(D.title))}</h1>
          <p class="ev-deck">${esc(t('Che cosa dice un eroe del popolo che lo racconta?'))}</p>
          <p>${esc(t('Cinque storie di cinque popoli, un gioco di confronto e un piccolo poema sulla vostra comunità. Nessun voto: conta il ragionamento.'))}</p>
          <div class="ev-actions">
            <button class="btn" type="button" data-act="start">${esc(t(saved?'Ricomincia dall’inizio':'Inizia'))} ${arrow('fwd')}</button>
            ${saved?`<button class="btn ghost" type="button" data-act="resume">${esc(t('Riprendi'))}: ${esc(L.chapters[at.ci].title)} ${arrow('fwd')}</button>`:''}
          </div>
          ${(()=>{const pt=a1Choice('patto');return pt?`<p class="ev-mine">${esc(t('Hai già fondato una comunità. Il vostro patto:'))} ${esc(pt.label)}</p>`:'';})()}
          <p class="ev-note">${esc(t('Non ci sono account né raccolta di dati: i progressi restano su questo telefono.'))}</p>
        </div>
      </section>`;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.body.classList.toggle('ev-ar',lang==='ar');
    document.title=t(D.title)+' — '+t('Linguaggio e comunità');
  }
  function renderSlide(){
    const index=byId[st.slide], s=flat[index], c=L.chapters[s.ci];
    const res=R[s.kind]?R[s.kind](s):R.text(s);
    const tr=s.tradition?trad[s.tradition]:s.hero?trad[s.hero]:null;
    let title=s.title;
    if(s.kind==='move1')title=t('Che domanda c’è sotto?');
    if(s.kind==='move2')title=t('Chi affronta questa domanda?');
    if(s.kind==='answers')title=t('Stessa domanda, risposte diverse');
    if(s.kind==='move3')title=L.game.move3[s.scene].title;
    const eyebrow=s.kind==='move3'?L.game.move3[s.scene].eyebrow:`${t('Capitolo')} ${s.ci+1} · ${c.title}`;
    const last=index===flat.length-1;
    root.innerHTML=`${topbar()}${progress(index)}
      <article class="ev-slide" data-kind="${esc(s.kind)}" style="--accent:${tr?tr.accent:'#146b78'}">
        <div class="ev-art" aria-hidden="true">${artFor(s)}</div>
        <div class="ev-body">
          <div class="ev-eyebrow"><span class="eyebrow">${esc(eyebrow)}</span><span class="ev-count">${s.i+1} / ${s.n}</span></div>
          ${tr?`<span class="ev-trad" style="background:${tr.accent}">${esc(tr.name)}</span>`:''}
          <h1 class="ev-h1" id="ev-title" tabindex="-1">${esc(title)}</h1>
          ${res.html}
        </div>
      </article>
      <nav class="ev-nav" aria-label="${esc(t('Navigazione'))}">
        <button class="btn ghost" type="button" data-act="prev">${arrow('back')} ${esc(t('Indietro'))}</button>
        <button class="btn" type="button" data-act="${last?'home':'next'}" ${res.ok||last?'':'disabled'}>${esc(t(last?'Torna all’inizio':'Avanti'))} ${last?'':arrow('fwd')}</button>
      </nav>${drawer?drawerHtml():''}`;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.body.classList.toggle('ev-ar',lang==='ar');
    st.seen[s.ci]=1;
    save();
  }
  function drawerHtml(){
    return `<div class="ev-drawer" role="dialog" aria-modal="true" aria-label="${esc(t('Capitoli'))}"><div class="ev-drawer-box"><div class="ev-drawer-head"><strong>${esc(t('Capitoli'))}</strong><button class="pill" type="button" data-act="close">${esc(t('Chiudi'))}</button></div><ol>${L.chapters.map((c,ci)=>`<li><button type="button" data-act="goto" data-ch="${ci}" class="${flat[byId[st.slide]].ci===ci?'is-now':''}"><span class="ev-num">${ci+1}</span><span>${esc(c.title)}</span>${st.seen[ci]?`<em>${esc(t('visto'))}</em>`:''}</button></li>`).join('')}</ol></div></div>`;
  }
  function render(keepScroll){
    const y=window.scrollY, focusKey=document.activeElement?.dataset?.act+'|'+(document.activeElement?.dataset?.opt||document.activeElement?.dataset?.hero||'');
    if(view==='landing')renderLanding();else renderSlide();
    if(keepScroll){
      window.scrollTo(0,y);
      const el=[...root.querySelectorAll('[data-act]')].find(e=>!e.disabled&&e.dataset.act+'|'+(e.dataset.opt||e.dataset.hero||'')===focusKey);
      el?.focus({preventScroll:true});
    }else{
      window.scrollTo(0,0);
      root.querySelector('#ev-title')?.focus({preventScroll:true});
    }
  }

  /* Azioni */
  function go(delta){
    const i=byId[st.slide]+delta;
    if(i<0){view='landing';render(false);return;}
    if(i>=flat.length)return;
    st.slide=flat[i].id;save();render(false);
  }
  function canAdvance(){
    const s=flat[byId[st.slide]];return !!(R[s.kind]?R[s.kind](s):R.text(s)).ok;
  }
  function onClick(e){
    const b=e.target.closest('[data-act]');if(!b||b.disabled)return;
    const a=b.dataset.act;
    switch(a){
      case 'start':st=fresh();st.slide=flat[0].id;view='slide';clearSave();save();render(false);break;
      case 'resume':{const s=load();if(s){st=s;view='slide';render(false);}break;}
      case 'next':if(canAdvance())go(1);break;
      case 'prev':go(-1);break;
      case 'home':view='landing';render(false);break;
      case 'chapters':drawer=true;render(true);root.querySelector('.ev-drawer button')?.focus();break;
      case 'close':drawer=false;render(true);break;
      case 'goto':{const ci=Number(b.dataset.ch);drawer=false;if(view==='landing'){const s=load();st=s||fresh();view='slide';}st.slide=flat.find(x=>x.ci===ci).id;save();render(false);break;}
      case 'lang':lang=lang==='ar'?'it':'ar';try{localStorage.setItem(LANGKEY,lang);}catch(_){}build();render(true);break;
      case 'pick':{
        const id=b.dataset.slide, s=flat[byId[id]];
        const options=s.kind==='move1'?L.game.move1[s.hero].options:s.options;
        const tries=cleanTries(id,options);
        if(tries.some(x=>options.find(o=>o.id===x)?.correct)||tries.includes(b.dataset.opt)||!options.some(o=>o.id===b.dataset.opt))break;
        st.tries[id]=[...tries,b.dataset.opt];save();render(true);break;
      }
      case 'epithet':st.epithet=b.dataset.opt;save();render(true);break;
      case 'm2toggle':{
        const q=b.dataset.q, cur=st.m2[q]||{sel:[],done:false};if(cur.done)break;
        const sel=cur.sel.includes(b.dataset.hero)?cur.sel.filter(x=>x!==b.dataset.hero):[...cur.sel,b.dataset.hero];
        st.m2[q]={sel,done:false};save();render(true);break;
      }
      case 'm2check':{const q=b.dataset.q, cur=st.m2[q]||{sel:[]};if(cur.sel?.length){st.m2[q]={sel:cur.sel,done:true};save();render(true);}break;}
      case 'm3pick':{if(st.m3[b.dataset.scene])break;st.m3[b.dataset.scene]=b.dataset.q;save();render(true);break;}
      case 'pvalue':st.poem={...st.poem,value:b.dataset.opt};save();render(true);break;
      case 'pepi':st.poem={...st.poem,epithet:b.dataset.opt};save();render(true);break;
    }
  }
  function onKey(e){
    if(e.altKey||e.ctrlKey||e.metaKey||e.repeat)return;
    if(view!=='slide'||drawer){if(e.key==='Escape'&&drawer){drawer=false;render(true);}return;}
    const rtl=lang==='ar';
    if(e.key==='ArrowRight'){if(rtl)go(-1);else if(canAdvance())go(1);}
    if(e.key==='ArrowLeft'){if(rtl){if(canAdvance())go(1);}else go(-1);}
  }
  root.addEventListener('click',onClick);
  document.addEventListener('keydown',onKey);

  build();
  render(false);
})();
