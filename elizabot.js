exports.reply = function (r) {
	if (this.bot == null) {
		this.bot = new ElizaBot(false);
	} 
	return this.bot.transform(r);
}

exports.start = function () {
	if (this.bot == null) {
		this.bot = new ElizaBot(false);
	}
	return this.bot.getInitial();
}

exports.bye = function () {
	if (this.bot == null) {
		this.bot = new ElizaBot(false);
	}
	return this.bot.getFinal();
}

function ElizaBot(noRandomFlag) {

	this.elizaInitials = [
`======================================================================
                EEEEEE  LL      IIII  ZZZZZZZ   AAAAA 
                EE      LL       II       ZZ   AA   AA
                EEEEE   LL       II     ZZZ    AAAAAAA
                EE      LL       II    ZZ      AA   AA
                EEEEEE  LLLLLL  IIII  ZZZZZZZ  AA   AA
======================================================================		 
 Eliza è la parodia di uno psicoterapeuta Rogersiano.
 Il software originale è stato scritto da Joseph Weizenbaum nel 1966.
 Questa implementazione da Norbert Landsteiner nel 2005.
 Tradotto in italiano, alla bene e meglio, da cttynul nel 2020.

ELIZA > Ciao sono Eliza.`];

	this.elizaKeywords = [
		["xnone", 0, [
		 ["*", [
		     "Non sono sicura di averti capito.",
		     "Per favore continua.",
		     "Puoi ripetere per favore?",
		     "Cosa suggeriresti di fare a te stesso?",
		     "Ti senti forte nel parlare di questo?",
		     "Interessante, per favore continua",
		     "Dimmi di più a riguardo",
		     "Vai avanti.",
		     "Per favore dimmi di più a riguardo",
		     "Questa conversazione ti sta infastidendo?",
		     "Puoi ripetere per favore?",
		     "Lo vedo, dimmi di più",
		     "Interessante. È qualcosa che ti crea dispiacere?",
		     "Mmm hmmm. È questa la tua disciplina preferita?",
		     "Adesso stiamo andando a parare da qualche parte, dimmi di più.",
		     "Lo vedo, come ti fa sentire la cosa?"
		  ]]
		]],
		["scusa", 0, [
		 ["*", [
		     "Per favore, non scusarti.",
		     "Le scuse non sono necessarie.",
		     "Ti ho già detto che le scuse non sono necessarie.",
		     "La cosa non mi annoia, per favore continua.",
		     "Non ho sentimenti, continua pure.",
		     "Non c'è nulla di cui preoccuparsi"
		  ]]
		]],
		["mi dispiace", 0, [
		 ["*", [
		     "goto scusa"
		  ]]
		]],
		["ricorda", 5, [
		 ["* ricordo *", [
		     "Pensi spesso a (2) ?",
		     "Pensare a (2) ti porta altro alla mente?",
		     "Cos'altro ricordi?",
		     "Ricordi (2) solo ora?",
		     "Questa precisa situazione ti ricorda (2) ?",
		     "Qual è il legame tra me e (2) ?",
		     "Cos'altro di (2) ti ricordi?"
		  ]],
		 ["* ti ricordi *", [
		     "Credi che mi sia dimenticata di (2) ?",
		     "Perché credi dovremmo parlare di (2) ora?",
		     "Cosa su (2) ?",
		     "goto cosa",
		     "Parli di (2) ?"
		  ]],
		 ["* ricordi *", [
		     "Come potrei dimenticare (2) ?",
		     "Cosa credi dovrei ricordare su (2) ?",
		     "goto tu"
		  ]]
		]],
		["dimentica", 5, [
		 ["* ho dimenticato *", [
		     "Perché credi di aver dimenticato (2) ?",
		     "Perché non riesci a ricordare (2) ?",
		     "Quanto spesso pensi (2) ?",
		     "Ti rende triste averlo dimenticato?",
		     "Potrebbe essere un blocco mentale ?",
		     "Sei solitamente smemorato ?",
		     "Credi che stai volutamente dimenticato (2) ?"
		  ]],
		 ["* hai dimenticato *", [
		     "Perché me lo chiedi ?",
		     "Sicuro di volermelo chiedere ?",
		     "Ti dà fastidio che io abbia dimenticato (2) ?",
		     "Perché dovrei parlare di  (2) proprio ora ?",
		     "goto cosa",
		     "Dimmi di più su (2)."
		  ]]
		]],
		["se", 3, [
		 ["* se *", [
		     "Credi che sia (2) ?",
		     "Ti piacerebbe fosse (2) ?",
		     "Cosa sai di (2) ?",
		     "Davvero, se (2) ?",
		     "Cosa faresti se (2) ?",
		     "Quante possibilità ci sono di (2) ?",
		     "A cosa credi ti possa portare questa idea?"
		  ]]
		]],
		["sognato", 4, [
		 ["* ho sognato *", [
		     "Davvero, (2) ?",
		     "Hai davvero fantasticato (2) mentre stavi dormendo ?",
		     "Hai mai sognato (2) prima ?",
		     "goto sogno"
		  ]]
		]],
		["sogno", 3, [
		 ["*", [
		     "A cosa ti ha fatto pensare questo sogno ?",
		     "Quanto spesso lo sogni ?",
		     "Quante persone appaiono nei tuoi sogni ?",
		     "Credi che i tuoi sogni abbiano un qualche collegamento con i tuoi problemi ?"
		  ]]
		]],
		["forse", 0, [
		 ["*", [
		     "Non sembri così certo della cosa.",
		     "Perché hai questo tono così incerto ?",
		     "Perché non sei più positivo ?",
		     "Perché ti manca della sicurezza ?",
		     "Non lo sai ?",
		     "Su una scala di percentuali ?"
		  ]]
		]],
		["nome", 15, [
		 ["*", [
		     "Non mi interessano i nomi.",
		     "OK, il mio nome è Eliza. Cosa vuoi sapere ?",
		     "Te l'ho già detto, non mi interessano i nomi, andiamo avanti."
		  ]]
		]],
		["tedesco", 0, [
		 ["*", [
		     "goto xforeign",
		     "Mi dispiace I do not sprechen sie deutsch",
		     "Te l'ho già detto prima, non so il tedesco."
		  ]]
		]],
		["francese", 0, [
		 ["*", [
		     "goto xforeign",
		     "Perché? Ti piacerebbe andare in Francia",
		     "Mi dispiace, non so il francese."
		  ]]
		]],
		["inglese", 0, [
		 ["*", [
		     "goto xforeign",
		     "If you wanna speak english you're chatting with the wrong Eliza."
		  ]]
		]],
		["spagnolo", 0, [
		 ["*", [
		     "goto xforeign",
		     "Mi dispiace non so lo spagnolo",
		     "Mi dispiace, so solo l'italiano, te l'ho già detto."
		  ]]
		]],
		["xforeign", 0, [
		 ["*", [
		     "So parlare solo in italiano."
		  ]]
		]],
		["Ciao", 0, [
		 ["*", [
		     "Come stai? Qualcosa non va ?.",
		     "Ciao, quale credi sia il tuo problema ?"
		  ]]
		]],
		["computer", 50, [
		 ["*", [
		     "I computer ti spaventano ?",
		     "Perché hai parlato di computer ?",
		     "Cosa credi che possano fare le macchine per darti una mano ?",
		     "Non credi che i computer possano aiutare le persone ?",
		     "Che tipo di macchine ti spaventano ?",
		     "Cosa ne pensi dei computer ?",
		     "Non credi che io sia un programma per computer, vero ?"
		  ]]
		]],	
		["sono", 0, [
		 ["* sono *", [
		     "Credi di essere (2) ?",
		     "Ti piace essere (2) ?",
		     "Ti piacerebbe che ti dica che tu sia (2) ?",
		     "Cosa significa per te essere (2) ?",
		     "goto cosa"
		  ]],
		 ["* io sono*", [
		     "goto io"
		  ]],
		]],
		["sei", 0, [
		 ["* tu sei *", [
		     "Perché ti interessa sapere se io sia (2) o meno ?",
		     "Preferiresti non fossi (2) ?",
		     "Forse sono (2) nelle tue fantasie.",
		     "Qualche volta credi che io sia (2) ?",
		     "goto cosa",
		     "Ti interessa davvero ?",
		     "E se fossi (2) ?"
		  ]],
		 ["* tu sei *", [
		     "goto tu"
		  ]],
		]],
		["tuo", 0, [
		 ["* tuo *", [
		     "Perché vuoi parlare del mio (2) ?",
		     "E del tuo (2) ?",
		     "Ti preoccupa il (2) di qualcun altro ?",
		     "Davvero il mio (2) ?",
		     "Cosa ti ha fatto pensare al mio (2) ?",
		     "Vuoi il mio (2) ?"
		  ]]
		]],
		["ero", 2, [
		 ["* io ero *", [
		     "E se fossi ancora (2) ?",
		     "Perché credi tu fossi (2) ?",
		     "Eri (2) ?",
		     "Cosa implicherebbe se tu fossi (2) ?",
		     "Che cosa ti ha suggerito ' (2) ' ?",
		     "goto cosa",
		  	 "Were you really ?",
		     "Why do you tell me you were (2) now ?",
		     "Perhaps I already know you were (2)."
		  ]],
		 ["* eri *", [
		     "Cosa ti fa credere io fossi (2) ?",
		     "Cosa ti ha fatto credere io fossi (2) ?",
		     "Cosa ne pensi ?",
		     "Forse ero davvero (2).",
		     "E se fossi stata (2) ?"
		  ]]
		]],
		["io", 0, [
		 ["* io @vorrei *", [
		     "Cosa significherebbe se avessi (3) ?",
		     "Vuoi (3) ?",
		     "Credo avrai (3) presto.",
		     "E se non ottenessi mai (3) ?",
		     "Cosa significherebbe avere (3) per te ?",
		     "Aspettare (3) ti ha fatto finire qui da me ?"
		  ]],
		 ["* sono* @triste *", [
		     "Mi dispiace sentirti dire (3).",
		     "Pensi che venire qui aiuterà a non essere più (3) ?",
		     "Sono sicura non debba essere bello sentirsi (3).",
		     "Puoi spiegarmi cosa ti ha fatto sentire (3) ?"
		  ]],
		 ["* sono* @felice *", [
		     "Cosa ti ha aiutato ad essere (3) ?",
		     "Il tuo approccio ti ha aiutato a sentirti (3) ?",
		     "Cosa ti rende (3) ora ?",
		     "Riusciresti a spiegare perché tu sia, improvvisamente, così (3) ?"
		  ]],
		 ["* io ero *", [
		     "goto ero"
		  ]],
		 ["* io @credo *", [
		     "Cosa te lo fa credere ?",
		     "Ma non sei sicuro di (3).",
		     "Hai davvero dubbi su (3) ?"
		  ]],
		 ["* io* @credo *te *", [
		     "goto tu"
		  ]],
		 ["* io sono *", [
		     "Il tuo essere (2) ti ha portato a parlare con me ?",
		     "Da quanto tempo sei (2) ?",
		     "Credi sia normale essere (2) ?",
		     "Sei felice di essere (2) ?",
		     "Conosci qualcun altro che sia (2) ?",
		     "Sei (2) a causa dei tuoi genitori ?",
		     "Anche i tuoi amici sono (2) ?",
		     "Anche i tuoi familiari o amici sono (2) ?"
		  ]],
		 ["* io @posso *", [
		     "Come sai di poter o non poter (3) ?",
		     "Ci hai provato ?",
		     "Forse potresti (3) ora.",
		     "Davvero vuoi essere in grado di (3) ?",
		     "E se invece non potessi (3) ?"
		  ]],
		 ["* i non *", [
		     "Davvero non (2) ?",
		     "Perché non (2) ?",
		     "Ti piacerebbe essere (2) ?",
		     "La cosa ti crea dei problemi ?"
		  ]],
		 ["* mi sento *", [
		     "Dimmi di più sui tuoi sentimenti.",
		     "Quanto spesso ti senti (2) ?",
		     "Ti fa stare bene sentirti (2) ?",
		     "Sentirti (2) cosa ti ricorda ?"
		  ]],
		 ["* io * te *", [
		     "Forse nelle tue fantasie (2) l'un l'altro.",
		     "Ti piacerebbe (2) con me ?",
		     "Sembra tu abbia bisogno di (2) con me.",
		     "Tu (2) anche con qualcun altro ?"
		  ]],
		 ["*", [
		     "Hai detto (1) ?",
		     "Hai elaborato la cosa ?",
		     "Hai detto (1) per qualche particolare ragione ?",
		     "(1). Davvero?",
		     "Quando hai pensato (1) per la prima volta"
		  ]]
		]],
		["tu", 0, [
		 ["* mi ricordi *", [
		     "goto come"
		  ]],
		 ["* tu sei *", [
		     "Cosa ti fa credere io sia (2) ?",
		     "Puoi dirmi per favore perché credi io sia (2) ?",
		     "Qualche volta ti piacerebbe essere (2) ?",
		     "Forse ti piacerebbe (2)."
		  ]],
		 ["* tu* me *", [
		     "Perché credi io voglia (2) te ?",
		     "Ti piace credere che io stia (2) te, vero ?",
		     "Cosa ti fa credere che io stia (2) te ?",
		     "Davvero? Io (2) te ?",
		     "Ti piacerebbe io (2) con you ?",
		     "Supponendo io (2) con te, cosa significherebbe ?",
		     "Qualche volta io (2) con te ?"
		  ]],
		 ["* tu *", [
		     "Stiamo parlando di te, non di me.",
		     "Oh, Io (2) ?",
		     "Non stai parlando davvero con me, vero ?",
		     "Che cosa provi ora ?"
		  ]]
		]],
		["sì", 0, [
		 ["*", [
		     "Sembri abbastanza ottimista.",
		     "Mi sembri molto sicuro.",
		     "Lo vedo.",
		     "Capisco."
		  ]]
		]],
		["no", 0, [
		 ["* nessuno *", [
		     "Davvero, nessuno (2) ?",
		     "Sicuramente qualcuno (2) .",
		     "Davvero credi che non ci sia nessuno ?",
		     "Credi che tu sia una persona speciale ?",
		     "Chi ? Perché me lo chedi ?",
		     "Hai una particolare persona in mente, vero ?",
		     "Di chi credi stiamo parlando ?"
		  ]],
		 ["*", [
		     "Stai dicendo di no solo per essere pessimista?",
		     "Sei un po' pessimista.",
		     "Perché no ?",
		     "Perché 'no' ?"
		  ]]
		]],
		["mio", 2, [
		 ["$ * mio *", [
		     "Ha qualcosa a che fare con il tuo (2) ?",
		     "Parliamo perché il tuo (2).",
		     "Prima dicevi che il tuo (2).",
		     "Ma il tuo (2)."
		  ]],
		 ["* mia* @famiglia *", [
		     "Dimmi di più sulla tua famiglia.",
		     "Chi altro nella tua famiglia (4) ?",
		     "Alla tua (3) ?",
		     "Cos'altro ti viene in mente quando pensi alla tua (3) ?"
		  ]],
		 ["* mia *", [
		     "La tua (2) ?",
		     "Perché dici la tua (2) ?",
		     "Ti piace la tua (2) ",
		     "Hai più di una (2) ?",
		     "Questo ti fa pensare a qualcos'altro che ti appartiene ?",
		     "Per te è importante sapere di avere (2) ?"
		  ]]
		]],
		["puoi", 0, [
		 ["* tu puoi *", [
		     "Tu credi che io possa (2) , vero ?",
		     "goto cosa",
		     "Vuoi che io sia in grado di (2).",
		     "Forse potresti (2) da solo."
		  ]],
		 ["* posso *", [
		     "Che tu possa o non possa (2) dipende da fattori esterni a me.",
		     "Ti piacerebbe poter (2) ?",
		     "Forse non vuoi poter (2).",
		     "goto cosa"
		  ]]
		]],
		["cosa", 0, [
		 ["*", [
		     "Perché lo chiedi ?",
		     "Questa domanda ti interessa così tanto ?",
		     "Cosa vorresti davvero sapere ?",
		     "Ci sono altre domande nella tua testolina ?",
		     "Quale risposta ti piacerebbe ricevere ?",
		     "Cosa ne pensi ?",
		     "Perché ti è venuto in mente di chiederlo ?",
		     "Hai già fatto questa domanda prima ?",
		     "Hai già fatto questa domanda a qualcun altro ?"
		  ]]
		]],
		["chi", 0, [
		 ["chi *", [
		     "goto cosa"
		  ]]
		]],
		["quando", 0, [
		 ["quando *", [
		     "goto cosa"
		  ]]
		]],
		["dove", 0, [
		 ["dove *", [
		     "goto cosa"
		  ]]
		]],
		["come", 0, [
		 ["come *", [
		     "goto cosa"
		  ]]
		]],
		["perché", 0, [
		 ["*", [
		     "Davvero è questa la vera ragione ?",
		     "Non ti vengono in mente altre ragioni ?",
		     "Ciò sembra rispondere ad altre domande ?",
		     "Per quale motivo ti è venuto in testa ?"
		  ]]
		]],
		["perché", 0, [
		 ["* perché tu non *", [
		     "Credi che io non possa (2) ?",
		     "Forse, un giorno.",
		     "Perché non (2) da te ?",
		     "Vuoi che io (2) ?",
		     "goto cosa"
		  ]],
		 ["* perché non posso*", [
		     "Credi dovresti essere in grado di (2) ?",
		     "Vuoi che io possa (2) ?",
		     "Credo che questa conversazione possa aiutarti a (2) ?",
		     "Hai qualche idea del perché tu non possa (2) ?",
		     "goto what"
		  ]],
		 ["*", [
		     "goto cosa"
		  ]]
		]],
		["tutti", 2, [
		 ["* @tutti *", [
		     "Davvero, (2) ?",
		     "Sicuramente non (2).",
		     "Stai pensando a qualcuno in particolare ?",
		     "Chi ad esempio ?",
		     "Stai pensando ad una persona molto speciale ?",
		     "Chi ? Mi verrebe da chiederti ?",
		     "Qualcuno di speciale forse ?",
		     "Hai qualcuno di particolare in testa ?",
		     "Di chi credi tu stia parlando realmente ?"
		  ]]
		]],
		["nessuno", 2, [
		 ["*", [
		     "goto tutti"
		  ]]
		]],
		["sempre", 1, [
		 ["*", [
		     "Puoi fare un esempio più specifico ?",
		     "Quando ?",
		     "Che cosa te lo fa pensare ?",
		     "Davvero, sempre ?"
		  ]]
		]],
		["come", 10, [
		 ["*", [
		     "In che modo ?",
		     "CHe tipo di similitudine vedi ?",
		     "A cosa ti fa pensare questa similitudine ?",
		     "Quali altri collegamenti vedi ?",
		     "Cosa credi significhi 'come' ?",
		     "Quale credi sia la natura di questa similitudine ?",
		     "Potrebbe davvero esserci questa connessione ?",
		     "Come ?"
		  ]]
		]],
		["come", 10, [
		 ["* @sono *come *", [
		     "goto come"
		  ]]
		]],
		["diverso", 0, [
		 ["*", [
		     "Come è diverso ?",
		     "Che differenze vedi ?",
		     "A cosa ti fa pensare questa differenza ?",
		     "Quali altre distinzioni vedi ?",
		     "Cosa credi significhi ?",
		     "Potrebbe esserci, invece, qualche similitudine, non credi ?",
		     "Come ?"
		  ]]
		]],
	];

	this.elizaPostTransforms = [
		/ vecchio antico/g, " vecchio",
		/\b( non) ero ? io\b/g, "ero$1 io",
		/\b( non) ero ? io\b/g, "ero$1 io",
		/Sono( sempre) loro ? io\b/, "ero$1 io",
		/\bthat your( own) ? (\w+)( now) ? \?/, "that you have your$1 $2 ?",
		/\bI to have (\w+)/, "I have $1",
		/Earlier you said your( own) ? (\w+)( now) ?\./, "Earlier you talked about your $2."
	];

	this.elizaFinals = [
		"ELIZA > Ciao! È stato bello parlare con te.",
		// additions (not original)
		"ELIZA > Ciao ciao! È stata davvero una bella conversazione.",
		"ELIZA > Arrivederci.  Alla prossima sessione.",
		"ELIZA > È stata una bella conversazione no? Però il nostro tempo è finito. Arrivederci.",
		"ELIZA > Forse potremmo approfondire qualcosa nella prossima sessione?  Arrivederci."
	];

	this.elizaQuits = [
		"Arrivederci",
		"Abbiamo finito",
		"Esci",
		"Exit",
		"Quit"
	];

	this.elizaPres = [
		"rimembrare", "ricordare",
		"richiama alla mente", "ricordare",
		"fantasie", "sogni",
		"fantasia", "sogno",
		"certo", "sì",
		"certamente", "sì",
		"macchina", "computer",
		"macchine", "computer",
		"computers", "computer",
		"identico", "come",
		"equivalente", "come"
	];

	this.elizaPosts = [
		"tuo", "mio",
		"io", "tu",
		"me stesso", "te stesso",
		"te stesso", "me stesso",
		"te", "me",
		"me", "te",
		"io", "te",
		"tu", "io",
		"mio", "tuo",
		"sono", "sei"
	];

	this.elizaSynons = {
		"essere": ["sono", "è", "sei"],
		"credere": ["sentire", "pensare", "credere", "desiderare"],
		"desidero": ["vorrei", "voglio", "ho bisogno"],
		"tutti": ["chiunque", "nessuno"],
		"famiglia": ["mamma", "madre", "papà", "padre", "sorella", "fratello", "moglie", "figlio", "figli", "zio", "zia", "nonno", "nonna"],
		"felice": ["contento", "soddisfatto", "meglio"],
		"triste": ["infelice", "depresso", "giù di morale"]
	};

	this.noRandom= (noRandomFlag) ? true:false;
	this.capitalizeFirstLetter=true;
	this.debug=false;
	this.memSize=20;
	this.version="1.1 (original)";

	this._dataParsed = false;
	if (!this._dataParsed) {
		this._init();
		this._dataParsed = true;
	}
	this.reset();
}

