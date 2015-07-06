var App = require("app");
var RestInterface = require("./RestInterface");

var $ = App.libs.jQuery;

function Developers() {
    "use strict";

    this.total = 0;
    this.offset = 0;
    this.pages = 0;
    this.page = 1;
    this.data = [];
}

Developers.prototype = new RestInterface(
    "Developers",
    App.Config.get("basepath") + "/devs"
);

Developers.prototype.constructor = Developers;

Developers.prototype.index = function (config, onSuccess, onError) {
    "use strict";

    var self = this;

    $.getJSON(this.basepath, config, function (data) {
        self.total = data.total;
        self.offset = data.offset;
        self.pages = data.pages;
        self.page = data.page;
        self.data = data.data;

        onSuccess(self.data);
    }).fail(onError);
};

App.services.Developers = Developers;
