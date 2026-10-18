# Piano tecnico — riuso della base Feudo

**Stato:** piano di migrazione, **nessun motore ancora copiato** in questo repository.

## Sorgenti e situazione verificata (18 ottobre 2026)

- Originale: `halmob01/sito-feudo`, gioco contenuto in `index.html`.
- Template modulare: `halmob01/sito-game-template1`.
- Copia tecnica disponibile: `halmob01/epica-romanzo`, ramo [`base-feudo`](https://github.com/halmob01/epica-romanzo/tree/base-feudo), PR [#1](https://github.com/halmob01/epica-romanzo/pull/1).
- Il ramo `base-feudo` contiene `index.html`, `stile.css`, `config.js`, `contenuti.js`, `motore.js`, `prologo.js`, `mappa.js`, `interfaccia.js`, `comune.js`, `i18n.js`, `.nojekyll` e documentazione.
- **Non è ancora un motore generalizzato**: `motore.js` contiene variabili specifiche (es. granaio, contadini, guardie, castelli e crisi del feudo); `mappa.js`, `contenuti.js`, `prologo.js` e `interfaccia.js` includono elementi del Feudo. Lo dichiara anche `epica-romanzo/docs/BASE-TECNICA.md`.

## Decisione

**Copiare da `epica-romanzo/base-feudo`, quando il codice riutilizzabile è verificato**, preservando `epica-romanzo` come progetto indipendente. Per la prima iterazione si può anche derivare il ramo già disponibile, ma **non** lasciare contenuti medievali o dipendenze tra i due siti in produzione.

La nuova applicazione non condivide salvataggi, chiavi o punteggi con Feudo/Epica. Preferire una **copia versionata** anziché collegare direttamente i JS pubblicati su un'altra repo: i cambi successivi a Ettore non devono rompere il sito sul linguaggio.

## Parti riutilizzabili

| Componente | Approccio |
| --- | --- |
| `stile.css` | Riutilizzare la palette e i pattern visivi; eliminare selettivamente classi non utilizzate |
| `prologo.js` | Conservare navigazione, animazioni, accessibilità; sostituire i 5 contenuti e gli SVG |
| `index.html` | Conservare shell responsive; aggiornare titolo, sottotitolo e etichette |
| `interfaccia.js` | Conservare componenti per scelte, conseguenze e indicatori; eliminare ordini/leaderboard e controlli feudali non richiesti |
| `motore.js` | Rifare il modello stato e le transizioni per la nuova simulazione; NON rinominare semplicemente variabili medievali |
| `contenuti.js` | Sostituire integralmente con contenuti propri, indipendenti da Ettore e Feudo |
| `mappa.js` | Riutilizzare solo rendering canvas/SVG e animazioni utili; disegnare una comunità non medievale né la Troia del progetto Epica |
| `comune.js` | Riutilizzare utility e localStorage con nuove chiavi; rimuovere coordinate e stagioni specifiche |
| `config.js` | Impostare chiavi locali proprie e togliere integrazioni inattive; non copiare credenziali/hash |
| `i18n.js` | Valutare in una fase successiva; non trascinare traduzioni medievali inutilizzate |

## Contratto minimo del motore indipendente dai contenuti (obiettivo architetturale)

La simulazione dovrebbe poter definire tramite dati:
- `scenes` o `prologueCards`: titolo, testi, illustrazione, azione successiva;
- `stats`: chiave, etichetta, valore iniziale, minimo/massimo;
- `events`: testo, scelte, delta, spiegazione degli effetti;
- `ending`: riepilogo delle decisioni e conclusione che riutilizza le scelte precedenti.

Tenere separati: *contenuto di lezione*, *regole di transizione* e *presentazione*. Non progettare una piattaforma universale: serve solo sufficiente modularità per queste simulazioni didattiche.

## Piano di implementazione

1. Acquisire la revisione verificata della base tecnica da `epica-romanzo`, annotando il commit sorgente (non importare direttamente il lavoro in corso senza revisione).
2. Copiare la shell CSS/HTML e il componente di prologo: 5 card come da `PROGETTO-DIDATTICO.md`. Smoke test desktop e smartphone.
3. Separare definizioni degli indicatori dal codice e creare una nuova mappa della comunità.
4. Implementare una sola scena con tre scelte e feedback verificabili; poi aggiungere gli altri eventi approvati.
5. Introdurre il riepilogo «cento anni dopo» che ricorda le **scelte effettive** del giocatore.
6. Testare salvataggio, reset, navigazione, animazioni ridotte, leggibilità e tutte le diramazioni.
7. Pubblicare su GitHub Pages solo dopo aver rimosso gli avvisi della base tecnica e gli elementi storici residui.

## Vincoli di integrazione

- **GitHub Pages** senza backend, account o dati identificativi dello studente.
- Chiavi `localStorage` dedicate, ad esempio `linguaggio-comunita-state-v1` e `linguaggio-comunita-lang-v1`.
- Non importare password, endpoint o configurazioni scolastiche da altri progetti.
- Non introdurre classifica e punteggio cumulativo senza una decisione didattica esplicita.
- Regole dei turni brevi e non punitive: feedback su costi/conseguenze, non sulle virtù morali dell'allievo.
- Conservare i vincoli di accessibilità `prefers-reduced-motion`, supporto touch e testo leggibile su smartphone.

## Verifica minima prima della classe

- Una scelta modifica gli indicatori corretti senza superare i limiti 0–100.
- Due strade diverse producono conseguenze distinguibili.
- Il finale rispecchia almeno una decisione effettuata (non restituisce sempre lo stesso testo).
- Non compare alcun riferimento a feudi, castelli, cavalieri, Troia o personaggi omerici nella simulazione introduttiva, salvo il ponte finale esplicito a Ettore.
- L'app non sovrascrive il salvataggio di `sito-feudo` o `epica-romanzo`.
- Almeno una prova su telefono reale oltre ai test in browser desktop.

## Rimandi

- [Progetto didattico](PROGETTO-DIDATTICO.md)
- [Base tecnica Epica](https://github.com/halmob01/epica-romanzo/blob/base-feudo/docs/BASE-TECNICA.md)
