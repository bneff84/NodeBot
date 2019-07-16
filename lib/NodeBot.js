let Io = require('./Io.js');
let GameState = require('./GameState.js');
let actiondispatcher = require('./ActionDispatcher.js');
let automation = require('./Watchers.js');

class NodeBot {
    constructor(data) {
        this.data = Object.assign({
            initialized: false,
            running: false,

            automations: {},
            actions: {},
        }, data);

        if (this.data.initialized) {
            return this;
        }

        //initialize the IO system
        this.io = new Io(this);

        //initialize the GameState system
        this.gamestate = new GameState(this);

        //initialize automations
        for (let automationName in this.data.automations) {
            let automationData = this.data.automations[automationName];
            automationData.bot = this;
            this.data.automations[automationName] = new automation(automationData);
        }

        //initialize actions & action dispatcher
        this.actiondispatcher = new actiondispatcher({
            bot: this,
            actions: this.data.actions
        });

        this.data.initialized = true;
        console.log('End nodeBot.init: ', this);
        return this;
    }

    start() {
        this.data.running = true;

        //start io listening
        this.io.startListening();

        //start automations
        for (var automationName in this.data.automations) {
            this.data.automations[automationName].start();
        }

        return this;
    }

    stop() {
        this.data.running = false;

        //stop io listening
        this.io.stopListening();

        //stop automations
        for (var automationName in this.data.automations) {
            this.data.automations[automationName].stop();
        }
        return this;
    }
};

module.exports = NodeBot;