import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOverviewComponent } from './track-overview.component';

describe('TrackOverviewComponent', () => {
  let component: TrackOverviewComponent;
  let fixture: ComponentFixture<TrackOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackOverviewComponent]
    });
    fixture = TestBed.createComponent(TrackOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
