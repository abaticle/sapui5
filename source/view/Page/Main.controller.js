/**
 * Page
 *
 * @class Page.controller
 */
sap.ui.controller("view.Page.Main", {

    onInit: function () {
        this._initContent();
    },

    /**
     * Called just befor showing the page
     *
     * @method onBeforeShow
     */
    onBeforeShow: function () {

    },

    /**
     * Go back to Main page
     *
     * @method onBackTap
     */
    onBackTap: function () {
        sap.ui.getCore().getEventBus().publish("nav", "back");
    },


    /**
     * Initialize content. Update "Page.Main.Text" model
     *
     * @method  _initContent
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