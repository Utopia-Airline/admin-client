import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Booking} from '../../shared/models/booking';
import {BookingService} from '../../shared/services/booking.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  booking: Booking = new Booking();
  bForm: FormGroup;

  constructor(private  fb: FormBuilder, private bookingService: BookingService) {
  }

  initForm(): void {
    this.bForm = this.fb.group({
      isActive: true,
      passengers: this.fb.array([]),
      flights: this.fb.array([])
    });
    this.bForm.valueChanges.subscribe(value => {
      this.booking = {...this.bForm.value};
      // this.booking = new Booking(this.bForm.value);
      console.log(this.booking);
    });
  }

  getPassengersForms(): FormArray {
    return this.bForm.get('passengers') as FormArray;
  }

  getFlightsForms(): FormArray {
    return this.bForm.get('flights') as FormArray;
  }

  addPassengerForm(): void {
    const passenger = this.fb.group({
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

  syncFrom(): void {
  }

  submit(): void {
    this.bookingService.postABooking(environment.bookingApiUrl, this.booking);
  }

  ngOnInit(): void {
    this.initForm();
  }

}
