var Util = {

    /**
     * Display toast message from language file, or directly the message if not found
     * @param  {[type]} message
     */
    displayMessage: function (message) {
        sap.m.MessageToast.show(this.getText(message));
    },

    /**
     * Get text from language file. If not found, return textId
     * @param  {[type]} textId
     * @return {[type]} text
     */
    getText: function (textId) {
        var text;

        try {
            text = sap.ui.getCore().getModel("i18n").getProperty(textId);
        } catch (error) {
            text = textId;
        }

        return text;
    },

    /**
     * Set component model with data
     * @param {[type]} Component id
     * @param {[type]} Data for the model
     */
    setComponentModelData: function (modelId, data) {
        var component = this.byId(modelId);
        var model;

        if (component) {
            model = component.getModel();

            if (!model) {
                model = new sap.ui.model.json.JSONModel();
            }

            model.setData(data);

            component.setModel(model);
        }
    },

    /**
     * Shortcut for sap.ui.getCore().byId function
     * @param  {[type]} id
     * @return {[type]} SAPUI5 component
     */
    byId: function (id) {
        return sap.ui.getCore().byId(id);
    },

    /**
     * Get data from distant JSON file
     * @param  {[type]}   dataName coming from Config.js
     * @param  {[type]}   url parameters to be added on the request
     * @param  {Function} callback(error, data)
     */
    getData: function (dataName, param, callback) {

        var ajaxQuery = {};
        var url = "";

        if (config.localMode) {
            url = config.localDomain + config[dataName].url;
        } else {
            url = config.SAPDomain + config[dataName].url;
        }

        if (param !== undefined && param !== null) {
            url += param;
        }

        ajaxQuery = jQuery.ajax(url, {
            dataType: "json",
            async: true
        })

        .done(function (result) {
            callback(null, result);
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            callback({
                "message": textStatus
            }, undefined)
        });

    },

    /**
     * Display loading popup
     * @param  {[type]} title, if not "Loading"
     * @param  {[type]} text, if not "Loading in progress"
     * @return {[type]}
     */
    loadStart: function (title, text) {

        if (!title)
            title = this.getText("LOAD_TITLE");

        if (!text)
            text = this.getText("LOAD_TEXT");

        var busyDialog = sap.ui.getCore().byId("BusyDialog");

        if (!busyDialog) {
            busyDialog = new sap.m.BusyDialog('BusyDialog', {
                text: title,
                title: text
            });
        }

        busyDialog.open();
    },


    /*
     *	Fermeture de la boîte de chargement
     */
    loadEnd: function () {
        var busyDialog = sap.ui.getCore().byId("BusyDialog");

        if (busyDialog) {
            busyDialog.close();
        }
    }

}