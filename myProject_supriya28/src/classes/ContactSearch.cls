public class ContactSearch {
    public static List<Contact> searchForContacts(String conName, String conCode){
        List<Contact> con = [Select FirstName, LastName from Contact where LastName =:conName and MailingPostalCode=:conCode];
        {
          
        system.debug(con);
        return con;
        }
        
       
    }
        
        
        
        
        
        
        
        

}