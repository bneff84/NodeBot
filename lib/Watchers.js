let watcherPixel = require('./Watchers/Pixel.js');

let watchers = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

watchers.prototype = {
    data: {
        running: false,
        initialized: false,
        watchers: {},
        /**
         * The polling rate (in ms) representing the interval used to check the watchers for changes.
         */
        pollingRate: 1000,
        /**
         * The actions to invoke if this condition is met (will be queued in order)
         */
        actions: [],
    },

    init: function() {
        console.debug('watchers.init: ', this);
        for (let watcherName in this.data.watchers) {
            let watcherData = this.data.watchers[watcherName];
            watcherData.bot = this.data.bot;
            switch (watcherData.type) {
                case 'pixel':
                default:
                    this.data.watchers[watcherName] = new watcherPixel(watcherData);
                    break;
            }
        }
        this.data.initialized = true;
        return this;
    },

    start: function() {
        this.data.running = true;
        this._timeout = setTimeout(this.check.bind(this), this.data.pollingRate);
        return this;
    },

    stop: function() {
        clearTimeout(this._timeout);
        this.data.running = false;
        return this;
    },

    check: function() {
        if (!this.data.running) {
            return;
        }

        //if any of the watchers are failing, don't run the actions
        for (let watcherName in this.data.watchers) {
            if (!this.data.watchers[watcherName].check()) {
                this.start();
                return;
            }
        }

        this.doActions();
    },

    doActions: function() {
        this.data.bot.actiondispatcher.queueActions(this.data.actions);
        this.start();
    }
};

module.exports = watchers;