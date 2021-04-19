import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceUserListComponent } from './customer-service-user-list.component';

describe('CustomerServiceUserListComponent', () => {
  let component: CustomerServiceUserListComponent;
  let fixture: ComponentFixture<CustomerServiceUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