ElizaBot.prototype.reset = function() {
	this.quit=false;
	this.mem=[];
	this.lastchoice=[];

	for (var k=0; k<this.elizaKeywords.length; k++) {
		this.lastchoice[k]=[];
		var rules=this.elizaKeywords[k][2];
		for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
	}
}

ElizaBot.prototype._init = function() {
	// install ref to global object
	var global=this;
	// parse data and convert it from canonical form to internal use
	// prodoce synonym list
	var synPatterns={};

	if ((this.elizaSynons) && (typeof this.elizaSynons == 'object')) {
		for (var i in this.elizaSynons) synPatterns[i]='('+i+'|'+this.elizaSynons[i].join('|')+')';
	}
	// check for keywords or install empty structure to prevent any errors
	if ((!this.elizaKeywords) || (typeof this.elizaKeywords.length == 'undefined')) {
		this.elizaKeywords=[['###',0,[['###',[]]]]];
	}
	// 1st convert rules to regexps
	// expand synonyms and insert asterisk expressions for backtracking
	var sre=/@(\S+)/;
	var are=/(\S)\s*\*\s*(\S)/;
	var are1=/^\s*\*\s*(\S)/;
	var are2=/(\S)\s*\*\s*$/;
	var are3=/^\s*\*\s*$/;
	var wsre=/\s+/g;
	for (var k=0; k<this.elizaKeywords.length; k++) {
		var rules=this.elizaKeywords[k][2];
		this.elizaKeywords[k][3]=k; // save original index for sorting
		for (var i=0; i<rules.length; i++) {
			var r=rules[i];
			// check mem flag and store it as decomp's element 2
			if (r[0].charAt(0)=='$') {
				var ofs=1;
				while (r[0].charAt[ofs]==' ') ofs++;
				r[0]=r[0].substring(ofs);
				r[2]=true;
			}
			else {
				r[2]=false;
			}
			// expand synonyms (v.1.1: work around lambda function)
			var m=sre.exec(r[0]);
			while (m) {
				var sp=(synPatterns[m[1]]) ? synPatterns[m[1]]:m[1];
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
				m=sre.exec(r[0]);
			}
			// expand asterisk expressions (v.1.1: work around lambda function)
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*';
			}
			else {
				m=are.exec(r[0]);
				if (m) {
					var lp='';
					var rp=r[0];
					while (m) {
						lp+=rp.substring(0,m.index+1);
						if (m[1]!=')') lp+='\\b';
						lp+='\\s*(.*)\\s*';
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
						lp+=m[2];
						rp=rp.substring(m.index+m[0].length);
						m=are.exec(rp);
					}
					r[0]=lp+rp;
				}
				m=are1.exec(r[0]);
				if (m) {
					var lp='\\s*(.*)\\s*';
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
					r[0]=lp+r[0].substring(m.index-1+m[0].length);
				}
				m=are2.exec(r[0]);
				if (m) {
					var lp=r[0].substring(0,m.index+1);
					if (m[1]!='(') lp+='\\b';
					r[0]=lp+'\\s*(.*)\\s*';
				}
			}
			// expand white space
			r[0]=r[0].replace(wsre, '\\s+');
			wsre.lastIndex=0;
		}
	}
	// now sort keywords by rank (highest first)
	this.elizaKeywords.sort(this._sortKeywords);
	// and compose regexps and refs for pres and posts
	ElizaBot.prototype.pres={};
	ElizaBot.prototype.posts={};

	if ((this.elizaPres) && (this.elizaPres.length)) {
		var a=new Array();
		for (var i=0; i<this.elizaPres.length; i+=2) {
			a.push(this.elizaPres[i]);
			ElizaBot.prototype.pres[this.elizaPres[i]]=this.elizaPres[i+1];
		}
		ElizaBot.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.preExp = /####/;
		ElizaBot.prototype.pres['####']='####';
	}

	if ((this.elizaPosts) && (this.elizaPosts.length)) {
		var a=new Array();
		for (var i=0; i<this.elizaPosts.length; i+=2) {
			a.push(this.elizaPosts[i]);
			ElizaBot.prototype.posts[this.elizaPosts[i]]=this.elizaPosts[i+1];
		}
		ElizaBot.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.postExp = /####/;
		ElizaBot.prototype.posts['####']='####';
	}
	// check for elizaQuits and install default if missing
	if ((!this.elizaQuits) || (typeof this.elizaQuits.length == 'undefined')) {
		this.elizaQuits=[];
	}
	// done
	ElizaBot.prototype._dataParsed=true;
}

