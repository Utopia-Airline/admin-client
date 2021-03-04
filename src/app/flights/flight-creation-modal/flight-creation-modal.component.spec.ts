import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCreationModalComponent } from './flight-creation-modal.component';

describe('FlightCreationModalComponent', () => {
  let component: FlightCreationModalComponent;
  let fixture: ComponentFixture<FlightCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightCreationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
