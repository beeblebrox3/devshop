var App = require("app");
var React = App.libs.React;
var _ = App.libs._;

var MiniCart = React.createClass({
    render: function () {
        "use strict";

        return (
            <div className="minicart">
                Carrinho: { this.props.cart.items.length }
            </div>
        );
    }
});

module.exports = MiniCart;
