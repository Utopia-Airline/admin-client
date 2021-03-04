import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Booking} from '../models/booking';
import {Passenger} from '../models/passenger';
import {FileSaverService} from 'ngx-filesaver';

type BookingJson = {
  rows: Booking[];
  count: number;
};

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private hasError = false;

  constructor(private http: HttpClient, private fileSaver: FileSaverService) {
  }

  totalBookings: number;

  getAllBookings(url: string): Observable<Booking []> {
    return this.http.get<BookingJson>(url).pipe(
      map(rdata => {
        this.totalBookings = rdata.count;
        return rdata.rows.map(data => new Booking().deserialize(data));
      }), catchError(err => {
        console.log('pipe error');
        this.hasError = true;
        return throwError(err);
      }));
  }

  getBookingById(url: string, id: number): Observable<Booking> {
    return this.http.get<Booking>(`${url}/${id}`);
  }

  deleteBookingById(url: string, id: number): Observable<Booking> {
    return this.http.delete<Booking>(`${url}/${id}`);
  }

  updateBookingById(url: string, id: number, payload: Booking): Observable<Booking> {

    return this.http.put<Booking>(`${url}/${id}`, payload);
  }

  postABooking(url: string, payload: Booking): Observable<Booking> {
    return this.http.post<Booking>(url, payload);
  }

  updatePassengerById(url: string, id: number, payload: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${url}/${id}`, payload);
  }

  getCSVRow(booking: Booking): any {
    // tslint:disable-next-line:one-variable-per-declaration
    let userId: any, userPhone: any, userEmail: any, userUsername: any, userGivenName: any, userFamilyName: any;
    // tslint:disable-next-line:one-variable-per-declaration
    let id, totalPrice, flights, passengers, type, guest, agent, user, isActive;
    // tslint:disable-next-line:one-variable-per-declaration
    let guestPhone, guestEmail;
    // tslint:disable-next-line:one-variable-per-declaration
    let agentId, agentPhone, agentEmail, agentUsername, agentGivenName, agentFamilyName;
    let passengerIds;
    let flightIds;
    if (booking) {
      ({id, totalPrice, flights, passengers, type, guest, agent, user, isActive} = booking);
      if (guest) {
        ({phone: guestPhone, email: guestEmail} = guest);
      }
      if (agent) {
        ({
          id: agentId, phone: agentPhone, email: agentEmail,
          username: agentUsername, name: {given: agentGivenName, family: agentFamilyName}
        } = agent);
      }
      if (user) {
        ({
          id: userId, phone: userPhone, email: userEmail,
          username: userUsername, name: {given: userGivenName, family: userFamilyName}
        } = user);
      }
      flightIds = flights?.map(flight => flight.id).join(' | ');
      passengerIds = passengers?.map(passenger => passenger.id).join(' | ');
    }
    const rowObj = {
      Id: id ?? '',
      Type: type ?? '',
      isActive: isActive ?? '',
      'Total Price': totalPrice ?? '',
      'User Id': userId ?? '',
      'User username': userUsername ?? '',
      'User Given Name': userGivenName ?? '',
      'User Family Name': userFamilyName ?? '',
      'User Email': userEmail ?? '',
      'User Phone': userPhone ?? '',
      'Agent Id': agentId ?? '',
      'Agent username': agentUsername ?? '',
      'Agent Given Name': agentGivenName ?? '',
      'Agent Family Name': agentFamilyName ?? '',
      'Agent Email': agentEmail ?? '',
      'Agent Phone': agentPhone ?? '',
      'Guest Email': guestEmail ?? '',
      'Guest Phone': guestPhone ?? '',
      'All flight Ids': flightIds ?? '',
      'All passenger Ids': passengerIds ?? '',
    };
    return rowObj;
  }

  saveBookingsAsCSV(bookings: Booking[], filename = 'bookings'): void {
    const header = Object.keys(this.getCSVRow(new Booking())).join(','); // build header
    const csv = bookings.map(booking => Object.values(this.getCSVRow(booking)).join(','));
    csv.unshift(header);
    const csvArray = csv.join('\r\n');
    const csvBlob = new Blob([csvArray], {type: 'text/csv;charset=utf-8'});
    this.fileSaver.save(csvBlob, `${filename}.csv`);
  }
}
