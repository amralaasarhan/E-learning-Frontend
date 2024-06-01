import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSearchComponent } from './track-search.component';

describe('TrackSearchComponent', () => {
  let component: TrackSearchComponent;
  let fixture: ComponentFixture<TrackSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackSearchComponent]
    });
    fixture = TestBed.createComponent(TrackSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
