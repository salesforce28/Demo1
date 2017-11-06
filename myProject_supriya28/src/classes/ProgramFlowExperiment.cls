public class ProgramFlowExperiment {
    
    public static integer emailCounter = 0;
    
    public void SendEmail(){
        
        emailCounter++;
        
        system.debug('Queuing email to send');
    }
    
    public void SendQueuedEmails(){
        
        system.debug('Sending Queued Mails');
        
    }
    
    public void HandleContactUpdateTrigger(List<Contact> newList,Map<Id,Contact>oldMap){
        
        for(contact ct : newList){
            
            if (ct.OwnerId != oldMap.get(ct.id).OwnerId)
            {
                SendEmail();
            }
            
            SendQueuedEmails();
        }
    }

}