@isTest
private class ParkLocatorTest {
    @isTest static Void testCallout(){
        
        Test.setMock(WebServiceMock.class, new ParkServiceMock());
        String country = 'India';
        String[] result = ParkLocator.Country(country);
        System.assertEquals(new List<String>{'The Park Calangute Goa', 'The park zoo'}, result);
            
        
    }
    

}