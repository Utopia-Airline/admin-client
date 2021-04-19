import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceMessageBoxComponent } from './customer-service-message-box.component';

describe('CustomerServiceMessageBoxComponent', () => {
  let component: CustomerServiceMessageBoxComponent;
  let fixture: ComponentFixture<CustomerServiceMessageBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceMessageBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
