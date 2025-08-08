import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProduct } from './create-new-product';

describe('CreateNewProduct', () => {
  let component: CreateNewProduct;
  let fixture: ComponentFixture<CreateNewProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
