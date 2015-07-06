var App = require("app");
var React = App.libs.React;
var Router = App.libs.Router;
var RouteHandler = Router.RouteHandler;

var Application = React.createClass({
    render: function () {
        "use strict";

        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">DevShop</a>
                        </div>
                        <App.components.base.Menu />
                    </div>
                </nav>

                <RouteHandler />
            </div>
        );
    }
});

App.components.Application = Application;
