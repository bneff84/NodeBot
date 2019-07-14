let Jimp = require('jimp');

let pixel = function(data) {
    this.data = data;
};

pixel.prototype = {
    getRed: function() {
        return this.data.r;
    },

    getGreen: function() {
        return this.data.g;
    },

    getBlue: function () {
        return this.data.b;
    },

    getAlpha: function() {
        return this.data.a;
    },

    getColor: function() {
        return {
            r: this.data.r,
            g: this.data.g,
            b: this.data.b,
            a: this.data.a
        }
    },

    colorDiff: function(color) {
        return Jimp.colorDiff(this.data, color);
    }
};

module.exports = pixel;