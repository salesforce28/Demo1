public class NewCaseListController {
    
    public List<Case> getNewCases(){
       
        List<Case> allNewCases = [SELECT ID, CaseNumber, Subject
                                  FROM   Case 
                                  WHERE  Status = 'New' ];
        return allNewCases;
        
    }
}