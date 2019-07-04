let bot = require('./lib/bot.js');

let nodebot = new bot({
    automations: {},
    actions: require('./actions.js'),
});

nodebot.start();