import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

@Pipe({
  name: 'flightRoute'
})
export class FlightRoutePipe implements PipeTransform {

  transform(flights: Flight[], origin: string, destination: string): unknown {
    if (origin)
    {
      origin = origin.toUpperCase();
      flights = flights.filter(flight => flight.route.origin.iataId.startsWith(origin));
    }
    if (destination)
    {
      destination = destination.toUpperCase();
      flights = flights.filter(flight => flight.route.destination.iataId.startsWith(destination));
    }
    return flights;
  }

}
