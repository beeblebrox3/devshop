var App = require("app");

var ServicesContainer = function () {
    "use strict";

    this.instances = {};
    this.map = {};
};

ServicesContainer.prototype.define = function (serviceName, service, context) {
    "use strict";

    if (!context) {
        context = App;
    }

    if (typeof service === "string") {
        service = App.helpers.object.getFlattened(service, context);
    }

    this.map[serviceName] = service;
};

/**
 * @param {string} serviceName
 */
ServicesContainer.prototype.get = function (serviceName) {
    "use strict";

    if (this.instances.hasOwnProperty(serviceName)) {
        return this.instances[serviceName];
    }

    if (!this.map.hasOwnProperty(serviceName)) {
        throw "Service " + serviceName + " not found";
    }

    this.instances[serviceName] = new this.map[serviceName]();
    return this.instances[serviceName];
};

App.ServicesContainer = new ServicesContainer();
App.ServicesContainer.define("Developers", require("./Developers"));
App.ServicesContainer.define("Config", require("./Config"));
App.ServicesContainer.define("Cart", require("./Cart"));

