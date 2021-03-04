import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchFormComponent } from './flight-search-form.component';

describe('SearchFormComponent', () => {
  let component: FlightSearchFormComponent;
  let fixture: ComponentFixture<FlightSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
