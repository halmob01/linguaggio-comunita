# Architettura definitiva — due attività: «La comunità» e «Le voci dell'epica»

**Stato:** specifica approvata nel confronto con il docente (25 ottobre 2026), da implementare.
**Destinatari dell'implementazione:** chi sviluppa (anche un altro modello) senza aver seguito la discussione. Questo documento è autosufficiente: contiene decisioni, contenuti di riferimento, schema dei dati, criteri di accettazione e ordine di lavoro.
**Uso in classe:** ogni studente usa il **proprio telefono**. Progettare mobile-first (390×844), funzionante anche su desktop/LIM.

---

## 0. Perché questa ristrutturazione

Oggi `index.html` contiene un percorso unico di 60 schermate: 25 sulla comunità, 35 su epica e miti contemporanei. Problemi emersi dalla revisione:

1. Due lezioni diverse fuse in una sola sequenza.
2. La parte sull'epica è quasi tutta lettura passiva: card di 400–570 caratteri, la sintesi è un elenco compresso in un paragrafo.
3. Nove tradizioni in due righe ciascuna: troppe e troppo superficiali per studenti che **non conoscono quasi nulla** di queste vicende.
4. I «giochi» non fanno ragionare: nei 6 dilemmi la scelta non conta e i «collegamenti costruiti» sono testo già scritto; nella battaglia del ponte la risposta è sempre in diagonale (`answer: [0,1,2]`) e si può proseguire senza rispondere.
5. Le illustrazioni dell'epica riusano quelle della comunità (es. i fumetti etichettati «02 / LINGUAGGIO»).
6. **Il percorso rivela la morte di Ettore** (`storia.js`, scene `epica_iliade` e `epica_confronto_1`) mentre la lezione successiva è proprio su Ettore.

## 1. Obiettivo didattico dell'attività 2 (la frase guida)

> **L'epica è il racconto con cui una comunità parla di sé: attraverso le scelte di un eroe mette alla prova i propri valori e affronta grandi domande. Popoli lontani si sono fatti domande simili, ma hanno dato risposte diverse, perché diversi erano i loro valori.**

Al termine lo studente deve saper:
- dire che cos'è l'epica con parole proprie (racconto di imprese, tramandato spesso a voce, che una comunità considera parte della propria identità);
- riconoscere in almeno un eroe **quale qualità/valore** il suo popolo ammirava;
- passare dalla **vicenda** (che cosa succede) alla **domanda** (perché quella storia veniva raccontata);
- notare che la stessa domanda ritorna in culture diverse con risposte diverse;
- collegare una decisione della propria comunità simulata (attività 1) a una di queste domande.

Non è richiesto memorizzare date o trame complete. Niente voti, niente classifiche.

## 2. Struttura dei file

```
index.html            Attività 1 — La comunità (URL invariato)
epica.html            Attività 2 — Le voci dell'epica (nuova)

engine.js             motore narrativo (invariato, usato solo dall'attività 1)
storia.js             contenuti attività 1 (ripuliti dall'epica)
comunita-map.js       SVG attività 1
comunita-app.js       app attività 1 (ripulita dalle funzioni epiche)
ar.js                 arabo attività 1 (ripulito dalle chiavi epica_*/miti_*)

epica-dati.js         contenuti attività 2: capitoli, slide, verifiche, gioco
epica-arte.js         SVG attività 2: mappa, emblemi delle tradizioni, rete finale
epica-ar.js           arabo attività 2 (stesse chiavi di epica-dati.js)
epica-app.js          app attività 2: navigazione slide, verifiche, gioco, salvataggio

stile.css             token e componenti comuni (invariato)
simulazione.css       attività 1
comunita.css          attività 1 (rimuovere le regole .lc-dilemma*, .lc-bridge*, .lc-game*, .lc-recall* dopo la pulizia)
epica.css             attività 2 (nuovo)

tests/simulatore.test.cjs   aggiornato alla nuova attività 1
tests/epica.test.cjs        nuovo
```

Scelte motivate:
- **Due pagine, non due «modalità» nella stessa pagina:** il docente può mandare il link diretto di ciascuna attività; i salvataggi restano separati; un errore in una non rompe l'altra.
- **L'attività 2 non usa `engine.js`:** il motore gestisce decisioni con indicatori 0–100. L'attività 2 è una sequenza di slide con verifiche e un gioco senza indicatori: un piccolo navigatore dedicato è più semplice e più sicuro che forzare il motore.
- **Stesso linguaggio visivo:** riusare i token e i componenti di `stile.css` (font Alfa Slab One / Public Sans / Cairo, bottoni `.btn`, `.pill`, `.eyebrow`), così le due attività sembrano un'unica opera.
- Nessuna dipendenza esterna oltre ai Google Fonts già presenti. Nessun backend, login o dato personale.

## 3. Attività 1 — interventi (piccoli)

