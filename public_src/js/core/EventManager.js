var App = require("app");

function debug(message) {
    "use strict";

    if (App.Config.get("debug") === true) {
        console.log(message);
    }
}

var EventManager = function () {
    "use strict";

    var map = {};

    return {
        subscribe: function (eventName, fn) {
            if (typeof eventName !== "string") {
                throw "eventName must be string";
            }

            if (!eventName.length) {
                throw "eventName cannot be empty";
            }

            if (!map.hasOwnProperty(eventName)) {
                map[eventName] = [];
            }

            map[eventName].push(fn);
            debug("subscribed to " + eventName);
        },

        subscribeMultiple: function (eventsNames, fn) {
            var i, length = eventsNames.length;

            for (i = 0; i < length; i++) {
                this.subscribe(eventsNames[i], fn);
            }
        },

        unsubscribe: function (eventName, fn) {
            if (!map.hasOwnProperty(eventName)) {
                debug("failed to unsubscribe to " + eventName);
                return;
            }

            var index = map[eventName].indexOf(fn);
            if (index !== -1) {
                delete map[eventName][index];
            }
            debug("unsubscribed to " + eventName);
        },

        unsubscribeMultiple: function (eventsNames, fn) {
            var i, length = eventsNames.length;
            for (i = 0; i < length; i++) {
                this.unsubscribe(eventsNames[i], fn);
            }
        },

        notify: function (eventName) {
            debug(eventName + " fired!");
            if (!map.hasOwnProperty(eventName)) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            map[eventName].forEach(function (fn) {
                fn.apply(this, args);
            });
        }
    };
};

module.exports = EventManager;
