var App = require("app");
var React = App.libs.React;
var _ = App.libs._;

var MiniCart = React.createClass({
    displayName: "MiniCart",

    getInitialState: function () {
        "use strict";

        return {
            opened: true
        };
    },

    render: function () {
        "use strict";

        return (
            <div className="navbar-text minicart">
                <div className="text-center">
                    Você tem { this.props.cart.items.length } desenvolvedores no seu carrinho
                </div>
            </div>
        );
    }
});

module.exports = MiniCart;
