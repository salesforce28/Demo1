({
	doInit : function(component, event, helper) {
		helper.getContact(component);
	},
    saveCase: function(component, event, helper) {
        if(helper.validateForm(component)) {
            component.set("v.hasErrors", false);
            
            var action = component.get("c.newCaseDB");
            action.setParams({
                "caseObj": component.get("v.newCase"),
                "contactId": component.get("v.contact.Id"),
                "accountId": component.get("v.contact.AccountId")
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if(component.isValid() && state === "SUCCESS") {
                    component.set("v.message", "Case was saved sucessfully!");
                } else if (state === "ERROR") {
                    console.log('Problem saving case, response state: ' + state);
                } else {
                    console.log('Unknown problem, response state: ' + state);
                }
            });
           
			$A.enqueueAction(action);
            
        } else {
            component.set("v.hasErrors", true);
        }    
    }

})