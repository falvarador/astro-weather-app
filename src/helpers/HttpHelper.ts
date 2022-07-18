import { HttpError } from "../Models/Types/HttpError";
import { Options } from "../Models/Types/Options";
import { HttpResponse } from "../Models/Types/HttpResponse";

export function HttpHelper() {
  async function customHttpProvider(
    endpoint: string,
    options: Options
  ): Promise<HttpResponse> {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    let { values, error } = {} as HttpResponse;
    const controller = new AbortController();

    try {
      options.signal = controller.signal;
      options.method = options.method || "GET";
      options.headers = options.headers
        ? { ...defaultHeaders, ...options.headers }
        : defaultHeaders;

      options.body = JSON.stringify(options.body) || "";

      if (!options.body) delete options.body;

      setTimeout(() => {
        controller.abort();
      }, options.time ?? 5000);

      const response = await fetch(endpoint, options);

      if (response.ok) {
        (values = await response.json());
      } else {
        Promise.reject({
          error: new Error(response.statusText),
          status: response.status,
          statusText:
            response.statusText ||
            "An error occurred while making the request.",
        } as HttpError);
      }
    } catch (err) {
      return Promise.reject((error = err as HttpError));
    } finally {
      return Promise.resolve({ values, error }) as HttpResponse;
    }
  }

  function httpGet(
    url: string,
    options = {} as Options
  ): Promise<HttpResponse> {
    return customHttpProvider(url, options) as Promise<HttpResponse>;
  }

  function httpPost(url: string, options = {} as Options) {
    options.method = "POST";

    return customHttpProvider(url, options);
  }

  function httpPut(url: string, options = {} as Options) {
    options.method = "PUT";

    return customHttpProvider(url, options);
  }

  function httpDelete(url: string, options = {} as Options) {
    options.method = "DELETE";

    return customHttpProvider(url, options);
  }

  return {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
}