1. In `storia.js` rimuovere le scene da `epica_domanda` a `miti_conclusione` incluse (indici 25–58). Restano 26 scene: da `come` a `trasferimento`, più `ponte`.
2. Riscrivere la scena `ponte` come passaggio all'attività 2, **senza nominare la morte di nessun personaggio**:
   «Una comunità non tramanda soltanto regole: tramanda storie in cui riconosce i propri valori. Anche i popoli antichi lo hanno fatto, con racconti chiamati *epica*. Nella prossima attività ascolterai cinque di queste storie.»
3. `comunita-app.js`: aggiornare `ending()` (oggi cita «confronti epici e la battaglia del ponte») con un riepilogo solo della comunità e un bottone **«Vai all'attività 2: Le voci dell'epica →»** (`<a class="btn" href="epica.html">`). Rimuovere `epicRecall`, `dilemma`, `comparison`, i loro listener, `DILEMMA_STORE` e i rami `epica_`/`miti_` nelle etichette (`eyebrow`).
4. `ar.js`: rimuovere le chiavi delle scene eliminate; aggiornare la traduzione di `ponte` e del finale.
5. `index.html`: nella landing, sotto la card esistente, aggiungere una seconda card **«Attività 2 · Le voci dell'epica»** con link a `epica.html`. Cambiare il testo della prima card: togliere «e un confronto fra le grandi tradizioni epiche, prima di incontrare Ettore» e «Percorso esteso · consigliate due lezioni».
6. Contenuti rimossi (miti di oggi, battaglia del ponte, Sundiata, Mahabharata, Ramayana, saghe norrene, dilemmi): restano nella cronologia git; non vanno trasferiti nell'attività 2. Il tema «fatti e interpretazioni» è già coperto dagli esercizi `ex_fatti` e `ex_punti_vista`.
7. Togliere da README e documenti le stime di durata non verificate.

**Salvataggi:** cambiando il numero di scene, una sessione salvata con la vecchia struttura deve essere scartata senza errori. Rinominare `STORAGE` in `linguaggio-comunita-session-v2` e **leggere la v1 solo in sola lettura dall'attività 2** (vedi §7.3) — in alternativa mantenere `v1` se `engine.restore` rifiuta già in modo pulito le sessioni con indice oltre la fine: verificarlo con un test.

## 4. Attività 2 — mappa del percorso

Circa 40 schermate brevi, divise in **6 capitoli** navigabili da un indice (il docente può far ripartire la classe da un capitolo). Ogni schermata: **un'idea sola**.

| Cap. | Titolo | Schermate | Tipo |
| --- | --- | ---: | --- |
| 1 | Dalla vostra comunità all'epica | 3 | racconto |
| 2 | Che cos'è l'epica | 6 | racconto + 1 interazione (epiteto) |
| 3 | Cinque popoli, cinque storie | 1 mappa + 5×5 = 26 | per ogni tradizione: carta d'identità, storia (2), valori, verifica |
| 4 | Il gioco delle grandi domande | ~10 | gioco in tre mosse |
| 5 | Il poema della vostra comunità | 2 | interazione creativa |
| 6 | Verso la prossima lezione | 2 | racconto |

Ordine delle tradizioni (cronologico, così la mappa e la linea del tempo crescono insieme): **Gilgamesh → Odissea → Eneide → Shāhnāmeh → Sīrat Banī Hilāl.**

## 5. Contenuti di riferimento

Regole di scrittura per **tutte** le schermate:
- Livello linguistico A2–B1, frasi brevi, presente indicativo nei racconti.
- Corpo della slide: massimo **3 paragrafi brevi, 320 caratteri totali**; meglio 200. Se serve di più, si divide in due slide.
- Ogni termine tecnico compare in un riquadro **«Parola chiave»** (massimo 1 per slide): *epica/epos, aedo, epiteto, valore, pietas, ospitalità (xenia), sīra, naqqāl, rababa*.
- Si usano soltanto i fatti di questo documento. **Non inventare** episodi, citazioni o date. Dove qui c'è «circa», scrivere «circa».
- **Divieto:** non raccontare la guerra di Troia oltre a quanto scritto qui; **non nominare la morte di Ettore** né l'esito del duello con Achille in nessuna schermata.

I testi qui sotto sono **bozze di contenuto**: possono essere rifiniti, non ampliati con fatti nuovi.

### Capitolo 1 — Dalla vostra comunità all'epica

**1.1 Cento anni dopo.** Nella vostra comunità, cento anni dopo, nessuno ricordava tutte le regole. Ma qualcuno continuava a raccontare una storia. Perché proprio quella?
*Arte:* la città dell'attività 1 al tramonto, una persona che racconta a un piccolo gruppo.

**1.2 Che cos'è un valore?** Un valore è qualcosa che un gruppo considera importante e degno di essere difeso: il coraggio, la lealtà, l'ospitalità, la famiglia, la libertà. I valori non si vedono: si riconoscono nelle scelte delle persone.
*Parola chiave:* valore.

**1.3 Le storie come specchio.** Quando un popolo racconta i suoi eroi, parla di sé: di ciò che ammira, di ciò che teme, delle domande a cui non sa rispondere. Oggi ascolterai cinque storie di cinque popoli diversi.
*Domanda della lezione, in evidenza:* «Che cosa ci dice un eroe sul popolo che lo racconta?»

