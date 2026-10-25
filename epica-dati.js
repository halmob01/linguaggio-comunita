/* Contenuti dell'attività 2 — Le voci dell'epica. Nessuna dipendenza dal motore dell'attività 1. */
(function(root){ 'use strict';
const DATA = {
  id: 'epica',
  title: 'Le voci dell’epica',
  subtitle: 'Che cosa dice un eroe del popolo che lo racconta?',
  traditions: [
    {id:'gilgamesh', name:'Gilgamesh', place:'Uruk', hero:'Gilgamesh', accent:'#b5653a', emblem:'uruk'},
    {id:'odissea', name:'Odissea', place:'Itaca', hero:'Odisseo', accent:'#2d6fa3', emblem:'nave'},
    {id:'eneide', name:'Eneide', place:'Roma', hero:'Enea', accent:'#a3304a', emblem:'troia'},
    {id:'shahnameh', name:'Shāhnāmeh', place:'Iran', hero:'Rostam', accent:'#1f8a8a', emblem:'elmi'},
    {id:'hilal', name:'Banū Hilāl', place:'Tunisia', hero:'Abū Zayd', accent:'#c8932b', emblem:'carovana'}
  ],
  chapters: [
    {id:'c1', title:'Dalla vostra comunità all’epica', slides:[
      {id:'c1_cento', kind:'text', art:'racconto', title:'Cento anni dopo',
        body:['Nella vostra comunità, cento anni dopo, nessuno ricordava tutte le regole.','Ma qualcuno continuava a raccontare una storia. Perché proprio quella?']},
      {id:'c1_valore', kind:'text', art:'valori', title:'Che cos’è un valore?',
        body:['Un valore è qualcosa che un gruppo considera importante e degno di essere difeso: il coraggio, la lealtà, l’ospitalità, la famiglia, la libertà.','I valori non si vedono. Si riconoscono nelle scelte delle persone.'],
        keyword:{term:'valore', definition:'Ciò che una comunità considera importante e vuole difendere.'}},
      {id:'c1_specchio', kind:'text', art:'specchio', title:'Le storie come specchio',
        body:['Quando un popolo racconta i suoi eroi, parla di sé: di ciò che ammira, di ciò che teme, delle domande a cui non sa rispondere.','Oggi ascolterai cinque storie di cinque popoli diversi.'],
        lead:'Che cosa ci dice un eroe sul popolo che lo racconta?'}
    ]},
    {id:'c2', title:'Che cos’è l’epica', slides:[
      {id:'c2_epos', kind:'text', art:'epos', title:'Una parola antica',
        body:['Epica viene dal greco epos: «parola», «racconto».','Sono racconti lunghi, spesso in versi, che narrano le imprese di eroi importanti per un popolo.'],
        keyword:{term:'epos', definition:'In greco antico significa «parola» o «racconto». Da qui viene la parola «epica».'}},
      {id:'c2_aedo', kind:'text', art:'aedo', title:'Storie da ascoltare',
        body:['Per secoli queste storie non si leggevano: si ascoltavano.','Cantori come gli aedi greci le recitavano a memoria, durante feste e banchetti, a volte per ore.','Ogni cantore poteva cambiare qualcosa.'],
        keyword:{term:'aedo', definition:'Cantore dell’antica Grecia che recitava i poemi a memoria.'}},
      {id:'c2_formule', kind:'text', art:'formule', title:'Come si ricorda un poema lunghissimo?',
        body:['I cantori usavano formule che tornano sempre uguali, come «l’Aurora dalle dita di rosa».','E davano a ogni eroe un soprannome fisso: «Odisseo dal multiforme ingegno».','Aiutava chi raccontava e chi ascoltava.'],
        keyword:{term:'epiteto', definition:'Soprannome fisso che accompagna un personaggio e ne ricorda una qualità.'}},
      {id:'c2_prova', kind:'epithet', art:'epiteto', title:'Prova tu: l’epiteto',
        body:['Pensa a un compagno di classe, senza dire il nome. Quale epiteto gli darebbe un cantore?'],
        options:[
          {id:'idee', label:'dalle mille idee'},
          {id:'cuore', label:'dal cuore generoso'},
          {id:'risata', label:'dalla risata contagiosa'},
          {id:'arrende', label:'che non si arrende mai'},
          {id:'parola', label:'dalla parola gentile'},
          {id:'orario', label:'sempre in orario'}
        ],
        feedback:'Un epiteto dice in poche parole che cosa una comunità ammira di una persona. Anche gli epiteti degli eroi raccontano i valori di un popolo.'},
      {id:'c2_ingredienti', kind:'ingredients', art:'epos', title:'Gli ingredienti',
        body:['Molte epiche hanno quattro ingredienti.'],
        cards:[
          {name:'L’eroe', line:'È eccezionale, ma umano: sbaglia, soffre, ha paura.'},
          {name:'Gli dei o il destino', line:'Forze più grandi delle persone.'},
          {name:'L’impresa', line:'Una guerra, un viaggio, la fondazione di una città, una migrazione.'},
          {name:'Il pubblico', line:'Una comunità che ascolta e si riconosce.'}
        ]},
      {id:'c2_vero', kind:'text', art:'vero', title:'Né vero né falso',
        body:['L’epica non è un libro di storia: mescola ricordi di fatti antichi, immaginazione e credenze.','Per questo dice poco su «come è andata davvero» e molto su che cosa contava per chi la raccontava.']}
    ]},
    {id:'c3', title:'Cinque popoli, cinque storie', slides:[
      {id:'c3_mappa', kind:'map', art:'mappa', title:'Cinque storie, cinque luoghi',
        body:['Cinque storie nate in luoghi vicini ma lontane migliaia di anni.','Partiamo dalla più antica.']},

      {id:'gilgamesh_id', kind:'idcard', tradition:'gilgamesh', title:'Gilgamesh · carta d’identità',
        rows:[['Popolo','Sumeri e Babilonesi'],['Luogo','Mesopotamia, oggi Iraq'],['Quando','Racconti già 4000 anni fa; versione più completa di circa 3200 anni fa'],['Come ci è arrivata','Scritta su tavolette d’argilla in caratteri cuneiformi, ritrovate fra le rovine di Ninive'],['Eroe','Gilgamesh, re di Uruk']],
        note:'Tra le più antiche storie scritte che conosciamo.'},
      {id:'gilgamesh_1', kind:'text', tradition:'gilgamesh', title:'Un re prepotente e un amico',
        body:['Gilgamesh è un re fortissimo, ma prepotente. Gli dei creano Enkidu, un uomo selvaggio, perché lo affronti.','I due combattono, poi diventano amici inseparabili. Insieme sconfiggono Humbaba, il guardiano della foresta dei cedri.']},
      {id:'gilgamesh_2', kind:'text', tradition:'gilgamesh', title:'La pianta perduta',
        body:['Gli dei decidono che Enkidu deve morire. Disperato, Gilgamesh parte in cerca del segreto della vita eterna.','Un vecchio saggio gli indica una pianta che ridà la giovinezza, ma un serpente gliela ruba.','Gilgamesh torna a Uruk e guarda le grandi mura della sua città.']},
      {id:'gilgamesh_valori', kind:'values', tradition:'gilgamesh', title:'Che cosa conta per questo popolo?',
        values:[
          {name:'L’amicizia', line:'Il dolore per Enkidu cambia l’eroe.'},
          {name:'Il buon re', line:'Da re prepotente a re che pensa alla sua città.'},
          {name:'Accettare di essere mortali', line:'La vita eterna non si ottiene: resta ciò che si costruisce.'}],
        question:'Se dobbiamo morire, che cosa resta di noi?',
        answer:'Per questa storia restano le opere costruite per la comunità, come le mura di Uruk.'},
      {id:'gilgamesh_check', kind:'check', tradition:'gilgamesh', title:'Verifica rapida',
        question:'Perché Gilgamesh, alla fine, guarda le mura di Uruk?',
        options:[
          {id:'a', label:'Vuole controllare che nessun nemico stia attaccando la città', correct:false,
            feedback:'Non è questo il senso della scena. Gilgamesh non cerca nemici: guarda ciò che ha costruito la sua città.'},
          {id:'b', label:'Capisce che resta ciò che si costruisce per la città', correct:true,
            feedback:'Esatto. Dopo la perdita della pianta capisce che non vivrà per sempre, ma le opere per la comunità durano.'},
          {id:'c', label:'Ha trovato l’immortalità e vuole festeggiare con il suo popolo', correct:false,
            feedback:'No: la pianta gli è stata rubata dal serpente. Gilgamesh resta mortale e deve accettarlo.'}]},

      {id:'odissea_id', kind:'idcard', tradition:'odissea', title:'Odissea · carta d’identità',
        rows:[['Popolo','Greci antichi'],['Luogo','Grecia e Mediterraneo'],['Quando','Messa per iscritto circa 2700 anni fa, dopo secoli di racconti a voce'],['Come ci è arrivata','Cantata dagli aedi, poi scritta; la tradizione la attribuisce a Omero'],['Eroe','Odisseo (per i Romani Ulisse), re di Itaca']]},
      {id:'odissea_1', kind:'text', tradition:'odissea', title:'Dieci anni per tornare',
        body:['Dopo la lunga guerra di Troia, Odisseo vuole solo tornare a casa. Il viaggio dura dieci anni.','Prigioniero del ciclope Polifemo, si salva con l’astuzia: dice di chiamarsi «Nessuno». Poi la ninfa Calipso gli offre l’immortalità, ma lui rifiuta.']},
      {id:'odissea_2', kind:'text', tradition:'odissea', title:'Il ritorno a Itaca',
        body:['A Itaca i Proci, uomini prepotenti, occupano la sua casa e vogliono sposare la moglie Penelope, che li tiene a bada con l’inganno della tela.','Odisseo torna travestito da mendicante. Solo il vecchio cane Argo lo riconosce. Poi vince la gara dell’arco e si riprende la casa.']},
      {id:'odissea_valori', kind:'values', tradition:'odissea', title:'Che cosa conta per questo popolo?',
        values:[
          {name:'L’astuzia', line:'L’intelligenza vale più della forza.'},
          {name:'L’ospitalità', line:'Chi tradisce un ospite viene punito: i Proci pagano anche per questo.'},
          {name:'La fedeltà', line:'Alla famiglia e alla propria terra.'}],
        question:'Che cos’è casa, e perché vale più dell’immortalità?',
        answer:'Per Odisseo casa è la famiglia e la sua terra: vale più di una vita senza fine.'},
      {id:'odissea_check', kind:'check', tradition:'odissea', title:'Verifica rapida',
        question:'Perché Odisseo rifiuta l’immortalità offerta da Calipso?',
        options:[
          {id:'a', label:'Preferisce una vita mortale accanto alla sua famiglia', correct:true,
            feedback:'Esatto. Per Odisseo una vita mortale a casa vale più di un’eternità lontano dai suoi.'},
          {id:'b', label:'Non si fida di Calipso e teme che sia un inganno degli dei', correct:false,
            feedback:'Nella storia il motivo è un altro: Odisseo non teme un trucco, vuole tornare da Penelope e da Itaca.'},
          {id:'c', label:'Vuole tornare subito a combattere contro i Troiani', correct:false,
            feedback:'No: la guerra di Troia è finita. Odisseo vuole soltanto tornare a casa.'}]},

      {id:'eneide_id', kind:'idcard', tradition:'eneide', title:'Eneide · carta d’identità',
        rows:[['Popolo','Romani'],['Luogo','Dal Mediterraneo orientale all’Italia'],['Quando','Scritta circa 2000 anni fa'],['Come ci è arrivata','Composta per iscritto dal poeta Virgilio, al tempo dell’imperatore Augusto'],['Eroe','Enea, principe troiano']]},
      {id:'eneide_1', kind:'text', tradition:'eneide', title:'Troia brucia',
        body:['Troia è conquistata e brucia. Enea fugge portando sulle spalle il vecchio padre Anchise e tenendo per mano il figlio Ascanio.','Gli dei gli affidano un compito: guidare i sopravvissuti verso l’Italia e fondare un nuovo popolo.']},
      {id:'eneide_2', kind:'text', tradition:'eneide', title:'Didone e il destino',
        body:['A Cartagine la regina Didone lo accoglie e i due si innamorano. Enea vorrebbe restare, ma gli dei gli ricordano il suo compito.','Parte, e Didone resta disperata. In Italia, dopo una guerra, Enea getta le basi da cui, secondo il racconto, nascerà Roma.']},
      {id:'eneide_valori', kind:'values', tradition:'eneide', title:'Che cosa conta per questo popolo?',
        values:[
          {name:'La pietas', line:'Rispetto e dovere verso gli dei, la famiglia e il proprio popolo.'},
          {name:'Il sacrificio', line:'Rinunciare a ciò che si desidera per il futuro della comunità.'},
          {name:'Un’origine gloriosa', line:'Virgilio scrive per dare ai Romani un’origine importante: l’epica costruisce l’identità di un popolo.'}],
        question:'Che cosa devo alla mia comunità, anche contro ciò che desidero?',
        answer:'Per Enea il dovere verso il futuro del suo popolo viene prima del suo amore.',
        keyword:{term:'pietas', definition:'Per i Romani, il senso del dovere verso gli dei, la famiglia e la patria.'}},
      {id:'eneide_check', kind:'check', tradition:'eneide', title:'Verifica rapida',
        question:'Perché Enea lascia Didone?',
        options:[
          {id:'a', label:'Non è mai stato davvero innamorato di lei', correct:false,
            feedback:'Nel racconto Enea soffre per la partenza: non lascia Didone per mancanza di amore.'},
          {id:'b', label:'Didone gli chiede di andarsene', correct:false,
            feedback:'È il contrario: Didone vorrebbe trattenerlo e resta disperata quando parte.'},
          {id:'c', label:'Mette il futuro del suo popolo prima del proprio amore', correct:true,
            feedback:'Esatto. Gli dei gli ricordano il compito di fondare un nuovo popolo, e Enea lo mette davanti ai suoi desideri.'}]},

      {id:'shahnameh_id', kind:'idcard', tradition:'shahnameh', title:'Shāhnāmeh · carta d’identità',
        rows:[['Popolo','Persiani'],['Luogo','Iran'],['Quando','Completato circa 1000 anni fa'],['Come ci è arrivata','Scritto dal poeta Firdusi in circa trent’anni; ancora oggi i narratori ne raccontano gli episodi in pubblico'],['Eroe','Rostam, il più grande guerriero dell’Iran']]},
      {id:'shahnameh_1', kind:'text', tradition:'shahnameh', title:'Il «Libro dei re»',
        body:['Lo Shāhnāmeh, il «Libro dei re», racconta la storia, in parte leggendaria, dei re e degli eroi dell’Iran.','Firdusi lo scrive in persiano per conservare la lingua e la memoria del suo popolo. Il suo eroe più famoso è Rostam, fortissimo e fedele al re.'],
        keyword:{term:'naqqāl', definition:'Narratore che racconta a voce, in pubblico, gli episodi dello Shāhnāmeh.'}},
      {id:'shahnameh_2', kind:'text', tradition:'shahnameh', title:'Rostam e Sohrab',
        body:['Rostam ha un figlio, Sohrab, che è cresciuto lontano e non lo ha mai visto. Anni dopo Sohrab combatte nell’esercito nemico.','Padre e figlio si sfidano in duello senza riconoscersi. Rostam ferisce Sohrab a morte e solo dopo, da un bracciale, capisce chi era.']},
      {id:'shahnameh_valori', kind:'values', tradition:'shahnameh', title:'Che cosa conta per questo popolo?',
        values:[
          {name:'La lealtà', line:'Verso il re e verso la patria.'},
          {name:'L’onore del guerriero', line:'Non tirarsi indietro davanti alla sfida.'},
          {name:'Il prezzo dei valori', line:'La guerra fra popoli può distruggere anche i legami più stretti.'}],
        question:'Che cosa devo al mio popolo, e che cosa mi costa?',
        answer:'Per questa storia la lealtà è un grande valore, ma può costare carissimo.'},
      {id:'shahnameh_check', kind:'check', tradition:'shahnameh', title:'Verifica rapida',
        question:'Perché la storia di Rostam e Sohrab è una tragedia?',
        options:[
          {id:'a', label:'Rostam tradisce il suo re perché vuole prendere il suo trono', correct:false,
            feedback:'Rostam è fedele al re: non lo tradisce e non vuole il suo trono.'},
          {id:'b', label:'La guerra porta un padre a uccidere il figlio senza saperlo', correct:true,
            feedback:'Esatto. Nessuno dei due vuole il male dell’altro: è la guerra fra i popoli a metterli uno contro l’altro.'},
          {id:'c', label:'Sohrab sapeva chi era Rostam e lo ha tradito volontariamente', correct:false,
            feedback:'Nessuno dei due sa chi ha davanti: Sohrab cerca suo padre senza sapere che è l’uomo che affronta.'}]},

      {id:'hilal_id', kind:'idcard', tradition:'hilal', title:'Sīrat Banī Hilāl · carta d’identità',
        rows:[['Popolo','Banū Hilāl, tribù arabe nomadi'],['Luogo','Dalla penisola arabica, attraverso l’Egitto, fino alla Tunisia'],['Quando','Racconta una migrazione di circa 1000 anni fa'],['Come ci è arrivata','Soprattutto a voce: in Egitto alcuni poeti la cantano ancora oggi accompagnandosi con la rababa. L’UNESCO la riconosce come patrimonio culturale immateriale dell’umanità'],['Eroe','Abū Zayd al-Hilālī']],
        keyword:{term:'rababa', definition:'Strumento a corda, suonato con un archetto, che accompagna il canto dei poeti.'}},
      {id:'hilal_1', kind:'text', tradition:'hilal', title:'Partire per sopravvivere',
        body:['Una lunga siccità colpisce la terra dei Banū Hilāl. Per sopravvivere, tutta la comunità decide di partire verso ovest, in cerca di terre fertili.','Prima di muovere il popolo, Abū Zayd parte in esplorazione, travestito da poeta cantastorie per non essere riconosciuto.'],
        keyword:{term:'sīra', definition:'Racconto della vita e delle imprese di un eroe.'}},
      {id:'hilal_2', kind:'text', tradition:'hilal', title:'Il viaggio verso la Tunisia',
        body:['Il viaggio è lungo e pieno di prove. In Tunisia i Banū Hilāl affrontano il signore della regione, al-Zanātī Khalīfa.','Nella storia contano la forza dei guerrieri, l’astuzia di Abū Zayd, la parola data e l’unità della tribù.']},
      {id:'hilal_valori', kind:'values', tradition:'hilal', title:'Che cosa conta per questo popolo?',
        values:[
          {name:'La solidarietà del gruppo', line:'Nessuno si salva da solo.'},
          {name:'L’astuzia e la parola', line:'L’eloquenza e la poesia sono armi.'},
          {name:'L’onore', line:'La parola data va mantenuta.'}],
        question:'Dov’è casa, se per sopravvivere dobbiamo partire?',
        answer:'Per i Banū Hilāl casa è la tribù unita: si può ricominciare altrove, se si resta insieme.',
        note:'Anche i popoli che incontrarono i Banū Hilāl raccontano questa storia, ma in un altro modo: l’epica ha sempre un punto di vista.'},
      {id:'hilal_check', kind:'check', tradition:'hilal', title:'Verifica rapida',
        question:'Perché Abū Zayd si traveste da poeta?',
        options:[
          {id:'a', label:'Perché la tribù lo ha cacciato per punirlo di un errore', correct:false,
            feedback:'No: Abū Zayd agisce per la sua tribù, che è partita con lui per sfuggire alla siccità.'},
          {id:'b', label:'Perché vuole diventare famoso come cantante di corte', correct:false,
            feedback:'Il travestimento non serve alla fama: serve a muoversi senza essere riconosciuto.'},
          {id:'c', label:'Per esplorare la nuova terra senza farsi riconoscere', correct:true,
            feedback:'Esatto. Un poeta viaggiatore non desta sospetti, e così Abū Zayd può studiare la terra in cui si trasferirà il suo popolo.'}]}
    ]},
    {id:'c4', title:'Il gioco delle grandi domande', slides:[
      {id:'c4_regole', kind:'text', art:'specchio', title:'Il gioco delle grandi domande',
        body:['Ogni storia nasconde una domanda: quella che il popolo si faceva su di sé.','Prima cercherai la domanda sotto ogni vicenda. Poi scoprirai che le domande si assomigliano, anche fra popoli lontani.']},
      {id:'m1_gilgamesh', kind:'move1', hero:'gilgamesh'},
      {id:'m1_odissea', kind:'move1', hero:'odissea'},
      {id:'m1_eneide', kind:'move1', hero:'eneide'},
      {id:'m1_shahnameh', kind:'move1', hero:'shahnameh'},
      {id:'m1_hilal', kind:'move1', hero:'hilal'},
      {id:'c4_passaggio', kind:'text', art:'formule', title:'Le domande si assomigliano',
        body:['Ora hai cinque domande. Ma sono davvero cinque?','Per ogni grande domanda, tocca tutti gli eroi che secondo te la affrontano.']},
      {id:'m2_A', kind:'move2', q:'A'},
      {id:'a_A', kind:'answers', q:'A'},
      {id:'m2_B', kind:'move2', q:'B'},
      {id:'a_B', kind:'answers', q:'B'},
      {id:'m2_C', kind:'move2', q:'C'},
      {id:'a_C', kind:'answers', q:'C'},
      {id:'c4_rete', kind:'network', title:'La rete delle grandi domande',
        body:['Nessun eroe ha una sola domanda. Nessuna domanda appartiene a un solo popolo.','Le domande si somigliano; le risposte cambiano, perché cambiano i valori di chi racconta.'],
        legend:['Cuore della storia','Collegamento possibile']},
      {id:'c4_comunita', kind:'text', art:'racconto', title:'Anche la vostra comunità se l’è chiesto',
        body:['Nel gioco hai preso molte decisioni. Ora guarda sei di quelle situazioni.','Per ognuna, scegli a quale grande domanda somiglia di più.']},
      {id:'m3_pericolo', kind:'move3', scene:'pericolo'},
      {id:'m3_anziani', kind:'move3', scene:'anziani'},
      {id:'m3_nuovi_arrivi', kind:'move3', scene:'nuovi_arrivi'},
      {id:'m3_dovere', kind:'move3', scene:'dovere'},
      {id:'m3_statua', kind:'move3', scene:'statua'},
      {id:'m3_esilio', kind:'move3', scene:'esilio'}
    ]},
    {id:'c5', title:'Il poema della vostra comunità', slides:[
      {id:'c5_scelta', kind:'poem1', art:'epiteto', title:'Se la vostra comunità avesse un’epica',
        body:['Quale valore metterebbe al centro? E quale epiteto darebbe alla città?']},
      {id:'c5_proemio', kind:'poem2', art:'aedo', title:'Il proemio della vostra città',
        note:'Avete fatto ciò che facevano gli aedi: trasformare le scelte di una comunità in un racconto che dice chi è.'}
    ]},
    {id:'c6', title:'Verso la prossima lezione', slides:[
      {id:'c6_punteggio', kind:'score', art:'epiteto', title:'Il tuo percorso',
        summary:'Hai trovato la risposta al primo tentativo in {n} domande su {m}.',
        messages:{
          high:'Hai ascoltato le storie con attenzione: ricordi le vicende e capisci perché venivano raccontate.',
          mid:'Buon lavoro: alcune domande hanno chiesto un secondo tentativo, e anche questo è ragionare.',
          low:'Alcune storie ti hanno fatto cambiare idea, ed è utile. Puoi tornare ai capitoli per rivederle.'},
        note:'I punti misurano solo quanto ricordi delle vicende. Le grandi domande e i confronti non hanno punti: lì conta quello che pensi.'},
      {id:'c6_frase', kind:'text', art:'specchio', title:'Che cos’è l’epica?',
        body:['L’epica è il racconto con cui un popolo parla di sé.','Attraverso le scelte di un eroe mette alla prova i propri valori e affronta le grandi domande: la morte, la casa, il dovere.','Popoli lontani si fanno domande simili. Le risposte cambiano, perché cambiano i valori.']},
      {id:'c6_ettore', kind:'text', art:'troia', title:'Una domanda per la prossima lezione',
        body:['Nella prossima lezione ascolteremo l’Iliade, la storia di una guerra.','Incontreremo Ettore, che deve difendere la sua città, Troia. Che cosa sceglierà? E che cosa ci dirà di chi lo raccontava?']}
    ]}
  ],
  game: {
    move1: {
      gilgamesh:{
        moment:'Gilgamesh ha perso l’amico Enkidu. Attraversa il mondo per trovare la vita eterna, ma il serpente gli ruba la pianta.',
        options:[
          {id:'a', label:'Che cosa resta di noi, se dobbiamo morire?', correct:true,
            feedback:'Esatto. La ricerca di Gilgamesh comincia dalla morte di Enkidu: la storia si chiede che cosa resta di una vita.'},
          {id:'b', label:'Come si sconfigge un mostro guardiano di una foresta?', correct:false,
            feedback:'Humbaba compare all’inizio, ma non è il centro della storia. Dopo la morte di Enkidu il viaggio cambia argomento.'},
          {id:'c', label:'Chi è il guerriero più forte di tutta Uruk?', correct:false,
            feedback:'La forza di Gilgamesh non basta a salvare il suo amico: la storia parla di qualcosa che la forza non può cambiare.'}]},
      odissea:{
        moment:'Calipso offre a Odisseo l’immortalità. Lui rifiuta e riparte su una zattera per tornare a Itaca.',
        options:[
          {id:'a', label:'Quanto può durare un viaggio per mare senza una guida?', correct:false,
            feedback:'Il viaggio è l’avventura, ma la scelta di Odisseo sta altrove: rinuncia a vivere per sempre pur di tornare.'},
          {id:'b', label:'Come si inganna un ciclope che è più forte di noi?', correct:false,
            feedback:'Polifemo è un episodio famoso, ma qui la scelta riguarda Calipso, non un mostro da battere.'},
          {id:'c', label:'Che cos’è casa, e perché vale tanto?', correct:true,
            feedback:'Esatto. Odisseo rinuncia all’immortalità per la sua casa: la storia si chiede che cosa ci lega a un luogo.'}]},
      eneide:{
        moment:'Enea è felice a Cartagine con Didone. Ma gli dei gli ricordano il suo compito: parte per fondare un nuovo popolo.',
        options:[
          {id:'a', label:'Come si governa bene una città ricca e potente?', correct:false,
            feedback:'È una domanda di governo che la storia non sviluppa. La partenza di Enea parla di un altro conflitto.'},
          {id:'b', label:'Che cosa devo alla mia comunità, contro i miei desideri?', correct:true,
            feedback:'Esatto. Enea mette il futuro del suo popolo davanti al proprio amore: è il conflitto al centro dell’Eneide.'},
          {id:'c', label:'Come si costruisce una grande flotta per attraversare il mare?', correct:false,
            feedback:'La flotta serve alla trama, ma non spiega perché la scena di Didone è così importante.'}]},
      shahnameh:{
        moment:'Rostam sfida un giovane guerriero nemico e lo ferisce a morte. Solo dopo scopre che era suo figlio Sohrab.',
        options:[
          {id:'a', label:'Che cosa mi costa essere leale al mio popolo?', correct:true,
            feedback:'Esatto. Rostam combatte per lealtà al suo popolo, e questa lealtà gli costa la vita di suo figlio.'},
          {id:'b', label:'Chi vince un duello fra due grandi campioni?', correct:false,
            feedback:'Il duello è la scena, non la domanda. Il suo vero tema è ciò che la vittoria costa a Rostam.'},
          {id:'c', label:'Come si riconosce un oggetto di famiglia?', correct:false,
            feedback:'Il bracciale serve a scoprire la verità, ma il tema della storia è più grande di un oggetto.'}]},
      hilal:{
        moment:'Per la siccità la tribù deve partire verso ovest. Abū Zayd si traveste da poeta e va avanti a esplorare la nuova terra.',
        options:[
          {id:'a', label:'Come ci si traveste per non farsi riconoscere?', correct:false,
            feedback:'Il travestimento è lo strumento di Abū Zayd, ma non spiega perché il popolo parte.'},
          {id:'b', label:'Dov’è casa, se per vivere dobbiamo partire?', correct:true,
            feedback:'Esatto. La storia nasce da una migrazione: si chiede dove sia casa quando la terra non basta più.'},
          {id:'c', label:'Quanto è lungo il viaggio dalla penisola arabica alla Tunisia?', correct:false,
            feedback:'La distanza conta poco. Conta ciò che il viaggio chiede a un intero popolo.'}]}
    },
    questions: [
      {id:'A', short:'Che cosa resta?', text:'Che cosa resta di noi, se dobbiamo morire?',
        heroes:{
          gilgamesh:{level:'forte', feedback:'La sua storia nasce da questa domanda: cerca l’immortalità e non la ottiene.'},
          odissea:{level:'forte', feedback:'Odisseo rifiuta l’immortalità: sceglie una vita mortale e a casa.'},
          eneide:{level:'possibile', feedback:'Enea vive per una città che durerà dopo di lui: è un modo di lasciare qualcosa.'},
          shahnameh:{level:'possibile', feedback:'Sohrab muore giovane; e Firdusi scrive perché la memoria del suo popolo non muoia.'},
          hilal:{level:'debole', feedback:'Qui la domanda non è al centro: la storia parla di sopravvivere, non di che cosa resta.'}},
        answers:{
          gilgamesh:{answer:'Restano le opere costruite per la comunità, come le mura di Uruk.', value:'Il buon re'},
          odissea:{answer:'Meglio una vita mortale fra le persone che si amano.', value:'La famiglia e la casa'}}},
      {id:'B', short:'Dov’è casa?', text:'Dov’è casa? Partire, tornare, ricominciare.',
        heroes:{
          gilgamesh:{level:'possibile', feedback:'Alla fine torna a Uruk e capisce che la sua casa è la città.'},
          odissea:{level:'forte', feedback:'Tutta l’Odissea è un ritorno: dieci anni per tornare a Itaca.'},
          eneide:{level:'forte', feedback:'Enea perde la sua città e deve trovarne una nuova.'},
          shahnameh:{level:'debole', feedback:'Rostam combatte per il suo paese, ma la storia non parla di partire o tornare.'},
          hilal:{level:'forte', feedback:'Un popolo intero parte per sopravvivere e cerca una nuova terra.'}},
        answers:{
          odissea:{answer:'Casa è dove ti aspettano: vale più di tutto, anche dell’immortalità.', value:'La fedeltà alla famiglia'},
          eneide:{answer:'Casa si può perdere e ricostruire altrove, se c’è un popolo da guidare.', value:'La pietas'},
          hilal:{answer:'Casa è la tribù unita: si può partire, se si resta insieme.', value:'La solidarietà del gruppo'}}},
      {id:'C', short:'Che cosa devo?', text:'Che cosa devo al mio popolo, anche contro i miei desideri?',
        heroes:{
          gilgamesh:{level:'possibile', feedback:'Da re prepotente diventa un re che pensa alla sua città.'},
          odissea:{level:'debole', feedback:'Odisseo vuole soprattutto tornare a casa sua, e per questo perde tutti i compagni.'},
          eneide:{level:'forte', feedback:'Lascia Didone per il futuro del suo popolo: è il cuore della storia.'},
          shahnameh:{level:'forte', feedback:'La lealtà verso il suo popolo porta Rostam a una tragedia.'},
          hilal:{level:'forte', feedback:'Abū Zayd rischia in prima persona per tutta la tribù.'}},
        answers:{
          eneide:{answer:'Il dovere verso il futuro viene prima del desiderio personale.', value:'La pietas'},
          shahnameh:{answer:'La lealtà è un valore altissimo, ma può costare ciò che hai di più caro.', value:'La lealtà e l’onore'},
          hilal:{answer:'Chi ha più astuzia e coraggio li usa per salvare tutti.', value:'La solidarietà del gruppo'}}}
    ],
    levels:{forte:'Cuore della storia', possibile:'Collegamento possibile', debole:'Non è il centro'},
    move3: {
      pericolo:{
        title:'La città è in pericolo',
        eyebrow:'La crisi della vostra comunità',
        closest:'C',
        heroes:'Enea e Rostam',
        choices:[
          {id:'difesa', label:'Chiedete a tutti di aiutare a fermare il fuoco.'},
          {id:'famiglie', label:'Date priorità a mettere al sicuro le famiglie.'},
          {id:'aiuto_esterno', label:'Mandate persone a cercare aiuto e organizzate l’evacuazione.'}],
        comment:{
          A:'Anche una crisi fa pensare a che cosa resterà di voi. Ma qui la domanda più vicina è un’altra.',
          B:'Una crisi può far perdere la casa. Ma nel vostro caso il problema è soprattutto che cosa ognuno deve agli altri.',
          C:'Davanti al pericolo ciascuno ha dovuto decidere che cosa doveva alla comunità, come Enea e Rostam.'}},
      nuovi_arrivi:{
        title:'Nuove famiglie alla porta',
        eyebrow:'Un incontro della vostra comunità',
        closest:'B',
        heroes:'Abū Zayd ed Enea',
        choices:[
          {id:'accoglienza', label:'Le accogliete subito con gli stessi diritti.'},
          {id:'prova', label:'Proponete un periodo di lavoro e conoscenza reciproca.'},
          {id:'confine', label:'Offrite aiuto temporaneo senza farle entrare.'}],
        comment:{
          A:'Anche l’accoglienza riguarda ciò che resta di una comunità. Ma la domanda più vicina è un’altra.',
          B:'Quelle famiglie cercavano una casa, come i Banū Hilāl e i profughi di Enea. Voi avete deciso che cosa fare di loro.',
          C:'Accogliere o no è anche una domanda sul dovere verso gli altri. La più vicina però è «Dov’è casa?».'}},
      anziani:{
        title:'Le storie di chi non c’è più',
        eyebrow:'La memoria della vostra comunità',
        closest:'A',
        heroes:'Gilgamesh e Firdusi',
        choices:[
          {id:'voce', label:'Chiedete a chi le ricorda di raccontarle a voce, la sera, davanti a tutti.'},
          {id:'registro', label:'Incaricate qualcuno di scrivere le storie in un registro.'},
          {id:'libero', label:'Lasciate che ognuno ricordi come preferisce.'}],
        comment:{
          A:'Decidere come conservare le storie significa decidere che cosa resta di voi: è la domanda di Gilgamesh, e anche di Firdusi, che scrive perché la memoria del suo popolo non muoia.',
          B:'Anche le storie viaggiano di bocca in bocca, come i popoli. Ma la domanda più vicina è su che cosa resta di una comunità.',
          C:'Chi custodisce le storie ha un dovere verso gli altri. Ma qui la domanda più vicina è su ciò che resta di noi.'}},
      esilio:{
        title:'Chi vuole partire',
        eyebrow:'Una partenza nella vostra comunità',
        closest:'B',
        heroes:'Odisseo e Abū Zayd',
        choices:[
          {id:'partire', label:'Li lasciate partire con provviste e un saluto.'},
          {id:'restare', label:'Chiedete loro di restare finché la città non è al sicuro.'},
          {id:'legame', label:'Proponete che alcuni partano e restino in contatto con la città.'}],
        comment:{
          A:'Chi parte lascia qualcosa dietro di sé, ma la domanda più vicina è un’altra.',
          B:'Partire, restare o tenere un legame con la città: è la domanda di Odisseo e dei Banū Hilāl su che cosa sia casa.',
          C:'Chi vuole partire può sentire un dovere verso la comunità che lascia. Ma la domanda più vicina è «Dov’è casa?».'}},
      dovere:{
        title:'Un compito che nessuno vuole',
        eyebrow:'Un peso da dividere',
        closest:'C',
        heroes:'Rostam e Abū Zayd',
        choices:[
          {id:'volontari', label:'Chiedete dei volontari e promettete onore a chi accetta.'},
          {id:'sorte', label:'Tirate a sorte fra tutte le famiglie.'},
          {id:'liberi', label:'Lo affidate a chi ha meno obblighi di famiglia.'}],
        comment:{
          A:'Chi veglia sul ponte può essere ricordato dopo di lui. Ma la domanda più vicina è su ciò che ognuno deve alla comunità.',
          B:'Il compito riguarda chi resta a guardia della casa comune. Ma la domanda più vicina è un’altra.',
          C:'Qualcuno deve pagare un costo per tutti, come Rostam e Abū Zayd, che rischiano per il proprio popolo. Voi avete deciso come distribuirlo.'}},
      statua:{
        title:'Un monumento divide la piazza',
        eyebrow:'Una scelta sulla memoria',
        closest:'A',
        heroes:'Gilgamesh',
        choices:[
          {id:'eroi', label:'Celebrate i fondatori e le loro imprese.'},
          {id:'targhe', label:'Raccontate sia i successi sia gli errori dei fondatori.'},
          {id:'spazio', label:'Lasciate la piazza libera per incontri e feste.'}],
        comment:{
          A:'Decidere che cosa ricordare significa decidere che cosa resta di noi: è la domanda di Gilgamesh, con le mura di Uruk.',
          B:'Un monumento non parla di partire o tornare. È soprattutto una scelta su che cosa lasciare dopo di noi.',
          C:'Ricordare i fondatori è anche un dovere verso la comunità. Ma la domanda più vicina è su che cosa resta.'}}
    },
    poem: {
      values:[
        {id:'solidarieta', name:'Solidarietà', phrase:'la solidarietà'},
        {id:'liberta', name:'Libertà', phrase:'la libertà'},
        {id:'sicurezza', name:'Sicurezza', phrase:'la sicurezza'},
        {id:'astuzia', name:'Astuzia', phrase:'l’astuzia'},
        {id:'ospitalita', name:'Ospitalità', phrase:'l’ospitalità'},
        {id:'lealta', name:'Lealtà', phrase:'la lealtà'}],
      epithets:[
        {id:'porte', label:'dalle porte aperte'},
        {id:'mura', label:'dalle mura salde'},
        {id:'voci', label:'dalle mille voci'},
        {id:'patto', label:'dal patto antico'}],
      fromPatto:{aiuto:'solidarieta', liberta:'liberta', sicurezza:'sicurezza'},
      pericoloLines:{
        difesa:'Restarono tutti a difendere le case dal fuoco.',
        famiglie:'Prima di tutto misero in salvo le famiglie.',
        aiuto_esterno:'Mandarono messaggeri a chiamare aiuto oltre i confini.',
        default:'Il pericolo arrivò, e la città dovette scegliere.'},
      lines:{opening:'Canta, o voce, la città', mid:', che scelse', closing:'Racconta a chi verrà che cosa decisero, e che cosa costò.'}
    }
  },
  patto:[
    {id:'aiuto', label:'Nessuno deve essere abbandonato.'},
    {id:'liberta', label:'Ognuno deve poter scegliere per sé.'},
    {id:'sicurezza', label:'La sicurezza comune viene prima di tutto.'}]
};
const api={epica:DATA}; if(typeof module==='object'&&module.exports) module.exports=api; else root.EpicaDati=api;
})(typeof globalThis==='object'?globalThis:this);
