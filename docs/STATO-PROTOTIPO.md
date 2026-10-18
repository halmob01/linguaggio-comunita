# Stato prototipo — 18 ottobre 2026

**Ramo:** `feat/primo-simulatore` di `halmob01/linguaggio-comunita`. L'applicazione non è ancora stata pubblicata su GitHub Pages e non è stata approvata per la classe.

## Riuso effettivo

Origine: `halmob01/epica-romanzo` / `base-feudo`, commit `90b798bd54920cdea5d20d272ffc36349520c537`.

- `engine.js` copiato dalla base tecnica, invariato: validazione dati, scelta/conseguenza, progressione e restore.
- `stile.css` e `simulazione.css` derivano dagli stili e dai pattern di Feudo/Epica.
- `storia.js` sostituisce interamente gli episodi omerici con cinque card di richiamo, tre decisioni (patto, scambi, crisi), una card sulla memoria, una riflessione e una card-ponte verso Ettore.
- `comunita-map.js` contiene illustrazioni SVG proprie, reattive agli indicatori.
- `comunita-app.js` contiene interfaccia, progressione del prologo, salvataggio locale, ripresa della sessione, feedback e riepilogo personalizzato.
- `index.html` + `comunita.css` completano l'app mobile-first.

Il finale cita la **scelta reale** fatta nel patto, nella crisi e nella selezione del racconto. Nessun voto, classifica, login o invio di dati degli studenti.

## Test

`node --test tests/*.test.cjs`, Node 20+. Il test percorre **81 combinazioni di scelte** con ripristino della sessione dopo ogni avanzamento, verifica gli effetti, l'intervallo 0–100, le illustrazioni e i riferimenti agli script. Workflow GitHub Actions configurato sulla pull request.

**Non verificato qui:** prova visuale in browser reale e su iPhone Android; tempi effettivi in aula; qualità degli SVG su ogni schermo; compatibilità di dispositivi datati. Non dichiarare pronto per uso in classe prima di questi test.

## Nota didattica

Le scelte e i delta sono ipotesi didattiche da rivedere col docente: non dati scientifici o giudizi morali. I contenuti delle 5 card rispettano la struttura e il significato del prologo concordato; sono stati lievemente condensati per il mobile. La riflessione finale propone **punti di vista narrativi differenti**, nessuna risposta giusta unica.

## Prossimi controlli prima del merge

1. Aprire il branch con server statico o GitHub Pages in anteprima ed eseguire tutto il percorso, anche da telefono.
2. Verificare tempi e leggibilità di prologo, scelte, feedback e conclusione.
3. Rivedere con il docente le tre situazioni: quale patto, che tipo di scambio, quale minaccia e quali delta.
4. Accertare che il passaggio finale a Ettore non anticipi la spiegazione dell'Iliade.
