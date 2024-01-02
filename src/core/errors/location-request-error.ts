export class LocationRequestError extends Error {
  constructor() {
    super("Search for postal code returned an error");
  }
}
