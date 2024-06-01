import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRegistrationComponent } from './track-registration.component';

describe('TrackRegistrationComponent', () => {
  let component: TrackRegistrationComponent;
  let fixture: ComponentFixture<TrackRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackRegistrationComponent]
    });
    fixture = TestBed.createComponent(TrackRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
