import { Component, Input, OnInit } from '@angular/core';

import { Flight } from "../../shared/models/Flight";

@Component({
  selector: 'app-flight-result-list',
  templateUrl: './flight-result-list.component.html',
  styleUrls: ['./flight-result-list.component.scss']
})
export class FlightResultListComponent implements OnInit {
  @Input() flights: Flight[];
  constructor() { }

  ngOnInit(): void {
  }

}
