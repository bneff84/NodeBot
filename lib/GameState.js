const Observable = require('any-observable');

class GameState {
    constructor() {
        this.data = [];
        this._observers = [];
    }

    _onPropertyChange(property, value) {
        if (typeof this._observers[property] != "undefined") {
            this._observers[property].forEach(function(observer) {
                observer.next(value);
            }, this);
        }
    }

    setData(property, value) {
        console.log('setData:', this, property, value);
        this.data[property] = value;
        this._onPropertyChange(property, value);
    }

    subscribe(properties, callback) {
        if (typeof properties == "string" || typeof properties == "number") {
            properties = [properties];
        }

        let self = this;

        let propertyObserver = new Observable(observer => {
            for(let i in properties) {
                let property = properties[i];

                if (typeof self._observers[property] == "undefined") {
                    self._observers[property] = [];
                }

                self._observers[property].push(observer);
            }
        });

        propertyObserver.subscribe(callback.bind(self));
    }
}

module.exports = GameState;