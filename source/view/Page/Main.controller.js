sap.ui.controller("view.Page.Main", {

    onInit: function () {
        this._initContent();
    },

    onBeforeShow: function () {},

    onBackTap: function () {
        sap.ui.getCore().getEventBus().publish("nav", "back");
    },


    /**
     * Initialize content
     * @return {[type]}
     */
    _initContent: function () {
        Util.getData("demo", null, function (error, data) {
            console.info(data);

            if (error) {
                Util.displayMessage(error.message)
            } else {
                Util.setComponentModelData("Page.Main.Text", data);
            }
        })
    }
});