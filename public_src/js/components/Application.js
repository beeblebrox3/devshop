var App = require("app");
var React = App.libs.React;
var Router = App.libs.Router;
var RouteHandler = Router.RouteHandler;
var CartService = new App.services.Cart;

var Application = React.createClass({
    displayName: "Application",

    getInitialState: function () {
        "use strict";

        return {
            cart: {
                items: [],
                price: 0,
                discount: 0,
                total_price: 0
            }
        };
    },

    componentDidMount: function () {
        "use strict";

        this.updateCart();
        App.EventManager.subscribeMultiple([
            "Cart.addItem",
            "Cart.delete",
            "Cart.useCupom"
        ], this.updateCartFromEvent);

        console.log('did mount');
    },

    componentWillUnmount: function () {
        "use strict";

        App.EventManager.unsubscribeMultiple([
            "Cart.addItem",
            "Cart.delete",
            "Cart.useCupom"
        ], this.updateCartFromEvent);

        console.log("will unmount");
    },

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

                        <App.components.base.MiniCart
                            cart={ this.state.cart }
                        />
                    </div>
                </nav>

                <RouteHandler cart={ this.state.cart }/>
            </div>
        );
    },

    updateCart: function () {
        "use strict";

        CartService.index(function (cart) {
            this.setState({cart: cart});
        }.bind(this));
    },

    updateCartFromEvent: function (data) {
        "use strict";

        this.setState({cart: data.response});
    }
});

App.components.Application = Application;
