import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

const toDate = (date: Date | string) => date instanceof Date ? date : new Date(date);
const floor = (date: Date) => {
  const floored = new Date(date.getTime());
  floored.setHours(0, 0, 0, 0);
  floored.setDate(floored.getDate() + 1);
  return floored;
};
const ceil = (date: Date) => {
  const ceiled = floor(date);
  ceiled.setDate(ceiled.getDate() + 1);
  return ceiled;
};
const isLessThan = (a: Date, b: Date) => a.getTime() < b.getTime();
const isBetween = (date: Date, min: Date, max: Date) => isLessThan(min, date) && isLessThan(date, max);

@Pipe({
  name: 'flightDepartureDate',
  pure: false
})
export class FlightDepartureDatePipe implements PipeTransform {
  transform(flights: Flight[], date1: Date | string, date2: Date | string): Flight[] {
    if (date1 != null && date2 != null)
    {
      const [from, to] = [floor(toDate(date1)), ceil(toDate(date2))];
      return flights.filter(flight => isBetween(flight.departureTime, from, to));
    }
    if (date1 != null && date2 == null)
    {
      const [dayStart, dayEnd] = [floor(toDate(date1)), ceil(toDate(date1))];
      return flights.filter(flight => isBetween(flight.departureTime, dayStart, dayEnd));
    }
    return flights;
  }
}
