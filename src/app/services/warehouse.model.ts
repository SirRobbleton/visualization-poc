export class Warehouse {
  public lat: number;
  public lon: number;
  private imagePath: string;
  public name: string;
  private description: string;
  private usedAbsolute: number;
  private freeAbsolute: number;
  private totalSpace: number;

  constructor (lat: number, lon: number, imagePath: string, name: string, free: number, used: number) {
    this.lon = lon;
    this.lat = lat;
    this.imagePath = imagePath;
    this.name = name;
    this.usedAbsolute = used;
    this.freeAbsolute = free;
    this.totalSpace = Number(free) + Number(used);
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
