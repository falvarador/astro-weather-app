export class GeoService {
   searchCities(success, error) {
    this.geo.getCurrentPosition(success, error);
  }
}
