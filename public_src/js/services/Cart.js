var App = require("app");
var RestInterface = require("./RestInterface");
var $ = App.libs.jQuery;

function Cart() {
    "use strict";

    this.serviceName = "Cart";
    this.basepath = App.Config.get("basepath") + "/cart";
}

Cart.prototype.index = RestInterface.prototype.index;

Cart.prototype.put = function (data, onSuccess, onError) {
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

Cart.prototype.delete = function (data, onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath + "/" + data.login,
        type: "DELETE",
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".delete.error", {
                request: data,
                response: response
            });

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

Cart.prototype.useCupom = function (code, onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath + "/apply-cupom",
        type: "DELETE",
        data: {"cupom": code},
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".useCupom.error", {
                request: code,
                response: response
            });

            if (typeof onError === "function") {
                onError(response, code);
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".useCupom", {
                request: code,
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, code);
            }
        }
    });
};

Cart.prototype.buy = function (onSuccess, onError) {
    "use strict";

    var self = this;

    $.ajax({
        url: self.basepath + "/buy",
        type: "POST",
        dataType: "json",
        error: function (response) {
            App.EventManager.notify(self.serviceName + ".buy.error", {
                request: {},
                response: response
            });

            if (typeof onError === "function") {
                onError(response, {});
            }
        },
        success: function (response) {
            App.EventManager.notify(self.serviceName + ".buy", {
                request: {},
                response: response
            });

            if (typeof onSuccess === "function") {
                onSuccess(response, {});
            }
        }
    });
};

App.services.Cart = Cart;
