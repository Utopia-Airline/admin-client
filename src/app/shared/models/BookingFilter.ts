export interface BookingFilter {
  origin?: string;
  destination?: string;
  isActive?: string;
  limit?: number;
  type?: string;
  sort?: string;
  order?: string;
  gender?: string;
  departureDate?: Date;
}