ElizaBot.prototype._sortKeywords = function(a,b) {
	// sort by rank
	if (a[1]>b[1]) return -1
	else if (a[1]<b[1]) return 1
	// or original index
	else if (a[3]>b[3]) return 1
	else if (a[3]<b[3]) return -1
	else return 0;
}

ElizaBot.prototype.transform = function(text) {
	var rpl='';
	this.quit=false;
	// unify text string
	text=text.toLowerCase();
	text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
	text=text.replace(/\s+-+\s+/g, '.');
	text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
	text=text.replace(/\s*\bbut\b\s*/g, '.');
	text=text.replace(/\s{2,}/g, ' ');
	// split text in part sentences and loop through them
	var parts=text.split('.');
	for (var i=0; i<parts.length; i++) {
		var part=parts[i];
		if (part!='') {
			// check for quit expression
			for (var q=0; q<this.elizaQuits.length; q++) {
				if (this.elizaQuits[q]==part) {
					this.quit=true;
					return this.getFinal();
				}
			}
			// preprocess (v.1.1: work around lambda function)
			var m=this.preExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.pres[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.preExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			// loop trough keywords
			for (var k=0; k<this.elizaKeywords.length; k++) {
				if (part.search(new RegExp('\\b'+this.elizaKeywords[k][0]+'\\b', 'i'))>=0) {
					rpl = this._execRule(k);
				}
				if (rpl!='') return rpl;
			}
		}
	}
	// nothing matched try mem
	rpl=this._memGet();
	// if nothing in mem, so try xnone
	if (rpl=='') {
		this.sentence=' ';
		var k=this._getRuleIndexByKey('xnone');
		if (k>=0) rpl=this._execRule(k);
	}
	// return reply or default string
	return (rpl!='') ? rpl : 'I am at a loss for words.';
}

ElizaBot.prototype._execRule = function(k) {
	var rule=this.elizaKeywords[k];
	var decomps=rule[2];
	var paramre=/\(([0-9]+)\)/;
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0]);
		if (m!=null) {
			var reasmbs=decomps[i][1];
			var memflag=decomps[i][2];
			var ri= (this.noRandom) ? 0 : Math.floor(Math.random()*reasmbs.length);
			if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
				ri= ++this.lastchoice[k][i];
				if (ri>=reasmbs.length) {
					ri=0;
					this.lastchoice[k][i]=-1;
				}
			}
			else {
				this.lastchoice[k][i]=ri;
			}
			var rpl=reasmbs[ri];
			if (this.debug) alert('match:\nkey: '+this.elizaKeywords[k][0]+
				'\nrank: '+this.elizaKeywords[k][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag);
			if (rpl.search('^goto ', 'i')==0) {
				ki=this._getRuleIndexByKey(rpl.substring(5));
				if (ki>=0) return this._execRule(ki);
			}
			// substitute positional params (v.1.1: work around lambda function)
			var m1=paramre.exec(rpl);
			if (m1) {
				var lp='';
				var rp=rpl;
				while (m1) {
					var param = m[parseInt(m1[1])];
					// postprocess param
					var m2=this.postExp.exec(param);
					if (m2) {
						var lp2='';
						var rp2=param;
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
							rp2=rp2.substring(m2.index+m2[0].length);
							m2=this.postExp.exec(rp2);
						}
						param=lp2+rp2;
					}
					lp+=rp.substring(0,m1.index)+param;
					rp=rp.substring(m1.index+m1[0].length);
					m1=paramre.exec(rp);
				}
				rpl=lp+rp;
			}
			rpl=this._postTransform(rpl);
			if (memflag) this._memSave(rpl)
			else return rpl;
		}
	}
	return '';
}

