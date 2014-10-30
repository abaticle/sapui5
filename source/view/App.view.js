sap.ui.jsview("view.App", {

    getControllerName:function () {
        return "view.App";
    },

    createContent:function (oCon) {

        this.setHeight("100%");
        this.setDisplayBlock(true);

        this.app = new sap.m.App();
        this.app.addPage(sap.ui.jsview("view.Main", "view.Main"));

        return this.app;
    }
});