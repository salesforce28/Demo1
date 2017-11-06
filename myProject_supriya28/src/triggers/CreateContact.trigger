trigger CreateContact on Candidate__c (after insert) {
    
    CreateContactFromCan cc = new CreateContactFromCan();
    
    cc.createContact(Trigger.new);
     
}