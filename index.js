var elizabot = require('./elizabot.js');

console.log(elizabot.start()) // initializes eliza and returns a greeting message

function say(question) {
  let reply = elizabot.reply(question) // returns a eliza-like reply based on the message text passed into it
  console.log("TU > " + question);
  console.log("ELIZA > " + reply);
  console.log("[...]");
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
