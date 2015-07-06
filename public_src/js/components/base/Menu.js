var App = require("app");
var React = App.libs.React;

var menuItems = [{
    path: "/",
    label: "Home"
}, {
    path: "/devs",
    label: "Desenvolvedores"
}, {
    path: "/config",
    label: "Configurações"
}];

var Menu = React.createClass({
    displayName: "Menu",

    mixins: [App.libs.Router.State],

    render: function () {
        "use strict";

        var self = this;

        return (
            <div>
                <ul className="nav navbar-nav">
                    { menuItems.map(function (item, index) {
                        return (
                            <li key={ "menu-item-" + index }
                                className={ (self.getPathname() === item.path) ? "active" : "" }
                            >
                                <a href={ "#" + item.path }>
                                    { item.label }
                                </a>
                            </li>
                        );
                    }) }
                </ul>
            </div>
        );
    }
});


module.exports = Menu;
