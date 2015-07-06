var App = require("app");
var Config = require("./core/Config");

App.Config = new Config();
App.Config.set("language", "pt-br");

var basepath = window.location.protocol + "//" + window.location.hostname;
var port = window.location.port;
if (port.length) {
    basepath += ":" + port;
}
App.Config.set("basepath", basepath);

App.Config.set("debug", true);
