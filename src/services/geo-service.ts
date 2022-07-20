import { HttpHelper } from "../helpers/HttpHelper";
import { HttpResponse } from "src/Models/Types/HttpResponse";
import { Options } from "src/Models/Types/Options";

const httpHelper = HttpHelper();

export class GeoService {

  async search(value: string): Promise<HttpResponse> {
    return await httpHelper.httpGet(`${import.meta.env.GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${value}`, {
      headers: {
        "X-RapidAPI-Key": `${import.meta.env.GEO_API_KEY}`,
        "X-RapidAPI-Host": `${import.meta.env.GEO_API_HOST}`,
      }
    } as unknown as Options);
  }
}
