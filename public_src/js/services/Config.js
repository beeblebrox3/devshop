var App = require("app");
var $ = App.libs.jQuery;

function Config() {
    "use strict";

    this.serviceName = "Config";
    this.basepath = App.Config.get("basepath") + "/config";
}

Config.prototype.post = function (data, onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath,
        type: "POST",
        data: data,
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".post.error", {
                request: data,
                response: response
            });

            if (typeof onError === "function") {
                onError(response, data);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".post", {
                request: data,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, data);
            }
        }
    });
};

App.services.Config = Config;
