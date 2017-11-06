public class AnimalLocator{
    public static String getAnimalNameById(Integer x){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + x);
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        Map<String, Object> animal;
        if (res.getStatusCode() == 200) {
        Map<String, Object> results = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
                             animal = (Map<String, Object>) results.get('animal');
            
        

}
        return (String)animal.get('name');
    }
}