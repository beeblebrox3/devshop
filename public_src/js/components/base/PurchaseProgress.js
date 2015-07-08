var App = require("app");
var React = App.libs.React;

var PurchaseProgress = React.createClass({
    displayName: "Timeline",

    getDefaultProps: function () {
        "use strict";

        return {
            stages: [{
                label: "Escolher desenvolvedores",
                path: "devs"
            }, {
                label: "Rever pedido",
                path: "cart"
            }, {
                label: "Pedido concluído",
                path: "thanks"
            }],
            stage: 0
        };
    },

    render: function () {
        "use strict";

        var self = this;

        return (
            <div className="progress purchase-progress">
                { this.props.stages.map(function (stage, index) {
                    var active = self.props.stage >= index;
                    var controller = <span>{ stage.label } </span>;

                    if (active) {
                        controller = (
                            <a href={ "#" + stage.path }>
                                { stage.label }
                            </a>
                        );
                    }
                    return (
                        <div key={ "stage-" + index }
                            className={ "progress-bar stage " + (active ? "progress-bar-success" : "incomplete") }
                        >

                            { controller }
                        </div>
                    );
                }) }
            </div>
        );
    }
});

module.exports = PurchaseProgress;
