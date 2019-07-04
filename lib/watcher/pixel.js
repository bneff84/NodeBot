let watcherPixel = function(data) {
    this.data = Object.assign(this.data, data);
    this.init();
};

watcherPixel.prototype = {
    data: {
        /**
         * @var {bot}|null The bot object for this watcher.
         */
        bot: null,
        initialized: false,
        /**
         * The comparison method we're using on this pixel
         */
        compareMethod: 'colorEqual',
        /**
         * The RGBA values for the target color
         */
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 255,
        },
        /**
         * The allowable distance from the target color before this event triggers: 0 exact match 1 no match at all
         */
        distance: 0,
        /**
         * The X and Y coordinates of the pixel to watch
         */
        x: 0,
        y: 0,
    },

    init: function() {
        console.debug('watcher.init: ', this);
        this.data.initialized = true;
        return this;
    },

    check: function() {
        let pixel = this.data.bot.data.io.getScreenPixel(this.data.x, this.data.y);
        let diff = pixel.colorDiff(this.data.color);

        switch (this.data.compareMethod) {
            case "colorChange":
                if (diff > this.data.distance) {
                    this.data.color = pixel.getColor();
                    return true;
                }
                break;
            case "colorNotEqual":
                if (diff > this.data.distance) {
                    return true;
                }
                break;
            case "colorEqual":
            default:
                if (diff <= this.data.distance) {
                    return true;
                }
                break;
        }
        return false;
    }
};

module.exports = watcherPixel;