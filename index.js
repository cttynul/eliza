var elizabot = require('./elizabot.js');

elizabot.start() // initializes eliza and returns a greeting message

function say(question) {
  let reply = elizabot.reply(question) // returns a eliza-like reply based on the message text passed into it
  console.log(question);
  console.log(reply);
  console.log('---');
}

say("Ciao")
say("Sono stanco")
say("Sì")
say("Più o meno come dici")
say("No")
say("Perché mi fa stare meglio")
say("Non proprio")

reply = elizabot.bye() // returns a farewell message
console.log(reply);
