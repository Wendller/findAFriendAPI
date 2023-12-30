export class LocationRequestError extends Error {
  constructor() {
    super("Http request for postal code returned an error");
  }
}