### Capitolo 2 — Che cos'è l'epica

**2.1 Una parola antica.** *Epica* viene dal greco *epos*: «parola», «racconto». Sono racconti lunghi, spesso in versi, che narrano imprese di eroi importanti per un popolo.
*Parola chiave:* epos.

**2.2 Storie da ascoltare.** Per secoli queste storie non si leggevano: si ascoltavano. Cantori come gli aedi greci le recitavano a memoria durante feste e banchetti, a volte per ore. Ogni cantore poteva cambiare qualcosa.
*Parola chiave:* aedo.

**2.3 Come si ricorda un poema lunghissimo?** I cantori usavano formule che tornano sempre uguali, come «l'Aurora dalle dita di rosa». E davano agli eroi un soprannome fisso, l'*epiteto*: «Odisseo dalle molte astuzie». Aiutava chi raccontava e chi ascoltava.
*Parola chiave:* epiteto.

**2.4 Prova tu: l'epiteto.** Interazione (nessuna risposta sbagliata). «Scegli un epiteto per descrivere un compagno di classe (senza nominarlo)»: lo studente sceglie una qualità fra 6 (es. *dalle mille idee, dal cuore generoso, dalla risata contagiosa, che non si arrende mai, dalla parola gentile, sempre in orario*). Feedback: «Un epiteto dice in poche parole che cosa una comunità ammira di una persona. Anche gli epiteti degli eroi raccontano i valori di un popolo.»

**2.5 Gli ingredienti.** Quattro piccole card: **l'eroe** (eccezionale, ma umano: sbaglia, soffre, ha paura) · **gli dei o il destino** (forze più grandi delle persone) · **l'impresa** (una guerra, un viaggio, la fondazione di una città, una migrazione) · **il pubblico** (una comunità che ascolta e si riconosce).

**2.6 Né vero né falso.** L'epica non è un libro di storia: mescola ricordi di fatti antichi, immaginazione e credenze. Per questo dice poco su «come è andata davvero» e molto su **che cosa contava** per chi la raccontava.

### Capitolo 3 — Cinque popoli, cinque storie

**3.0 Mappa.** Mappa schematica dal Mediterraneo all'Iran con cinque segnaposto e una linea del tempo sotto: Uruk (Iraq), Itaca (Grecia), Roma (Italia), Iran, la migrazione dei Banū Hilāl (dalla penisola arabica alla Tunisia, con una freccia). Testo: «Cinque storie, nate in luoghi vicini ma lontane migliaia di anni. Tocca Avanti per partire dalla più antica.» Durante il capitolo, la tradizione in corso è evidenziata nella mappa in miniatura della carta d'identità.

Per **ogni tradizione** cinque schermate:
- **A. Carta d'identità** (formato a scheda, non paragrafo): Popolo · Luogo · Quando · Come ci è arrivata · Eroe.
- **B. La storia (1)** e **C. La storia (2)**: la vicenda essenziale, al presente.
- **D. Che cosa conta per questo popolo?** 2–3 valori in evidenza con una riga ciascuno + la domanda che la storia pone.
- **E. Verifica rapida** (una domanda, 3 opzioni, una corretta, feedback per ogni opzione, si può riprovare; non blocca l'avanzamento dopo la prima risposta).

#### Gilgamesh (Mesopotamia)
- **A.** Popolo: Sumeri e Babilonesi · Luogo: Mesopotamia, oggi Iraq · Quando: racconti su Gilgamesh già oltre 4000 anni fa; la versione più completa è di circa 3200 anni fa · Come ci è arrivata: scritta in caratteri cuneiformi su tavolette d'argilla, ritrovate nell'Ottocento fra le rovine di Ninive · Eroe: Gilgamesh, re di Uruk. *È la più antica grande epica conosciuta.*
- **B.** Gilgamesh è un re fortissimo ma prepotente. Gli dei creano Enkidu, un uomo selvaggio, perché lo affronti. I due combattono, poi diventano amici inseparabili e compiono grandi imprese insieme, come l'uccisione del mostro Humbaba, guardiano della foresta dei cedri.
- **C.** Gli dei decidono che Enkidu deve morire. Gilgamesh, disperato, parte per scoprire il segreto della vita eterna. Lo trova Utnapishtim, l'uomo sopravvissuto al diluvio, che gli indica una pianta che ridà la giovinezza. Gilgamesh la prende, ma un serpente gliela ruba. Torna a Uruk e guarda le grandi mura della sua città.
- **D.** Valori: **l'amicizia** (il dolore per Enkidu cambia l'eroe) · **il buon re** (da prepotente a re che pensa alla città) · **accettare di essere mortali**. Domanda: *Se dobbiamo morire, che cosa resta di noi?* Possibile risposta della storia: restano le opere costruite per la comunità, come le mura di Uruk.
- **E.** «Perché Gilgamesh, alla fine, guarda le mura di Uruk?» — ✔ Ha capito che resta ciò che si costruisce per la propria città · ✘ Vuole controllare che nessun nemico stia arrivando · ✘ Ha trovato l'immortalità e vuole festeggiarla.

