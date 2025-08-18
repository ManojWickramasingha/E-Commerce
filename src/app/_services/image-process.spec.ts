import { TestBed } from '@angular/core/testing';

import { ImageProcess } from './image-process';

describe('ImageProcess', () => {
  let service: ImageProcess;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProcess);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
