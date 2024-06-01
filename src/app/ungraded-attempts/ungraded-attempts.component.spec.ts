import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UngradedAttemptsComponent } from './ungraded-attempts.component';

describe('UngradedAttemptsComponent', () => {
  let component: UngradedAttemptsComponent;
  let fixture: ComponentFixture<UngradedAttemptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UngradedAttemptsComponent]
    });
    fixture = TestBed.createComponent(UngradedAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
