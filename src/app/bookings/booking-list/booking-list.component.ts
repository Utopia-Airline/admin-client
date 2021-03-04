import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../shared/services/booking.service';
import {Booking} from '../../shared/models/booking';
import {PagerService} from '../../shared/services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingFilter} from '../../shared/models/BookingFilter';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = null;
  totalBookings: number;
  pagedBookings: Booking[] = null;
  pager: any = {};
  loading = false;
  page = 1;
  limit = 10;
  filter: BookingFilter;
  error = {isError: false, message: '', status: null};

  constructor(private bookingService: BookingService, private  pagerService: PagerService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  getBookings(): void {
    this.loading = true;
    const url = this.buildUrl(this.page, this.limit);
    console.log('url:', url);
    this.bookingService.getAllBookings(url)
      .subscribe(bookings => {
        console.log('bookings:', bookings);
        bookings.forEach(booking => {
          booking.totalPrice = 0;
          booking?.flights.forEach(flight => {
            booking.totalPrice += flight.seats.price;
            flight.departureTime = new Date(flight.departureTime);
            flight.arrivalTime = new Date(flight.departureTime);
            flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
          });
        });
        this.error.isError = false;
        // failure or no result
        if (!bookings || bookings.length === 0) {
          // this.error = {isError: true, message: 'No Booking found', status: null};
          this.error.isError = true;
          this.error.message = 'No Booking Found';
          this.totalBookings = this.bookingService.totalBookings;
        } else {
          this.bookings = bookings;
          this.totalBookings = this.bookingService.totalBookings;
          this.setPage(this.page);
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = {isError: true, message: 'No Booking Found', status: null};
        console.log(error);
      }, () => {
        this.loading = false;
        console.log('complete');
      });
  }

  navigate(page = 0): void {
    this.router.navigate(['bookings'], {queryParams: {offset: page, ...this.filter}})
      .then(r => console.log('navigated')).catch(err => console.log(err));
  }

  ngOnInit(): void {
    // this.parseQueryParams();
    this.getBookings();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getBookings();
    this.getBookings();
  }

  setPage(page: number): void {
    if (!this.totalBookings || page < 1 || page > this.pager.totalBookings) {
      return;
    }
    this.page = page;
    this.pager = this.pagerService.getPager(this.totalBookings, page, this.limit);
    this.pagedBookings = this.bookings;
  }

  /**
   * parse query parameters
   * @private
   */
  private parseQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const isActive = params.get('isActive');
      const origin = params.get('origin');
      const destination = params.get('destination');
      const type = params.get('type');
      const sort = params.get('sort');
      const order = params.get('order');
      // page size
      let limit = 10;
      if (params.get('limit')) {
        limit = +params.get('limit');
        if (!Number.isInteger(limit)) {
          limit = Math.floor(limit);
        }
        if (limit > 40) {
          limit = 40;
        } else if (limit < 10) {
          limit = 10;
        }
      }
      this.limit = limit;
      // page number
      let page = 1;
      if (params.get('offset')) {
        page = +params.get('offset');
        if (!Number.isInteger(page)) {
          page = Math.floor(page);
        }
        if (page < 1) {
          this.error.isError = true;
          this.error.message = 'No booking found';
          console.log(page);
          return;
        } else if (page > Math.ceil(this.totalBookings / limit)) {
          page = Math.ceil(this.totalBookings / limit);
          this.error.isError = true;
          return;
        }
      }
      // this.filter = {limit, origin, destination, isActive, type, sort, order};
      // const url = this.buildUrl(type, page);
      // this.getBookings(url, page);
    });
  }

  private buildUrl(page: number, limit: number): string {
    const offset = (page - 1) * limit;
    const type = (this.filter?.type && this.filter?.type !== 'ALL') ? `/${this.filter?.type}/` : '';
    let url = `${environment.bookingApiUrl}${type}?offset=${offset}`;
    if (this.filter) {
      for (const [key, value] of Object.entries(this.filter)) {
        if (value) {
          url += `&${key}=${value}`;
        }
      }
    }
    return url;
  }

  onFilterChange(filter): void {
    this.page = 1;
    this.filter = filter;
    this.limit = this.filter.limit ?? this.limit;
    console.log('this.filter', this.filter);
    this.getBookings();
    // this.navigate(1);
  }

  onSaveCSV(): void {
    let url = this.buildUrl(1, this.totalBookings);
    if (!url.includes('limit')) {
      url += `&limit=${this.totalBookings}`;
    }
    console.log('url:', url);
    this.bookingService.getAllBookings(url)
      .subscribe(bookings => {
        bookings.forEach(booking => {
          booking.totalPrice = 0;
          booking?.flights.forEach(flight => {
            booking.totalPrice += flight.seats.price;
            flight.departureTime = new Date(flight.departureTime);
            flight.arrivalTime = new Date(flight.departureTime);
            flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
          });
        });
        this.bookingService.saveBookingsAsCSV(bookings);
      }, error => {
        console.log('something went wrong generating CSV', error);
      });
  }
}
