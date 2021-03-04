import {Deserializable} from './Deserializable';

export class GuestContact implements Deserializable {
  email: string;
  phone: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
