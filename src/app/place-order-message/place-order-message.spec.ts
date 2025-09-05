import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderMessage } from './place-order-message';

describe('PlaceOrderMessage', () => {
  let component: PlaceOrderMessage;
  let fixture: ComponentFixture<PlaceOrderMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceOrderMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
