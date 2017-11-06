public class BankAcct {
    
    private Integer balance = 0;
    public string acctName;
    public string acctType;

public void makeDeposit(Integer deposit){
    
    balance = balance + deposit;
    
}
    public integer getBalance(){
      return balance;
    }
 
}