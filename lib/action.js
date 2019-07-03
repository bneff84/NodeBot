let botaction = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

botaction.prototype = {
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
                return this.data.bot.data.io.sendKeySequence(this.data.keys);
                break;
            case "keycombination":
                return this.data.bot.data.io.sendKeyCombination(this.data.keys);
                break;
            case "keypress":
            default:
                return this.data.bot.data.io.sendKey(this.data.keys);
                break;
        }
    }
};

module.exports = botaction;