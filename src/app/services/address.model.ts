export class Address {
  get streetNumber(): string {
    return this._streetNumber;
  }

  get route(): string {
    return this._route;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get postalCode(): string {
    return this._postalCode;
  }
  private _streetNumber: string;
  private _route: string;
  private _city: string;
  private _country: string;
  private _postalCode: string;

  constructor (city: string, streetNumber: string, route: string, country: string, postalCode: string) {
    this._streetNumber = streetNumber;
    this._route = route;
    this._country = country;
    this._postalCode = postalCode;
    this._city = city;
  }
}
