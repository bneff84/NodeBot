let Action = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

Action.prototype = {
    data: {
        /**
         * @var {bot} The bot object for this action.
         */
        bot: null,
        initialized: false,
        type: 'keypress',
        keys: '1',
    },

    init: function() {
        //currently nothing
        this.data.initialized = true;
        return this;
    },

    run: function() {
        switch (this.data.type) {
            case "keysequence":
                return this.getBot().getIo().sendKeySequence(this.data.keys);
                break;
            case "keycombination":
                return this.getBot().getIo().sendKeyCombination(this.data.keys);
                break;
            case "keypress":
            default:
                return this.getBot().getIo().io.sendKey(this.data.keys);
                break;
        }
    },

    /**
     * @returns {NodeBot}
     */
    getBot: function() {
        return this.data.bot;
    }
};

module.exports = Action;