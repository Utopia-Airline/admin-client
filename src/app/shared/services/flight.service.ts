import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {Flight} from '../models/Flight';
import {FlightFilter} from '../models/FlightFilter';
import {FileSaverService} from 'ngx-filesaver';

export interface PaginatedFlightResult {
  total: number;
  offset: number;
  count: number;
  results: Flight[];
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private static parseFlights: OperatorFunction<any, PaginatedFlightResult> = map(({results, ...rest}: any) => ({
    ...rest,
    results: results.map(obj => new Flight().deserialize(obj))
  }));

  constructor(private http: HttpClient, private fileSaver: FileSaverService) {
  }

  getAll(query: FlightFilter & { offset?: number, limit?: number; }): Observable<PaginatedFlightResult> {
    const queryStr = Object.entries(query)
      .filter(([, value]) => value)
      .map((pair) => pair.join('='))
      .join('&');
    return FlightService.parseFlights(this.http.get(environment.flightApiUrl + '?' + queryStr));
  }

  post(flight: any): any {
    return this.http.post(environment.flightApiUrl, flight, {headers: {'Content-Type': 'application/json'}});
  }

  getHeader(): string[] {
    return ['Id', 'Route Id', 'Airplane Id', 'Departure time', 'Arrival time', 'Total seats',
      'Reserved seats', 'Booked seats', 'Available seats', 'Seat price',
      'Origin iata', 'Origin name', 'Origin city', 'Origin country', 'Origin timezone',
      'Destination iata', 'Destination name', 'Destination city', 'Destination country', 'Destination timezone'];
  }

  getCSVRow(flight: Flight): any {
    // tslint:disable-next-line:one-variable-per-declaration
    let destinationIataId, destinationName, destinationCity, destinationCountry, destinationTimezone;
    // tslint:disable-next-line:one-variable-per-declaration
    let originIataId, originName, originCity, originCountry, originTimezone;
    // tslint:disable-next-line:one-variable-per-declaration
    let routeId, origin, destination;
    // tslint:disable-next-line:one-variable-per-declaration
    let total, reserved, booked, available, price;
    // tslint:disable-next-line:one-variable-per-declaration
    let id, airplaneId, arrivalTime, departureTime, seats, route;
    if (flight) {
      ({id, airplaneId, arrivalTime, departureTime, seats, route} = flight);
      if (seats) {
        ({total, reserved, booked, available, price} = seats);
      }
      if (route) {
        ({id: routeId, origin, destination} = route);
      }
      if (origin) {
        ({
          iataId: originIataId,
          name: originName,
          city: originCity,
          country: originCountry,
          timezone: originTimezone
        } = origin);
      }
      if (destination) {
        ({
          iataId: destinationIataId,
          name: destinationName,
          city: destinationCity,
          country: destinationCountry,
          timezone: destinationTimezone
        } = destination);
      }
    }
    const rowObj = {
      id: id ?? '',
      'Route Id': routeId ?? '',
      'Airplane Id': airplaneId ?? '',
      'Departure time': departureTime ?? '',
      'Arrival time': arrivalTime ?? '',
      'Total seats': total ?? '',
      'Reserved seats': reserved ?? '',
      'Booked seats': booked ?? '',
      'Available seats': available ?? '',
      'Seat price': price ?? '',
      'Origin iata': originIataId ?? '',
      'Origin name': originName ?? '',
      'Origin city': originCity ?? '',
      'Origin country': originCountry ?? '',
      'Origin timezone': originTimezone ?? '',
      'Destination iata': destinationIataId ?? '',
      'Destination name': destinationName ?? '',
      'Destination city': destinationCity ?? '',
      'Destination country': destinationCountry ?? '',
      'Destination timezone': destinationTimezone ?? ''
    };
    return rowObj;
  }

  saveFlightsAsCSV(flights: Flight[]): void {
    const header = Object.keys(this.getCSVRow(null)).join(','); // build header
    const csv = flights.map(flight => Object.values(this.getCSVRow(flight)).join(','));
    csv.unshift(header);
    const csvArray = csv.join('\r\n');
    const csvBlob = new Blob([csvArray], {type: 'text/csv;charset=utf-8'});
    this.fileSaver.save(csvBlob, 'flights.csv', 'csv', {autoBom: false});
  }
}
