import {Component, OnInit} from '@angular/core';
import {FlightService, PaginatedFlightResult} from '../shared/services/flight.service';
import {FlightFilter} from '../shared/models/FlightFilter';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  private static PAGE_SIZE = 10;

  pageNum = 1;
  flights: {
    state: 'pending' | 'done' | 'error';
    error?: any;
    data?: PaginatedFlightResult;
  };

  filter: FlightFilter = {};

  constructor(private flightService: FlightService) {
    this.flights = {
      state: 'pending',
    };
  }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getAll({
      ...this.filter,
      offset: (this.pageNum - 1) * FlightsComponent.PAGE_SIZE,
      limit: FlightsComponent.PAGE_SIZE
    }).subscribe(
      (data) => {
        this.flights = {
          ...this.flights,
          state: 'done',
          data
        };
        console.log('new flights:', this.flights.data);
      },
      (error) => {
        this.flights = {
          ...this.flights,
          state: 'error',
          error
        };
        console.log('flight error:', error, this.flights);
      },
    );
  }

  getPageSize(): number {
    return FlightsComponent.PAGE_SIZE;
  }

  getTotalPageCount(): number {
    if (this.flights.state !== 'done') {
      return 1;
    }
    return Math.ceil(this.flights.data.total / FlightsComponent.PAGE_SIZE);
  }

  onFilterChange(filter): void {
    this.pageNum = 1;
    this.filter = filter;
    this.loadFlights();
  }

  onPageNumChange(pageNum): void {
    this.pageNum = pageNum;
    this.loadFlights();
  }

  onSaveCSV(): void {
    this.flightService.getAll({
      ...this.filter,
      offset: 0,
      limit: this.flights.data.total
    }).subscribe(
      (data) => {
        this.flightService.saveFlightsAsCSV(data.results);
      },
      (error) => {
        console.log('something went wrong generating CSV', error);
      },
    );

  }

}
