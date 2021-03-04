export interface Users {
  id: number;
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT'
}
