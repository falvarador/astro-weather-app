import { HttpError } from "./HttpError";

export type HttpResponse = {
  error?: HttpError;
  values?: any;
};
