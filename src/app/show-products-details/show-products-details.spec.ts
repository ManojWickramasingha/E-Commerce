import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsDetails } from './show-products-details';

describe('ShowProductsDetails', () => {
  let component: ShowProductsDetails;
  let fixture: ComponentFixture<ShowProductsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProductsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
