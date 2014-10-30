sap.ui.jsview("view.Page.Main", {

    getControllerName: function () {
        return "view.Page.Main";
    },

    onBeforeShow: function (evt) {
        this.getController().onBeforeShow(evt);
    },

    createContent: function (ctrl) {

        this.page = new sap.m.Page("Page.PageTemplate", {
            customHeader: new sap.m.Bar({
                contentLeft: [
                    new sap.m.Button({
                        icon: "sap-icon://navigation-left-arrow",
                        tap: [ctrl.onBackTap, ctrl]
                    })
                ],
                contentMiddle: [
                    new sap.m.Label({
                        text: "{i18n>PAGE1}"
                    })
                ]
            }),
            content: [
                new sap.m.Label("Page.Main.Text", {
                    text: "{/text}"
                })
            ]
        });

        return this.page;

    }

});