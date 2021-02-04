import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPerCustomerComponent } from './payments-per-customer.component';

describe('PaymentsPerCustomerComponent', () => {
  let component: PaymentsPerCustomerComponent;
  let fixture: ComponentFixture<PaymentsPerCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsPerCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPerCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