#### Odissea (Grecia antica)
- **A.** Popolo: Greci antichi · Luogo: Grecia e Mediterraneo · Quando: messa per iscritto circa 2700 anni fa, dopo secoli di racconti orali · Come ci è arrivata: attribuita a Omero, cantata dagli aedi e poi scritta · Eroe: Odisseo (per i Romani Ulisse), re dell'isola di Itaca.
- **B.** Finita la lunga guerra di Troia, Odisseo vuole solo tornare a casa. Il viaggio dura dieci anni. Prigioniero del ciclope Polifemo, si salva con l'astuzia: dice di chiamarsi «Nessuno». La ninfa Calipso lo trattiene per anni e gli offre l'immortalità: Odisseo rifiuta, preferisce tornare dalla sua famiglia.
- **C.** A Itaca molti uomini, i Proci, occupano la sua casa, mangiano a sue spese e vogliono sposare la moglie Penelope, che resiste con l'inganno della tela. Odisseo arriva travestito da mendicante, viene riconosciuto dal vecchio cane Argo, vince la gara dell'arco e si riprende la sua casa.
- **D.** Valori: **l'astuzia** (l'intelligenza vale più della forza) · **l'ospitalità** (i Proci sono puniti anche perché la tradiscono) · **la fedeltà** alla famiglia e alla patria. Domanda: *Che cos'è casa, e perché vale più dell'immortalità?*
- **E.** «Perché Odisseo rifiuta l'immortalità offerta da Calipso?» — ✔ Preferisce una vita mortale con la sua famiglia, nella sua terra · ✘ Non si fida degli dei e teme un inganno · ✘ Vuole tornare a combattere a Troia.

#### Eneide (Roma antica)
- **A.** Popolo: Romani · Luogo: dal Mediterraneo all'Italia · Quando: scritta circa 2000 anni fa · Come ci è arrivata: scritta da un autore preciso, il poeta Virgilio, al tempo dell'imperatore Augusto · Eroe: Enea, un principe troiano.
- **B.** Troia è stata conquistata e brucia. Enea fugge portando sulle spalle il vecchio padre Anchise e tenendo per mano il figlio Ascanio. Gli dei gli affidano un compito: guidare i sopravvissuti verso l'Italia e fondare un nuovo popolo.
- **C.** A Cartagine la regina Didone lo accoglie e i due si innamorano. Enea vorrebbe restare, ma gli dei gli ricordano il suo compito. Parte, lasciando Didone disperata. In Italia, dopo una guerra, pone le basi da cui, secondo il racconto, nascerà Roma.
- **D.** Valori: **la *pietas*** (rispetto e dovere verso gli dei, la famiglia e il proprio popolo) · **il sacrificio** dei desideri personali per il futuro della comunità. Nota: Virgilio scrive per dare ai Romani un'origine gloriosa: l'epica qui costruisce apertamente l'identità di un popolo. Domanda: *Che cosa devo alla mia comunità, anche contro ciò che desidero?*
- **E.** «Perché Enea lascia Didone?» — ✔ Mette il futuro del suo popolo prima del proprio amore · ✘ Non è mai stato davvero innamorato di lei · ✘ Didone gli chiede di andarsene.
- *Parola chiave:* pietas.

#### Shāhnāmeh, il «Libro dei re» (Persia)
- **A.** Popolo: Persiani · Luogo: Iran · Quando: completato circa mille anni fa · Come ci è arrivata: scritto dal poeta Firdusi (Ferdowsi), che lavorò per circa trent'anni; ancora oggi in Iran i narratori *naqqāl* ne raccontano gli episodi in pubblico · Eroe: Rostam, il più grande guerriero dell'Iran.
- **B.** Il «Libro dei re» racconta la storia, in parte leggendaria, dei re e degli eroi dell'Iran. Firdusi scrive in persiano e vuole conservare la lingua e la memoria del suo popolo. Il suo eroe più famoso è Rostam, fortissimo e fedele al re.
- **C.** Rostam ha un figlio, Sohrab, che cresce lontano da lui e non lo ha mai incontrato. Anni dopo Sohrab combatte nell'esercito nemico. Padre e figlio si affrontano in duello senza riconoscersi. Rostam ferisce a morte Sohrab e solo dopo, da un bracciale che aveva donato alla madre, capisce chi è.
- **D.** Valori: **la lealtà** al re e alla patria · **l'onore** del guerriero · ma la storia mostra il loro prezzo: la guerra fra popoli distrugge anche i legami più stretti. Domanda: *Che cosa devo al mio popolo, e che cosa mi costa?*
- **E.** «Perché la storia di Rostam e Sohrab è una tragedia?» — ✔ Lealtà e guerra portano un padre a uccidere il figlio senza saperlo · ✘ Rostam vuole diventare re al posto del sovrano · ✘ Sohrab tradisce volontariamente suo padre.
- *Parola chiave:* naqqāl.

