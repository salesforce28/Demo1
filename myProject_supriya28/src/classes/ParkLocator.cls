public class ParkLocator {
    public static string[] country(String country) {
        ParkService.ParksImplPort park = new ParkService.ParksImplPort();
        return Park.byCountry(country);
    }
}