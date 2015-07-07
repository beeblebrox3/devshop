var App = require("app");
var React = App.libs.React;

var PurchaseProgress = React.createClass({
    displayName: "Timeline",

    getDefaultProps: function () {
        "use strict";

        return {
            stages: ["Escolher desenvolvedores", "Rever o pedido", "Pedido concluído"],
            currentStage: 0
        };
    },

    render: function () {
        "use strict";

        var self = this;

        return (
            <div className="progress purchase-progress">
                { this.props.stages.map(function (stage, index) {
                    return (
                        <div key={ "stage-" + index }
                            className={ "progress-bar stage " + (self.props.currentStage >= index ? "progress-bar-success" : "incomplete") }
                        >
                            { stage }
                        </div>
                    );
                }) }
            </div>
        );
    },

    _render: function () {
        "use strict";

        var self = this;
        return (
            <div className="purchase-progress-container">
                <ul className="purchase-progress">
                    { this.props.stages.map(function (stage, index) {
                        return (
                            <li className={ "stage" + (self.props.currentStage <= index ? "active" : "") }
                                key={ "stage-" + index }
                            >
                                <span className="stage-name">
                                    { stage }
                                </span>
                            </li>
                        );
                    }) }
                </ul>
            </div>
        );
    }
});

module.exports = PurchaseProgress;
