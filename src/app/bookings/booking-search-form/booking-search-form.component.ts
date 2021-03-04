import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {BookingFilter} from '../../shared/models/BookingFilter';


@Component({
  selector: 'app-booking-search-form',
  templateUrl: './booking-search-form.component.html',
  styleUrls: ['./booking-search-form.component.scss']
})
export class BookingSearchFormComponent implements OnInit {

  @Input() bookingFilter: BookingFilter;
  @Output() filterChanged = new EventEmitter<BookingFilter>(true);
  filterBookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterBookingForm = this.formBuilder.group({
      origin: [this.bookingFilter?.origin],
      destination: [this.bookingFilter?.destination],
      isActive: [this.bookingFilter?.isActive],
      limit: [this.bookingFilter?.limit],
      type: [this.bookingFilter?.type],
      sort: [this.bookingFilter?.sort],
    });
    this.filterBookingForm.valueChanges.subscribe(value => {
      // this.buildFilter(value);
      this.filterChanged.emit(this.buildFilter(value));
    });
  }

  search(): void {
    this.filterChanged.emit(this.bookingFilter);
  }

  buildFilter(value: any): BookingFilter {
    const {origin, destination, isActive, limit, type} = value;
    let {sort} = value;
    let order;
    if (sort && sort === 'seatPrice;Desc') {
      sort = 'seatPrice';
      order = 'DESC';
    }
    if (sort && sort === 'departureTime') {
      order = 'DESC';
    }
    this.bookingFilter = {
      origin,
      destination,
      isActive,
      limit,
      type,
      sort,
      order
    };
    return {
      origin,
      destination,
      isActive,
      limit,
      type,
      sort,
      order
      // departureDate: departureDateRange.start ? new Date(departureDateRange.start) : null
    };
  }
}
