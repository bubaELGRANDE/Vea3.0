import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalComponent } from './paypal.component';

describe('PaypalComponent', () => {
  let component: PaypalComponent;
  let fixture: ComponentFixture<PaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
