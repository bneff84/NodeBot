let action = require('./Action.js');

let actionDispatcher = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

actionDispatcher.prototype = {
    data: {
        /**
         * @var {NodeBot}|null The bot object for this action dispatcher.
         */
        bot: null,
        /**
         * @var bool Keeps track of whether or not this has been initialized.
         */
        initialized: false,
        /**
         * Keeps track of whether or not the action queue is running.
         */
        running: false,
        /**
         * @var object An object of action objects indexed by name.
         */
        actions: {},
        /**
         * @var array A queue of actions waiting to be executed.
         */
        actionQueue: [],
        /**
         * @var int The delay to wait between executing actions to yield CPU cycles to other methods.
         */
        delay: 10,
    },

    init: function() {
        for (let actionName in this.data.actions) {
            let actionData = this.data.actions[actionName];
            actionData.bot = this.data.bot;
            this.data.actions[actionName] = new action(actionData);
        }
        this.data.initialized = true;
        return this;
    },

    addAction: function(name, action) {
        this.data.actions[name] = action;
        return this;
    },

    removeAction: function(name) {
        delete this.data.actions[name];
        return this;
    },

    //TODO: Make this return a promise
    queueAction: function(actionName) {
        if (typeof this.data.actions[actionName] == "undefined") {
            console.warn('Attempted to call undefined action!', actionName);
            return;
        }

        this.data.actionQueue.push(this.data.actions[actionName]);
        if (!this.data.running) {
            this.processQueue();
        }
        return this;
    },

    //TODO: Make this return a promise
    queueActions: function(actions) {
        for (let i in actions) {
            this.queueAction(actions[i]);
        }
        return this;
    },

    processQueue: function() {
        //if this isn't running yet, set the flag to make it run
        if (!this.data.running) {
            this.data.running = true;
        }

        //if the queue is empty, set this to no longer be running and return
        if (!this.data.actionQueue.length) {
            this.data.running = false;
            return;
        }

        //grab the next queue action
        let action = this.data.actionQueue.shift();

        let dispatcher = this;

        action.run().then(
            //success
            function() {
                setTimeout(dispatcher.processQueue.bind(dispatcher), dispatcher.data.delay);
            },
            //error
            function(err) {
                console.error('There was an error executing the previous action.', err);
                setTimeout(dispatcher.processQueue.bind(dispatcher), dispatcher.data.delay);
            }
        )
    }
};

module.exports = actionDispatcher;