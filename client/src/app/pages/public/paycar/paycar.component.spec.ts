import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycarComponent } from './paycar.component';

describe('PaycarComponent', () => {
  let component: PaycarComponent;
  let fixture: ComponentFixture<PaycarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaycarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaycarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
