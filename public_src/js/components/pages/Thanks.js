var App = require("app");
var React = App.libs.React;

var Thanks = React.createClass({
    render: function () {
        "use strict";

        return (
            <div className="container page-cart">
                <div className="jumbotron text-center">
                    <h1>Obrigado :)</h1>
                </div>
            </div>
        );
    }
});

module.exports = Thanks;
