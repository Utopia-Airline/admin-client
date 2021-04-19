import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServicePageComponent } from './customer-service-page.component';

describe('CustomerServicePageComponent', () => {
  let component: CustomerServicePageComponent;
  let fixture: ComponentFixture<CustomerServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServicePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
