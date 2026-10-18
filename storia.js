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
