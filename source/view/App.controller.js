sap.ui.controller("view.App", {

    onInit:function () {

        // init history mgmt
        jQuery.sap.require("jquery.sap.history");
        jQuery.sap.history({
            routes:[
                {
                    path:"page", handler:jQuery.proxy(this.historyPageHandler, this)
                }
            ],
            defaultHandler:jQuery.proxy(this.historyDefaultHandler, this)
        });

        // subscribe to event bus
        var bus = sap.ui.getCore().getEventBus();
        bus.subscribe("nav", "to", this.navToHandler, this);
        bus.subscribe("nav", "to2", this.navTo2Handler, this);
        bus.subscribe("nav", "back", this.navBackHandler, this);

    },

    historyPageHandler:function (params, navType) {
        if (params && params.id) {
            this.navTo(params.id, false, navType, null);
        } else {
            jQuery.sap.log.error("invalid page parameter: " + params);
        }
    },

    historyDefaultHandler:function (navType) {
        /*		this.navTo("view.Main", false, navType, null);*/
        this.navTo("view.Main", false, navType, null);
    },

    navToHandler:function (channelId, eventId, data) {
        if (data && data.id) {
            this.navTo(data.id, true, null, data.data);
        } else {
            jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
        }
    },

    navTo2Handler:function (channelId, eventId, data) {
        if (data && data.id) {
            this.navTo2(data.id, true, null, data.data);
        } else {
            jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
        }
    },

    navBackHandler:function (channelId, eventId, data) {
        jQuery.sap.history.back();
        jQuery.sap.log.info("navBack");
    },

    navToSplit:function (sChannelId, sEventId, oData/*id, writeHistory, navType, viewId*/) {
        var app = this.getView().app,
            sViewName = oData.viewName,
            sViewId = oData.viewId,
            oDataObject = oData.data,
            sNavType = oData.navType,
            oView;

        // if no specific viewId is provided, the navigation id will be used as a viewId. This is used for creating more instances
        // of the same view.
        if (!sViewId) {
            sViewId = sViewName;
        }

        // check param
        if (!sViewId) {
            jQuery.sap.log.error("navTo failed due to insufficient params: " + sViewId);
            return;
        }

        var bMaster = (sViewId.indexOf("view.CreatePO.") !== -1);

        if (sNavType === jQuery.sap.history.NavType.Back) {
            if (bMaster) {
                app.backMaster();
            }
        } else {
            if (!sap.ui.getCore().byId(sViewId)) {
                // this is the lazy loading of views
                jQuery.sap.log.info("now loading view with name '" + sViewName + "'");
                oView = sap.ui.jsview(sViewId, sViewName);
                (bMaster) ? app.addMasterPage(oView) : app.addDetailPage(oView);
            }
            (bMaster) ? app.toMaster(sViewId, oDataObject) : app.toDetail(sViewId, oDataObject);
        }

        // write history
        if (!sNavType && (bMaster || jQuery.device.is.phone)) {
            jQuery.sap.history.addHistory("page", {id:sViewId}, false);
        }

        // log
        jQuery.sap.log.info("navTo '" + sViewId + "' (" + (!sNavType && bMaster) + "," + sNavType + ")");
    },

    navTo:function (id, writeHistory, navType, data) {

        // check param
        if (id === undefined) {
            jQuery.sap.log.error("navTo failed due to missing id");
            return;
        }

        // navigate on app
        var app = this.getView().app;
        if (navType === jQuery.sap.history.NavType.Back) {
            app.backToPage(id);
        } else {
            // lazy load view
            if (app.getPage(id) === null) {
                jQuery.sap.log.info("now loading page '" + id + "'");
                app.addPage(sap.ui.jsview(id, "view." + id));
            }
            app.to(id, data);
        }

        // write history
        if (writeHistory === undefined || writeHistory) {
            jQuery.sap.history.addHistory("page", {id:id}, false);
        }

        // log
        jQuery.sap.log.info("navTo '" + id + "' (" + writeHistory + "," + navType + ")");
    },


    navTo2:function (id, writeHistory, navType, data) {

        // check param
        if (id === undefined) {
            jQuery.sap.log.error("navTo failed due to missing id");
            return;
        }

        // navigate on app
        var app = this.getView().app;
        if (navType === jQuery.sap.history.NavType.Back) {
            app.backToPage(id);
        } else {
            // lazy load view
            if (app.getPage(id) === null) {
                jQuery.sap.log.info("now loading page '" + id + "'");
                app.addPage(sap.ui.jsview(id, "view." + id));
            }
            app.to(id, "flip", data);
        }

        // write history
        if (writeHistory === undefined || writeHistory) {
            jQuery.sap.history.addHistory("page", {id:id}, false);
        }

        // log
        jQuery.sap.log.info("navTo2 '" + id + "' (" + writeHistory + "," + navType + ")");
    }
});