import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTracksComponent } from './allTracks.component';

describe('AllTracksComponent', () => {
  let component: AllTracksComponent;
  let fixture: ComponentFixture<AllTracksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTracksComponent]
    });
    fixture = TestBed.createComponent(AllTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
