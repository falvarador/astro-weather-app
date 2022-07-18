export type Options = {
  body?: string;
  headers: { [key: string]: string };
  method: string;
  signal: AbortSignal;
  time: number;
};
