export type HttpError = {
  error: Error;
  status: number;
  statusText: string;
} & Error;
