var App = require("app");
var React = App.libs.React;
var Link = App.libs.Router.Link;

var Home = React.createClass({
    displayName: "Home",

    render: function () {
        "use strict";

        return (
            <div className="jumbotron">
                <div className="container text-center">
                    <h1>Bem vindo à DevShop</h1>
                    <h2>A melhor empresa de locação de desenvolvedores do Brasil :)</h2>

                    <p>
                        <Link className="btn btn-primary btn-lg" to="devslist" role="button">Começar</Link>
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = Home;
