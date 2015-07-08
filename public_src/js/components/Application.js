var App = require("app");
var React = App.libs.React;
var Router = App.libs.Router;
var RouteHandler = Router.RouteHandler;
var CartService = new App.services.Cart();
var NotificationSystem = App.libs.NotificationSystem;

var Application = React.createClass({
    displayName: "Application",

    mixins: [App.libs.Router.Navigation],

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
        this._notificationSystem = this.refs.notificationSystem;

        App.EventManager.subscribeMultiple([
            "Cart.addItem",
            "Cart.delete",
            "Cart.useCupom",
            "Cart.buy"
        ], this.updateCartFromEvent);

        App.EventManager.subscribeMultiple([
            "Cart.addItem.error",
            "Cart.delete.error",
            "Cart.useCupom.error",
            "Cart.buy.error"
        ], this.notifyError);

        App.EventManager.subscribe("Config.post", function () {
            this._addNotification("Organização importada com sucesso!", "success");
        }.bind(this));
        App.EventManager.subscribe("Config.post.error", function () {
            this._addNotification("Ops! Falha ao importar organização :( Verifique se o nome está correto!", "error");
        }.bind(this));
    },

    componentWillUnmount: function () {
        "use strict";

        App.EventManager.unsubscribeMultiple([
            "Cart.addItem",
            "Cart.delete",
            "Cart.useCupom",
            "Cart.buy"
        ], this.updateCartFromEvent);

        App.EventManager.unsubscribeMultiple([
            "Cart.addItem.error",
            "Cart.delete.error",
            "Cart.useCupom.error",
            "Cart.buy.error"
        ], this.notifyError);

        App.EventManager.unsubscribeAll([
            "Config.post",
            "Config.post.error"
        ]);
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

                <NotificationSystem ref="notificationSystem" />

                <RouteHandler
                    cart={ this.state.cart }
                    updateCartItem={ this.updateCartItem }
                    handleRemoveItem={ this.handleRemoveItem }
                    handleBuy={ this.handleBuy }
                    handleCupom={ this.handleCupom }
              />
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
        this._addNotification(
            "Seu carrinho foi atualizado com sucesso!",
            "success"
        );
    },

    updateCartItem: function (item) {
        "use strict";

        CartService.put({items: [item]});
    },

    handleRemoveItem: function (item) {
        "use strict";

        CartService.delete(item);
    },

    handleBuy: function() {
        "use strict";

        CartService.buy(function () {
            this.transitionTo("thanks");
        }.bind(this));
    },

    handleCupom: function (cupomCode) {
        "use strict";

        CartService.useCupom(cupomCode);
    },

    _notificationSystem: null,

    _addNotification: function (message, level) {
        "use strict";

        this._notificationSystem.addNotification({
            message: message,
            level: level
        });
    },

    notifyError: function () {
        "use strict";

        this._addNotification(
            "Ops! Algo deu errado com sua última solicitação. Tente novamente mais tarde",
            "error"
        );
    }
});

App.components.Application = Application;
