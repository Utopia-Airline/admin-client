import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceMainComponent } from './customer-service-main.component';

describe('CustomerServiceMainComponent', () => {
  let component: CustomerServiceMainComponent;
  let fixture: ComponentFixture<CustomerServiceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
