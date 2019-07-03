//require dependency to detect keyboard and mouse movement
var iohook = require('iohook');
//require dependency to send keystrokes back to the computer
let keysender = require('node-key-sender');
//require Jimp
let Jimp = require('jimp');
//require robotjs
let robot = require('robotjs');
//require our pixel class
let pixel = require('./screen/pixel.js');

//constructor
var io = function() {
    this._iohook = iohook;
    this._iohook.on('mousemove', this.getHandler());
    this._iohook.on('mouseclick', this.getHandler());
    this._iohook.on('keydown', this.getHandler());

    //add the handler to keep track of the mouse position
    this.addMouseMoveHandler('_mouseMovementTracker', function(event, io) {
        io._mousePosition.x = event.x;
        io._mousePosition.y = event.y;
    });

    this._keysender = keysender;
};

//build the io prototype
io.prototype = {
    /**
     * @var array An array of handlers for the mouse click event.
     */
    _handlers: {},

    /**
     * @var Object An object to keep track of the current mouse position at all times.
     */
    _mousePosition: {
        x: 0,
        y: 0,
    },

    EVENT_KEY_UP: keysender.BATCH_EVENT_KEY_UP,
    EVENT_KEY_DOWN: keysender.BATCH_EVENT_KEY_DOWN,
    EVENT_KEY_PRESS: keysender.BATCH_EVENT_KEY_PRESS,

    _addHandler: function(handlerType, name, callback) {
        if (!this._handlers.hasOwnProperty(handlerType)) {
            this._handlers[handlerType] = [];
        }

        this._handlers[handlerType][name] = callback;

        console.debug('Added handler: ', handlerType, name, callback);

        return this;
    },

    _removeHandler: function(handlerType, name) {
        if (!this._handlers.hasOwnProperty(handlerType)) {
            return this;
        }

        delete this._handlers[handlerType][name];

        console.debug('Removed handler: ', handlerType, name, callback);

        return this;
    },

    startListening: function() {
        this._iohook.start();
        return this;
    },

    stopListening: function() {
        this._iohook.stop();
        return this;
    },

    addMouseClickHandler: function(name, callback) {
        this._addHandler('mouseclick', name, callback);
        return this;
    },

    removeMouseClickHandler: function(name) {
        this._removeHandler('mouseclick', name);
        return this;
    },

    addMouseMoveHandler: function(name, callback) {
        this._addHandler('mousemove', name, callback);
        return this;
    },

    removeMouseMoveHandler: function(name,) {
        this._removeHandler('mousemove', name);
        return this;
    },

    addKeyDownHandler: function(name, callback) {
        this._addHandler('keydown', name, callback);
        return this;
    },

    removeKeyDownHandler: function(name) {
        this._removeHandler('keydown', name);
        return this;
    },

    getHandler: function() {
        return this._handler.bind(this);
    },

    getMouseX: function() {
        return this._mousePosition.x;
    },

    getMouseY: function() {
        return this._mousePosition.y;
    },

    /**
     * Gets a screen pixel as a pixel object.
     * @param x The x coordinate to get.
     * @param y The y coordinate to get.
     * @returns {pixel} The pixel object for this pixel.
     */
    getScreenPixel: function(x, y) {
        let color = robot.getPixelColor(x, y);
        return new pixel(Jimp.intToRGBA(Jimp.cssColorToHex(color)));
    },

    /**
     * TODO: Finish implementing this
     * This is not implemented yet
     * @param x
     * @param y
     * @param width
     * @param height
     */
    getScreenArea: function(x, y, width, height) {
        let rimg = robot.screen.capture(x, y, width, height);

        var jimg = new Jimp(rimg.width, rimg.height);
        for (var x=0; x<rimg.width; ++x) {
            for (var y=0; y<rimg.height; ++y) {
                var index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
                var r = rimg.image[index];
                var g = rimg.image[index+1];
                var b = rimg.image[index+2];
                var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
                jimg.setPixelColor(num, x, y);
            }
        }

        return jimg;
    },

    _handler: function(event) {
        if (this._handlers.hasOwnProperty(event.type)) {
            for (var name in this._handlers[event.type]) {
                this._handlers[event.type][name](event, this);
            }
        }
    },

    sendKey: function(key) {
        return this._keysender.sendKey(key);
    },

    sendKeySequence: function(keys) {
        this._keysender.startBatch();
        for (let i in keys) {
            if (typeof keys[i][0] == "string") {
                //this is a single key
                this._keysender.batchTypeKey.call(this, keys[i]);
            } else {
                //this is a key combination
                this._keysender.batchTypeCombination.call(this, keys[i]);
            }
        }
        return this._keysender.sendBatch();
    },

    sendKeyCombination: function(keys) {
        return this._keysender.sendCombination(keys);
    }
};

//output io
module.exports = new io();