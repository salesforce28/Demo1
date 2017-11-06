({
	    goToRecord : function(cmp, event, helper) {
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        sObjectEvent.setParams({
            "recordId": cmp.get("v.case.Id"),
            "slideDevName": 'detail'
        })
        sObjectEvent.fire();
    }

})