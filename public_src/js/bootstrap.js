var App = require("./app");

require("./config");

var EventManager = require("./core/EventManager");
App.EventManager = new EventManager();

App.libs.jQuery = require("jquery");
App.libs.React = require("react/addons");
App.libs.Router = require("react-router");
App.libs._ = require("lodash");

require("./helpers/index");
require("./services/index");
require("./components/index");

require("./routes");

module.exports = App;
