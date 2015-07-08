var App = require("app");
var $ = App.libs.jQuery;
var Modal = App.libs.Modal;

/**
 * Automatically show modal with loading message when an ajax
 * request is fired and hide it when the request is complete
 */
(function maskOnAjaxRequests () {
    "use strict";

    var loadingModal = new Modal({
        html: "Um momento, por favor!",
        title: "Carregando...",
        locked: true,
        width: 450,
        height: 120,
        autoDimension: false,
        autoShow: false
    });

    $(document).ajaxSend(function () {
        loadingModal.show();
    });

    $(document).ajaxComplete(function () {
        loadingModal.close();
    });
}());
