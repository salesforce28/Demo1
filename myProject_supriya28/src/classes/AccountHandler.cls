public class AccountHandler {
    
    public static Account insertNewAccount(string accName){
        
        if(accName !=''){ 
            
                           try{
                                Account a = new Account(Name = accName);
                                insert a;
                                System.debug('Account '+a +' has been created.');
                                return a;
                               }
            
                           catch(Exception e){
                                               System.Debug('Account not created');
                                               return null;
                                              }
                         }
          else
               {  
                return null;
               }
    }
}