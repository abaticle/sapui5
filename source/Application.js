jQuery.sap.declare("Application");
jQuery.sap.require("ApplicationBase");

ApplicationBase.extend("Application", {
    
    init : function() {
	},
	
	main : function() {
		var root = this.getRoot();        
        sap.ui.jsview("app", "view.App").placeAt(root);
	}      
});