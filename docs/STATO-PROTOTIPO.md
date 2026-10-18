# Stato prototipo — 18 ottobre 2026

**Ramo:** `feat/primo-simulatore`. PR [#1](https://github.com/halmob01/linguaggio-comunita/pull/1) in bozza; progetto statico GitHub Pages, non ancora distribuito alla classe.

## Funzionalità implementate

- Riuso di `engine.js` da `epica-romanzo/base-feudo`, sorgente commit `90b798bd54920cdea5d20d272ffc36349520c537`; grafica ereditata da Feudo.
- Cinque card di richiamo iniziale, tre scelte che modificano tre indicatori, scena della memoria collettiva con scelta interpretativa e riepilogo finale.
- **Quattro esercizi di riflessione** nel segmento precedente al ponte con l'epica: gettoni/convenzioni, compromessi, fatto vs interpretazione, differenti punti di vista sul racconto.
- Gli esercizi hanno tre alternative ciascuno, una risposta meglio fondata, feedback specifico sulle risposte sbagliate, spiegazione della corretta dopo la scelta e nessun voto.
- La crisi e la sua variazione degli indicatori sono richiamate nel secondo esercizio. L'ultima domanda sul racconto prepara l'apertura verso Ettore.
- Salvataggio e ripristino locali; nessuna classifica, login, backend o raccolta di dati personali.

## Verifiche eseguite

- **Skill allegata `verifiche-didattiche`**: istruzioni lette, script eseguito su quattro item normalizzati; 0 errori, 0 avvisi, nessuna risposta corretta unica più lunga. Le posizioni nell'ordine di presentazione sono B–C–A–B.
- Test interni della skill: 8 superati.
- Suite `tests/simulatore.test.cjs`: 81 combinazioni della simulazione e 81 combinazioni di risposte degli esercizi, ripristino di stato, limiti 0–100, assenza di punteggio sugli esercizi, struttura delle scene e sintassi JavaScript.
- CI GitHub Actions: esito positivo dopo le modifiche.

Dettagli: [REVIEW-ESERCIZI.md](REVIEW-ESERCIZI.md).

## Limiti

**Non verificati:** rendering e navigazione in un browser reale e su smartphone, tempi di completamento e prova didattica con studenti. I delta degli indicatori sono convenzioni del gioco, non dati scientifici. Il motore non valuta produzioni scritte o competenze argomentative autonome.

## Controlli prima del merge

1. Prova visuale su desktop e un telefono reale, compresi prologo e schermi finali.
2. Controllo dei quattro item su display piccolo e del feedback dopo risposte corrette/sbagliate.
3. Revisione docente degli scenari, dei valori numerici e delle formulazioni.
4. Verifica del tempo effettivo della lezione, stimato in **35–45 minuti compresa la discussione**.

Non considerare la PR un rilascio finale destinato alla classe finché questi controlli non sono completati.
