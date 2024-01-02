interface ILocation {
  postalCode: string;
  street: string;
  city: string;
  stateCode: string;
  latitude: string;
  longitude: string;
}

export interface IGetLocationByCEPPort {
  exec(postalCode: string): Promise<ILocation>;
}
