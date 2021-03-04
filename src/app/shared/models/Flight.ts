import {Deserializable} from './Deserializable';
import {Route} from './Route';

export class Flight implements Deserializable {
  id: number;
  routeId: number;
  route: Route;
  airplaneId: number;
  departureTime: Date;
  arrivalTime?: Date;
  seats: {
    total: number;
    reserved?: number;
    booked?: number;
    available: number;
    price: number;
  };
  deserialize(input: any): this {
    const {route, departureTime, ...rest} = input;
    Object.assign(this, rest);
    this.route = new Route().deserialize(route);
    this.departureTime = new Date(departureTime);
    this.departureTime.setFullYear(2021);
    return this;
  }
}
