public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads(String name){
        List<List<sObject>> searchList = [FIND :name 
                                          IN All FIELDS 
                                          RETURNING Contact(FirstName,LastName WHERE FirstName LIKE :name OR LastName LIKE :name),
                                          Lead(FirstName,LastName WHERE FirstName LIKE :name OR LastName LIKE :name) 
                                          ];
        return searchList; 
        
        
        
    }

}