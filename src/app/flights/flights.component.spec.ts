import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FlightsComponent} from './flights.component';
import {DebugElement} from '@angular/core';
import {FlightService, PaginatedFlightResult} from '../shared/services/flight.service';
import {Observable, of, throwError} from 'rxjs';
import {FlightFilter} from '../shared/models/FlightFilter';
import {Flight} from '../shared/models/Flight';
import {By} from '@angular/platform-browser';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlightSearchFormComponent} from './flight-search-form/flight-search-form.component';
import {FlightResultListComponent} from './flight-result-list/flight-result-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlightCreationModalComponent} from './flight-creation-modal/flight-creation-modal.component';
import {PaginationComponent} from '../shared/components/pagination/pagination.component';
import {FlightResultItemComponent} from './flight-result-list/flight-result-item/flight-result-item.component';
import {results, total} from './mock-flights.json';
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';


describe('FlightsComponent load with data first page and limit:10', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let de: DebugElement;
  let flightService: FlightService;
  let spy: jasmine.Spy;
  let flights: PaginatedFlightResult;
  const PAGE_SIZE = 10;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightsComponent, FlightSearchFormComponent, FlightResultListComponent,
        FlightResultItemComponent, FlightCreationModalComponent, PaginationComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FlightService]
    })
      .compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    flightService = de.injector.get(FlightService);
    flights = {
      results: results.slice(0, 10).map(obj => new Flight().deserialize(obj)),
      offset: 0,
      total,
      count: 10
    };
    spy = spyOn(flightService, 'getAll').and.returnValue(of(flights));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have label with `search bar`', () => {
    expect(de.nativeElement.querySelector('app-flight-search-form').innerText).toContain('ARRIVAL AIRPORT');
  });
  it('should have label with `ARRIVAL AIRPORT`', () => {
    expect(de.queryAll(By.css('.form-label'))[2].nativeElement.innerText).toBe('ARRIVAL AIRPORT');
  });

  it('getAll service should return the first 10 flights', async () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.flights.state).toEqual('done');
    expect(component.flights.data.count).toEqual(flights.count);
    expect(component.flights.data.offset).toEqual(flights.offset);
    expect(component.flights.data.total).toEqual(flights.total);
    expect(component.flights.data.results).toEqual(flights.results);
  });
});

describe('FlightsComponent load with data second page and limit:10', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let de: DebugElement;
  let flightService: FlightService;
  let spy: jasmine.Spy;
  let flights: PaginatedFlightResult;
  const PAGE_SIZE = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightsComponent, FlightSearchFormComponent, FlightResultListComponent,
        FlightResultItemComponent, FlightCreationModalComponent, PaginationComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FlightService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    flightService = de.injector.get(FlightService);
    component.pageNum = 2;
    flights = {
      results: results.slice(10, 20).map(obj => new Flight().deserialize(obj)),
      offset: (component.pageNum - 1) * PAGE_SIZE,
      total,
      count: 10
    };
    spy = spyOn(flightService, 'getAll').and.returnValue(of(flights));
    fixture.detectChanges();
  });
  it('getAll service should return the second 10 flights', async () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.flights.state).toEqual('done');
    expect(component.flights.data.count).toEqual(flights.count);
    expect(component.flights.data.offset).toEqual(flights.offset);
    expect(component.flights.data.total).toEqual(flights.total);
    expect(component.flights.data.results).toEqual(flights.results);
  });
});

describe('FlightsComponent load with data last page and limit:10', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let de: DebugElement;
  let flightService: FlightService;
  let spy: jasmine.Spy;
  let flights: PaginatedFlightResult;
  const PAGE_SIZE = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightsComponent, FlightSearchFormComponent, FlightResultListComponent,
        FlightResultItemComponent, FlightCreationModalComponent, PaginationComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FlightService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    flightService = de.injector.get(FlightService);
    component.pageNum = 52;
    flights = {
      results: results.slice(-10, results.length).map(obj => new Flight().deserialize(obj)),
      offset: (component.pageNum - 1) * PAGE_SIZE,
      total,
      count: 10
    };
    spy = spyOn(flightService, 'getAll').and.returnValue(of(flights));
    fixture.detectChanges();
  });
  it('getAll service should return the second 10 flights', async () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.flights.state).toEqual('done');
    expect(component.flights.data.count).toEqual(flights.count);
    expect(component.flights.data.offset).toEqual(flights.offset);
    expect(component.flights.data.total).toEqual(flights.total);
    expect(component.flights.data.results).toEqual(flights.results);
    console.log('flights ff', flights);
    console.log('flights component results', component.flights);
  });
});

describe('FlightsComponent load with data getting a page that does not exist and limit:10', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let de: DebugElement;
  let flightService: FlightService;
  let spy: jasmine.Spy;
  let flights: PaginatedFlightResult;
  const PAGE_SIZE = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightsComponent, FlightSearchFormComponent, FlightResultListComponent,
        FlightResultItemComponent, FlightCreationModalComponent, PaginationComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FlightService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    flightService = de.injector.get(FlightService);
    component.pageNum = 53;
    flights = {
      results: [],
      offset: (component.pageNum - 1) * PAGE_SIZE,
      total,
      count: 0
    };
    spy = spyOn(flightService, 'getAll').and.returnValue(of(flights));
    fixture.detectChanges();
  });
  it('getAll service should return an empty result', async () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.flights.state).toEqual('done');
    expect(component.flights.data.count).toEqual(flights.count);
    expect(component.flights.data.offset).toEqual(flights.offset);
    expect(component.flights.data.total).toEqual(flights.total);
    expect(component.flights.data.results).toEqual(flights.results);
    console.log('flights ff', flights);
    console.log('flights component results', component.flights);
  });
});

describe('FlightsComponent cannot load the data from the server', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let de: DebugElement;
  let flightService: FlightService;
  let spy: jasmine.Spy;
  const PAGE_SIZE = 10;
  let serverError: HttpErrorResponse;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightsComponent, FlightSearchFormComponent, FlightResultListComponent,
        FlightResultItemComponent, FlightCreationModalComponent, PaginationComponent, SpinnerComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FlightService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    flightService = de.injector.get(FlightService);
    serverError = new HttpErrorResponse({status: 504});
    spy = spyOn(flightService, 'getAll').and.returnValue(throwError(serverError));
    fixture.detectChanges();
  });
  it('getAll service should throw an error', async () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(component.flights.state).toEqual('error');
    expect(component.flights.error).toEqual(serverError);
  });
});
