public class CreateContactFromCan {

    public void createContact(List<Candidate__c> candsFromTrigger){
        List<Contact> conList = new List<Contact>();

for(Candidate__c currentCandidate : candsFromTrigger)
{
    Contact con = new Contact();
    con.LastName = currentCandidate.Name;
    conList.add(con);
}
        Database.insert(conList);
    }
}