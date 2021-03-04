import {Deserializable} from './Deserializable';

export class Route implements Deserializable {
  id: number;
  origin: {
    iataId: string,
    name: string,
    city: string,
    country: string,
    timezone: number,
    coords: {
      latitude: number,
      longitude: number,
      altitude: number
    }
  };
  // originId: string;
  // destinationId: string;
  destination: {
    iataId: string,
    name: string,
    city: string,
    country: string,
    timezone: number,
    coords: {
      latitude: number,
      longitude: number,
      altitude: number
    }
  };
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
