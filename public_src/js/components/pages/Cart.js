var App = require("app");
var React = App.libs.React;

var Cart = React.createClass({
    displayName: "Cart",

    mixins: [App.components.mixins.LinkedState],

    getInitialState: function () {
        "use strict";

        return {
            cupomCode: ""
        };
    },

    render: function () {
        "use strict";

        var self = this;

        return (
            <div className="container page-cart">
                <div className="container">
                    <App.components.base.PurchaseProgress stage={ 1 } />
                </div>

                <h1 className="text-center">Seu carrinho</h1>
                <p></p>

                <div className="panel panel-warning">
                    <div className="panel-body">
                        <form className="form-inline" onSubmit={ this.handleCupomForm }>
                            <div className="form-group">
                                <label>Cupom de desconto: </label>
                                <input className="form-control"
                                       placeholder=""
                                       ref="cupom-code"
                                       valueLink={ this.linkState("cupomCode") }
                                />
                            </div>
                            <input type="submit"
                                   className="btn btn-primary"
                                   value="Usar cupom de desconto"
                            />
                        </form>
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                    <th className="col-md-4">Desenvolvedor</th>
                                    <th className="col-md-2 text-center">Horas contratadas</th>
                                    <th className="col-md-2 text-center">Preço unitário</th>
                                    <th className="col-md-2 text-center">Preço final</th>
                                    <th className="col-md-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.cart.items.map(function (item, index) {
                                    return (
                                        <tr key={ index }>
                                            <td className="col-md-4">
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img className="media-object" src={ item.avatar_url } width="46" />
                                                    </div>
                                                    <div className="media-body">
                                                        <h4 className="media-heading">@{ item.login }</h4>
                                                        <h5>{ item.name }</h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="col-md-2">
                                                <input defaultValue={ item.amount }
                                                       className="form-control"
                                                       type="number"
                                                       ref={ "amount-dev-" + item.login }
                                                />
                                            </td>
                                            <td className="col-md-2 text-right">
                                                R$ { item.price }
                                            </td>
                                            <td className="col-md-2 text-right">
                                                R$ { item.price * item.amount }
                                            </td>
                                            <td className="col-md-2 text-right">
                                                <div className="btn-group">
                                                    <span className="btn btn-default"
                                                          onClick={ self.handleUpdateCartItem.bind(null, item) }
                                                          title="Salvar edição"
                                                    >
                                                        <i className="glyphicon glyphicon-floppy-disk"></i>
                                                    </span>
                                                    <span className="btn btn-danger"
                                                          title="remover desenvolvedor do carrinho"
                                                          onClick={ self.props.handleRemoveItem.bind(null, item) }
                                                    >
                                                        <i className="glyphicon glyphicon-trash"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }) }

                                <tr>
                                    <td colSpan="4">Valor total</td>
                                    <td className="text-right">R$ { this.props.cart.price }</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">Valor do desconto</td>
                                    <td className="text-right">R$ { this.props.cart.discount }</td>
                                </tr>
                                <tr>
                                    <th colSpan="4">Valor a pagar</th>
                                    <th className="text-right">R$ { this.props.cart.total_price }</th>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center">
                            <span
                               className="btn btn-success btn-lg"
                               onClick={ this.props.handleBuy }
                            >
                                Finalizar
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    handleUpdateCartItem: function (item) {
        "use strict";

        this.props.updateCartItem({
            login: item.login,
            amount: this.refs["amount-dev-" + item.login].getDOMNode().value
        });
    },

    handleCupomForm: function (event) {
        "use strict";

        event.preventDefault();
        this.props.handleCupom(this.state.cupomCode);
    }
});

module.exports = Cart;
