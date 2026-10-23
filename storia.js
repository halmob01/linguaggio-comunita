/* Contenuti dell'attività. Fonte del motore: epica-romanzo/base-feudo @ 90b798bd. */
(function(root){ 'use strict'; const STORY = {
  "id": "comunita",
  "title": "LA COMUNITÀ",
  "subtitle": "Dal linguaggio alla memoria collettiva",
  "insight": "Le parole rendono possibili accordi fra sconosciuti. Le storie, poi, selezionano gesti e conflitti attraverso cui un gruppo costruisce la propria memoria. Questa è la domanda da portare alla lezione sull’epica.",
  "stats": [
    {
      "id": "fiducia",
      "label": "Fiducia",
      "start": 60
    },
    {
      "id": "risorse",
      "label": "Risorse",
      "start": 60
    },
    {
      "id": "coesione",
      "label": "Coesione",
      "start": 60
    }
  ],
  "scenes": [
    {
      "id": "come",
      "type": "narrative",
      "title": "Come abbiamo fatto?",
      "text": "Nelle scorse lezioni abbiamo visto che gli esseri umani non sono gli animali più forti né i più veloci. Ma possiedono una capacità straordinaria: collaborare con moltissime persone, anche sconosciute. Come ci riescono?",
      "art": "reti"
    },
    {
      "id": "linguaggio",
      "type": "narrative",
      "title": "Il potere del linguaggio",
      "text": "Le parole non descrivono soltanto la realtà. Possiamo raccontare il passato, immaginare il futuro e parlare di cose mai viste. Possiamo anche inventare qualcosa insieme e convincere altri a riconoscerlo.",
      "art": "parole"
    },
    {
      "id": "finzioni",
      "type": "narrative",
      "title": "Le finzioni condivise",
      "text": "Quanto vale un pezzo di carta? Da solo, quasi niente. Eppure con una banconota possiamo acquistare cibo. Il denaro funziona perché le persone ne riconoscono insieme il valore. Così costruiamo anche regole e istituzioni.",
      "art": "scambi"
    },
    {
      "id": "sociopoietica",
      "type": "narrative",
      "title": "Una realtà costruita insieme",
      "text": "Le storie possono cambiare il mondo. Avevamo chiamato questa capacità funzione sociopoietica: attraverso il linguaggio e le narrazioni contribuiamo a costruire la nostra vita sociale. Condividiamo regole, idee e valori.",
      "art": "villaggio"
    },
    {
      "id": "inizio",
      "type": "narrative",
      "title": "Ora tocca a voi",
      "text": "Immaginate di fondare una comunità con cento persone. Non avete ancora leggi, denaro o istituzioni. Dovrete decidere come convivere, stabilire regole e affrontare le conseguenze. Ma non tutti desiderano le stesse cose.",
      "art": "progetto"
    },
    {
      "id": "patto",
      "type": "decision",
      "title": "Quale patto ci tiene insieme?",
      "text": "Siete cento persone e dovete scrivere la vostra prima regola. Quale principio mettete al centro della vita comune?",
      "art": "patto",
      "choices": [
        {
          "id": "aiuto",
          "label": "Nessuno deve essere abbandonato.",
          "effects": {
            "fiducia": 10,
            "coesione": 6,
            "risorse": -8
          },
          "feedback": "La comunità promette di sostenere chi è in difficoltà. Le persone si sentono protette, ma mantenere l’impegno richiede risorse comuni.",
          "why": "Una regola non descrive la realtà: cambia ciò che gli abitanti si aspettano gli uni dagli altri."
        },
        {
          "id": "liberta",
          "label": "Ognuno deve poter scegliere per sé.",
          "effects": {
            "fiducia": 5,
            "coesione": -5,
            "risorse": 5
          },
          "feedback": "Gli abitanti hanno spazio per organizzarsi come preferiscono. Si sviluppano nuove iniziative, ma non sempre è facile agire insieme.",
          "why": "Lo stesso gruppo può scegliere principi diversi, e ogni principio organizza le relazioni in modo diverso."
        },
        {
          "id": "sicurezza",
          "label": "La sicurezza comune viene prima di tutto.",
          "effects": {
            "coesione": 8,
            "fiducia": -7,
            "risorse": -5
          },
          "feedback": "La comunità costruisce una difesa condivisa. Alcuni si sentono più protetti, altri temono che le proprie esigenze vengano ascoltate meno.",
          "why": "Anche una regola condivisa può creare conflitti: il consenso non cancella le differenze."
        }
      ]
    },
    {
      "id": "mercato",
      "type": "decision",
      "title": "Arrivano degli sconosciuti",
      "text": "Un gruppo vi offre attrezzi in cambio del vostro cibo. Non vi conoscete e forse non vi incontrerete più. Come organizzate gli scambi?",
      "art": "mercato",
      "choices": [
        {
          "id": "baratto",
          "label": "Scambiate direttamente cibo e attrezzi.",
          "effects": {
            "risorse": 8,
            "fiducia": -4,
            "coesione": -3
          },
          "feedback": "Lo scambio riesce, ma il giorno dopo è difficile capire quanto valga ogni oggetto e chi debba ancora qualcosa.",
          "why": "Il baratto può funzionare senza un simbolo comune, ma coordinare molti scambi diversi è più difficile."
        },
        {
          "id": "gettoni",
          "label": "Inventate gettoni che tutti promettono di accettare.",
          "effects": {
            "risorse": 13,
            "fiducia": -7,
            "coesione": 1
          },
          "feedback": "Gli scambi diventano più rapidi. Però alcune persone temono che i gettoni non verranno accettati domani.",
          "why": "I gettoni funzionano solo se esistono riconoscimento condiviso e fiducia. Il simbolo, da solo, non basta."
        },
        {
          "id": "registro",
          "label": "Annotate gli accordi in un registro comune.",
          "effects": {
            "risorse": 5,
            "fiducia": 8,
            "coesione": 5
          },
          "feedback": "Gli scambi sono più lenti, ma ciascuno può verificare ciò che è stato promesso. Serve qualcuno che tenga aggiornato il registro.",
          "why": "Scrittura, accordi e istituzioni permettono di cooperare anche senza conoscersi personalmente."
        }
      ]
    },
    {
      "id": "acqua",
      "type": "decision",
      "title": "Il pozzo non basta più",
      "text": "Dopo mesi di siccità, il pozzo comune fornisce meno acqua. I campi, le case e gli animali ne hanno bisogno. Come decidete chi può usarla?",
      "art": "villaggio",
      "choices": [
        {
          "id": "turni",
          "label": "Stabilite turni uguali per ogni famiglia.",
          "effects": {
            "fiducia": 7,
            "coesione": 5,
            "risorse": -7
          },
          "feedback": "Tutti conoscono i propri turni, ma alcune famiglie hanno esigenze maggiori e contestano la divisione.",
          "why": "Una regola uguale per tutti può apparire giusta senza rispondere a bisogni diversi."
        },
        {
          "id": "bisogni",
          "label": "Distribuite l'acqua in base alle necessità dichiarate.",
          "effects": {
            "fiducia": 5,
            "coesione": -6,
            "risorse": -4
          },
          "feedback": "Le famiglie più esposte ricevono acqua, ma qualcuno sospetta che altri esagerino le proprie necessità.",
          "why": "Le regole richiedono fiducia e un modo condiviso per stabilire che cosa sia necessario."
        },
        {
          "id": "canale",
          "label": "Usate le scorte per scavare un nuovo canale.",
          "effects": {
            "risorse": -13,
            "coesione": 8,
            "fiducia": 2
          },
          "feedback": "Il lavoro coinvolge molti abitanti e apre una nuova possibilità. Nel frattempo, però, le riserve diminuiscono.",
          "why": "Un progetto comune unisce le persone, ma richiede di rinunciare a risorse nel presente."
        }
      ]
    },
    {
      "id": "assemblea",
      "type": "decision",
      "title": "Chi può parlare per tutti?",
      "text": "La città cresce. Non è più possibile riunire ogni abitante per ogni decisione. Serve un modo per scegliere chi parlerà a nome degli altri.",
      "art": "patto",
      "choices": [
        {
          "id": "sorteggio",
          "label": "Sorteggiate i rappresentanti a intervalli regolari.",
          "effects": {
            "fiducia": 3,
            "coesione": 7,
            "risorse": -4
          },
          "feedback": "Molti si sentono coinvolti, ma alcuni rappresentanti devono imparare in fretta a gestire i problemi.",
          "why": "Un incarico pubblico funziona se il gruppo riconosce il procedimento che lo assegna."
        },
        {
          "id": "elezione",
          "label": "Eleggete persone che presentano un programma.",
          "effects": {
            "fiducia": 8,
            "coesione": -4,
            "risorse": -5
          },
          "feedback": "I candidati discutono proposte diverse. La scelta è chiara, ma dopo il voto rimangono gruppi insoddisfatti.",
          "why": "La rappresentanza nasce da procedure e parole condivise, non dall'accordo su ogni singola decisione."
        },
        {
          "id": "esperti",
          "label": "Affidate le decisioni a chi ha più esperienza.",
          "effects": {
            "risorse": 7,
            "coesione": -8,
            "fiducia": -4
          },
          "feedback": "Le scelte diventano più rapide, ma i giovani e i nuovi arrivati faticano a sentirsi ascoltati.",
          "why": "L'efficienza di un'autorità non basta, da sola, a renderla riconosciuta da tutti."
        }
      ]
    },
    {
      "id": "nuovi_arrivi",
      "type": "decision",
      "title": "Nuove famiglie alla porta",
      "text": "Dopo un inverno difficile, venti persone chiedono di abitare con voi. Portano competenze, ma hanno bisogno di cibo e spazio. Che cosa proponete?",
      "art": "reti",
      "choices": [
        {
          "id": "accoglienza",
          "label": "Le accogliete subito con gli stessi diritti.",
          "effects": {
            "fiducia": 8,
            "coesione": -5,
            "risorse": -12
          },
          "feedback": "I nuovi arrivati possono partecipare alla città. Alcuni residenti temono però di perdere una parte delle scorte.",
          "why": "Dire chi appartiene a una comunità significa anche stabilire chi condivide diritti e doveri."
        },
        {
          "id": "prova",
          "label": "Proponete un periodo di lavoro e conoscenza reciproca.",
          "effects": {
            "risorse": 6,
            "fiducia": -5,
            "coesione": 2
          },
          "feedback": "Le persone collaborano, ma gli ospiti non sanno ancora se potranno restare davvero.",
          "why": "Le condizioni di ingresso possono creare fiducia oppure trasformarsi in una barriera."
        },
        {
          "id": "confine",
          "label": "Offrite aiuto temporaneo senza farle entrare.",
          "effects": {
            "risorse": -5,
            "coesione": 6,
            "fiducia": -8
          },
          "feedback": "Le scorte interne sono più protette, ma cresce la distanza fra la città e chi vive fuori.",
          "why": "Un confine può rafforzare l'identità del gruppo e, nello stesso tempo, escludere qualcuno."
        }
      ]
    },
    {
      "id": "promessa",
      "type": "decision",
      "title": "Una promessa non mantenuta",
      "text": "Due gruppi avevano concordato di riparare il ponte insieme. Uno non si è presentato. L'altro chiede una punizione; il primo sostiene di aver avuto un'emergenza.",
      "art": "patto",
      "choices": [
        {
          "id": "ascolto",
          "label": "Convocate entrambi e ascoltate le ragioni.",
          "effects": {
            "fiducia": 9,
            "risorse": -7,
            "coesione": 3
          },
          "feedback": "Il confronto richiede tempo, ma emerge un problema che non era stato comunicato.",
          "why": "Le parole permettono di chiarire i fatti prima che un conflitto diventi una rottura."
        },
        {
          "id": "sanzione",
          "label": "Applicate la stessa sanzione prevista per tutti.",
          "effects": {
            "coesione": 7,
            "fiducia": -8,
            "risorse": 4
          },
          "feedback": "La regola appare prevedibile. Alcuni però ritengono ingiusto ignorare la situazione concreta.",
          "why": "Una norma comune può garantire stabilità, ma la sua applicazione apre problemi di interpretazione."
        },
        {
          "id": "riparazione",
          "label": "Chiedete di completare il lavoro e compensare il ritardo.",
          "effects": {
            "risorse": 5,
            "fiducia": 2,
            "coesione": -5
          },
          "feedback": "Il ponte viene sistemato. Rimane il dubbio che chi ha mancato alla promessa non abbia davvero risposto delle proprie azioni.",
          "why": "Riparare un danno e attribuire una responsabilità non sono sempre la stessa cosa."
        }
      ]
    },
    {
      "id": "scuola",
      "type": "decision",
      "title": "Che cosa insegnare ai bambini?",
      "text": "La comunità decide di aprire una scuola. Il tempo è poco: i bambini devono imparare a vivere e lavorare insieme. Quale attività mettete al centro?",
      "art": "parole",
      "choices": [
        {
          "id": "scrittura",
          "label": "Insegnate a leggere gli accordi e scrivere le regole.",
          "effects": {
            "fiducia": 8,
            "risorse": -6,
            "coesione": 4
          },
          "feedback": "Più persone possono controllare le promesse scritte, ma occorrono tempo e materiali.",
          "why": "La scrittura conserva gli accordi oltre la memoria di chi li ha pronunciati."
        },
        {
          "id": "mestieri",
          "label": "Insegnate soprattutto i mestieri necessari alla città.",
          "effects": {
            "risorse": 11,
            "coesione": -4,
            "fiducia": -3
          },
          "feedback": "I giovani imparano a produrre e riparare, ma alcuni non sanno leggere i documenti che regolano il loro lavoro.",
          "why": "Le competenze pratiche sostengono la vita comune, ma non sostituiscono ogni forma di partecipazione."
        },
        {
          "id": "racconti",
          "label": "Tramandate racconti, feste e vicende dei fondatori.",
          "effects": {
            "coesione": 10,
            "fiducia": 2,
            "risorse": -8
          },
          "feedback": "I bambini riconoscono simboli e storie comuni. Qualcuno chiede però spazio anche per le proprie tradizioni.",
          "why": "Raccontare il passato costruisce appartenenza, ma comporta sempre una selezione."
        }
      ]
    },
    {
      "id": "voce",
      "type": "decision",
      "title": "Una voce corre per la città",
      "text": "Si diffonde la notizia che il magazzino sia quasi vuoto. Nessuno sa chi l'abbia detto. Le famiglie iniziano ad accumulare cibo.",
      "art": "scambi",
      "choices": [
        {
          "id": "verifica",
          "label": "Contate le scorte e rendete pubblico il risultato.",
          "effects": {
            "fiducia": 10,
            "risorse": -5,
            "coesione": 3
          },
          "feedback": "I dati calmano una parte della città, ma controllare e comunicare richiede tempo.",
          "why": "Un'informazione verificabile aiuta a distinguere un fatto da una voce."
        },
        {
          "id": "silenzio",
          "label": "Chiedete di non ripetere la notizia.",
          "effects": {
            "coesione": 4,
            "fiducia": -10,
            "risorse": 2
          },
          "feedback": "Le voci si fermano per poco, poi ricominciano in modo meno controllabile.",
          "why": "Impedire di parlare non equivale a costruire fiducia in ciò che viene detto."
        },
        {
          "id": "assemblea_aperta",
          "label": "Organizzate un'assemblea per raccogliere domande.",
          "effects": {
            "fiducia": 7,
            "coesione": 6,
            "risorse": -9
          },
          "feedback": "Molti si sentono ascoltati, ma non tutte le domande trovano una risposta immediata.",
          "why": "Il dialogo può ridurre i sospetti, anche quando non risolve subito l'incertezza."
        }
      ]
    },
    {
      "id": "statua",
      "type": "decision",
      "title": "Un monumento divide la piazza",
      "text": "Si propone una statua per celebrare chi fondò la città. Alcuni la considerano un simbolo comune, altri ricordano decisioni che causarono sofferenza.",
      "art": "memoria",
      "choices": [
        {
          "id": "eroi",
          "label": "Celebrate i fondatori e le loro imprese.",
          "effects": {
            "coesione": 8,
            "fiducia": -6,
            "risorse": -7
          },
          "feedback": "La piazza acquista un simbolo riconoscibile, ma chi ricorda le ingiustizie si sente escluso.",
          "why": "Un monumento propone una versione del passato e attribuisce valore a determinate azioni."
        },
        {
          "id": "targhe",
          "label": "Raccontate sia i successi sia gli errori dei fondatori.",
          "effects": {
            "fiducia": 9,
            "coesione": -4,
            "risorse": -6
          },
          "feedback": "La piazza invita a discutere. Qualcuno vorrebbe un racconto più semplice e rassicurante.",
          "why": "La memoria condivisa può contenere conflitti e interpretazioni diverse."
        },
        {
          "id": "spazio",
          "label": "Lasciate la piazza libera per incontri e feste.",
          "effects": {
            "risorse": 4,
            "coesione": 3,
            "fiducia": -3
          },
          "feedback": "La piazza resta disponibile per tutti, ma il disaccordo su cosa ricordare non scompare.",
          "why": "Anche non costruire un monumento è una scelta su come usare lo spazio comune."
        }
      ]
    },
    {
      "id": "confine",
      "type": "decision",
      "title": "Il ponte verso un'altra città",
      "text": "Un'altra città propone di costruire un ponte commerciale. Chiede che le vostre regole sugli scambi siano riconosciute da entrambe le comunità.",
      "art": "mercato",
      "choices": [
        {
          "id": "accordo",
          "label": "Scrivete regole comuni e create un consiglio misto.",
          "effects": {
            "fiducia": 9,
            "risorse": 5,
            "coesione": -6
          },
          "feedback": "Gli scambi aumentano, ma alcuni abitanti temono di perdere il controllo sulle proprie decisioni.",
          "why": "Le istituzioni permettono di cooperare fra comunità diverse, se entrambe riconoscono gli accordi."
        },
        {
          "id": "autonomia",
          "label": "Accettate gli scambi, ma mantenete regole separate.",
          "effects": {
            "risorse": 8,
            "fiducia": -5,
            "coesione": 4
          },
          "feedback": "Il commercio comincia, ma ogni controversia richiede nuove trattative.",
          "why": "Collaborare senza un linguaggio normativo comune può rendere più fragili le promesse."
        },
        {
          "id": "rifiuto",
          "label": "Rinunciate al ponte per proteggere le vostre regole.",
          "effects": {
            "coesione": 7,
            "risorse": -9,
            "fiducia": -4
          },
          "feedback": "La città resta indipendente, ma perde alcune opportunità e si allontana dai vicini.",
          "why": "Le storie che raccontiamo su chi siamo possono favorire l'incontro oppure la separazione."
        }
      ]
    },
    {
      "id": "pericolo",
      "type": "decision",
      "title": "La città è in pericolo",
      "text": "Un incendio minaccia le case vicino al bosco. Una persona molto esperta potrebbe aiutare, ma ha una famiglia da proteggere. Il gruppo deve decidere come affrontare la crisi.",
      "art": "crisi",
      "choices": [
        {
          "id": "difesa",
          "label": "Chiedete a tutti di aiutare a fermare il fuoco.",
          "effects": {
            "risorse": -15,
            "fiducia": -4,
            "coesione": 12
          },
          "feedback": "Molte persone lavorano insieme e il fuoco viene contenuto. Alcuni, però, sono stati coinvolti senza sentirsi pronti.",
          "why": "Una decisione collettiva può proteggere la comunità e nello stesso tempo pesare sulla vita di qualcuno."
        },
        {
          "id": "famiglie",
          "label": "Date priorità a mettere al sicuro le famiglie.",
          "effects": {
            "risorse": -12,
            "fiducia": 12,
            "coesione": -6
          },
          "feedback": "Le famiglie più esposte vengono accompagnate al sicuro. Nel frattempo le fiamme distruggono alcune risorse dell’insediamento.",
          "why": "Proteggere le persone è anche proteggere la comunità, ma la scelta può avere un costo per tutti."
        },
        {
          "id": "aiuto_esterno",
          "label": "Mandate persone a cercare aiuto e organizzate l’evacuazione.",
          "effects": {
            "risorse": -5,
            "fiducia": -8,
            "coesione": 7
          },
          "feedback": "Il gruppo resta unito e prepara un luogo sicuro. L’aiuto arriva, ma non abbastanza presto da evitare qualche perdita.",
          "why": "Collaborare non significa sempre restare e combattere: anche chiedere aiuto e partire può essere una scelta collettiva."
        }
      ]
    },
    {
      "id": "un_secolo",
      "type": "narrative",
      "title": "Cento anni dopo",
      "text": "Le persone che fondarono la città non ci sono più. Non ricordiamo tutte le regole scritte né ogni scambio. Ma una vicenda continua a essere raccontata: il giorno in cui qualcuno dovette decidere che cosa fare per gli altri.",
      "art": "memoria"
    },
    {
      "id": "racconto",
      "type": "reflection",
      "title": "Chi decide che cosa ricordiamo?",
      "text": "La stessa giornata può essere raccontata in modi diversi. Quale aspetto vorresti conservare nella memoria della città?",
      "art": "memoria",
      "choices": [
        {
          "id": "coraggio",
          "label": "Il coraggio di chi ha affrontato il pericolo.",
          "feedback": "Nel racconto rimane l’azione di chi ha rischiato. Altre persone e altri gesti potrebbero scomparire dalla memoria.",
          "why": "Un racconto sceglie un protagonista e un valore, ma non contiene mai tutto ciò che è successo."
        },
        {
          "id": "cura",
          "label": "La cura di chi ha protetto le persone.",
          "feedback": "La storia mette al centro gli affetti e la responsabilità. Si potrebbero ricordare meno le scelte che hanno difeso le risorse comuni.",
          "why": "Cambiare il punto di vista cambia ciò che il gruppo riconosce come importante."
        },
        {
          "id": "accordo",
          "label": "La capacità della comunità di organizzarsi.",
          "feedback": "La storia celebra l’azione collettiva. Ma rischia di lasciare sullo sfondo la paura e il sacrificio delle singole persone.",
          "why": "Le storie costruiscono una memoria condivisa, ma possono anche semplificare ciò che è accaduto."
        }
      ]
    },
    {
      "id": "esercizi",
      "type": "narrative",
      "title": "Ragioniamo sulle scelte",
      "text": "Hai fondato una città e scelto quale storia tramandare. Ora quattro brevi esercizi ti aiutano a capire che cosa è successo: regole condivise, conseguenze e racconti. Non c'è voto: conta il ragionamento.",
      "art": "memoria"
    },
    {
      "id": "ex_gettoni",
      "type": "reflection",
      "activity": "quiz",
      "title": "Il gettone della scuola",
      "text": "In una scuola si inventano dei gettoni per prenotare gli attrezzi del laboratorio. Perché possono funzionare anche fra studenti che non si conoscono?",
      "art": "scambi",
      "objective": "Applicare il concetto di convenzione condivisa a un contesto nuovo.",
      "difficulty": "facile",
      "choices": [
        {
          "id": "materiale",
          "label": "Perché sono prodotti con un materiale raro e riconoscibile.",
          "correct": false,
          "feedback": "Il materiale può renderli riconoscibili, ma da solo non stabilisce che cosa permettono di fare.",
          "why": "Perché un oggetto funzioni come simbolo di scambio serve un accordo su come usarlo, non soltanto una caratteristica fisica."
        },
        {
          "id": "regola",
          "label": "Perché tutti conoscono e accettano la regola per utilizzarli.",
          "correct": true,
          "feedback": "Esatto: il gettone vale per quella funzione perché gli studenti riconoscono un accordo condiviso.",
          "why": "Una convenzione permette a persone che non si conoscono di coordinare le proprie azioni."
        },
        {
          "id": "conoscenti",
          "label": "Perché chi li distribuisce conosce tutti gli studenti di persona.",
          "correct": false,
          "feedback": "Conoscersi può aiutare, ma non basta a spiegare perché un gettone debba essere accettato da tutti.",
          "why": "Il valore condiviso dipende da una regola comune, non dai rapporti personali con chi distribuisce i gettoni."
        }
      ]
    },
    {
      "id": "ex_conseguenze",
      "type": "reflection",
      "activity": "quiz",
      "title": "Che cosa dicono le barre?",
      "text": "Riguarda gli indicatori cambiati durante la crisi. Che cosa permettono di capire le barre del gioco?",
      "art": "crisi",
      "objective": "Distinguere le conseguenze simulate dal giudizio morale sulle scelte.",
      "difficulty": "media",
      "choices": [
        {
          "id": "migliore",
          "label": "Quale decisione ha protetto meglio le persone e le risorse.",
          "correct": false,
          "feedback": "Le barre mostrano conseguenze parziali, non quale decisione avrebbe protetto tutti in ogni circostanza.",
          "why": "I valori descrivono aspetti diversi e ipotetici; possono aumentare e diminuire nello stesso turno."
        },
        {
          "id": "errore",
          "label": "Quale errore ha commesso il gruppo decidendo durante la crisi.",
          "correct": false,
          "feedback": "Un valore che diminuisce non rivela automaticamente un errore personale: anche una scelta ragionevole può avere un costo.",
          "why": "Una decisione può avere un costo anche quando è motivata da un obiettivo comprensibile."
        },
        {
          "id": "compromessi",
          "label": "Quali vantaggi e quali costi può comportare una decisione.",
          "correct": true,
          "feedback": "Esatto: le barre rappresentano conseguenze possibili, non voti morali sulle persone.",
          "why": "Una situazione complessa obbliga spesso a scegliere fra obiettivi diversi, senza proteggere tutto."
        }
      ]
    },
    {
      "id": "ex_fatti",
      "type": "reflection",
      "activity": "quiz",
      "title": "Un fatto o un giudizio?",
      "text": "In un esempio inventato, dopo un incendio qualcuno scrive: «Tre case sono state distrutte». Quale frase aggiunge un'interpretazione invece di descrivere soltanto un fatto?",
      "art": "memoria",
      "objective": "Distinguere un'osservazione da una valutazione o interpretazione.",
      "difficulty": "media",
      "choices": [
        {
          "id": "fallimento",
          "label": "Il danno alle case dimostra che gli abitanti hanno fallito.",
          "correct": true,
          "feedback": "Esatto. Qui al fatto si aggiunge un giudizio sulle persone, che richiederebbe altri elementi per essere sostenuto.",
          "why": "Descrivere un danno e attribuirgli un significato sono operazioni diverse."
        },
        {
          "id": "case",
          "label": "Tre abitazioni vicino al bosco non sono più utilizzabili.",
          "correct": false,
          "feedback": "Questa frase descrive una condizione delle abitazioni, che si può verificare osservando i danni.",
          "why": "Non attribuisce ancora responsabilità, intenzioni o valori alla comunità."
        },
        {
          "id": "edifici",
          "label": "Le fiamme hanno danneggiato alcuni edifici vicino al bosco.",
          "correct": false,
          "feedback": "Questa frase descrive ciò che l'incendio ha provocato, senza interpretare le scelte degli abitanti.",
          "why": "Un'informazione può essere incompleta senza essere per forza un giudizio."
        }
      ]
    },
    {
      "id": "ex_punti_vista",
      "type": "reflection",
      "activity": "quiz",
      "title": "Due modi di ricordare",
      "text": "Un testimone racconta chi ha spento il fuoco; un altro chi ha aiutato i bambini. Che cosa mostra il confronto fra i due racconti?",
      "art": "memoria",
      "objective": "Riconoscere che racconti dello stesso evento possono selezionare protagonisti e valori diversi.",
      "difficulty": "media",
      "choices": [
        {
          "id": "anziano",
          "label": "Il racconto più antico riesce a spiegare meglio le cause dell'incendio.",
          "correct": false,
          "feedback": "Un racconto antico può conservare elementi importanti, ma l'età non garantisce una spiegazione migliore delle cause.",
          "why": "Ogni testimonianza può mettere in evidenza aspetti differenti dello stesso evento."
        },
        {
          "id": "selezione",
          "label": "Il punto di vista scelto fa emergere protagonisti e valori diversi.",
          "correct": true,
          "feedback": "Esatto. Le due versioni possono riferirsi allo stesso incendio, ma ricordare gesti e valori differenti.",
          "why": "Le storie non si limitano a elencare avvenimenti: selezionano ciò che viene ricordato."
        },
        {
          "id": "dettagli",
          "label": "Il racconto con più dettagli rappresenta meglio ciò che il gruppo ha vissuto.",
          "correct": false,
          "feedback": "I dettagli arricchiscono una testimonianza, ma anche un racconto accurato seleziona alcuni aspetti e ne lascia fuori altri.",
          "why": "L'importanza che diamo a una storia dipende anche da quali persone e valori scegliamo di ricordare."
        }
      ]
    },
    {
      "id": "imparato",
      "type": "narrative",
      "title": "Che cosa ho imparato?",
      "text": "Nelle lezioni precedenti avevamo già studiato il linguaggio e la funzione sociopoietica: era il nostro punto di partenza. Oggi abbiamo scoperto qualcosa di nuovo. Primo: governare una comunità significa scegliere fra bisogni diversi e accettare compromessi. Secondo: gli avvenimenti non diventano automaticamente memoria collettiva; qualcuno decide quali ricordare. Terzo: ogni racconto sceglie protagonisti, punti di vista e valori. Per questo la storia di una persona può diventare importante per un intero popolo.",
      "art": "parole"
    },
    {
      "id": "trasferimento",
      "type": "reflection",
      "title": "Porta questa idea fuori dal gioco",
      "text": "Pensa a una decisione presa nella tua scuola o nella tua classe. Quale nuova idea del gioco ti aiuta a comprenderla meglio?",
      "art": "patto",
      "choices": [
        {
          "id": "accordi_scuola",
          "label": "Ogni decisione può risolvere un problema ma creare altri costi.",
          "feedback": "Hai riconosciuto che una decisione può essere ragionevole senza soddisfare tutti: conta valutare chi ne trae beneficio e chi sostiene i costi.",
          "why": "Le decisioni collettive richiedono compromessi fra esigenze diverse."
        },
        {
          "id": "conflitti_scuola",
          "label": "Lo stesso episodio può essere raccontato da punti di vista diversi.",
          "feedback": "Hai riconosciuto che due persone possono ricordare lo stesso evento mettendo al centro protagonisti e valori differenti.",
          "why": "Il punto di vista scelto modifica il significato che attribuiamo a un avvenimento."
        },
        {
          "id": "storie_scuola",
          "label": "Un episodio diventa memoria del gruppo quando viene tramandato.",
          "feedback": "Hai individuato il passaggio dall'evento al ricordo collettivo: alcuni fatti vengono raccontati ancora, altri finiscono nell'oblio.",
          "why": "La memoria collettiva nasce da una selezione di eventi e personaggi, non da una registrazione completa del passato."
        }
      ]
    },
    {
      "id": "epica_domanda",
      "type": "narrative",
      "title": "Una domanda attraversa i secoli",
      "text": "Nella vostra città avete scelto quali eventi ricordare. Molto prima dei libri di scuola e dei mezzi di comunicazione moderni, altri popoli si ponevano domande simili: da dove veniamo? Chi siamo? Che cosa dobbiamo agli altri? Che cosa resta di noi dopo la morte? Le grandi narrazioni epiche sono alcune delle risposte che hanno tramandato.",
      "art": "memoria"
    },
    {
      "id": "epica_sapere",
      "type": "narrative",
      "title": "Quando il sapere si ascoltava",
      "text": "In molte società antiche racconti, canti, formule e rituali aiutavano a conservare e trasmettere conoscenze e valori. Poeti e narratori si rivolgevano a un pubblico che ascoltava e ricordava. Non significa che tutti fossero analfabeti o che mancasse la scrittura: oralità e testi scritti hanno convissuto in modi diversi. L'epica non era un manuale di storia: mescolava memoria, immaginazione, credenze e modelli di comportamento.",
      "art": "parole"
    },
    {
      "id": "epica_gilgamesh",
      "type": "narrative",
      "title": "La morte di Enkidu",
      "text": "Gilgamesh, re di Uruk, perde l'amico Enkidu. Sconvolto, comprende che anche lui morirà. Abbandona la città e parte alla ricerca dell'immortalità.",
      "art": "memoria",
      "epicBeat": true
    },
    {
      "id": "epica_gilgamesh_atto_2",
      "type": "narrative",
      "title": "La pianta perduta",
      "text": "Dopo un lungo viaggio, Gilgamesh trova una pianta che potrebbe restituire la giovinezza. Un serpente gliela ruba. Torna a Uruk senza aver sconfitto la morte.",
      "art": "memoria",
      "epicBeat": true
    },
    {
      "id": "epica_iliade",
      "type": "narrative",
      "title": "L'ira e il lutto",
      "text": "Achille litiga con Agamennone e smette di combattere. Quando Ettore uccide il suo amico Patroclo, torna sul campo e uccide Ettore per vendetta.",
      "art": "crisi",
      "epicBeat": true
    },
    {
      "id": "epica_iliade_atto_2",
      "type": "narrative",
      "title": "Il padre del nemico",
      "text": "Priamo, padre di Ettore, entra nella tenda di Achille per chiedere il corpo del figlio. I due nemici piangono insieme. La gloria non cancella il dolore.",
      "art": "crisi",
      "epicBeat": true
    },
    {
      "id": "epica_odissea",
      "type": "narrative",
      "title": "Il ciclope e Nessuno",
      "text": "Odisseo inganna il ciclope Polifemo dicendo di chiamarsi «Nessuno». Fugge, ma rivela il suo vero nome e attira la vendetta di Poseidone.",
      "art": "reti",
      "epicBeat": true
    },
    {
      "id": "epica_odissea_atto_2",
      "type": "narrative",
      "title": "Il segreto di Itaca",
      "text": "Dopo anni di pericoli, Odisseo torna a Itaca travestito. Penelope lo riconosce grazie al segreto del loro letto costruito intorno a un ulivo.",
      "art": "reti",
      "epicBeat": true
    },
    {
      "id": "epica_eneide",
      "type": "narrative",
      "title": "Troia brucia",
      "text": "Enea fugge da Troia portando il padre Anchise sulle spalle e guidando il figlio Ascanio. Durante la fuga perde la moglie Creusa.",
      "art": "ponte",
      "epicBeat": true
    },
    {
      "id": "epica_eneide_atto_2",
      "type": "narrative",
      "title": "Didone e il destino",
      "text": "A Cartagine Enea ama la regina Didone. Ma riparte per raggiungere l'Italia, dove crede di dover fondare una nuova patria. Didone, disperata, si uccide.",
      "art": "ponte",
      "epicBeat": true
    },
    {
      "id": "epica_india",
      "type": "narrative",
      "title": "Arjuna esita",
      "text": "Nel Mahabharata, Arjuna guarda il campo di battaglia: tra i nemici ci sono parenti e maestri. Non vuole ucciderli. Krishna gli parla del dovere e dell'azione.",
      "art": "patto",
      "epicBeat": true
    },
    {
      "id": "epica_india_atto_2",
      "type": "narrative",
      "title": "Il viaggio di Rama",
      "text": "Nel Ramayana, Rama deve lasciare il regno e vivere in esilio. Sita viene rapita da Ravana e Rama affronta una lunga lotta per ritrovarla. Le due opere interrogano doveri differenti.",
      "art": "patto",
      "epicBeat": true
    },
    {
      "id": "epica_nord",
      "type": "narrative",
      "title": "Tradizioni norrene: come agire davanti al destino?",
      "text": "Nelle tradizioni norrene, tramandate anche nelle saghe islandesi e nei poemi dell'Edda, ricorrono onore, parentela, vendetta, coraggio e destino. Le saghe e i poemi non sono tutti lo stesso genere: raccontano vicende familiari, eroi e divinità in forme differenti. Spesso la domanda è come comportarsi quando il conflitto sembra impossibile da evitare.",
      "art": "crisi"
    },
    {
      "id": "epica_confronto_1",
      "type": "narrative",
      "title": "Il dilemma di Achille",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "memoria",
      "game": {
        "mode": "dilemma",
        "hero": "Achille",
        "number": 1,
        "setup": "Agamennone ha offeso Achille sottraendogli Briseide. I Greci hanno ancora bisogno di lui contro Troia, ma Achille sente che il suo onore è stato calpestato.",
        "question": "Resti a combattere con i tuoi compagni oppure ti ritiri dalla guerra?",
        "choices": [
          {
            "id": "fight",
            "label": "Resto a combattere, anche se sono stato umiliato",
            "hypothesis": "Se restassi, i Greci avrebbero ancora il loro guerriero più forte. Ma l'offesa rimarrebbe e il conflitto con Agamennone non sarebbe risolto."
          },
          {
            "id": "withdraw",
            "label": "Mi ritiro: non combatto per chi mi disonora",
            "hypothesis": "Ritirarti protegge il tuo orgoglio, ma lascia i compagni senza il tuo aiuto nel momento in cui hanno bisogno di te."
          }
        ],
        "canonicalChoice": "withdraw",
        "actual": "Nell'Iliade Achille si ritira. I Greci subiscono gravi perdite; Patroclo combatte con le sue armi e viene ucciso da Ettore. Solo allora Achille torna, uccide Ettore e affronta il dolore del padre Priamo.",
        "explanation": "La sua ira non riguarda solo lui: pesa sull'intero esercito. L'epica mette in discussione il rapporto fra orgoglio personale, gloria e responsabilità verso gli altri.",
        "bridges": [
          {
            "hero": "Arjuna",
            "common": "Anche Arjuna esita a partecipare a una guerra che coinvolge la sua comunità.",
            "difference": "Achille si rifiuta per un'offesa al proprio onore; Arjuna teme di uccidere parenti e maestri. Le due esitazioni hanno motivi diversi."
          },
          {
            "hero": "Enea",
            "common": "Entrambi devono scegliere fra ciò che desiderano e ciò che altri si aspettano da loro.",
            "difference": "Achille inizialmente si sottrae alla lotta; Enea lascia Didone per portare avanti il futuro che crede destinato ai suoi discendenti."
          }
        ]
      }
    },
    {
      "id": "epica_confronto_2",
      "type": "narrative",
      "title": "Il dilemma di Gilgamesh",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "parole",
      "game": {
        "mode": "dilemma",
        "hero": "Gilgamesh",
        "number": 2,
        "setup": "Il tuo amico Enkidu è morto. Sei il potente re di Uruk, ma scopri che neppure un re può impedire la propria morte.",
        "question": "Accetti il limite umano oppure parti alla ricerca della vita eterna?",
        "choices": [
          {
            "id": "stay",
            "label": "Resto a Uruk: devo vivere sapendo che morirò",
            "hypothesis": "Restando potresti occuparti della tua città e affrontare il lutto senza cercare una soluzione impossibile. Ma la paura della morte resterebbe."
          },
          {
            "id": "search",
            "label": "Parto: voglio scoprire come diventare immortale",
            "hypothesis": "Il viaggio può farti conoscere il mondo e te stesso, ma non garantisce che troverai ciò che cerchi."
          }
        ],
        "canonicalChoice": "search",
        "actual": "Nell'Epopea di Gilgamesh il re parte in cerca dell'immortalità. Incontra Utnapishtim e ottiene una pianta che potrebbe restituire giovinezza; un serpente gliela sottrae. Gilgamesh torna a Uruk senza aver sconfitto la morte.",
        "explanation": "Il viaggio non gli dà la vita eterna: gli fa incontrare il limite della condizione umana e il valore di ciò che gli esseri umani possono costruire.",
        "bridges": [
          {
            "hero": "Achille",
            "common": "Entrambi cambiano dopo la morte di una persona amata: Enkidu per Gilgamesh, Patroclo per Achille.",
            "difference": "Gilgamesh cerca di sottrarsi alla propria morte; Achille reagisce tornando a combattere per vendetta. Un tema comune genera due storie diverse."
          },
          {
            "hero": "Enea",
            "common": "Un dolore personale provoca un viaggio che cambia la vita del protagonista.",
            "difference": "Gilgamesh parte soprattutto per affrontare la paura di morire; Enea lascia Troia distrutta per cercare una terra dove possa vivere la sua comunità."
          }
        ]
      }
    },
    {
      "id": "epica_confronto_3",
      "type": "narrative",
      "title": "Il dilemma di Odisseo",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "reti",
      "game": {
        "mode": "dilemma",
        "hero": "Odisseo",
        "number": 3,
        "setup": "Hai accecato il ciclope Polifemo e stai fuggendo in nave. Ti sei salvato grazie all'inganno del nome «Nessuno». Il ciclope non sa chi sei.",
        "question": "Parti in silenzio oppure riveli il tuo nome per vantarti della vittoria?",
        "choices": [
          {
            "id": "silent",
            "label": "Taccio: la cosa importante è tornare a Itaca",
            "hypothesis": "Se partissi senza farti riconoscere, probabilmente avresti meno rischi immediati. La gloria dell'impresa rimarrebbe nascosta al ciclope."
          },
          {
            "id": "shout",
            "label": "Grido il mio nome: Polifemo saprà chi l'ha sconfitto",
            "hypothesis": "Rivendicare il tuo nome soddisfa l'orgoglio, ma offre al nemico un'informazione che potrebbe usare contro di te."
          }
        ],
        "canonicalChoice": "shout",
        "actual": "Nell'Odissea Odisseo grida il proprio nome. Polifemo invoca suo padre Poseidone contro di lui: il ritorno a Itaca diventa ancora più difficile.",
        "explanation": "L'astuzia aveva salvato Odisseo; il bisogno di farsi riconoscere lo espone a nuove conseguenze. Non basta essere intelligenti: bisogna anche controllare l'orgoglio.",
        "bridges": [
          {
            "hero": "Achille",
            "common": "La fama e il riconoscimento hanno un peso importante per entrambi gli eroi greci.",
            "difference": "Achille reagisce a un'offesa lasciando la guerra; Odisseo rivela il nome dopo aver già vinto. La ricerca di prestigio crea problemi differenti."
          },
          {
            "hero": "Enea",
            "common": "Entrambi attraversano il Mediterraneo dopo la caduta di Troia.",
            "difference": "Odisseo cerca di tornare alla casa che possiede già, Itaca. Enea cerca una patria nuova perché Troia è distrutta."
          }
        ]
      }
    },
    {
      "id": "epica_confronto_scelta",
      "type": "narrative",
      "title": "Il dilemma di Enea",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "memoria",
      "game": {
        "mode": "dilemma",
        "hero": "Enea",
        "number": 4,
        "setup": "Sei arrivato a Cartagine dopo essere fuggito da Troia in fiamme. Ami la regina Didone. Ma ritieni che il destino ti imponga di partire verso l'Italia per il futuro dei tuoi discendenti.",
        "question": "Rimani con Didone oppure riparti verso l'Italia?",
        "choices": [
          {
            "id": "stay",
            "label": "Resto a Cartagine con Didone",
            "hypothesis": "Restare permetterebbe di proteggere il legame con Didone. Ma significherebbe rinunciare alla missione che Enea ritiene affidatagli dal destino."
          },
          {
            "id": "leave",
            "label": "Riparto: devo cercare una nuova patria",
            "hypothesis": "Partire significa proseguire la missione, ma ferisce gravemente Didone. Un progetto collettivo può avere un costo umano personale."
          }
        ],
        "canonicalChoice": "leave",
        "actual": "Nell'Eneide Enea lascia Cartagine e riprende il viaggio verso l'Italia. Didone, disperata, si toglie la vita. Il poema presenta la scelta di Enea come fedeltà a una missione, senza cancellarne il dolore.",
        "explanation": "Non è una gara fra risposta giusta e sbagliata. Virgilio mostra un conflitto fra affetti e dovere, e invita a considerare anche chi paga le conseguenze.",
        "bridges": [
          {
            "hero": "Arjuna",
            "common": "Entrambi affrontano un conflitto fra legami personali e un dovere sentito come superiore.",
            "difference": "Enea deve abbandonare una persona amata per partire; Arjuna esita a combattere contro parenti e maestri. I loro contesti morali e religiosi non coincidono."
          },
          {
            "hero": "Odisseo",
            "common": "Entrambi viaggiano dopo la guerra di Troia e devono rinunciare a qualcosa lungo il percorso.",
            "difference": "Odisseo torna a Itaca, la patria perduta di vista. Enea deve trovare una patria nuova per i suoi discendenti."
          }
        ]
      }
    },
    {
      "id": "epica_confronto",
      "type": "narrative",
      "title": "Che cosa hanno in comune?",
      "text": "Queste tradizioni non appartengono a un'unica cultura e non trasmettono un'unica morale. Hanno però qualcosa in comune: raccontano vicende memorabili per mettere alla prova valori collettivi. Un personaggio deve scegliere fra desideri, doveri, legami, onore o sopravvivenza. Attraverso le sue scelte, il pubblico può discutere che cosa conta per la comunità. Non sono cronache neutrali: selezionano protagonisti, conflitti e punti di vista.",
      "art": "memoria"
    },
    {
      "id": "epica_scelta",
      "type": "narrative",
      "title": "Il dilemma di Arjuna",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "memoria",
      "game": {
        "mode": "dilemma",
        "hero": "Arjuna",
        "number": 5,
        "setup": "Sul campo di Kurukshetra, nell'epopea del Mahabharata, vedi davanti a te parenti e maestri. Hai un ruolo da guerriero, ma non vuoi uccidere persone che conosci e ami.",
        "question": "Deposi l'arco oppure affronti la battaglia?",
        "choices": [
          {
            "id": "drop",
            "label": "Depongo l'arco: non voglio combattere i miei parenti",
            "hypothesis": "Rifiutare la lotta potrebbe evitare che tu uccida direttamente persone care, ma non risolve da solo il conflitto politico e il dovere che senti verso gli altri."
          },
          {
            "id": "fight",
            "label": "Combatto, pur sapendo che sarà doloroso",
            "hypothesis": "Combattere significa assumerti il ruolo che senti di avere, ma comporta la possibilità concreta di ferire e perdere persone care."
          }
        ],
        "canonicalChoice": "fight",
        "actual": "Nella Bhagavad Gītā, parte del Mahabharata, Krishna parla ad Arjuna del dovere, dell'azione e della natura della vita. Dopo il dialogo, Arjuna decide di combattere.",
        "explanation": "Il testo non è un semplice invito alla violenza: è una riflessione complessa sul dovere (dharma), sull'azione e sulla responsabilità in una situazione tragica.",
        "bridges": [
          {
            "hero": "Achille",
            "common": "All'inizio di momenti cruciali entrambi non vogliono combattere.",
            "difference": "Achille rifiuta perché si sente disonorato da Agamennone; Arjuna è sconvolto dall'idea di uccidere parenti e maestri. Il gesto sembra simile, la ragione no."
          },
          {
            "hero": "Enea",
            "common": "Entrambi mettono in discussione il rapporto fra desideri personali e responsabilità.",
            "difference": "Enea deve scegliere se lasciare Didone e proseguire un viaggio; Arjuna deve decidere se prendere parte a una guerra contro persone amate."
          }
        ]
      }
    },
    {
      "id": "epica_conflitto",
      "type": "narrative",
      "title": "Il dilemma di Rama",
      "text": "Scegli che cosa faresti. Il racconto mostrerà poi la decisione dell'eroe e i collegamenti con altre tradizioni epiche.",
      "art": "patto",
      "game": {
        "mode": "dilemma",
        "hero": "Rama",
        "number": 6,
        "setup": "Nel Ramayana il padre di Rama, re Dasharatha, è vincolato a una promessa: il trono andrà a Bharata e Rama dovrà vivere in esilio per quattordici anni.",
        "question": "Contesti la decisione oppure accetti l'esilio per rispettare la parola del padre?",
        "choices": [
          {
            "id": "contest",
            "label": "Resto e contesto la decisione: il trono doveva essere mio",
            "hypothesis": "Opporsi potrebbe difendere il tuo diritto al trono, ma aprirebbe uno scontro nella famiglia reale e metterebbe in discussione la parola data da tuo padre."
          },
          {
            "id": "accept",
            "label": "Accetto l'esilio per rispettare la promessa",
            "hypothesis": "Partire preserva la promessa del padre, ma ti allontana dalla città e da una vita sicura. Anche Sita e Lakshmana affronteranno i pericoli del viaggio."
          }
        ],
        "canonicalChoice": "accept",
        "actual": "Nel Ramayana Rama accetta l'esilio; Sita e Lakshmana lo accompagnano. In seguito Sita viene rapita da Ravana, Rama combatte per liberarla e, dopo molti eventi, torna al suo regno.",
        "explanation": "Il racconto mette al centro il dovere verso la famiglia, la parola data e le responsabilità del sovrano. L'obbedienza non evita però sofferenze e conflitti.",
        "bridges": [
          {
            "hero": "Enea",
            "common": "Rama ed Enea rinunciano a una situazione familiare e affrontano un viaggio difficile.",
            "difference": "Rama lascia temporaneamente il proprio regno e alla fine vi ritorna; Enea fugge da Troia distrutta e cerca una patria nuova."
          },
          {
            "hero": "Odisseo",
            "common": "Entrambi attraversano prove e cercano di riunirsi alla loro famiglia.",
            "difference": "Odisseo deve tornare dopo una guerra; Rama affronta un esilio imposto da una promessa e, durante il viaggio, il rapimento di Sita."
          }
        ]
      }
    },
    {
      "id": "epica_sintesi",
      "type": "narrative",
      "title": "Le idee fondamentali dell'epica",
      "text": "Da ricordare: 1. Le epiche sono opere e tradizioni nate in contesti differenti: oralità e scrittura non si escludono. 2. Non sono cronache neutrali: raccontano origini, valori e conflitti, ma la ricerca storica deve verificare i fatti attraverso le fonti. 3. Non propongono una morale unica: Gilgamesh interroga la morte; Iliade e Odissea affrontano guerra e ritorno; l'Eneide il dovere verso una comunità futura; Mahabharata e Ramayana i doveri e i legami; le tradizioni norrene onore e destino. 4. Le scelte di un personaggio possono rappresentare una domanda collettiva.",
      "art": "parole"
    },
    {
      "id": "epica_araba",
      "type": "narrative",
      "title": "La migrazione dei Banū Hilāl",
      "text": "La Sīrat Banī Hilāl racconta il viaggio dei Banū Hilāl verso il Nord Africa. In Egitto i cantori tramandano anche le imprese dell'eroe Abū Zayd.",
      "art": "reti",
      "epicBeat": true
    },
    {
      "id": "epica_araba_atto_2",
      "type": "narrative",
      "title": "La voce degli altri",
      "text": "Per chi arriva, il viaggio può essere un'impresa gloriosa. Per chi vive già in quei territori può significare guerra e perdita. Quale memoria diventa quella ufficiale?",
      "art": "reti",
      "epicBeat": true
    },
    {
      "id": "epica_persiana",
      "type": "narrative",
      "title": "Un duello senza nomi",
      "text": "Nello Shāhnāmeh, Sohrab cerca il padre Rostam. Sul campo di battaglia i due si affrontano senza riconoscersi.",
      "art": "crisi",
      "epicBeat": true
    },
    {
      "id": "epica_persiana_atto_2",
      "type": "narrative",
      "title": "La scoperta terribile",
      "text": "Rostam ferisce mortalmente Sohrab. Solo allora scopre che è suo figlio. La forza dell'eroe non lo ha salvato da un errore tragico.",
      "art": "crisi",
      "epicBeat": true
    },
    {
      "id": "epica_sundiata",
      "type": "narrative",
      "title": "L'infanzia e l'esilio",
      "text": "I narratori mandé raccontano che Sundiata, futuro sovrano, cresce fra difficoltà e rivalità. La sua famiglia è costretta all'esilio.",
      "art": "villaggio",
      "epicBeat": true
    },
    {
      "id": "epica_sundiata_atto_2",
      "type": "narrative",
      "title": "Il ritorno del fondatore",
      "text": "Sundiata raccoglie alleati, sconfigge il rivale Sumanguru e viene ricordato come fondatore dell'impero del Mali.",
      "art": "villaggio",
      "epicBeat": true
    },
    {
      "id": "epica_libri",
      "type": "narrative",
      "title": "La biblioteca delle grandi epiche",
      "text": "Mesopotamia: Epopea di Gilgamesh. Grecia: Iliade e Odissea, tradizionalmente attribuite a Omero. Roma: Eneide di Virgilio. India: Mahabharata e Ramayana. Persia: Shāhnāmeh di Ferdowsi. Tradizione araba: Sīrat Banī Hilāl. Africa occidentale: epopea di Sundiata. Mondo norreno: poemi dell'Edda e saghe islandesi. Sono opere e tradizioni diverse: non formano un solo libro né un solo genere identico.",
      "art": "parole"
    },
    {
      "id": "epica_trasmissione",
      "type": "narrative",
      "title": "Chi custodiva queste storie?",
      "text": "Gilgamesh ci è giunto su tavolette mesopotamiche. I poemi omerici sono legati a tradizioni orali poi trasmesse in forma scritta; Virgilio compose l'Eneide come opera letteraria. Le epiche indiane hanno attraversato secoli di rielaborazioni; la Sīrat Banī Hilāl ha avuto una forte tradizione performativa; i racconti di Sundiata sono tramandati da narratori mandé. Molti testi norreni furono messi per iscritto nell'Islanda medievale. Non esiste un'unica storia della nascita dei libri epici.",
      "art": "parole"
    },
    {
      "id": "miti_oggi",
      "type": "narrative",
      "title": "I miti non sono finiti",
      "text": "Oggi una comunità può raccontare un campione sportivo come simbolo di una città, oppure riconoscersi in un eroe cinematografico. Le storie di Star Wars, per esempio, mettono in scena genealogie, prove, sacrifici e responsabilità. Non sono la stessa cosa dell'epica antica, ma possiamo confrontare le domande che pongono. Un mito non è necessariamente una bugia: è anche un racconto che attribuisce significato a persone ed eventi.",
      "art": "reti"
    },
    {
      "id": "miti_vincitori",
      "type": "narrative",
      "title": "Chi racconta la vittoria?",
      "text": "Una città celebra una battaglia con un monumento. Per i vincitori può rappresentare coraggio e fondazione; per gli sconfitti perdita e sofferenza. La formula «la storia la scrivono i vincitori» è un avvertimento utile, non una legge universale: esistono anche testimonianze dei vinti e ricerche che ricostruiscono più prospettive. Una memoria pubblica seleziona; uno storico deve confrontare le fonti.",
      "art": "crisi"
    },
    {
      "id": "miti_algoritmi",
      "type": "narrative",
      "title": "Dai cantori agli algoritmi",
      "text": "Un tempo i racconti circolavano attraverso cantori, rituali, manoscritti e libri. Oggi anche video, meme e piattaforme digitali contribuiscono a rendere alcuni episodi molto visibili e altri quasi invisibili. I mezzi sono diversi, ma rimane una domanda: chi decide quali persone e fatti meritano attenzione?",
      "art": "parole"
    },
    {
      "id": "miti_ponte",
      "type": "narrative",
      "title": "La battaglia del ponte",
      "text": "Confronta tre testimonianze: quali elementi sono fatti verificabili e quali sono interpretazioni?",
      "art": "ponte",
      "game": {
        "mode": "sources",
        "left": [
          "«La città A ha conquistato il ponte.»",
          "«Abbiamo liberato il ponte dagli oppressori.»",
          "«Abbiamo difeso le nostre famiglie.»"
        ],
        "right": [
          "Fatto da verificare",
          "Interpretazione dei vincitori",
          "Interpretazione degli sconfitti"
        ],
        "answer": [
          0,
          1,
          2
        ]
      }
    },
    {
      "id": "miti_conclusione",
      "type": "narrative",
      "title": "Che cosa resta da ricordare?",
      "text": "Che cosa abbiamo imparato di nuovo? Primo: ogni società seleziona vicende e personaggi per raccontare ciò che considera importante. Secondo: racconti diversi possono attribuire significati differenti allo stesso evento, ma i fatti non si decidono a maggioranza: vanno verificati attraverso fonti e prove. Terzo: i miti non appartengono soltanto al passato: sport, cinema, monumenti e piattaforme continuano a costruire memorie condivise. Domanda finale: chi ha il potere di trasformare un avvenimento in una storia che tutti ricordano?",
      "art": "memoria"
    },
    {
      "id": "ponte",
      "type": "narrative",
      "title": "Una persona, il destino di molti",
      "text": "Una comunità non tramanda soltanto regole. Tramanda storie che rappresentano valori, paure e conflitti. Perché ricordiamo proprio alcune persone? E se una città fosse in pericolo, qualcuno avrebbe il dovere di rischiare la propria vita per difenderla? Nella prossima lezione incontreremo Ettore.",
      "art": "ponte"
    }
  ]
};
 const api={comunita:STORY}; if(typeof module==='object'&&module.exports) module.exports=api; else root.ComunitaStories=api;
})(typeof globalThis==='object'?globalThis:this);
