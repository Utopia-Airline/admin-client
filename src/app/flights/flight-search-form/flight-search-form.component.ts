import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FlightFilter} from '../../shared/models/FlightFilter';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit {
  filterFormControls: FormGroup;
  @Output() filterChanged = new EventEmitter<FlightFilter>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterFormControls = this.formBuilder.group({
      origin: [''],
      destination: [''],
      departureDateRange: this.formBuilder.group({
        start: [''],
        end: [''],
      }),
      sort: ['']
    });
    this.filterFormControls.valueChanges.subscribe((formValues) => {
      this.filterChanged.emit(this.buildFilter(formValues));
    });
  }

  buildFilter(formValues): FlightFilter {
    const {origin, destination, departureDateRange} = formValues;
    let {sort} = formValues;
    let order;
    if (sort && sort === 'seatPrice;Desc') {
      sort = 'seatPrice';
      order = 'DESC';
    }
    if (sort && sort === 'departureTime') {
      order = 'DESC';
    }
    return {
      sort,
      order,
      origin: origin?.toUpperCase(),
      destination: destination?.toUpperCase(),
      departureDate: departureDateRange.start ? new Date(departureDateRange.start.replace(/-/g, '\/')) : null
    };
  }
}
