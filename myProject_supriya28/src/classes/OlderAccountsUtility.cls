public class OlderAccountsUtility {
    public static void updateOlderAccounts(){
        List<Account> oldAccounts = [SELECT Description 
                                     FROM Account 
                                     ORDER BY CreatedDate
                                     LIMIT 5];
        
        for(Account acct : oldAccounts){
            acct.description = 'Heritage Account';
            }
        update oldAccounts;
    }

}