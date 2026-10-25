# Stato del prototipo — 25 ottobre 2026

**Pubblicazione:** progetto statico GitHub Pages. Due attività: `index.html` (La comunità) ed `epica.html` (Le voci dell'epica).

## Funzionalità implementate

**Attività 1 — La comunità**
- Riuso di `engine.js` da `epica-romanzo/base-feudo`, sorgente commit `90b798bd54920cdea5d20d272ffc36349520c537`; grafica ereditata da Feudo.
- Cinque card di richiamo, quattordici decisioni con tre indicatori, memoria collettiva con scelta interpretativa, riepilogo finale.
- Quattro esercizi di riflessione (tre alternative, una risposta meglio fondata, feedback specifico, nessun voto). Dettagli: [REVIEW-ESERCIZI.md](REVIEW-ESERCIZI.md).
- Ponte finale verso l'attività 2, senza anticipare Ettore; sei situazioni (crisi, nuovi arrivi, statua, storie degli anziani, partenza dei giovani, compito del ponte) tornano nel gioco dell'attività 2.
- Salvataggio e ripristino locali (`linguaggio-comunita-session-v2`); nessuna classifica, login o backend.

**Attività 2 — Le voci dell'epica** (specifica in [ARCHITETTURA-DUE-ATTIVITA.md](ARCHITETTURA-DUE-ATTIVITA.md))
- Sei capitoli e circa 55 schermate brevi; indice dei capitoli; salvataggio e ripresa (`linguaggio-epica-session-v1`).
- Cinque tradizioni (Gilgamesh, Odissea, Eneide, Shāhnāmeh, Sīrat Banī Hilāl) con carta d'identità, storia, valori, domanda e verifica rapida.
- Mappa con coste reali semplificate e linea del tempo; un emblema illustrato per tradizione; rete finale delle domande.
- Gioco «Le grandi domande» in tre mosse, senza punteggio; legge in sola lettura le scelte dell'attività 1 e funziona anche senza.
- Proemio epico generato dalle scelte dello studente.
- Italiano e arabo (layout RTL).

## Verifiche eseguite

- Suite `node --test tests/*.test.cjs`: attività 1 (81 combinazioni di scelte, 81 di esercizi, ripristino, limiti 0–100, assenza di punteggio negli esercizi, struttura, traduzioni) e attività 2 (struttura e lunghezza delle schermate, una sola risposta esatta per quesito, assenza di indizi di lunghezza e posizione, copertura della traduzione araba, assenza di anticipazioni su Ettore, percorso completo dell'interfaccia in italiano e arabo con un DOM simulato, lettura senza scrittura dei dati dell'attività 1, ripresa e dati corrotti).
- Percorso completo delle due attività in un browser reale in formato telefono (390×844), con schermata per schermata ispezionata; nessun errore in console e nessuno scorrimento orizzontale; passaggio dall'attività 1 all'attività 2 con le scelte riportate.
- CI GitHub Actions: sintassi e test.

## Limiti

**Non verificati:** prova su un telefono reale, tempi di completamento, comprensione delle consegne da parte degli studenti, comportamento con carta di rete lenta o senza connessione ai Google Fonts (il testo resta leggibile con i caratteri di ripiego). Le durate non sono state misurate e non sono dichiarate.

**Da controllare con una persona competente:** accuratezza dei fatti sulle cinque storie e sulle date (scritti da conoscenze generali, non da fonti consultate durante il lavoro); traduzione araba di entrambe le attività; scenari e valori numerici dell'attività 1.

## Idee non ancora realizzate

- «Il consiglio degli eroi»: la città in pericolo chiede consiglio agli eroi (capitolo facoltativo che riusa le cinque tradizioni).
- Altre tradizioni (Sundiata, Mahabharata, Ramayana, saghe norrene) come capitoli facoltativi con la stessa struttura.
- Raccordo con la lezione su Ettore e l'Iliade (progetto `epica-romanzo`).
