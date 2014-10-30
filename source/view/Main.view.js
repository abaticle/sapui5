jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.jsview("view.Main", {

	getControllerName: function () {
		return "view.Main";
	},

	onBeforeShow: function (evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent: function (ctrl) {

		this.page = new sap.m.Page("Main.Page", {

			//Header
			customHeader: new sap.m.Bar({
				contentMiddle: [
                    new sap.m.Label({
						text: "{i18n>APP_NAME}"
					})
                ]
			}),

			//Contenu
			content: [
				new sap.m.List("Main.Menu", {
					inset: true,
					items: [
						new sap.m.StandardListItem("Main.Menu.Page", {
							title: "{i18n>PAGE1}",
							type: sap.m.ListType.Navigation,
							tap: [ctrl.onMenuTap, ctrl]
						})
					]
				})
            ]
		});

		return this.page;
	}
});