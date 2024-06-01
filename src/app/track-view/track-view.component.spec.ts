import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackViewComponent } from './track-view.component';

describe('TrackViewComponent', () => {
  let component: TrackViewComponent;
  let fixture: ComponentFixture<TrackViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackViewComponent]
    });
    fixture = TestBed.createComponent(TrackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
