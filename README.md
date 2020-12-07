# Eliza 
Traduzione della versione originale, disponibile a [questo link](https://www.masswerk.at/elizabot/), nel linguaggio degli spaghetti e delle pappardelle.

## What is this?

```
======================================================================
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
```

Bot scritto in Javascript basato sullo storico bot di **Joseph Weizenbaum** e sulla implementazione di **Norbert Landsteiner**, per altre informazione fare riferimento a http://masswerk.at/elizabot e http://it.wikipedia.org/wiki/ELIZA

> ELIZA è un Chatterbot scritto nel 1966 da Joseph Weizenbaum che fa la parodia di un terapeuta Rogersiano, in buona parte rispondendo al paziente con domande ottenute dalla riformulazione delle affermazioni del paziente stesso. Così, per esempio, alla frase "Mi fa male la testa" il programma può ribattere con "Perché dici che ti fa male la testa?" oppure la risposta a "Mia madre mi odia" potrebbe essere "Chi altro nella tua famiglia ti odia?" 

## I wanna play
### https://cttynul.github.io/eliza/
#### Enjoy

## Usage

```
var elizabot = require('./elizabot.js');
elizabot.start()          // initializes eliza and returns a greeting message
elizabot.reply(msgtext)   // returns a eliza-like reply based on the message text passed into it
elizabot.bye()            // returns a farewell message
```

## Example output
```
======================================================================
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

ELIZA > Ciao sono Eliza.
TU > Ciao
ELIZA > Come stai? Qualcosa non va ?.
[...]
TU > Sono stanco
ELIZA > Cosa significa per te essere stanco ?
[...]
TU > Sì
ELIZA > Cosa suggeriresti di fare a te stesso?
[...]
TU > Più o meno come dici
ELIZA > In che modo ?
[...]
TU > No
ELIZA > Stai dicendo di no solo per essere pessimista?
[...]
TU > Perché mi fa stare meglio
ELIZA > Adesso stiamo andando a parare da qualche parte, dimmi di più.
[...]
TU > Non proprio
ELIZA > Puoi ripetere per favore?
[...]
ELIZA > Forse potremmo approfondire qualcosa nella prossima sessione?  Arrivederci.
```


