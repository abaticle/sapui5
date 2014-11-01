/**
 * Utility class
 *
 * @class Util
 */
var Util = {

    /**
     * Display toast message from language file, or directly the message if not found
     *
     * @method displayMessage
     * @param  {String} Text id from language file
     */
    displayMessage: function (message) {
        sap.m.MessageToast.show(this.getText(message));
    },

    /**
     * Get text from language file. If not found, return textId
     *
     * @method getText
     * @param  {String} textId Text id from language file
     * @return {String} Text from language file
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
     *
     * @method setComponentModelData
     * @param {String} modelId Component id
     * @param {data} data Data of this component model
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
     *
     * @method byId
     * @param  {type} Component id
     * @return {type} SAPUI5 component
     */
    byId: function (id) {
        return sap.ui.getCore().byId(id);
    },

    /**
     * Get data from JSON file
     * @async
     * @method getData
     * @param  {String}   dataName dataName coming from Config.js
     * @param  {String}   param url parameters to be added on the request
     * @param  {Function} callback Return a function with (error, data)
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
     *
     * @method loadStart
     * @param  {String} title Text for box title, if not set "Loading"
     * @param  {String} text Text for box content, if not set "Loading in progress"
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


    /**
     * Remove loading popup
     *
     * @method loadEnd
     */
    loadEnd: function () {
        var busyDialog = sap.ui.getCore().byId("BusyDialog");

        if (busyDialog) {
            busyDialog.close();
        }
    }

}