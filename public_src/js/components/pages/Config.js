var App = require("app");
var React = App.libs.React;

var ConfigService = App.ServicesContainer.get("Config");

var Config = React.createClass({
    mixins: [App.components.mixins.LinkedState],

    getInitialState: function () {
        "use strict";

        return {
            data: {
                orgName: "",
                override: 1
            }
        };
    },

    render: function () {
        "use strict";

        return (
            <div>
                <div className="jumbotron">
                    <div className="container text-center">
                        <h1>Configure a loja!</h1>
                        <p>Nesta página você configura a organização utilizada para disponibilizar os desenvolvedores para locação.</p>
                    </div>
                </div>

                <div className="container">
                    <h2 className="text-center">Preencha as informações abaixo</h2>
                    <form className="form-horizontal col-lg-6 col-lg-offset-3" onSubmit={ this.handleSubmit }>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Nome da organização</label>

                            <div className="col-sm-8">
                                <input className="form-control"
                                       valueLink={ this.linkState("data.orgName") }
                                       required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-8">
                                <input type="submit" className="btn btn-primary btn-lg" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    },

    handleSubmit: function (event) {
        "use strict";

        event.preventDefault();
        ConfigService.post(this.state.data);
    }
});

module.exports = Config;
