import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultListComponent } from './flight-result-list.component';

describe('FlightResultListComponent', () => {
  let component: FlightResultListComponent;
  let fixture: ComponentFixture<FlightResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
