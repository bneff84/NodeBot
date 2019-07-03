let bot = require('./lib/bot.js');

let nodebot = new bot({
    automations: {
        spamOnTarget: {
            watchers: {
                colorWatcher: {
                    type: 'pixel',
                    compareMethod: 'colorEqual',
                    color: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 255
                    },
                    x: 1190,
                    y: 429
                }
            },
            actions: [
                'actionOne'
            ]
        }
    },
    actions: require('actions.js'),
});

nodebot.start();