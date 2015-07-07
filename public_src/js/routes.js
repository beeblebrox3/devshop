var App = require("app");
var React = App.libs.React;
var Route = App.libs.Router.Route;
// var DefaultRoute = App.libs.DefaultRoute;
var DefaultRoute = App.libs.Router.DefaultRoute;

var routes = (
    <Route handler={ App.components.Application }>
        <DefaultRoute handler={ App.components.pages.Home }/>
        <Route name="config" path="config" handler={ App.components.pages.Config } />
        <Route name="devslist" path="devs" handler={ App.components.pages.ListDevs } />
    </Route>
);

App.libs.Router.run(routes, function (Handler) {
    "use strict";

    React.render(
        <Handler />,
        document.body
    );
});
