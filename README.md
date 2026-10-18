# Linguaggio e comunità — dal linguaggio all'epica

Applicazione didattica statica per una lezione sul linguaggio, le convenzioni condivise e la memoria collettiva. Realizzata a partire da `sito-feudo` e dal motore generalizzato di `epica-romanzo/base-feudo`.

**Versione giocabile in:** [`feat/primo-simulatore`](https://github.com/halmob01/linguaggio-comunita/tree/feat/primo-simulatore), proposta dalla [PR #1](https://github.com/halmob01/linguaggio-comunita/pull/1) ancora in bozza. **Non ancora collaudata su smartphone reale o pubblicata per la classe.**

## Percorso

1. **5 card di prologo:** ritorno alle lezioni su cooperazione, linguaggio, finzioni condivise e funzione sociopoietica.
2. **11 decisioni:** patto per la comunità, scambi fra sconosciuti, crisi; indicatori `Fiducia`, `Risorse`, `Coesione` e conseguenze commentate.
3. **Memoria collettiva:** cento anni dopo, la città sceglie che cosa tramandare dell'accaduto.
4. **4 micro-esercizi formativi:** convenzioni, compromessi, fatto/interpretazione, punti di vista. Feedback e risposta spiegata, **senza voto**.
5. **Epica comparata:** oralità, memoria, scrittura e tradizioni di Gilgamesh, Iliade, Odissea, Eneide, Mahabharata, Ramayana, Edda e saghe norrene; confronti fra gloria, dovere, morte, ritorno e fondazione, con tre riflessioni guidate. Include anche Sīrat Banī Hilāl, Shāhnāmeh, Sundiata, due schede sulle opere e sulla trasmissione, miti contemporanei e la simulazione dei punti di vista sulla battaglia del ponte. Ettore resta il ponte verso la lezione successiva.

**Durata obiettivo aggiornata:** circa 75–100 minuti con discussione, preferibilmente due lezioni; da verificare con gli studenti; stima da verificare con gli studenti.

## Architettura e origine

- `engine.js`: motore narrativo **invariato**, importato da `halmob01/epica-romanzo` / `base-feudo`, commit `90b798bd54920cdea5d20d272ffc36349520c537`.
- `storia.js`: contenuti, scene, scelte e quiz.
- `comunita-map.js`: illustrazioni SVG responsive.
- `comunita-app.js`: prologo, scelte, feedback, salvataggio/ripresa e riepilogo personalizzato.
- `stile.css`, `simulazione.css`, `comunita.css`: identità visiva derivata da Feudo, adattata al percorso.
- `tests/simulatore.test.cjs`: test delle scelte, del ripristino e degli esercizi.

Non ci sono servizi remoti, login, classifiche o dati personali degli studenti.

## Prova e verifica

Da un server statico locale:

```sh
python3 -m http.server 8000
# Aprire http://localhost:8000
node --test tests/*.test.cjs
```

La CI verifica la sintassi e i test. Sono state percorse **81 combinazioni di scelte della comunità** e **81 combinazioni degli esercizi**. Non equivale a una prova su dispositivo reale.

## Documentazione

- [Progetto didattico](docs/PROGETTO-DIDATTICO.md)
- [Stato del prototipo](docs/STATO-PROTOTIPO.md)
- [Audit esercizi con la skill `verifiche-didattiche`](docs/REVIEW-ESERCIZI.md)
- [Piano di riuso della base](docs/RIUSO-MOTORE.md)

Non unire e pubblicare per la classe prima di aver revisionato il testo e collaudato l'interfaccia su desktop e telefono.
