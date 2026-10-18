# Linguaggio e comunità

Attività didattica interattiva: **dal linguaggio alle convenzioni condivise, dall'immaginario collettivo al ponte con l'epica**.

## Stato

**Fase progettuale.** La repository contiene le specifiche didattiche, non ancora un'applicazione funzionante. Non pubblicare o proporre il sito agli studenti prima dei test.

## Percorso

1. **Prologo (5 card)**: richiamo alle lezioni sul linguaggio, sulla cooperazione e sulla funzione sociopoietica.
2. **Simulazione**: fondare una comunità, stabilire convenzioni, prendere decisioni con costi e benefici.
3. **Crisi**: un pericolo mette in tensione gli interessi del singolo e i doveri verso il gruppo.
4. **Memoria collettiva**: una vicenda viene raccontata e tramandata.
5. **Domanda finale**: perché una comunità ricorda alcune persone e alcune imprese? Ponte verso l'epica, da affrontare nella lezione successiva.

Durata indicativa **35–40 minuti**, da validare in classe. Non ripetere come quiz l'intera lezione sul linguaggio: usare i concetti già studiati per scoprire qualcosa di nuovo.

## Design e base tecnica

Identità grafica, card narrative, navigazione, feedback, indicatori e animazioni da **sito-feudo**. Base tecnica candidata: ramo `base-feudo` di **epica-romanzo**, a sua volta derivato da `sito-game-template1`. La base oggi **non è ancora un motore generalizzato**: include logiche e testi del Feudo. Evitare di copiare l'intera simulazione medievale senza adattarla.

- Repository base: https://github.com/halmob01/epica-romanzo/tree/base-feudo
- Sito di riferimento: https://github.com/halmob01/sito-feudo
- Specifiche didattiche: [docs/PROGETTO-DIDATTICO.md](docs/PROGETTO-DIDATTICO.md)
- Piano di riuso: [docs/RIUSO-MOTORE.md](docs/RIUSO-MOTORE.md)

## Vincoli

Sito statico HTML/CSS/JS, destinato a GitHub Pages; mobile-first; niente login, backend o dati personali degli studenti nella prima versione. Le scelte devono mostrare conseguenze comprensibili e **non essere un test morale**. Gli indicatori sono convenzioni ludiche, non misure scientifiche di una società.

**Da approvare prima dell'implementazione:** numero esatto dei turni, scelte e variazioni numeriche; sequenza e visual della comunità. Le cinque card di prologo sono già state concordate.
