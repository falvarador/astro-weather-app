import { HttpHelper } from "../helpers/HttpHelper";
import { HttpResponse } from "src/Models/Types/HttpResponse";

const httpHelper = HttpHelper();

export class WeatherService {

  async searchWeather(latitude: string, longitude: string): Promise<HttpResponse> {
    return await httpHelper.httpGet(`${import.meta.env.WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.WEATHER_API_KEY}&units=metric`);
  }

  async searchForecast(latitude: string, longitude: string): Promise<HttpResponse> {
    return await httpHelper.httpGet(`${import.meta.env.WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.WEATHER_API_KEY}&units=metric`);
  }
}
