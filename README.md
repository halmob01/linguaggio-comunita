# Linguaggio e comunità — due attività: la comunità e l'epica

Applicazione didattica statica in due attività collegate, per una lezione sul linguaggio, le convenzioni condivise, la memoria collettiva e il modo in cui un popolo racconta i propri valori. Realizzata a partire da `sito-feudo` e dal motore generalizzato di `epica-romanzo/base-feudo`.

**Non ancora collaudata su uno smartphone reale con studenti.** Le durate non sono state misurate: da rilevare in classe.

## Le due attività

### Attività 1 — La comunità (`index.html`)

1. **5 card di prologo:** ritorno alle lezioni su cooperazione, linguaggio, finzioni condivise e funzione sociopoietica.
2. **14 decisioni:** patto per la comunità, scambi fra sconosciuti, memoria, partenze, doveri, crisi; indicatori `Fiducia`, `Risorse`, `Coesione` e conseguenze commentate.
3. **Memoria collettiva:** cento anni dopo, la città sceglie che cosa tramandare dell'accaduto.
4. **4 micro-esercizi formativi:** convenzioni, compromessi, fatto/interpretazione, punti di vista. Feedback e risposta spiegata, **senza voto**.
5. **Ponte:** «le storie in cui ci riconosciamo» e un bottone verso l'attività 2.

### Attività 2 — Le voci dell'epica (`epica.html`)

Filo conduttore: *l'epica è il racconto con cui un popolo parla di sé; attraverso le scelte di un eroe mette alla prova i propri valori. Popoli lontani si fanno domande simili e rispondono in modo diverso.*

Circa 55 schermate brevi, in 6 capitoli navigabili dall'indice «Capitoli»:

1. **Dalla vostra comunità all'epica** — che cos'è un valore.
2. **Che cos'è l'epica** — epos, aedi, formule ed epiteti, ingredienti, epica e storia.
3. **Cinque popoli, cinque storie** — mappa e linea del tempo, poi per ciascuna tradizione (Gilgamesh, Odissea, Eneide, Shāhnāmeh, Sīrat Banī Hilāl): carta d'identità, storia in due schermate, valori e domanda della storia, verifica rapida.
4. **Il gioco delle grandi domande** — dalla vicenda alla domanda (5 turni); le domande si somigliano (3 domande, collegamento degli eroi, rete finale); anche la vostra comunità se l'è chiesto (legge, in sola lettura, sei scelte fatte nell'attività 1).
5. **Il poema della vostra comunità** — valore e epiteto della città, proemio in stile epico.
6. **Verso la prossima lezione** — il tuo percorso (punteggio personale), sintesi e domanda sull'Iliade e su Ettore, senza anticipare la trama.

**Punteggio personale:** un punto per ogni risposta esatta al primo tentativo, solo sulle 10 domande verificabili (le 5 verifiche rapide e i 5 turni «dalla vicenda alla domanda»). Non ci sono punti per le decisioni, i confronti e il proemio. Il punteggio resta sul telefono dello studente: **nessuna classifica**, nessun confronto fra studenti, nessun account.

## Architettura

- Attività 1: `engine.js` (motore narrativo **invariato**, importato da `halmob01/epica-romanzo` / `base-feudo`, commit `90b798bd54920cdea5d20d272ffc36349520c537`), `storia.js` (scene, scelte, quiz), `comunita-map.js` (SVG), `comunita-app.js` (interfaccia), `ar.js` (arabo).
- Attività 2: `epica-dati.js` (contenuti), `epica-arte.js` (SVG: scene, emblemi, mappa con coste di Natural Earth, rete delle domande), `epica-app.js` (slide, verifiche, gioco, proemio), `epica-ar.js` (arabo), `epica.css`.
- `stile.css`, `simulazione.css`, `comunita.css`: identità visiva derivata da Feudo, condivisa fra le due attività.
- I salvataggi sono locali e separati (`linguaggio-comunita-session-v2`, `linguaggio-epica-session-v1`). L'attività 2 **legge soltanto** le scelte dell'attività 1 e non le modifica; se mancano, funziona lo stesso.
- Non ci sono servizi remoti, login, classifiche o dati personali degli studenti.

## Prova e verifica

Da un server statico locale:

```sh
python3 -m http.server 8000
# Attività 1: http://localhost:8000/        Attività 2: http://localhost:8000/epica.html
node --test tests/*.test.cjs
```

La CI verifica la sintassi e i test (struttura dei contenuti, risposte, traduzioni arabe, assenza di anticipazioni su Ettore, percorso completo dell'interfaccia in italiano e in arabo con un DOM simulato). Le due attività sono state percorse inoltre in un browser reale in formato telefono (390×844). **Non equivale a una prova su dispositivo reale con studenti.**

## Documentazione

- [Progetto didattico dell'attività 1](docs/PROGETTO-DIDATTICO.md)
- [Architettura delle due attività](docs/ARCHITETTURA-DUE-ATTIVITA.md)
- [Stato del prototipo](docs/STATO-PROTOTIPO.md)
- [Audit esercizi con la skill `verifiche-didattiche`](docs/REVIEW-ESERCIZI.md)
- [Piano di riuso della base](docs/RIUSO-MOTORE.md)

## Italiano e arabo

L'interfaccia è in italiano per impostazione predefinita. Il pulsante `عربي / Italiano` permette di cambiare lingua senza perdere i progressi; la scelta vale per entrambe le attività. `ar.js` e `epica-ar.js` contengono le traduzioni; i motori e i dati restano indipendenti dai testi. In arabo si usa il layout RTL e il font Cairo. La traduzione è in arabo standard moderno semplificato e **richiede una verifica linguistica con parlanti competenti** prima dell'impiego definitivo in classe.

## Contenuti da verificare prima dell'uso definitivo

I fatti delle cinque storie (date approssimative, dettagli degli episodi, in particolare per la Sīrat Banī Hilāl, che varia molto fra le versioni regionali, e per lo Shāhnāmeh) sono scritti a partire da conoscenze generali e vanno controllati su fonti prima di un uso stabile. Le coste della mappa derivano da Natural Earth (pubblico dominio) e sono semplificate.
