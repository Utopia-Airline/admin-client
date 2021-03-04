import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/shared/models/Flight';

@Component({
  selector: 'app-flight-result-item',
  templateUrl: './flight-result-item.component.html',
  styleUrls: ['./flight-result-item.component.scss']
})
export class FlightResultItemComponent implements OnInit {
  @Input() flight: Flight;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.flight);
  }

}
