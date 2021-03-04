import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Booking } from '../../shared/models/booking';
import { BookingListComponent } from './booking-list.component';
import { DebugElement } from '@angular/core';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { BookingComponent } from '../booking/booking.component';
import { results } from './mock-bookings.json';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookingListComponent Successful', () => {
  let component: BookingListComponent;
  let fixture: ComponentFixture<BookingListComponent>;
  let debug: DebugElement;
  let service: BookingService;
  let spy: jasmine.Spy;
  let expectedBookings: Booking[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BookingListComponent,
        BookingFormComponent,
        BookingComponent,
        PaginationComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [BookingService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    service = debug.injector.get(BookingService);
    expectedBookings = results.map(obj => new Booking().deserialize(obj));
    spy = spyOn(service, 'getAllBookings').and.returnValue(of(expectedBookings));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test if getAllBookings is successful', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.loading).toBeFalsy();
    expect(component.error.isError).toBeFalsy();
    // TODO: check status code as well
    expect(component.bookings).toEqual(expectedBookings);
  });
});

describe('BookingListComponent Unsuccessful', () => {
  let component: BookingListComponent;
  let fixture: ComponentFixture<BookingListComponent>;
  let debug: DebugElement;
  let service: BookingService;
  let spy: jasmine.Spy;
  let expectedBookings: Booking[];
  let serverError: HttpErrorResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BookingListComponent,
        BookingFormComponent,
        BookingComponent,
        PaginationComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [BookingService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    service = debug.injector.get(BookingService);
    expectedBookings = results.map(obj => new Booking().deserialize(obj));
    serverError = new HttpErrorResponse({ status: 504 });
    spy = spyOn(service, 'getAllBookings').and.returnValue(throwError(serverError));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test if getAllBookings is unsuccessful', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.loading).toBeFalsy();
    expect(component.error.isError).toBeTruthy();
    expect(component.error.status).toBeTruthy();
  });
});