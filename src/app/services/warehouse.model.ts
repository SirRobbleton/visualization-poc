import {Address} from './address.model';

export class Warehouse {
  public lat: number;
  public lon: number;
  private imagePath: string;
  public name: string;
  private description: string;
  private usedAbsolute: number;
  private freeAbsolute: number;
  private totalSpace: number;
  public address: Address;

  constructor (lat: number, lon: number, imagePath: string, name: string, free: number, used: number, address?: Address) {
    this.lon = lon;
    this.lat = lat;
    this.imagePath = imagePath;
    this.name = name;
    this.usedAbsolute = used;
    this.freeAbsolute = free;
    this.totalSpace = Number(free) + Number(used);
    this.address = address;
  }

  public setCapacity (used: number, free: number) {
    this.usedAbsolute = used;
    this.freeAbsolute = free;
  }

  public getCapacity () {
    const capacity = {
      'used': Number(this.usedAbsolute),
      'free': Number(this.freeAbsolute),
      'total': Number(this.totalSpace)
    };

    return capacity;
  }
}
