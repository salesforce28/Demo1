public class HelloWorld {
    
public static void sayYou() {
System.debug( 'You' );
}
    
public void sayMe() {
    HelloWorld hw = new HelloWorld();
hw.sayMe();
System.debug( 'Me' );
}
    

    
}