#### Sīrat Banī Hilāl (mondo arabo)
- **A.** Popolo: i Banū Hilāl, una confederazione di tribù beduine arabe · Luogo: dalla penisola arabica, attraverso l'Egitto, fino alla Tunisia · Quando: racconta una migrazione avvenuta circa mille anni fa · Come ci è arrivata: soprattutto a voce; in Egitto alcuni poeti la cantano ancora oggi, accompagnandosi con la *rababa*, uno strumento a corda; l'UNESCO la protegge come patrimonio orale dell'umanità · Eroe: Abū Zayd al-Hilālī.
- **B.** Una lunga siccità colpisce la terra dei Banū Hilāl. Per sopravvivere, l'intera comunità decide di partire verso ovest, in cerca di una terra fertile. Prima di muovere tutto il popolo, l'eroe Abū Zayd parte in esplorazione, travestito da poeta cantastorie per non essere riconosciuto.
- **C.** Il viaggio è lungo e pieno di prove. In Tunisia i Banū Hilāl affrontano il signore della regione, al-Zanātī Khalīfa. Nella storia contano la forza dei guerrieri, l'astuzia di Abū Zayd, la parola data e l'unità della tribù. Chi ascolta riconosce il proprio popolo e le sue origini.
- **D.** Valori: **la solidarietà del gruppo** (nessuno si salva da solo) · **l'astuzia e l'eloquenza** (la parola e la poesia sono armi) · **l'onore e la parola data**. Domanda: *Dov'è casa, se per sopravvivere dobbiamo partire?* Nota: le popolazioni che i Banū Hilāl incontrarono raccontano questa storia in altro modo: anche l'epica ha un punto di vista.
- **E.** «Perché Abū Zayd si traveste da poeta?» — ✔ Per esplorare la nuova terra senza essere riconosciuto · ✘ Perché la tribù lo ha cacciato · ✘ Perché vuole diventare famoso come cantante.
- *Parola chiave:* sīra (racconto della vita e delle imprese).

> Nota per il docente (da mostrare nel README, non agli studenti): i dettagli della Sīra variano molto fra le versioni regionali; il testo si limita agli elementi comuni (siccità, migrazione verso ovest, esplorazione di Abū Zayd travestito, scontro con al-Zanātī Khalīfa). Verificare con un parlante arabo la resa dei nomi e la traduzione.

### Capitolo 4 — Il gioco delle grandi domande

Tre mosse, nessun punteggio. Il gioco è il **confronto**: deve far emergere che le domande si somigliano e le risposte cambiano con i valori del popolo.

#### Mossa 1 — Dalla vicenda alla domanda (5 turni)
Per ogni eroe: una mini-carta (emblema, nome, popolo) + il momento decisivo in due righe + «Quale grande domanda c'è sotto questa storia?». Tre opzioni: **una domanda di fondo** (corretta) e **due letture di superficie** (trama, azione). Dopo la risposta: feedback specifico, poi la frase fissa «La vicenda è il *come*; la domanda è il *perché* quella storia veniva raccontata».

| Eroe | Momento | ✔ Domanda di fondo | ✘ Superficie |
| --- | --- | --- | --- |
| Gilgamesh | Perde l'amico, cerca la vita eterna, il serpente ruba la pianta | Se dobbiamo morire, che cosa resta di noi? | Chi è il guerriero più forte? · Come si sconfigge un mostro? |
| Odisseo | Rifiuta l'immortalità per tornare a Itaca | Che cos'è casa, e perché ci vale tanto? | Come si inganna un ciclope? · Quanto dura un viaggio per mare? |
| Enea | Lascia Didone per fondare un nuovo popolo | Che cosa devo alla mia comunità, anche contro i miei desideri? | Come si costruisce una flotta? · Chi governerà Cartagine? |
| Rostam | Uccide senza saperlo il figlio nemico | Che cosa mi costa la lealtà al mio popolo? | Chi vince un duello fra due campioni? · Come si riconosce un bracciale? |
| Abū Zayd | Il popolo parte per la siccità; lui esplora travestito | Dov'è casa, se per sopravvivere dobbiamo partire? | Come ci si traveste bene? · Quanto è lungo il viaggio fino in Tunisia? |

