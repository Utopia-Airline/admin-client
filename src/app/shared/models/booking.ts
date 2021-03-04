import {Deserializable} from './Deserializable';
import {Passenger} from './passenger';
import {GuestContact} from './guest-contact';

type Flight = {
  id: bigint;
  route: {
    id: number;
    origin: {
      iataId: string;
      name: string;
      city: string;
      country: string;
    };
    destination: {
      iataId: string;
      name: string;
      city: string;
      country: string;
    };
  };
  departureTime: Date;
  arrivalTime?: Date;
  seats: {
    total: number;
    reserved: number;
    booked: number;
    available: number;
    price: number;
  }
};

type User = {

  id: number;
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  name: {
    given: string;
    family: string;
  };
};

export class Booking implements Deserializable {

  public constructor(init?: Partial<Booking>) {
    Object.assign(this, init);
  }

  id: number;
  isActive: boolean;
  // "USER" | "GUEST"
  type: string;
  agent?: User;
  user?: User;
  guest?: GuestContact;
  passengers: Passenger[];
  flights: Flight[];
  totalPrice?: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    try {
      this.passengers = input.passengers.map(passenger =>
        new Passenger().deserialize(passenger));
    } catch (err) {
    }
    return this;
  }
}
