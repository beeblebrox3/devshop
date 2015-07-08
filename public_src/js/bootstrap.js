var App = require("./app");

require("./config");

var EventManager = require("./core/EventManager");
App.EventManager = new EventManager();

App.libs.jQuery = require("jquery");
App.libs.React = require("react/addons");
App.libs.Router = require("react-router");
App.libs._ = require("lodash");
App.libs.Modal = window.Modal;
App.libs.NotificationSystem = require("react-notification-system");

require("./helpers/index");
require("./services/index");
require("./components/index");
require("./filters");
require("./routes");

module.exports = App;
