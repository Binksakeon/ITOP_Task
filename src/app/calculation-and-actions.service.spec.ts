import { TestBed } from '@angular/core/testing';

import { CalculationAndActionsService } from './calculation-and-actions.service';

describe('CalculationAndActionsService', () => {
  let service: CalculationAndActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationAndActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
