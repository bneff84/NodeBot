let NodeBot = require('./lib/NodeBot.js');

let config = require('./config.js');

let bot = new NodeBot(config);

bot.start();