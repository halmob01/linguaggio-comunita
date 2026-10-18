# QA didattica — esercizi di riflessione

**Data:** 18 ottobre 2026  
**Skill utilizzata:** `verifiche-didattiche`, fornita dal docente come archivio `.skill`, con lettura di `SKILL.md`, `references/CHECKLIST.md`, `references/FORMATO.md` e `references/PROFILI.md`.  
**Stato:** prototipo formativo, **non verifica sommativa**. Non assegnare voti in base alle quattro risposte.

## Contesto e obiettivi

Destinatari: studenti della formazione professionale che hanno già studiato cooperazione mediante linguaggio, convenzioni/finzioni condivise, funzione sociopoietica e funzioni della comunicazione. Durata aggiuntiva stimata: **4–6 minuti**; stima non collaudata.

| Esercizio | Evidenza osservabile | Operazione cognitiva | Difficoltà attesa |
| --- | --- | --- | --- |
| `ex_gettoni` | Spiega perché un gettone funziona per accordo | Applicazione a nuovo contesto scolastico | Facile |
| `ex_conseguenze` | Legge i compromessi nel proprio esito della crisi | Interpretazione del modello e diagnosi di un errore concettuale | Media |
| `ex_fatti` | Riconosce un giudizio rispetto a una descrizione | Distinzione fatto/interpretazione | Media |
| `ex_punti_vista` | Riconosce che due racconti selezionano gesti e valori | Confronto di prospettive e trasferimento alla memoria collettiva | Media |

I primi due esercizi riprendono direttamente quanto costruito o scelto nella simulazione. Gli ultimi due preparano l'apertura verso l'epica **senza richiedere conoscenze sull'Iliade**. Tre alternative plausibili per esercizio, una spiegazione migliore secondo il contesto e feedback specifico per ogni alternativa. Nessun punteggio o effetto sulle misure della città.

Le domande appartengono a `storia.js` (`activity: 'quiz'`), ma vengono eseguite come scene `reflection` supportate dal motore. **Non** hanno una posizione chiave visibile prima della risposta; la pagina mostra spiegazione e correzione soltanto dopo aver scelto. La prima riflessione aperta su cosa tramandare resta distinta: in essa tutte e tre le opzioni sono legittime.

## Audit automatico esterno della skill

Eseguito sullo schema normalizzato a 4 quesiti con:

```sh
python3 verifiche-didattiche/scripts/audit_questions.py esercizi-audit.json --format json
```

Lo schema di audit è stato trascritto dalle quattro scene implementate in `storia.js`; non è lo schema usato dal runtime. Report:

| Metrica | Risultato |
| --- | --- |
| Quesiti di scelta analizzati | 4 |
| Errori bloccanti | 0 |
| Avvisi automatici | 0 |
| Risposta corretta unica più lunga | 0/4 (0%) |
| Posizioni corrette nell'ordine di rendering | B, C, A, B |
| Somiglianza dei quesiti | Nessuna segnalazione automatica |

Rapporto tra lunghezza della corretta e distrattore più lungo: **0,938; 0,935; 1,000; 0,870**. Per un campione di quattro domande **non ha senso forzare una distribuzione statistica uniforme**. In questa UI le opzioni sono rese in ordine sorgente, senza mescolamento, quindi le posizioni indicate corrispondono all'ordine disegnato dal codice; l'effettivo rendering su dispositivo resta da testare.

Sono inoltre passati gli 8 test interni dello script `test_audit_questions.py` della skill.

## Revisione semantica e pedagogica — controllo dell'assistente

- **Bloccanti individuati:** nessuno nei quattro item finali.
- **Da correggere:** nessuna opzione richiede di sapere già cos'è l'epica; il testo ipotetico sulle tre case è esplicitamente introdotto come esempio inventato, non come fatto relativo a tutti i percorsi di gioco.
- **Distrattori:** per ogni quesito, propongono un errore identificabile: fidarsi della materia o delle conoscenze personali anziché delle regole; interpretare i numeri come classifica morale; confondere descrizione con attribuzione di colpa; presumere superiorità del racconto più antico/dettagliato.
- **Indizi:** le opzioni sono grammaticalmente parallele, in registro analogo; nessuna corretta è l'unica più lunga; le risposte non sono sempre nella stessa posizione. Non compare un voto 0–100.
- **Feedback:** un errore produce prima una spiegazione specifica, poi la risposta da ricordare e il motivo; una risposta giusta riceve rinforzo argomentato, non soltanto «Corretto».
- **Limite della valutazione:** riconoscere spiegazioni in scelta multipla **non dimostra** padronanza della produzione scritta o della capacità di difendere oralmente una tesi. Il confronto orale in classe resta essenziale.

## Test software e limiti

Test aggiornati in `tests/simulatore.test.cjs`:
- 81 combinazioni della simulazione con esercizi completati;
- ulteriori 81 combinazioni di risposte ai quattro esercizi;
- salvataggio e ripristino dopo ogni fase, blocco delle scelte duplicate;
- verifica che gli esercizi non modifichino le tre misure e che abbiano una sola chiave corretta;
- ordine sorgente delle risposte e controllo del pattern di lunghezza;
- controllo della presenza del feedback e del contesto personalizzato nell'app.

La CI GitHub Actions sul ramo e sulla PR è stata eseguita con esito positivo dopo l'aggiornamento dei test.

**Non verificabile senza collaudo manuale:** leggibilità su un telefono reale, velocità di completamento, distrazioni nell'interfaccia, comprensione delle consegne da parte degli studenti, equivalenza effettiva tra comportamento dell'interfaccia e percezione didattica. Il risultato è **pronto per revisione**, non «validato per la classe».

## Nota al docente

La questione decisiva è la differenza tra **convenzione sociale** e **racconto condiviso**. L'ultima attività la rende esplicita per preparare la domanda finale: «Che cosa trasforma la storia di una persona nella storia di un intero popolo?».

Non unire automaticamente questa PR prima della prova completa su smartphone e del controllo delle formulazioni in classe.
