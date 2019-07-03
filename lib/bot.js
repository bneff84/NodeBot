let io = require('./io.js');
let actiondispatcher = require('./actiondispatcher.js');
let automation = require('./automation.js');

let bot = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

bot.prototype = {
    data: {
        io: io,

        initialized: false,
        running: false,

        automations: {},
        actions: {},
    },

    init: function() {
        if (this.data.initialized) {
            return this;
        }

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
        console.log('End bot.init: ', bot);
        return this;
    },

    start: function() {
        this.data.running = true;

        //start io listening
        this.getIo().startListening();

        //start automations
        for (var automationName in this.data.automations) {
            this.data.automations[automationName].start();
        }

        return this;
    },

    stop: function() {
        this.data.running = false;

        //stop io listening
        this.getIo().stopListening();

        //stop automations
        for (var automationName in this.data.automations) {
            this.data.automations[automationName].stop();
        }
        return this;
    },

    /**
     * Get this bot's IO object.
     * @returns {io}
     */
    getIo: function() {
        return this.data.io;
    }
};

module.exports = bot;