#### Mossa 2 — Le domande si somigliano (il confronto)
Tre schermate, una per **grande domanda**. Lo studente tocca **tutti** gli eroi che secondo lui la affrontano (selezione multipla, 5 chip), poi «Controlla». Il feedback è per singolo eroe, con tre gradi: **forte** (la storia ruota su questa domanda), **possibile** (c'entra, con una ragione), **debole** (non è il centro della storia). Non esistono risposte «sbagliate» con penalità: un eroe «possibile» scelto riceve conferma motivata; un eroe «forte» non scelto riceve la spiegazione.

| Grande domanda | Forte | Possibile | Debole |
| --- | --- | --- | --- |
| **A. Che cosa resta di noi, se dobbiamo morire?** | Gilgamesh (cerca l'immortalità e non la ottiene) · Odisseo (la rifiuta) | Rostam (Sohrab muore giovane; Firdusi scrive perché la memoria del suo popolo non muoia) · Enea (vive per una città che durerà dopo di lui) | Abū Zayd |
| **B. Dov'è casa? Partire, tornare, ricominciare** | Odisseo (tornare) · Enea (ricominciare altrove) · Abū Zayd (partire per sopravvivere) | Gilgamesh (torna a Uruk e capisce che la sua casa è la città) | Rostam |
| **C. Che cosa devo al mio popolo, anche contro i miei desideri?** | Enea (Didone) · Rostam (lealtà fino alla tragedia) · Abū Zayd (rischia per tutta la tribù) | Gilgamesh (da re prepotente a re per la sua città) | Odisseo (vuole soprattutto tornare a casa sua; perde tutti i compagni) |

Dopo ogni domanda: schermata **«Stessa domanda, risposte diverse»**, con la risposta di ogni eroe «forte» in una riga e il valore che la sostiene, ad esempio per A: *Gilgamesh: restano le opere per la città (il buon re) · Odisseo: meglio una vita mortale fra i propri cari (la famiglia, la casa).*

Alla fine della mossa 2: **la rete**. SVG con 3 nodi-domanda e 5 nodi-eroe; linea piena = forte, tratteggiata = possibile. Testo: «Nessun eroe ha una sola domanda. Nessuna domanda appartiene a un solo popolo. Le domande si somigliano; le risposte cambiano, perché cambiano i valori di chi racconta.» **Questa è la schermata chiave della lezione.**

#### Mossa 3 — Anche la vostra comunità se l'è chiesto
Si leggono (sola lettura) le scelte salvate dall'attività 1 (§7.3). Tre situazioni dell'attività 1, ognuna mostrata con la scelta fatta dallo studente se disponibile, altrimenti senza:
- `pericolo` — «La città è in pericolo»
- `nuovi_arrivi` — «Nuove famiglie alla porta»
- `statua` — «Un monumento divide la piazza»

Per ognuna: «A quale grande domanda somiglia?» (A, B, C). Tutte le risposte sono accettate con un commento; quella più vicina è indicata come «la più vicina» con il collegamento a un eroe: `pericolo` → C (Enea, Rostam); `nuovi_arrivi` → B (Abū Zayd, Enea: anche loro erano profughi in cerca di casa); `statua` → A (Gilgamesh: che cosa resta e chi decide che cosa ricordare).

### Capitolo 5 — Il poema della vostra comunità
**5.1** «Se la vostra comunità avesse un'epica, quale valore metterebbe al centro?» Lo studente sceglie un valore (6 chip: solidarietà, libertà, sicurezza, astuzia, ospitalità, lealtà). Se disponibile, il valore corrispondente alla sua scelta `patto` è preselezionato (`aiuto`→solidarietà, `liberta`→libertà, `sicurezza`→sicurezza), modificabile. Poi sceglie un epiteto per la città (4 opzioni, es. *dalle porte aperte, dalle mura salde, dalle mille voci, dal patto antico*).

**5.2** Viene composto un breve **proemio** su modello epico, ad esempio:
> «Canta, o voce, la città *dalle porte aperte*, che nel tempo del pericolo scelse la *solidarietà*. Racconta a chi verrà che cosa decisero, e che cosa costò.»

Il verbo e la frase centrale possono variare in base alla scelta su `pericolo`. Testo sotto: «Avete fatto ciò che facevano gli aedi: trasformare le scelte di una comunità in un racconto che dice chi è.» Nessun salvataggio esterno; nessuna condivisione.

### Capitolo 6 — Verso la prossima lezione
**6.1 Ripassa la frase guida** (§1), in versione breve: «L'epica è il racconto con cui un popolo parla di sé.»
**6.2** «Nella prossima lezione ascolteremo l'Iliade, la storia di una guerra. Incontreremo Ettore, che deve difendere la sua città, Troia. Che cosa sceglierà? E che cosa ci dirà di chi lo raccontava?» — **senza svelare l'esito.**

## 6. Design dell'interfaccia (attività 2)

- **Schermata tipo:** illustrazione in alto (circa 32–38% dell'altezza, mai oltre 300 px), sotto eyebrow con capitolo e numero, titolo, corpo, eventuale «Parola chiave»; **barra di navigazione fissa in basso** con «← Indietro» e «Avanti →» (bottoni alti almeno 48 px), sopra una barra di avanzamento del capitolo.
- **Corpo del testo:** almeno 18 px, colore pieno (non grigio chiaro), interlinea 1.5. Animazione d'ingresso al massimo 250 ms e nulla con `prefers-reduced-motion`.
- **Carta d'identità:** griglia etichetta/valore, non paragrafo; mappa in miniatura con il segnaposto della tradizione.
- **Valori:** 2–3 card con un'icona/emblema e una riga.
- **Indice dei capitoli:** bottone «Capitoli» in alto apre un elenco dei 6 capitoli; i capitoli già visti sono marcati.
- **Navigazione:** frecce della tastiera; scorrimento orizzontale (swipe) facoltativo e mai indispensabile.
- **Identità visiva per tradizione** (colore d'accento + emblema SVG semplice, coerente col tratto di `comunita-map.js`):
  - Gilgamesh: mura merlate di Uruk + tavoletta con segni cuneiformi; accento terracotta.
  - Odissea: nave con vela + isola; accento blu mare.
  - Eneide: fiamme di Troia e figura che porta un anziano sulle spalle; accento rosso porpora.
  - Shāhnāmeh: due elmi contrapposti + bracciale; accento turchese.
  - Banū Hilāl: carovana di dromedari + rababa; accento ocra.
- **Mappa:** SVG schematico (non geograficamente esatto, ma riconoscibile) Mediterraneo–Mesopotamia–Iran, 5 segnaposto, freccia della migrazione; linea del tempo sotto con le 5 date approssimative.
- **Verifiche:** opzioni come grandi bottoni; dopo la risposta, il bottone scelto diventa verde (✔) o arancione (non rosso), compare il feedback, compare «Riprova» se sbagliata; «Avanti» sempre disponibile dopo il primo tentativo.
- **Gioco mossa 2:** chip degli eroi in griglia 2–3 colonne su telefono; feedback come lista eroe-per-eroe con etichetta forte/possibile/debole.
- **Arabo/RTL:** stesso bottone `عربي / Italiano` dell'attività 1, stessa chiave di lingua (§7.3); layout `dir="rtl"`, font Cairo; le frecce di navigazione si invertono.

## 7. Dati, stato e integrazione

### 7.1 Schema di `epica-dati.js`
Esportazione come in `storia.js`: `module.exports` in Node, `window.EpicaDati` nel browser.

```js
{
  id: 'epica', title: 'LE VOCI DELL’EPICA',
  traditions: [ { id: 'gilgamesh', name: 'Gilgamesh', people: 'Sumeri e Babilonesi',
                  hero: 'Gilgamesh', accent: '#b5653a', emblem: 'uruk', map: { x: 0, y: 0 }, year: '≈ 1200 a.C.' }, ... ],
  chapters: [ { id: 'c1', title: 'Dalla vostra comunità all’epica', slides: [ ...slide ] }, ... ],
  game: {
    move1: [ { hero: 'gilgamesh', moment: '...', options: [ { id, label, correct, feedback } ] }, ... ],
    questions: [ { id: 'A', text: '...', heroes: { gilgamesh: { level: 'forte'|'possibile'|'debole', feedback: '...' } },
                   answers: { gilgamesh: { answer: '...', value: '...' } } }, ... ],
    move3: [ { sceneId: 'pericolo', title: '...', closest: 'C', comment: { A: '...', B: '...', C: '...' } }, ... ],
    poem: { values: [...], epithets: [...], fromPatto: { aiuto: 'solidarieta', ... }, template: '...' }
  }
}
```

Tipi di slide (`kind`): `text` (titolo, `body: string[]`, `keyword?: {term, definition}`, `art`), `idcard` (`tradition`, `rows: [[etichetta, valore]]`), `values` (`tradition`, `values: [{name, line}]`, `question`), `check` (`question`, `options: [{id, label, correct, feedback}]`), `epithet` (interazione 2.4), `map`, `game` (`step: 'move1'|'move2'|'network'|'move3'`), `poem`. Ogni slide ha `id` univoco e stabile: le traduzioni si agganciano agli `id`.

### 7.2 Stato dell'attività 2
- `localStorage['linguaggio-epica-session-v1']` = `{ version: 1, slide: <id>, seen: [chapterId], checks: { slideId: optionId }, move1: {...}, move2: { A: [heroId] }, move3: {...}, poem: { value, epithet } }`.
- Ogni accesso in `try/catch`; se il dato è assente, corrotto o con `id` sconosciuti → si riparte senza errori. In apertura, se esiste una sessione, la landing mostra «Riprendi» oltre a «Inizia».
- Nessun dato inviato in rete.

### 7.3 Lettura dall'attività 1 (sola lettura)
- Lingua: chiave condivisa `linguaggio-comunita-language` (`'it'|'ar'`).
- Scelte: leggere la sessione dell'attività 1 (`linguaggio-comunita-session-v2`, poi `-v1` come ripiego), fare `JSON.parse` in `try/catch`, prendere `decisions` = `[{ sceneId, choiceId }]` e usare solo `patto`, `pericolo`, `nuovi_arrivi`, `statua`, verificando che `choiceId` sia fra quelli noti. **Mai scrivere** in quella chiave. Se non c'è nulla (altro telefono, sessione cancellata) mostrare le situazioni senza la scelta personale, con la frase: «Se hai giocato all'attività 1 su questo telefono, qui vedresti la tua scelta.»
- Le etichette delle scelte per `pericolo`, `nuovi_arrivi`, `statua`, `patto` vanno copiate in `epica-dati.js` (non importare `storia.js` nella pagina dell'epica).

### 7.4 Arabo (`epica-ar.js`)
- Stessa struttura di chiavi di `epica-dati.js` (per `id` di slide, opzione, eroe, domanda).
- Riutilizzare dove possibile le traduzioni già esistenti in `ar.js` per Gilgamesh, Odissea, Eneide, Banū Hilāl e Shāhnāmeh (chiavi `epica_gilgamesh`, `epica_odissea`, `epica_eneide`, `epica_araba`, `epica_persiana` e relativi `_atto_2`) **prima** di rimuoverle dall'attività 1.
- Nomi propri arabi e persiani nella forma originale (أبو زيد الهلالي، الزناتي خليفة، الشاهنامه، الفردوسي، رستم، سهراب).
- Se una chiave manca, mostrare l'italiano (mai una schermata vuota). Indicare nel README che la traduzione va verificata da un parlante competente.

## 8. Test e verifiche

### `tests/epica.test.cjs` (nuovo)
- Ogni slide ha `id` univoco, `kind` valido, titolo; il corpo di ogni slide `text` sta sotto i 320 caratteri totali.
- 5 tradizioni, ciascuna con esattamente: 1 `idcard`, 2 slide di storia, 1 `values`, 1 `check`.
- Ogni `check` e ogni turno di `move1`: 3 opzioni, **esattamente una corretta**, feedback ≥ 40 caratteri per ogni opzione, e la corretta **non** sempre nella stessa posizione (verificare la distribuzione sull'insieme) e non sistematicamente la più lunga.
- `move2`: ogni domanda assegna un livello a tutti e 5 gli eroi; ogni eroe è «forte» in almeno una domanda e compare come «forte» o «possibile» in almeno due.
- `move3`: gli `sceneId` esistono in `storia.js` e le etichette coincidono con quelle dell'attività 1.
- **Divieto di spoiler:** nessun testo (italiano e arabo) contiene «Ettore» fuori dal capitolo 6; nessun testo contiene combinazioni come «uccide Ettore», «morte di Ettore», «Achille uccide».
- Arabo: tutte le slide e le opzioni hanno una chiave in `epica-ar.js` (o il test elenca quelle mancanti).
- `node --check` su tutti i nuovi file JS.

### `tests/simulatore.test.cjs` (aggiornare)
- Scene attese: 26; l'ultima è `ponte`; nessuna scena con `id` che inizia per `epica_` o `miti_`; nessun `game`.
- Le 81 ramificazioni e i test di ripristino restano verdi (il numero atteso di `decisions` resta 17, perché le scene rimosse sono tutte narrative: verificarlo).
- Rimuovere i test sui dilemmi e sulla battaglia del ponte.
- `ar.js` ha esattamente le chiavi delle 26 scene.

### CI (`.github/workflows/test.yml`)
- Aggiungere `node --check` per `epica-dati.js`, `epica-arte.js`, `epica-ar.js`, `epica-app.js`.

### Prova nel browser (obbligatoria prima di consegnare)
Con Playwright (già installato: `require('playwright')`), viewport 390×844:
- percorrere tutta l'attività 2 dall'inizio alla fine in italiano e in arabo, salvando uno screenshot per schermata in una cartella temporanea e **guardandoli**: nessun testo tagliato, nessuno scroll orizzontale, barra di navigazione sempre visibile;
- percorrere l'attività 1 fino al bottone «Vai all'attività 2» e verificare che la mossa 3 e il proemio mostrino le scelte fatte;
- ricaricare a metà e verificare «Riprendi»;
- aprire `epica.html` con `localStorage` vuoto e verificare che la mossa 3 funzioni senza scelte;
- nessun errore in console.

## 9. Ordine di lavoro

Ogni fase si chiude con test verdi e un commit. Se il tempo non basta, si consegna fino all'ultima fase completata: **ogni fase lascia il sito utilizzabile**.

1. **Separazione (attività 1).** §3 completo; test aggiornati. *Criterio:* `index.html` termina con il nuovo `ponte` e il bottone verso l'attività 2; nessun riferimento epico rimasto.
2. **Scheletro dell'attività 2.** `epica.html`, `epica-app.js`, `epica.css`: navigazione slide, indice dei capitoli, salvataggio/ripresa, lingua. Dati del solo capitolo 1.
3. **Racconto (capitoli 1, 2, 3, 6).** Tutti i contenuti del §5, carte d'identità, valori, verifiche, mappa ed emblemi.
4. **Gioco (capitolo 4).** Mosse 1, 2, rete, mossa 3.
5. **Proemio (capitolo 5).**
6. **Arabo** dell'attività 2 e aggiornamenti di `ar.js`.
7. **QA nel browser** (§8) e aggiornamento di README e `docs/STATO-PROTOTIPO.md`.

## 10. Fuori da questa versione (fase successiva)

- **Il consiglio degli eroi:** la città dell'attività 1 è in pericolo; a ogni turno un consiglio («Nessuno vive per sempre: fai qualcosa che resti dopo di te») va attribuito all'eroe che lo darebbe, con feedback che rimanda all'episodio; chiusura aperta «Tu quale consiglio seguiresti?». Si aggiunge come capitolo facoltativo dopo il capitolo 4, riusando `traditions` e la mossa 1.
- Collegamento con la lezione su Ettore e l'Iliade (progetto `epica-romanzo`).
- Eventuali altre tradizioni (Sundiata, Mahabharata/Ramayana, saghe norrene) come capitoli facoltativi con la stessa struttura in cinque schermate.
