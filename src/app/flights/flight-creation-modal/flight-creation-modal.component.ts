import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from 'src/app/shared/services/flight.service';

@Component({
  selector: 'app-flight-creation-modal',
  templateUrl: './flight-creation-modal.component.html',
  styleUrls: ['./flight-creation-modal.component.scss']
})
export class FlightCreationModalComponent implements OnInit {
  flightCreationFormControls: FormGroup;
  constructor(private formBuilder: FormBuilder, private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightCreationFormControls = this.formBuilder.group({
      routeId: [
        "",
        Validators.required
      ],
      airplaneId: [
        { value: "1", disabled: true },
        Validators.required
      ],
      departureTime: [
        new Date().toISOString().replace(/:\d+\.\d+Z$/, ""),
        Validators.required
      ],
      reservedSeats: [
        "0",
        Validators.required
      ],
      seatPrice: [
        "200",
        Validators.required
      ]
    });
    this.flightCreationFormControls.valueChanges.subscribe(console.log);
  }

  controlIsInvalid(controlName: string): boolean {
    const control = this.flightCreationFormControls?.get(controlName);
    if (!control) return false;
    return control.invalid && (control.value || control.touched);
  }
  controlValid(controlName: string): boolean {
    const control = this.flightCreationFormControls?.get(controlName);
    if (!control) return false;
    return control.valid && (control.value || control.touched);
  }

  getControlErrors(controlName: string): any {
    const control = this.flightCreationFormControls?.get(controlName);
    if (!control) return {};
    return control.errors;
  }

  onSubmit(e: any) {
    const flight = this.flightCreationFormControls.value;
    flight.airplaneId = 1;
    this.flightService.post(flight).subscribe(
      (res) => {
        //@ts-ignore
        $('#flight-creation-modal').modal('hide');
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
