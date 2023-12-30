interface ILocation {
  postalCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  stateCode: string;
  IBGECode: string;
}

export interface IGetLocationByCEPPort {
  exec(postalCode: string): Promise<ILocation>;
}
