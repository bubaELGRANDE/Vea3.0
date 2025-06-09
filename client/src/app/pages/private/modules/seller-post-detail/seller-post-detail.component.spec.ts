import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPostDetailComponent } from './seller-post-detail.component';

describe('SellerPostDetailComponent', () => {
  let component: SellerPostDetailComponent;
  let fixture: ComponentFixture<SellerPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerPostDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
