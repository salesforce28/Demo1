trigger AccountAddressTrigger on Account (before insert,before update) {
    
    for(Account a :Trigger.new){
    
    if(a.Match_Billing_Address__c == True && a.BillingPostalCode != Null){
        
         a.ShippingPostalCode = a.BillingPostalCode;
        
    }
    }

}