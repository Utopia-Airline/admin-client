import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultItemComponent } from './flight-result-item.component';

describe('FlightResultItemComponent', () => {
  let component: FlightResultItemComponent;
  let fixture: ComponentFixture<FlightResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightResultItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
