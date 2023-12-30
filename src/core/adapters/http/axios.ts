import axios, { AxiosInstance } from "axios";

export class HTTPAxiosAdapter {
  public client: AxiosInstance;

  constructor(baseURL: string, timeout = 1000) {
    const instance = axios.create({
      baseURL: baseURL,
      timeout: timeout,
    });

    this.client = instance;
  }
}
