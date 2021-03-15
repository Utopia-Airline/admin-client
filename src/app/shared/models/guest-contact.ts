import {Deserializable} from './Deserializable';

export class GuestContact implements Deserializable {
  contactEmail: string;
  contactPhone: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
