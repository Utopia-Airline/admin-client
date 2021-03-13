import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../shared/models/booking';
import {BookingService} from '../../shared/services/booking.service';
import {environment} from '../../../environments/environment';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Passenger} from '../../shared/models/passenger';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  booking: Booking;
  bForm: FormGroup;
  bookingId: number;
  readonly = true;
  loading = false;
  deleted = false;
  error = {isError: false, message: '', status: null};

  constructor(private  route: ActivatedRoute, private bookingService: BookingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => this.bookingId = param.id);
    this.loading = true;
    this.bookingService.getBookingById(environment.bookingApiUrl, this.bookingId)
      .subscribe(booking => {
        console.log(booking);
        booking?.flights.forEach(flight => {
          flight.departureTime = new Date(flight.departureTime);
          flight.arrivalTime = new Date(flight.departureTime);
          flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
        });
        this.booking = booking;
        this.initForm();
        this.loading = false;
      }, error => {
        this.loading = false;
        // this.error = {isError: true, message: error?.error?.message || error?.message, status: error?.status};
        this.error = {isError: true, message: 'No such a booking exists', status: 404};
        console.log('error', error);
      });

  }

  submitUpdate(): void {
    console.log(JSON.stringify(this.booking));
    // this.booking.bookerId = this.booking.id;
    this.bookingService.updateBookingById(environment.bookingApiUrl, this.bookingId, this.booking)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
      }, error => console.log('error:', error));
    this.toggleEditForm();
  }

  deleteBooking(): void {
    // this.booking.bookerId = this.booking.id;
    this.bookingService.deleteBookingById(environment.bookingApiUrl, this.bookingId)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
        this.deleted = true;
      }, error => console.log('error:', error));
  }

  toggleEditForm(): void {
    this.readonly = !this.readonly;
  }

  initForm(): void {
    const {id, isActive, passengers, flights} = this.booking;
    this.bForm = this.fb.group({
      id,
      isActive,
      passengers: this.fb.array([]),
      flights: this.fb.array([])
    });
    passengers.forEach(passenger => {
      const passengerForm = this.fb.group({
        id: passenger?.id,
        name: this.fb.group({
          given: [passenger?.givenName, [Validators.required, Validators.minLength(2)]],
          family: [passenger?.familyName, [Validators.required, Validators.minLength(2)]],
        }),
        dob: [formatDate(passenger?.dob, 'yyyy-MM-dd', 'en', 'UTC'),
          [Validators.required]],
        gender: [{
          value: this.getPassengerGender(passenger?.gender),
          disabled: true
        }, [Validators.required]],
        address: [passenger?.address, [Validators.required, Validators.minLength(7)]],
        editable: false,
        loading: false,
        error: false
      });
      this.getPassengersForms().push(passengerForm);
    });
    // console.log('form:', this.bForm.value);
    this.bForm.valueChanges.subscribe(value => {

    });
  }

  getPassengersForms(): FormArray {
    return this.bForm.get('passengers') as FormArray;
  }

  revertPassengerForm(i: number, passenger: Passenger): void {
    const passengerForm = this.getPassengersForms().at(i);
    passengerForm.patchValue({
      name:
        {given: passenger?.givenName, family: passenger?.familyName},
      dob: formatDate(passenger?.dob, 'yyyy-MM-dd', 'en', 'UTC'),
      gender: this.getPassengerGender(passenger?.gender),
      address: passenger?.address
    });
  }

  getPassengerGender(gender: string): string {
    if (gender.toLowerCase() === 'male') {
      return 'Male';
    } else if (gender.toLowerCase() === 'female') {
      return 'Female';
    } else {
      return 'Other';
    }
  }

  getFlightsForms(): FormArray {
    return this.bForm.get('flights') as FormArray;
  }

  addPassengerForm(): void {
    const passenger = this.fb.group({
      bookingId: this.booking.id,
      name: this.fb.group({
        given: '',
        family: '',
      }),
      dob: '',
      gender: '',
      address: ''
    });
    this.getPassengersForms().push(passenger);
  }

  addFlightForm(): void {
    const flight = this.fb.group({});
    this.getFlightsForms().push(flight);
  }

  deletePassengerForm(i: number): void {
    this.getPassengersForms().removeAt(i);
  }

  deleteFlightForm(i: number): void {
    this.getFlightsForms().removeAt(i);
  }

  toggleEdit(i: number): void {
    const passenger = (this.bForm.get('passengers') as FormArray).at(i);
    const gender = passenger.get('gender');
    const editable = passenger.get('editable');
    editable.patchValue(!editable.value);
    (gender.disabled) ? gender.enable() : gender.disable();
    // this.booking.passengers[i].editable = !this.booking.passengers[i].editable;
  }

  updatePassenger(i: number): void {
    if (this.bForm.valid) {
      this.getPassengersForms().at(i).get('loading').setValue(true);
      const passenger: Passenger = new Passenger(this.bForm.value.passengers[i]);
      passenger.dropEditable();
      console.log('passenger:', passenger);
      const passengerId = passenger.id;
      this.bookingService.updatePassengerById(environment.passengerApiUrl, passengerId, passenger)
        .subscribe(res => {
          this.booking.passengers[i] = new Passenger(res);
          this.getPassengersForms().at(i).get('loading').setValue(false);
        }, error1 => {
          this.getPassengersForms().at(i).get('loading').setValue(false);
          this.getPassengersForms().at(i).get('error').setValue(true);
          console.log('cannot update passenger', passengerId);
        });
    }
    this.toggleEdit(i);
  }

  deletePassenger(i: number): void {
  }

  cancelEdit(i: number): void {
    this.revertPassengerForm(i, this.booking.passengers[i]);
    this.toggleEdit(i);
  }
}