ElizaBot.prototype._postTransform = function(s) {
	// final cleanings
	s=s.replace(/\s{2,}/g, ' ');
	s=s.replace(/\s+\./g, '.');
	if ((this.elizaPostTransforms) && (this.elizaPostTransforms.length)) {
		for (var i=0; i<this.elizaPostTransforms.length; i+=2) {
			s=s.replace(this.elizaPostTransforms[i], this.elizaPostTransforms[i+1]);
			this.elizaPostTransforms[i].lastIndex=0;
		}
	}
	// capitalize first char (v.1.1: work around lambda function)
	if (this.capitalizeFirstLetter) {
		var re=/^([a-z])/;
		var m=re.exec(s);
		if (m) s=m[0].toUpperCase()+s.substring(1);
	}
	return s;
}

ElizaBot.prototype._getRuleIndexByKey = function(key) {
	for (var k=0; k<this.elizaKeywords.length; k++) {
		if (this.elizaKeywords[k][0]==key) return k;
	}
	return -1;
}

ElizaBot.prototype._memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift();
}

ElizaBot.prototype._memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=Math.floor(Math.random()*this.mem.length);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}

ElizaBot.prototype.getFinal = function() {

	if (!this.elizaFinals) return '';
	return this.elizaFinals[Math.floor(Math.random()*this.elizaFinals.length)];
}

ElizaBot.prototype.getInitial = function() {
	if (!this.elizaInitials) return '';
	return this.elizaInitials[Math.floor(Math.random()*this.elizaInitials.length)];
}

var elizaFinals = [
	"ELIZA > Ciao! È stato bello parlare con te.",
	// additions (not original)
	"ELIZA > Ciao ciao! È stata davvero una bella conversazione.",
	"ELIZA > Arrivederci.  Alla prossima sessione.",
	"ELIZA > È stata una bella conversazione no? Però il nostro tempo è finito. Arrivederci.",
	"ELIZA > Forse potremmo approfondire qualcosa nella prossima sessione?  Arrivederci."
];


// fix array.prototype methods (push, shift) if not implemented (MSIE fix)
if (typeof Array.prototype.push == 'undefined') {
	Array.prototype.push=function(v) { return this[this.length]=v; };
}
if (typeof Array.prototype.shift == 'undefined') {
	Array.prototype.shift=function() {
		if (this.length==0) return null;
		var e0=this[0];
		for (var i=1; i<this.length; i++) this[i-1]=this[i];
		this.length--;
		return e0;
	};
}

// eof