var App = require("app");
var RestInterface = require("./RestInterface");
var $ = App.libs.jQuery;

function Cart() {
    "use strict";

    this.serviceName = "cart";
    this.basepath = App.Config.get("basepath") + "/cart";
}

Cart.prototype.index = RestInterface.prototype.index;

Cart.prototype.addItem = function (data, onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath,
        type: "POST",
        data: data,
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".addItem.error", {
                request: data,
                response: response
            });

            if (typeof onError === "function") {
                onError(response, data);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".addItem", {
                request: data,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, data);
            }
        }
    });
};

App.services.Cart = Cart;
