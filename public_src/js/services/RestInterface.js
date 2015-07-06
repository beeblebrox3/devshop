var App = require("app");
var $ = App.libs.jQuery;

/**
 * @param {String} serviceName   name of the service (used to emmit events)
 * @param {String} basepath
 */
function RestInterface(serviceName, basepath) {
    "use strict";

    this.serviceName = serviceName;
    this.basepath = basepath;

    this.collection = {};
}

/**
 * Fetch all items
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.index = function (onSuccess, onError) {
    "use strict";

    $.getJSON(this.basepath, {}, onSuccess).fail(onError);
};

/**
 * Fetch single item
 * @param {String|Number} id
 * @param {Function}      onSuccess
 * @param {Function}      onError
 */
RestInterface.prototype.show = function (id, onSuccess, onError) {
    "use strict";

    $.getJSON(this.basepath + "/" + id, {}, onSuccess).fail(onError);
};

/**
 * Create a new item
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.store = function (data, onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath,
        type: "POST",
        data: {data: data},
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".create.error", {
                request: data,
                response: response
            });

            if (typeof onError === "function") {
                onError(response, data);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".create", {
                request: data,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, data);
            }
        }
    });
};

/**
 * Update a item
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.update = function (data, onSuccess, onError) {
    "use strict";

    var self = this;

    var id = null;
    if (data.hasOwnProperty("id")) {
        id = data.id;
    } else {
        id = this._extractId(data);
    }

    $.ajax({
        url: self.basepath + "/" + id,
        type: "POST",
        data: {data: data, _method: "PUT"},
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".update.error", {
                request: data,
                response: response
            });

            if (typeof onError === "function") {
                onError(response, data);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".update", {
                request: data,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, data);
            }
        }
    });
};

/**
 * Destroy a item
 * @param {Object}   data
 * @param {Function} onSuccess
 * @param {Function} onError
 */
RestInterface.prototype.destroy = function (data, onSuccess, onError) {
    "use strict";

    var self = this;
    var payload = {
        data: data,
        _method: "DELETE",
    };

    var id = null;
    if (data.hasOwnProperty("id")) {
        id = data.id;
    } else {
        id = this._extractId(data);
    }

    $.ajax({
        url: self.basepath + "/" + id,
        type: "POST",
        data: payload,
        dataType: "json",
        error: function (response) {
            if (typeof onError === "function") {
                onError(response, data);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".delete", {
                request: data,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, data);
            }
        }
    });
};

module.exports = RestInterface;
